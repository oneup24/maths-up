import React from 'react';

export default function GuestBanner({onSignUp,lang}){
  var zh=lang==='zh';
  return(
    <div
      className="rounded-xl p-3 mb-3 flex items-center justify-between gap-2"
      style={{background:'#f9f9f9',border:'1px solid #e8e8e8'}}
    >
      <span className="text-xs flex-1" style={{color:'#777'}}>
        {zh?'訪客模式 — 成績不會同步到雲端。':'Guest mode — scores won\'t sync to cloud.'}
      </span>
      <button
        onClick={onSignUp}
        className="text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 transition-opacity duration-150 active:opacity-70"
        style={{background:'#111',color:'#fff'}}
      >
        {zh?'註冊':'Sign up'}
      </button>
    </div>
  );
}
