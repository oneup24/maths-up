import React from 'react';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.div> in JSX
import {motion,AnimatePresence,LayoutGroup} from 'framer-motion';
import {ArrowLeft,BookOpen,Check} from 'lucide-react';
import {GC_HEX,GC_SOFT,CAT_COLORS} from '../../lib/colors';
import {TOPICS,GRADE_INFO,DIFF_INFO} from '../../engine/index';
import PageShell from '../ui/PageShell';

const DIFF_STYLE = {
  1: { active: { background: '#e6faf3', color: '#0e7a52', borderColor: '#2DC99A' } },
  2: { active: { background: '#fff3e6', color: '#9a5100', borderColor: '#FFA040' } },
  3: { active: { background: '#fff0f4', color: '#b5395a', borderColor: '#FF6B95' } },
};

export default function SettingsView({grade,difficulty,setDifficulty,selTopics,toggleTopic,toggleAll,examType,setExamType,useTimer,setUseTimer,timerMins,setTimerMins,generate,onBack,L}){
  var co = GRADE_INFO[grade]?.co || 'emerald';
  var gradeHex = GC_HEX[co] || '#111';
  var soft = GC_SOFT[co] || GC_SOFT.emerald;

  var card = { background: '#fff', border: '1px solid #e8e8e8', borderRadius: 16 };
  var cardCls = "p-4 mb-3";

  return(
    <PageShell className="p-3 pb-20">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex items-center justify-center rounded-xl transition-opacity duration-150 active:opacity-60"
          style={{width:44,height:44,background:'#f5f5f5',border:'1px solid #e8e8e8'}}
        ><ArrowLeft size={18} style={{color:'#111'}}/></button>
        <h2 className="font-black text-lg" style={{color:'#111',letterSpacing:'-0.3px'}}>
          P{grade} {GRADE_INFO[grade].nm}
        </h2>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-4 lg:items-start">

        {/* Left col */}
        <div>
          {/* Difficulty */}
          <div style={card} className={cardCls}>
            <h3 className="font-bold text-sm mb-3" style={{color:'#111'}}>{L('diffTitle')}</h3>
            <LayoutGroup><div className="grid grid-cols-3 gap-2">
              {[1,2,3].map(d=>{
                var di = DIFF_INFO[d];
                var active = difficulty === d;
                var ds = DIFF_STYLE[d];
                return(
                  <button key={d} onClick={()=>setDifficulty(d)}
                    className="relative py-3 rounded-xl border-2 text-center transition-all duration-150 active:opacity-70"
                    style={active
                      ? { ...ds.active, borderColor: ds.active.borderColor }
                      : { background: '#f9f9f9', borderColor: '#e8e8e8', color: '#bbb' }
                    }>
                    {active&&<motion.div layoutId="diffRing" className="absolute inset-0 rounded-xl border-2" style={{borderColor:ds.active.borderColor}} transition={{type:'spring',stiffness:400,damping:30}}/>}
                    <div className="text-lg">{di.ic}</div>
                    <div className="text-sm font-bold">{di.nm}</div>
                    <div className="text-[10px] opacity-70 mt-0.5">{di.desc}</div>
                  </button>
                );
              })}
            </div></LayoutGroup>
          </div>

          {/* Exam Type */}
          <div style={card} className={cardCls}>
            <h3 className="font-bold text-sm mb-3" style={{color:'#111'}}>{L('typeTitle')}</h3>
            <div className="flex gap-2">
              {[{v:'practice',lk:'practice',dk:'practiceQ'},{v:'test',lk:'test',dk:'testQ'},{v:'exam',lk:'exam',dk:'examQ'}].map(e=>(
                <button key={e.v}
                  onClick={()=>{setExamType(e.v);setTimerMins(e.v==='test'?30:e.v==='exam'?55:30);setUseTimer(e.v!=='practice')}}
                  className="flex-1 py-2.5 rounded-xl border-2 transition-all duration-150 active:opacity-70"
                  style={examType===e.v
                    ? {background:soft.bg,borderColor:gradeHex,color:soft.text}
                    : {background:'#f9f9f9',borderColor:'#e8e8e8',color:'#bbb'}
                  }>
                  <div className="text-sm font-bold">{L(e.lk)}</div>
                  <div className="text-xs opacity-70">{L(e.dk)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Timer */}
          <div style={card} className={cardCls}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm" style={{color:'#111'}}>{L('timerTitle')}</h3>
              <button
                onClick={()=>setUseTimer(!useTimer)}
                className="w-12 h-6 rounded-full transition-all duration-200"
                style={{background:useTimer?gradeHex:'#e8e8e8'}}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow transition-transform duration-200" style={{transform:useTimer?'translateX(24px)':'translateX(2px)'}}/>
              </button>
            </div>
            {useTimer&&(
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="range" min={10} max={90} value={timerMins}
                  onChange={e=>setTimerMins(+e.target.value)}
                  className="flex-1"
                  style={{accentColor:gradeHex}}
                />
                <span className="text-sm font-bold w-16 text-right" style={{color:gradeHex}}>{L('minutes',timerMins)}</span>
              </div>
            )}
          </div>

          {/* Generate — desktop */}
          <motion.button whileTap={{scale:.97}} onClick={generate} disabled={selTopics.size===0}
            className="hidden lg:block w-full py-4 rounded-2xl font-bold text-lg text-white transition-opacity duration-150"
            style={{background:selTopics.size>0?gradeHex:'#e8e8e8',color:selTopics.size>0?'#fff':'#bbb'}}
          >
            {L('generateBtn',DIFF_INFO[difficulty].nm,selTopics.size)}
          </motion.button>
        </div>

        {/* Right col: Topics */}
        <div>
          <div style={card} className={cardCls}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm flex items-center gap-1.5" style={{color:'#111'}}>
                <BookOpen size={15} style={{color:'#777'}}/>{L('topicsTitle')}
              </h3>
              <button
                onClick={toggleAll}
                className="text-xs px-3 py-1.5 rounded-lg font-bold transition-opacity duration-150 active:opacity-70"
                style={{background:soft.bg,color:soft.text}}
              >
                {selTopics.size===TOPICS[grade].length?L('deselectAll'):L('selectAll')}
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {TOPICS[grade].map(t=>{
                var sel = selTopics.has(t.id);
                return(
                  <button key={t.id} onClick={()=>toggleTopic(t.id)}
                    className="relative p-2.5 rounded-xl border-2 text-left transition-all duration-150 active:opacity-70"
                    style={sel
                      ? {background:soft.bg,borderColor:gradeHex,color:soft.text}
                      : {background:'#f9f9f9',borderColor:'#e8e8e8',color:'#bbb'}
                    }>
                    <span className="text-xl block mb-0.5">{t.ic}</span>
                    <span className="text-xs font-bold block leading-tight line-clamp-2" style={sel?{color:soft.text}:{color:'#888'}}>{t.nm}</span>
                    <span className={"text-[10px] px-1 py-0.5 rounded mt-1 inline-block "+(CAT_COLORS[t.cat]||'bg-gray-100')}>{t.cat}</span>
                    {sel&&<AnimatePresence><motion.span initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} transition={{duration:0.15}} className="absolute top-1.5 right-1.5" style={{color:soft.text}}><Check size={11}/></motion.span></AnimatePresence>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Generate — mobile */}
      <motion.button whileTap={{scale:.97}} onClick={generate} disabled={selTopics.size===0}
        className="lg:hidden w-full py-4 rounded-2xl font-bold text-lg transition-opacity duration-150"
        style={{background:selTopics.size>0?gradeHex:'#e8e8e8',color:selTopics.size>0?'#fff':'#bbb'}}
      >
        {L('generateBtn',DIFF_INFO[difficulty].nm,selTopics.size)}
      </motion.button>
    </PageShell>
  );
}
