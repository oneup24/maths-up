import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, BarChart2 } from 'lucide-react';
import { getUserStats } from '../../services/api';
import HistoryList from './HistoryList';
import { GRADE_INFO } from '../../engine/index';
import { GC_HEX, GC_SOFT } from '../../lib/colors';

export default function RecordTab({ streak, gradeBest, history, onClear, lang, L, user }) {
  const zh = lang === 'zh';
  const [cloudStats, setCloudStats] = useState(null);

  useEffect(() => {
    if (user) {
      getUserStats(user.id).then(stats => setCloudStats(stats));
    }
  }, [user]);

  var card = { background: '#fff', border: '1px solid #e8e8e8', borderRadius: 16 };
  var cardCls = "p-4 mb-3";

  return (
    <div>
      {/* Streak */}
      <div style={card} className={cardCls}>
        <h3 className="font-bold text-sm flex items-center gap-2 mb-3" style={{color:'#111'}}>
          <Zap size={14} style={{color:'#FFA040'}}/>
          {zh ? '連續練習' : 'Streak'}
        </h3>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{background:'#fff3e6'}}>
            <motion.span animate={{scale:[1,1.12,1]}} transition={{duration:2,repeat:Infinity,ease:'easeInOut'}} className="text-xl inline-block">🔥</motion.span>
          </div>
          <div>
            <p className="text-2xl font-black" style={{color:'#FFA040'}}>
              {streak}<span className="text-sm font-bold ml-1" style={{color:'#ffb870'}}>{zh?'天':'days'}</span>
            </p>
            <p className="text-xs" style={{color:'#aaa'}}>{zh?'連續練習天數':'current streak'}</p>
          </div>
        </div>
      </div>

      {/* Grade best scores */}
      <div style={card} className={cardCls}>
        <h3 className="font-bold text-sm flex items-center gap-2 mb-3" style={{color:'#111'}}>
          ⭐ {zh ? '各年級最高分' : 'Best Score by Grade'}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6].map(g => {
            const best = gradeBest[g];
            const co = GRADE_INFO[g]?.co || 'emerald';
            const hex = GC_HEX[co];
            const soft = GC_SOFT[co];
            return (
              <div
                key={g}
                className="rounded-xl p-2.5 text-center"
                style={{background:soft.bg}}
              >
                <p className="font-black text-sm" style={{color:soft.text}}>P{g}</p>
                <p className="font-extrabold text-lg leading-tight" style={{color:hex}}>
                  {best != null ? best+'%' : '—'}
                </p>
                <p className="text-[10px]" style={{color:soft.text,opacity:0.6}}>
                  {best != null ? (best>=80?'🌟':best>=60?'⭐':'📚') : zh?'未做':'n/a'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cloud stats */}
      {user && cloudStats && (
        <div style={card} className={cardCls}>
          <h3 className="font-bold text-sm flex items-center gap-2 mb-3" style={{color:'#111'}}>
            <BarChart2 size={14} style={{color:'#9B6EE8'}}/>
            {zh ? '我的統計（雲端）' : 'My Stats (Cloud)'}
          </h3>
          <div className="flex gap-2">
            <div className="flex-1 rounded-xl p-3 text-center" style={{background:'#f3eeff'}}>
              <p className="text-xl font-black" style={{color:'#9B6EE8'}}>{cloudStats.totalExams}</p>
              <p className="text-[10px] font-bold" style={{color:'#9B6EE8',opacity:0.7}}>{zh?'總考試':'Total'}</p>
            </div>
            <div className="flex-1 rounded-xl p-3 text-center" style={{background:'#e8f3ff'}}>
              <p className="text-xl font-black" style={{color:'#4BA3E8'}}>{cloudStats.avgScore}%</p>
              <p className="text-[10px] font-bold" style={{color:'#4BA3E8',opacity:0.7}}>{zh?'平均分':'Avg'}</p>
            </div>
            <div className="flex-1 rounded-xl p-3 text-center" style={{background:'#fff3e6'}}>
              <p className="text-xl font-black" style={{color:'#FFA040'}}>{cloudStats.bestScore}%</p>
              <p className="text-[10px] font-bold" style={{color:'#FFA040',opacity:0.7}}>{zh?'最高分':'Best'}</p>
            </div>
          </div>
        </div>
      )}

      <HistoryList history={history} onClear={onClear} L={L}/>

      {/* Gap Detection — coming soon */}
      <div
        className="rounded-2xl p-4 mt-1 mb-2"
        style={{background:'#f9f9f9',border:'2px dashed #e8e8e8',opacity:0.8}}
      >
        <h3 className="font-bold text-sm flex items-center gap-2 mb-2" style={{color:'#aaa'}}>
          <Lock size={13} style={{color:'#ccc'}}/>
          {zh ? '弱項分析' : 'Gap Detection'}
          <span
            className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{background:'#f0f0f0',color:'#bbb'}}
          >{zh?'即將推出':'Coming Soon'}</span>
        </h3>
        <p className="text-xs" style={{color:'#bbb'}}>
          {zh?'完成更多練習後，系統會自動找出你的數學弱項，給家長參考。':'After more practice, we\'ll identify weak areas for parents to review.'}
        </p>
      </div>
    </div>
  );
}
