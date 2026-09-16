/**
 * exam.js — buildExam() and printExam()
 * Extracted from engine.js
 */

import { pk } from './core.js';
import { TOPICS, GRADE_INFO, DIFF_INFO, DIFF_ALLOW, EXAM_TARGETS, SECT_RATIOS, SECT_CONF, SECT_LBL } from './config.js';
import { validateQuestion } from './gradeRules.js';
import { Q } from './grades/index.js';
import { quarantined } from './quarantined.js';

export function buildExam(grade,topics,examType,difficulty){
  difficulty=difficulty||2;
  var totalTarget=EXAM_TARGETS[examType]||24;
  var allowed=DIFF_ALLOW[difficulty]||[1,2,3];
  var tMap={};(TOPICS[grade]||[]).forEach(function(t){tMap[t.id]=t.nm});
  var allGens={calc:[],fill:[],mc:[],short:[],work:[]};
  topics.forEach(tid=>{
    var pool=(Q[grade]||{})[tid];if(!pool)return;
    var tnm=tMap[tid]||tid;
    pool.forEach((gen,gi)=>{
      if(quarantined.has(tid+':'+gi))return;
      try{
        var q=gen();
        if(!q||!q.tp||!allGens[q.tp])return;
        /* check difficulty compatibility */
        if(!allowed.includes(q.d||2))return;
        allGens[q.tp].push({fn:gen,gi:gi,tid:tid,tnm:tnm});
      }catch{/* intentionally empty — skip broken generators */}
    });
  });
  var types=['mc','fill','calc','short','work'].filter(t=>allGens[t].length>0);
  if(!types.length)return[];
  var sumR=0;types.forEach(t=>{sumR+=SECT_RATIOS[t]||.1});
  var dist={};types.forEach(t=>{dist[t]=Math.max(1,Math.round(totalTarget*(SECT_RATIOS[t]||.1)/sumR))});
  var generated={};var count=0;
  /* prevent same generator template from repeating too often in one exam — applies to ALL types (mc/fill/calc/short/work) */
  var GEN_CAP=2;
  var usedGens={};
  types.forEach(t=>{
    var need=dist[t]||0,gens=allGens[t],qs=[],seen={},seenT={};
    for(var i=0;i<need*80&&qs.length<need;i++){
      try{var item=pk(gens);if((usedGens[item.fn]||0)>=GEN_CAP)continue;var q=item.fn();if(!q||!q.q)continue;if(!allowed.includes(q.d||2))continue;if(!validateQuestion(grade,q).ok)continue;var k=q.q+'|'+q.a;if(seen[k])continue;var tc=seenT[q.q]||0;if(tc>=1)continue;seen[k]=true;seenT[q.q]=tc+1;usedGens[item.fn]=(usedGens[item.fn]||0)+1;q._genKey=item.tid+':'+item.gi;q.topicId=item.tid;q.topicName=item.tnm;qs.push(q)}catch{/* intentionally empty — skip broken generators */}
    }
    if(qs.length>0){generated[t]=qs;count+=qs.length}
  });
  var gSeen={},gSeenT={};
  /* pre-seed from session to avoid cross-exam repeats */
  try{var _sk='mq_seen_'+grade;JSON.parse(sessionStorage.getItem(_sk)||'[]').forEach(k=>{gSeen[k]=true;var qt=k.split('|')[0];gSeenT[qt]=(gSeenT[qt]||0)+1});}catch{/* sessionStorage unavailable */}
  types.forEach(t=>(generated[t]||[]).forEach(q=>{gSeen[q.q+'|'+q.a]=true;gSeenT[q.q]=(gSeenT[q.q]||0)+1}));
  var safety=0;
  while(count<totalTarget&&safety<500){
    safety++;var t=pk(types);var gens=allGens[t];if(!gens.length)continue;if(!generated[t])generated[t]=[];
    try{var item=pk(gens);if((usedGens[item.fn]||0)>=GEN_CAP)continue;var q=item.fn();if(!q||!q.q)continue;if(!allowed.includes(q.d||2))continue;if(!validateQuestion(grade,q).ok)continue;var k=q.q+'|'+q.a;if(gSeen[k])continue;if((gSeenT[q.q]||0)>=1)continue;gSeen[k]=true;gSeenT[q.q]=(gSeenT[q.q]||0)+1;usedGens[item.fn]=(usedGens[item.fn]||0)+1;q._genKey=item.tid+':'+item.gi;q.topicId=item.tid;q.topicName=item.tnm;generated[t].push(q);count++}catch{/* skip broken generators */}
  }
  while(count>totalTarget){
    var longest=types.filter(t=>(generated[t]||[]).length>1).sort((a,b)=>(generated[b]||[]).length-(generated[a]||[]).length);
    if(!longest.length)break;generated[longest[0]].pop();count--;
  }
  var secs=[];
  var defSc={mc:2,fill:2,calc:2,short:3,work:4};
  ['mc','fill','calc','short','work'].forEach(t=>{var qs=generated[t];if(!qs||!qs.length)return;var total=qs.reduce((s,q)=>s+(q.sc||defSc[t]||2),0);secs.push({id:t,label:SECT_LBL[secs.length],nm:SECT_CONF[t].nm,nt:SECT_CONF[t].nt,total,qs})});
  /* persist question hashes for cross-exam dedup */
  try{var _sk2='mq_seen_'+grade;var _prev=JSON.parse(sessionStorage.getItem(_sk2)||'[]');var _new=secs.flatMap(s=>s.qs).map(q=>q.q+'|'+q.a);var _merged=[...new Set([..._prev,..._new])].slice(-200);sessionStorage.setItem(_sk2,JSON.stringify(_merged));}catch{/* sessionStorage unavailable */}
  return secs;
}

export function printExam(secs,grade,showAns,name,difficulty,parentReport){
  /* parentReport: optional { topicSummary, totScore, grandTotal, pct }
     When provided, a third page (parent report) is appended after the answer key. */
  var gt=secs.reduce((s,sec)=>s+sec.total,0);
  var esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br/>');
  var diffLabel=DIFF_INFO[difficulty||2].nm;
  var defSc={mc:2,fill:2,calc:2,short:3,work:4};
  var hasPR=!!(parentReport&&Array.isArray(parentReport.topicSummary));

  /* ──── Page 1: Student Paper ──── */
  var b='';
  secs.forEach(sec=>{
    b+=`<div style="margin:24px 0 10px;border-bottom:2px solid #000;padding-bottom:4px;font-size:15px;"><b>${sec.label}部：${sec.nm}</b> <span style="font-size:13px;color:#444;">（共 ${sec.total} 分，${sec.nt}）</span></div>`;
    sec.qs.forEach((q,i)=>{
      var sc=q.sc||defSc[sec.id]||2;
      b+=`<div style="margin:12px 0;padding:6px 0;page-break-inside:avoid;">
            <div style="display:flex;justify-content:space-between;align-items:baseline;">
              <div style="width:88%;font-size:14px;"><b>${i+1}.</b> ${esc(q.q)}</div>
              <div style="width:12%;text-align:right;font-weight:bold;font-size:13px;">[ ${sc} 分 ]</div>
            </div>`;
      if(q.fig) b+=`<div style="margin:8px 0;text-align:center">${q.fig}</div>`;
      if(sec.id==='mc'&&q.opts)
        b+=`<div style="margin:8px 0 0 24px;display:flex;flex-wrap:wrap;gap:8px 32px;font-size:14px;">${q.opts.map(o=>`<span><span style="display:inline-block;width:13px;height:13px;border:1px solid #000;border-radius:50%;vertical-align:middle;margin-right:5px;"></span>${o.l}. ${esc(o.v)}</span>`).join('')}</div>`;
      if(sec.id==='fill'||sec.id==='calc') b+=`<div style="height:22px"></div>`;
      if(sec.id==='short') b+=`<div style="margin-top:14px;font-size:14px;padding-left:24px;">答：______________________________________</div>`;
      if(sec.id==='work') b+=`<div style="height:180px;margin-top:10px;border-left:2px solid #e2e8f0;padding-left:10px;"></div>`;
      b+=`</div>`;
    });
  });
  b+=`<div style="text-align:center;margin-top:40px;font-weight:bold;font-size:16px;letter-spacing:4px;">— 全卷完 —</div>`;

  /* ──── Page 2: Answer Key + Marking Scheme ──── */
  var ans='';
  if(showAns){
    ans=`<div style="page-break-before:always;border-top:4px double #000;padding-top:20px;margin-top:20px;">
          <h2 style="text-align:center;margin-bottom:20px;">📘 導師評卷參考 (Marking Scheme)</h2>`;
    secs.forEach(sec=>{
      ans+=`<div style="margin:16px 0;"><b style="font-size:15px;background:#eee;padding:4px 8px;border-radius:4px;">${sec.label}部：${sec.nm}</b><div style="margin-top:8px;">`;
      sec.qs.forEach((q,i)=>{
        ans+=`<div style="margin-bottom:12px;padding-bottom:8px;border-bottom:1px dashed #ccc;page-break-inside:avoid;">
                <div style="font-size:14px;color:#1e3a8a;"><b>${i+1}. 答案：</b>${esc(q.a)}</div>`;
        if(q.trap)
          ans+=`<div style="font-size:13px;color:#b91c1c;margin-top:4px;background:#fee2e2;padding:4px 8px;border-radius:4px;display:inline-block;"><b>⚠️ 呈分試陷阱：</b>${esc(q.trap)}</div>`;
        if(q.s&&q.s.length)
          ans+=`<div style="font-size:13px;color:#334155;margin-top:6px;"><b>💡 導師拆解：</b><br/>${q.s.map(step=>`• ${esc(step)}`).join('<br/>')}</div>`;
        ans+=`</div>`;
      });
      ans+=`</div></div>`;
    });
    ans+=`</div>`;
  }

  /* ──── Page 3: Parent Report ──── */
  var pr='';
  if(hasPR){
    var ts=parentReport.topicSummary;
    var tot=parentReport.totScore||0;
    var grand=parentReport.grandTotal||gt;
    var pct=parentReport.pct||0;
    /* Color-coded indicator per topic */
    var indicator=function(p){return p>=80?'✓ 良好':p>=50?'△ 待加強':'✗ 需要重點練習';};
    var indicatorColor=function(p){return p>=80?'#16a34a':p>=50?'#d97706':'#ef4444';};

    pr=`<div style="page-break-before:always;padding-top:20px;">
      <h2 style="text-align:center;font-size:22px;margin:0 0 6px;color:#1e3a8a;">👨‍👩‍👧 家長報告 (Parent Report)</h2>
      <p style="text-align:center;font-size:12px;color:#64748b;margin:0 0 20px;">依據香港教育局《小學數學科學習內容》(2017) 核心課程編製</p>

      <table class="ht">
        <tr>
          <td width="35%">學生姓名：${name||'_________________'}</td>
          <td width="20%">年級：P${grade}</td>
          <td width="25%">難度：${diffLabel}</td>
          <td width="20%" style="font-weight:bold;">總分：${tot} / ${grand}（${pct}%）</td>
        </tr>
      </table>

      <div style="margin:18px 0 8px;border-bottom:2px solid #000;padding-bottom:4px;font-size:15px;">
        <b>📊 各單元表現 (Topic Performance)</b>
        <span style="font-size:12px;color:#64748b;">（按表現由低至高排序 — 先看最弱的）</span>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#f1f5f9;">
            <th style="border:1px solid #cbd5e1;padding:6px 10px;text-align:left;">單元</th>
            <th style="border:1px solid #cbd5e1;padding:6px 10px;text-align:center;width:80px;">題數</th>
            <th style="border:1px solid #cbd5e1;padding:6px 10px;text-align:center;width:80px;">答對</th>
            <th style="border:1px solid #cbd5e1;padding:6px 10px;text-align:center;width:120px;">表現</th>
          </tr>
        </thead>
        <tbody>
          ${ts.slice().sort((a,b)=>a.pct-b.pct).map(t=>`
            <tr>
              <td style="border:1px solid #e2e8f0;padding:6px 10px;">${esc(t.name)}</td>
              <td style="border:1px solid #e2e8f0;padding:6px 10px;text-align:center;">${t.total}</td>
              <td style="border:1px solid #e2e8f0;padding:6px 10px;text-align:center;">${t.correct}</td>
              <td style="border:1px solid #e2e8f0;padding:6px 10px;text-align:center;color:${indicatorColor(t.pct)};font-weight:bold;">${indicator(t.pct)}（${t.pct}%）</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="margin:22px 0 8px;border-bottom:2px solid #000;padding-bottom:4px;font-size:15px;"><b>💡 給家長的建議 (Actionable Advice)</b></div>
      <div style="font-size:13px;line-height:1.8;">
        ${prAdviceHTML(ts, pct)}
      </div>

      <p style="text-align:center;margin-top:30px;font-size:11px;color:#94a3b8;">— 本報告由 Maths-Up 自動生成 · 數據來源：學生作答記錄 —</p>
    </div>`;
  }

  var html=`<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>${GRADE_INFO[grade].nm}數學模擬試卷</title>
    <style>
      @page{size:A4;margin:15mm}
      body{font-family:"DFKai-SB","BiauKai","MingLiU","PMingLiU","Microsoft JhengHei",serif;font-size:14px;line-height:1.6;color:#000;}
      table.ht{width:100%;border-collapse:collapse;margin:15px 0;}
      table.ht td{border:1px solid #000;padding:8px 12px;font-size:14px;}
      @media print{.np{display:none!important}}
    </style></head><body>
    <div class="np" style="position:fixed;top:0;left:0;right:0;background:#4f46e5;padding:8px 16px;display:flex;justify-content:space-between;align-items:center;z-index:99;box-shadow:0 2px 4px rgba(0,0,0,.2);">
      <span style="color:#fff;font-weight:bold;font-family:sans-serif;">列印預覽 (HK Exam Format)</span>
      <button onclick="window.print()" style="padding:6px 20px;border-radius:6px;border:none;cursor:pointer;font-weight:bold;background:#fff;color:#4f46e5;">列印試卷</button>
    </div>
    <div class="np" style="height:50px"></div>
    <div style="text-align:center;margin-bottom:10px;">
      <h1 style="font-size:22px;margin:0;letter-spacing:2px;">${GRADE_INFO[grade].nm}數學科模擬考試（${diffLabel}）</h1>
      <p style="font-size:12px;color:#555;margin:6px 0;">依據香港教育局《小學數學科學習內容》(2017) 核心課程編製</p>
    </div>
    <table class="ht">
      <tr>
        <td width="35%">姓名：${name||'_________________'}</td>
        <td width="20%">班別：_______</td>
        <td width="25%">日期：_____________</td>
        <td width="20%" style="font-weight:bold;">成績：<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / ${gt} 分</td>
      </tr>
    </table>
    ${b}${ans}${pr}
    </body></html>`;

  var w=window.open('','_blank','width=820,height=950');if(w){w.document.write(html);w.document.close();}
}

/**
 * Render the "actionable advice" block of the parent report based on
 * weakest-first topic performance. Per MASTER_PLAN.md §D10.
 */
function prAdviceHTML(topicSummary, overallPct){
  var esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  if(!topicSummary||topicSummary.length===0){
    return '<p style="color:#64748b;">暫無單元數據。</p>';
  }
  var sorted=topicSummary.slice().sort((a,b)=>a.pct-b.pct);
  var weakest=sorted[0];
  var strongest=sorted[sorted.length-1];
  var weakList=sorted.filter(t=>t.pct<70);
  var out=[];
  out.push(`<p><b>整體表現：</b>${overallPct}%。${overallPct>=80?'表現優異，繼續保持！':overallPct>=50?'尚有進步空間，建議針對弱項重點練習。':'需要加強基礎練習，建議每天做 10–15 分鐘相關題目。'}</p>`);
  if(weakest){
    out.push(`<p><b>最需要關注的單元：</b><span style="color:${weakest.pct<50?'#ef4444':'#d97706'};">「${esc(weakest.name)}」</span>（${weakest.pct}%，${weakest.correct}/${weakest.total} 答對）。建議每天練習 5 題同類題目，建立信心。</p>`);
  }
  if(strongest && strongest !== weakest){
    out.push(`<p><b>最強的單元：</b><span style="color:#16a34a;">「${esc(strongest.name)}」</span>（${strongest.pct}%）✓ 表現穩定，可繼續挑戰更深的延伸題。</p>`);
  }
  if(weakList.length>=3){
    var names=weakList.slice(0,3).map(t=>t.name).join('、');
    out.push(`<p><b>⚠️ 多個單元（${weakList.length} 個）表現低於 70%：</b>${esc(names)}。建議先鞏固基礎概念，再逐步練習。</p>`);
  }
  return out.join('');
}
