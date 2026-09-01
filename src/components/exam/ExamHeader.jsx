import React from 'react';
import {ArrowLeft,Play,Pause,AlertTriangle} from 'lucide-react';
import {GC_HEX,GC_SOFT} from '../../lib/colors';
import {DIFF_INFO} from '../../engine/index';

export default function ExamHeader({grade,co,difficulty,totalQs,grandTotal,trapCount,useTimer,isMarked,running,setRunning,timeLeft,fmt,answeredQs,onBack,L,lang}){
  var gradeHex = GC_HEX[co] || '#111';
  var soft = GC_SOFT[co] || GC_SOFT.emerald;
  var pct = totalQs > 0 ? answeredQs / totalQs * 100 : 0;
  return(
    <div className="bg-white rounded-2xl p-3 mb-2" style={{border:'1px solid #e8e8e8'}}>
      <div className="flex items-center justify-between flex-wrap gap-1">
        <button
          onClick={onBack}
          aria-label={lang==='zh'?'返回設定':'Back to settings'}
          className="text-sm font-bold flex items-center gap-1 py-1 transition-opacity duration-150 active:opacity-60"
          style={{color:'#777'}}
        >
          <ArrowLeft size={14}/>{L('settingsBtn')}
        </button>
        <div className="flex items-center gap-1.5">
          <span
            className="text-xs font-bold px-2.5 py-0.5 rounded-full"
            style={{background:soft.bg,color:soft.text}}
          >P{grade}</span>
          <span
            className="text-xs font-medium px-2.5 py-0.5 rounded-full"
            style={{background:'#f5f5f5',color:'#555'}}
          >{DIFF_INFO[difficulty].ic} {DIFF_INFO[difficulty].nm}</span>
        </div>
        <span className="text-xs" style={{color:'#aaa'}}>{L('totalQS',totalQs,grandTotal)}</span>
      </div>

      <h2
        className="text-center font-black mt-1"
        style={{color:'#111',letterSpacing:'-0.3px'}}
      >{L('examTitle')}</h2>

      {trapCount>0&&(
        <p className="text-center text-xs font-bold flex items-center justify-center gap-1 mt-0.5" style={{color:'#FFA040'}}>
          <AlertTriangle size={10}/>{L('trapCount',trapCount)}
        </p>
      )}

      {useTimer&&!isMarked&&(
        <div className="flex items-center justify-center gap-3 mt-2">
          <button
            onClick={()=>setRunning(!running)}
            aria-label={running?(lang==='zh'?'暫停':'Pause'):(lang==='zh'?'開始':'Play')}
            className="flex items-center justify-center rounded-lg transition-opacity duration-150 active:opacity-60"
            style={{width:44,height:44,background:'#f5f5f5',color:'#111'}}
          >
            {running?<Pause size={16}/>:<Play size={16}/>}
          </button>
          <span
            className="text-xl font-mono font-bold"
            style={{color: timeLeft<60?'#FF6B95':'#111'}}
          >{fmt(timeLeft)}</span>
        </div>
      )}

      {!isMarked&&(
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1" style={{color:'#aaa'}}>
            <span>{L('progress')}</span>
            <span className="font-bold" style={{color:'#555'}}>{answeredQs}/{totalQs}</span>
          </div>
          <div className="w-full rounded-full h-1.5" style={{background:'#e8e8e8'}} role="progressbar" aria-valuenow={answeredQs} aria-valuemin={0} aria-valuemax={totalQs}>
            <div
              className="h-1.5 rounded-full transition-all duration-300"
              style={{width:pct+'%',background:gradeHex}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
