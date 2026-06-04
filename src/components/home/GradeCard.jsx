import React from 'react';
import {motion} from 'framer-motion';
import {Star} from 'lucide-react';
import {GRADE_INFO,TOPICS} from '../../engine/index';

const GRADE_STYLES = {
  rose:    { bg: 'linear-gradient(135deg,#FF7EB3 0%,#FF5A87 100%)', shadow: 'rgba(255,90,135,0.35)' },
  orange:  { bg: 'linear-gradient(135deg,#FFB347 0%,#FF8C00 100%)', shadow: 'rgba(255,140,0,0.35)'  },
  amber:   { bg: 'linear-gradient(135deg,#FFDA7B 0%,#FFB300 100%)', shadow: 'rgba(255,179,0,0.35)'  },
  emerald: { bg: 'linear-gradient(135deg,#6EE7B7 0%,#10B981 100%)', shadow: 'rgba(16,185,129,0.35)' },
  sky:     { bg: 'linear-gradient(135deg,#7DD3FC 0%,#0EA5E9 100%)', shadow: 'rgba(14,165,233,0.35)' },
  violet:  { bg: 'linear-gradient(135deg,#C4B5FD 0%,#7C3AED 100%)', shadow: 'rgba(124,58,237,0.35)' },
};

// Each grade gets its own character avatar
const GRADE_AVATAR = {
  1: '/avatar-bear.webp',
  2: '/avatar-bunny.webp',
  3: '/avatar-dino.webp',
  4: '/avatar-hedgehog.webp',
  5: '/avatar-sheep.webp',
  6: '/avatar-tiger.webp',
};

export default function GradeCard({grade,best,onClick,L,delay=0}){
  var stars=best>=80?3:best>=60?2:best>=40?1:0;
  var co=GRADE_INFO[grade].co;
  var style=GRADE_STYLES[co]||GRADE_STYLES.orange;
  var topicCount=TOPICS[grade]?.length||0;

  return(
    <motion.button
      initial={{opacity:0,y:12}}
      animate={{opacity:1,y:0}}
      transition={{delay, type:'spring', stiffness:260, damping:20}}
      whileTap={{scale:.94}}
      onClick={onClick}
      className="relative p-4 rounded-3xl text-white text-left w-full overflow-hidden cursor-pointer"
      style={{
        background: style.bg,
        boxShadow: `0 8px 24px ${style.shadow}, 0 2px 8px rgba(0,0,0,0.08)`,
        minHeight: '110px',
      }}
    >
      {/* Character avatar — top right, blended into gradient */}
      <img
        src={GRADE_AVATAR[grade]}
        alt=""
        aria-hidden="true"
        className="absolute -right-2 -top-2 w-20 h-20 object-contain pointer-events-none"
        style={{ mixBlendMode: 'multiply', opacity: 0.92 }}
      />

      {/* Stars */}
      {stars>0&&(
        <div className="absolute bottom-3 right-3 flex gap-0.5 z-10">
          {[1,2,3].map(s=>(
            <Star key={s} size={12} className={s<=stars?'fill-yellow-300 text-yellow-300':'fill-white/25 text-white/25'}/>
          ))}
        </div>
      )}

      {/* Grade label */}
      <div className="text-3xl font-black leading-none drop-shadow-sm mb-0.5 relative z-10">P{grade}</div>
      <div className="text-sm font-bold opacity-95 relative z-10">{GRADE_INFO[grade].nm}</div>

      {/* Bottom info */}
      <div className="mt-3 relative z-10">
        {best>0 ? (
          <span className="bg-white/30 backdrop-blur-sm text-white text-xs font-black px-2.5 py-1 rounded-full">
            最高 {best}%
          </span>
        ) : (
          <span className="text-white/80 text-xs font-semibold">
            {topicCount} 個課題
          </span>
        )}
      </div>
    </motion.button>
  );
}
