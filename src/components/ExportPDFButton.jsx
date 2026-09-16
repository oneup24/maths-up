import React,{useState} from 'react';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Download,Loader2,X} from 'lucide-react';
import {t} from '../lib/i18n';
import {resendVerificationEmail} from '../services/api';
import {track} from '../lib/track';

let fontCache=null;
const FONT='NotoSansTC';

function arrayBufferToBase64(buffer){
  let binary='';
  const bytes=new Uint8Array(buffer);
  for(let i=0;i<bytes.byteLength;i++)binary+=String.fromCharCode(bytes[i]);
  return btoa(binary);
}

async function loadFont(doc){
  if(!fontCache){
    const res=await fetch('/fonts/NotoSansTC-Regular.ttf');
    if(!res.ok)throw new Error('Font load failed: '+res.status);
    fontCache=await res.arrayBuffer();
  }
  const base64=arrayBufferToBase64(fontCache);
  doc.addFileToVFS('NotoSansTC-Regular.ttf',base64);
  doc.addFont('NotoSansTC-Regular.ttf',FONT,'normal');
}

function generateFilename(grade,studentName){
  const now=new Date();
  const mm=String(now.getMonth()+1).padStart(2,'0');
  const dd=String(now.getDate()).padStart(2,'0');
  const hh=String(now.getHours()).padStart(2,'0');
  const min=String(now.getMinutes()).padStart(2,'0');
  const safeName=(studentName||'guest').replace(/[/\\:*?"<>|]/g,'').trim().slice(0,20);
  return 'MQ_P'+grade+'_'+safeName+'_'+mm+dd+'_'+hh+min+'.pdf';
}

export default function ExportPDFButton({sections,markRes,answers,mcSel,topicSummary,totScore,grandTotal,pct,grade,lang,studentName,user}){
  const[loading,setLoading]=useState(false);
  const[showVerify,setShowVerify]=useState(false);
  const[verifySent,setVerifySent]=useState(false);
  const[sendingVerify,setSendingVerify]=useState(false);

  async function handleResend(){
    setSendingVerify(true);
    try{
      await resendVerificationEmail(user.email);
      setVerifySent(true);
    }catch(e){
      console.error('Resend failed:',e);
    }finally{
      setSendingVerify(false);
    }
  }

  async function handleExport(){
    // signed-in but unverified — block and prompt; guests (user=null) pass through
    if(user&&!user.email_confirmed_at){
      setShowVerify(true);
      return;
    }
    setLoading(true);
    try{
      const today=new Date();
      const dateStr=today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0');
      const topics=topicSummary||[];
      const zh=lang==='zh';

      const doc=new jsPDF('p','mm','a4');
      const pageW=doc.internal.pageSize.getWidth();
      const margin=14;

      // Load and register Chinese font
      await loadFont(doc);

      // ── Page 1: Student Paper ──
      doc.setFont(FONT,'normal');
      doc.setFontSize(18);
      doc.setTextColor(83,58,253); // {colors.primary} #533afd
      doc.text('\u5B78\u751F\u7B54\u984C (Student Paper)',pageW/2,20,{align:'center'});

      doc.setFont(FONT,'normal');
      doc.setFontSize(10);
      doc.setTextColor(100,116,141); // {colors.ink-mute} #64748d
      doc.text(dateStr,pageW/2,27,{align:'center'});

      // ── Grade + Score row ──
      doc.setFont(FONT,'normal');
      doc.setFontSize(12);
      doc.setTextColor(39,57,81); // {colors.ink-secondary} #273951
      doc.text((zh?'\u5E74\u7D1A':'Grade')+': P'+grade,margin,36);

      doc.setFont(FONT,'normal');
      doc.text((zh?'\u5F97\u5206':'Score')+': '+totScore+' / '+grandTotal+' ('+pct+'%)',pageW-margin,36,{align:'right'});

      // Student name row
      const displayName=studentName||'';
      if(displayName){
        doc.setFont(FONT,'normal');
        doc.setFontSize(11);
        doc.setTextColor(13,37,61); // {colors.ink} #0d253d
        doc.text((zh?'\u5B78\u751F':'Student')+': '+displayName,margin,43);
      }

      // Divider
      const dividerY=displayName?47:39;
      doc.setDrawColor(227,232,238); // {colors.hairline} #e3e8ee
      doc.setLineWidth(0.5);
      doc.line(margin,dividerY,pageW-margin,dividerY);

      // ── Questions table header ──
      const tableHeaderY=dividerY+8;
      doc.setFont(FONT,'normal');
      doc.setFontSize(12);
      doc.setTextColor(39,57,81); // {colors.ink-secondary} #273951
      doc.text(zh?'\u984C\u76EE\u8A73\u60C5':'Question Details',margin,tableHeaderY);

      const allQs=[];
      (sections||[]).forEach((sec,si)=>{
        (sec.qs||[]).forEach((q,qi)=>{
          const k=si+'-'+qi;
          const mr=markRes[k];
          const studentAns=q.isMC?(mcSel[k]||''):(answers[k]||'');
          allQs.push({num:allQs.length+1,q:q.q,studentAns,correctAns:q.a,ok:mr&&mr.ok,steps:q.s||[]});
        });
      });

      autoTable(doc,{
        startY:tableHeaderY+3,
        margin:{left:margin,right:margin},
        head:[[
          '#',
          zh?'\u984C\u76EE':'Question',
          zh?'\u4F60\u7684\u7B54\u6848':'Your Answer',
          zh?'\u7D50\u679C':'Result'
        ]],
        body:allQs.map(row=>[
          row.num,
          row.q,
          row.studentAns||'\u2014',
          row.ok?'\u2713':'\u2717'
        ]),
        styles:{font:FONT,fontStyle:'normal',fontSize:9,cellPadding:3},
        headStyles:{font:FONT,fontStyle:'normal',fillColor:[185,185,249],textColor:[83,58,253]},
        bodyStyles:{font:FONT,fontStyle:'normal'},
        columnStyles:{
          0:{cellWidth:8,halign:'center'},
          1:{cellWidth:'auto'},
          2:{cellWidth:42},
          3:{cellWidth:12,halign:'center'}
        },
        didParseCell(data){
          data.cell.styles.font=FONT;
          data.cell.styles.fontStyle='normal';
          if(data.section==='body'){
            if(data.column.index===2){
              const row=allQs[data.row.index];
              if(row)data.cell.styles.textColor=row.ok?[22,163,74]:[239,68,68];
            }
            if(data.column.index===3){
              const row=allQs[data.row.index];
              if(row)data.cell.styles.textColor=row.ok?[22,163,74]:[239,68,68];
            }
          }
        }
      });

      // ── Page 2: Answer Key + Suggested Steps ──
      doc.addPage();
      doc.setFont(FONT,'normal');
      doc.setFontSize(18);
      doc.setTextColor(83,58,253);
      doc.text('\u6B63\u78BA\u7B54\u6848\u8207\u89E3\u984C (Answer Key & Steps)',pageW/2,20,{align:'center'});

      doc.setFontSize(10);
      doc.setTextColor(100,116,141);
      doc.text(dateStr,pageW/2,27,{align:'center'});

      autoTable(doc,{
        startY:36,
        margin:{left:margin,right:margin},
        head:[[
          '#',
          zh?'\u984C\u76EE':'Question',
          zh?'\u6B63\u78BA\u7B54\u6848':'Correct',
          zh?'\u89E3\u984C\u6B65\u9A5F':'Steps'
        ]],
        body:allQs.map(row=>[
          row.num,
          row.q,
          row.correctAns,
          (row.steps&&row.steps.length>0)
            ? row.steps.map((st,i)=>{
              if(st.startsWith('🔍'))return'【陷阱】'+st.replace(/^\S+\s*/,'');
              if(st.startsWith('❌'))return'[x] '+st.replace(/^\S+\s*/,'');
              if(st.startsWith('✅'))return'[v] '+st.replace(/^\S+\s*/,'');
              return'步驟'+(i+1)+'：'+st;
            }).join('\n')
            : (zh?'\u2014':'\u2014')
        ]),
        styles:{font:FONT,fontStyle:'normal',fontSize:8,cellPadding:3},
        headStyles:{font:FONT,fontStyle:'normal',fillColor:[185,185,249],textColor:[68,52,212]},
        bodyStyles:{font:FONT,fontStyle:'normal'},
        columnStyles:{
          0:{cellWidth:8,halign:'center'},
          1:{cellWidth:'auto'},
          2:{cellWidth:28},
          3:{cellWidth:65}
        },
        didParseCell(data){
          data.cell.styles.font=FONT;
          data.cell.styles.fontStyle='normal';
        }
      });

      // ── Page 3: Parent Report ──
      doc.addPage();
      doc.setFont(FONT,'normal');
      doc.setFontSize(18);
      doc.setTextColor(83,58,253);
      doc.text('\u5BB6\u9577\u5831\u544A (Parent Report)',pageW/2,20,{align:'center'});

      doc.setFontSize(10);
      doc.setTextColor(100,116,141);
      doc.text(dateStr,pageW/2,27,{align:'center'});

      doc.setFontSize(14);
      doc.setTextColor(39,57,81);
      const overallVerdict=pct>=80?(zh?'\u8868\u73FE\u512A\u5F02\uFF0C\u7E7C\u7E8C\u4FDD\u6301\uFF01':'Excellent \u2014 keep it up!')
                                  :pct>=50?(zh?'\u53EF\u4EE5\u66F4\u52A0\u52A0\u6CB9\uFF01':'Room to grow.')
                                  :(zh?'\u9700\u8981\u52A0\u5F37\u57FA\u790E\u7DF4\u7FD2\u3002':'Foundations need work.');
      doc.text(zh?'\u6574\u9AD4\u8868\u73FE\uFF1A'+pct+'% \u2014 '+overallVerdict:'Overall: '+pct+'% \u2014 '+overallVerdict,margin,40);

      if(topics.length>0){
        const topicY=48;
        doc.setFont(FONT,'normal');
        doc.setFontSize(13);
        doc.setTextColor(39,57,81);
        doc.text(zh?'\u5404\u55AE\u5143\u8868\u73FE\uFF08\u5148\u770B\u6700\u5F31\u7684\uFF09':'Topic Performance (weakest first)',margin,topicY);

        autoTable(doc,{
          startY:topicY+3,
          margin:{left:margin,right:margin},
          head:[[
            zh?'\u55AE\u5143':'Topic',
            zh?'\u984C\u6578':'Qs',
            zh?'\u7B54\u5C0D':'OK',
            zh?'\u767E\u5206\u6BD4':'Pct',
            zh?'\u8868\u73FE':'Verdict'
          ]],
          body:topics.slice().sort((a,b)=>a.pct-b.pct).map(tp=>{
            const verdict=tp.pct>=80?(zh?'\u826F\u597D':'Good'):tp.pct>=50?(zh?'\u52A0\u5F37':'Improve'):(zh?'\u91CD\u9EDE\u7DF4\u7FD2':'Focus');
            return[tp.name,tp.total,tp.correct,tp.pct+'%',verdict];
          }),
          styles:{font:FONT,fontStyle:'normal',fontSize:9,cellPadding:3},
          headStyles:{font:FONT,fontStyle:'normal',fillColor:[185,185,249],textColor:[83,58,253]},
          bodyStyles:{font:FONT,fontStyle:'normal'},
          columnStyles:{
            0:{cellWidth:'auto'},
            1:{cellWidth:18,halign:'center'},
            2:{cellWidth:18,halign:'center'},
            3:{cellWidth:22,halign:'center'},
            4:{cellWidth:30,halign:'center'}
          },
          didParseCell(data){
            data.cell.styles.font=FONT;
            data.cell.styles.fontStyle='normal';
            if(data.section==='body'&&data.column.index===4){
              const tp=topics[data.row.index];
              if(tp)data.cell.styles.textColor=tp.pct>=80?[22,163,74]:tp.pct>=50?[217,119,6]:[239,68,68];
            }
          }
        });
      }

      /* Actionable advice (per MASTER_PLAN.md §D10) */
      const adviceY=(doc.lastAutoTable?doc.lastAutoTable.finalY:200)+12;
      doc.setFont(FONT,'normal');
      doc.setFontSize(13);
      doc.setTextColor(39,57,81);
      doc.text(zh?'\u7D66\u5BB6\u9577\u7684\u5EFA\u8B70 (Actionable Advice)':'Actionable Advice',margin,adviceY);

      doc.setFontSize(10);
      const adviceLines=buildAdviceLines(topics,pct,zh);
      let cursorY=adviceY+8;
      for(const line of adviceLines){
        const wrapped=doc.splitTextToSize(line.text,pageW-2*margin-4);
        for(const w of wrapped){
          if(cursorY>280){doc.addPage();cursorY=20;}
          doc.setTextColor(...line.color);
          doc.text(w,margin,cursorY);
          cursorY+=6;
        }
        cursorY+=2;
      }

      cursorY+=4;
      doc.setDrawColor(227,232,238);
      doc.setLineWidth(0.3);
      doc.line(margin,cursorY,pageW-margin,cursorY);
      doc.setFont(FONT,'normal');
      doc.setFontSize(8);
      doc.setTextColor(100,116,141);
      doc.text('\u672C\u5831\u544A\u7531 Maths-Up \u81EA\u52D5\u751F\u6210 \u00B7 \u6578\u64DA\u4F86\u6E90\uFF1A\u5B78\u751F\u4F5C\u7B54\u8A18\u9304 / Generated by Maths-Up \u2014 oneup24.com',pageW/2,cursorY+5,{align:'center'});

      doc.save(generateFilename(grade,studentName));
      track('pdf_export',{grade:grade,pct:pct});
    }catch(e){
      console.error('PDF export failed:',e);
    }finally{
      setLoading(false);
    }
  }

  return(
    <>
      <button onClick={handleExport} disabled={loading}
        className="flex-1 min-w-[80px] py-2 rounded-full text-xs font-bold border-2 border-[#533afd] bg-white text-[#533afd] flex items-center justify-center gap-1 active:bg-[#f6f9fc] disabled:opacity-50">
        {loading?<Loader2 size={12} className="animate-spin"/>:<Download size={12}/>}
        {loading?(lang==='zh'?'生成中...':'Generating...'):(lang==='zh'?'匯出 PDF':'Export PDF')}
      </button>

      {showVerify&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={()=>{setShowVerify(false);setVerifySent(false);}}>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl text-center"
            onClick={e=>e.stopPropagation()}>
            <button onClick={()=>{setShowVerify(false);setVerifySent(false);}}
              className="absolute top-3 right-3 p-1 text-gray-400 active:text-gray-600"
              aria-label="Close">
              <X size={18}/>
            </button>
            <span className="text-4xl block mb-3">📧</span>
            <p className="text-sm font-bold text-gray-800 mb-4 leading-snug">
              {t(lang,'pdfVerifyTitle')}
            </p>
            {verifySent?(
              <p className="text-sm text-emerald-600 font-bold py-2">{t(lang,'pdfVerifySent')}</p>
            ):(
              <button onClick={handleResend} disabled={sendingVerify}
                className="w-full py-3 rounded-full font-bold text-sm text-white bg-[#533afd] active:bg-[#2e2b8c] disabled:opacity-50 flex items-center justify-center gap-2">
                {sendingVerify?<Loader2 size={14} className="animate-spin"/>:null}
                {t(lang,'pdfVerifyBtn')}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Build actionable advice lines for the parent report page.
 * Each line: { text, color: [r,g,b] }
 * Per MASTER_PLAN.md §D10 (Actionable Parent Report Standard).
 */
function buildAdviceLines(topicSummary, overallPct, zh){
  const lines=[];
  const muted=[100,116,141], good=[22,163,74], warn=[217,119,6], bad=[239,68,68];
  if(!topicSummary||topicSummary.length===0){
    lines.push({text:zh?'\u66A8\u7121\u55AE\u5143\u6578\u64DA\u3002':'No topic data available.',color:muted});
    return lines;
  }
  const sorted=topicSummary.slice().sort((a,b)=>a.pct-b.pct);
  const weakest=sorted[0];
  const strongest=sorted[sorted.length-1];
  const overall=zh
    ? '\u2022 \u6574\u9AD4\u8868\u73FE '+overallPct+'%\u3002'+(overallPct>=80?'\u8868\u73FE\u512A\u5F02\u3002':overallPct>=50?'\u5C1A\u6709\u9032\u6B65\u7A7A\u9593\uFF0C\u5EFA\u8B70\u91DD\u5C0D\u5F31\u9805\u91CD\u9EDE\u7DF4\u7FD2\u3002':'\u5EFA\u8B70\u6BCF\u5929\u505A 10\u201315 \u5206\u9418\u76F8\u95DC\u984C\u76EE\u3002')
    : '\u2022 Overall '+overallPct+'%. '+(overallPct>=80?'Excellent.':overallPct>=50?'Practice weakest areas.':'Daily 10-15 min of related drills recommended.');
  lines.push({text:overall,color:overallPct>=80?good:overallPct>=50?warn:bad});
  if(weakest){
    lines.push({text:zh
      ? '\u2022 \u6700\u9700\u95DC\u6CE8\u7684\u55AE\u5143\uFF1A\u300C'+weakest.name+'\u300D\uFF08'+weakest.pct+'%\uFF0C'+weakest.correct+'/'+weakest.total+'\uFF09\u3002\u5EFA\u8B70\u6BCF\u5929 5 \u984C\u540C\u985E\u984C\u76EE\u3002'
      : '\u2022 Focus: "'+weakest.name+'" ('+weakest.pct+'%, '+weakest.correct+'/'+weakest.total+' correct). Drill 5 similar problems daily.',
      color:weakest.pct<50?bad:warn});
  }
  if(strongest && strongest!==weakest){
    lines.push({text:zh
      ? '\u2022 \u6700\u5F37\u7684\u55AE\u5143\uFF1A\u300C'+strongest.name+'\u300D\uFF08'+strongest.pct+'%\uFF09\u2014\u53EF\u7E7C\u7E8C\u6311\u6230\u66F4\u6DF1\u7684\u5EF6\u4F38\u984C\u3002'
      : '\u2022 Strongest: "'+strongest.name+'" ('+strongest.pct+'%). Try harder variations.',
      color:good});
  }
  const weakList=sorted.filter(t=>t.pct<70);
  if(weakList.length>=3){
    lines.push({text:zh
      ? '\u2022 \u591A\u500B\u55AE\u5143\u8868\u73FE\u4F4E\u65BC 70%\uFF1A'+weakList.slice(0,3).map(t=>t.name).join('\u3001')+'\u3002\u5148\u8930\u56FA\u57FA\u790E\u6982\u5FF5\u3002'
      : '\u2022 Multiple weak topics ('+weakList.length+'): '+weakList.slice(0,3).map(t=>t.name).join(', ')+'. Reinforce fundamentals first.',
      color:warn});
  }
  return lines;
}
