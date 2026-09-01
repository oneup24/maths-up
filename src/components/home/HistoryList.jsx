import React from 'react';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.div> in JSX
import {motion} from 'framer-motion';
import {History,Trash2} from 'lucide-react';
import {GC_HEX,GC_SOFT} from '../../lib/colors';
import {GRADE_INFO,DIFF_INFO} from '../../engine/index';

export default function HistoryList({history,onClear,L}){
  return(
    <div className="bg-white rounded-2xl p-4 mb-3" style={{border:'1px solid #e8e8e8'}}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm flex items-center gap-1.5" style={{color:'#111'}}>
          <History size={15} style={{color:'#777'}}/>
          {L('historyTitle')}
        </h3>
        {history.length>0&&(
          <button
            onClick={onClear}
            aria-label={L('clearHistory')}
            className="flex items-center gap-1 text-xs py-1 px-2 rounded-lg transition-colors duration-150 hover:bg-red-50"
            style={{color:'#bbb'}}
          >
            <Trash2 size={12}/>{L('clearHistory')}
          </button>
        )}
      </div>
      {history.length===0?(
        <div className="text-center py-6">
          <img src="/mascot.webp" alt="mascot" className="w-14 h-14 object-cover rounded-xl mx-auto mb-2" style={{opacity:0.25}}/>
          <p className="text-sm font-bold" style={{color:'#ccc'}}>{L('noHistory')}</p>
          <p className="text-xs mt-0.5" style={{color:'#ddd'}}>{L('noHistoryDesc')}</p>
        </div>
      ):(
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {history.slice(0,8).map((h,i)=>{
            var co = GRADE_INFO[h.grade]?.co||'emerald';
            var soft = GC_SOFT[co]||GC_SOFT.emerald;
            return (
              <motion.div key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.04,duration:0.2}}
                className="flex items-center justify-between p-2 rounded-xl text-sm"
                style={{background:'#f9f9f9'}}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{background:soft.bg,color:soft.text}}
                  >P{h.grade}</span>
                  <span className="text-xs" style={{color:'#bbb'}}>{DIFF_INFO[h.difficulty]?.ic}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-14 rounded-full h-1.5" style={{background:'#e8e8e8'}}>
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width:h.pct+'%',
                        background: h.pct>=70?'#2DC99A':h.pct>=50?'#FFA040':'#FF6B95'
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold w-14 text-right" style={{color:'#444'}}>{h.score}/{h.total}</span>
                  <span className="text-xs" style={{color:'#ccc'}}>{h.date}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
