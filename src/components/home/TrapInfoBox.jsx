import React from 'react';

export default function TrapInfoBox({L}){
  return(
    <div
      className="rounded-xl p-3 mt-2"
      style={{background:'#f9f9f9',border:'1px solid #e8e8e8'}}
    >
      <p className="text-xs font-bold mb-0.5" style={{color:'#111'}}>{L('trapBoxTitle')}</p>
      <p className="text-xs" style={{color:'#777'}}>{L('trapBoxDesc')}</p>
    </div>
  );
}
