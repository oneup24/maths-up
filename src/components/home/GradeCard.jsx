import React from 'react';
import {motion} from 'framer-motion';
import {GRADE_INFO,TOPICS} from '../../engine/index';

// Colors matched exactly to the UI mockup — keyed by grade number
const GRADE_STYLE = {
  1: { bg: 'linear-gradient(145deg,#FFB3C6 0%,#FF6B95 100%)', shadow: 'rgba(255,107,149,0.40)' },
  2: { bg: 'linear-gradient(145deg,#FFD0A0 0%,#FFA040 100%)', shadow: 'rgba(255,160,64,0.40)'  },
  3: { bg: 'linear-gradient(145deg,#D4B8F8 0%,#9B6EE8 100%)', shadow: 'rgba(155,110,232,0.40)' },
  4: { bg: 'linear-gradient(145deg,#9EECD4 0%,#2DC99A 100%)', shadow: 'rgba(45,201,154,0.40)'  },
  5: { bg: 'linear-gradient(145deg,#A3D4FF 0%,#4BA3E8 100%)', shadow: 'rgba(75,163,232,0.40)'  },
  6: { bg: 'linear-gradient(145deg,#B8EAA8 0%,#5DC44A 100%)', shadow: 'rgba(93,196,74,0.40)'   },
};

const GRADE_AVATAR = {
  1: '/avatar-bear.webp',
  2: '/avatar-bunny.webp',
  3: '/avatar-sheep.webp',
  4: '/avatar-dino.webp',
  5: '/avatar-hedgehog.webp',
  6: '/avatar-tiger.webp',
};

export default function GradeCard({grade,best,onClick,L,delay=0}){
  var s = GRADE_STYLE[grade] || GRADE_STYLE[1];
  var topicCount = TOPICS[grade]?.length || 0;

  return(
    <motion.button
      initial={{opacity:0,y:14}}
      animate={{opacity:1,y:0}}
      transition={{delay, type:'spring', stiffness:280, damping:22}}
      whileHover={{scale:1.04, transition:{duration:0.15, ease:'easeOut'}}}
      whileTap={{scale:.92}}
      onClick={onClick}
      className="relative p-4 rounded-3xl text-white text-left w-full overflow-hidden cursor-pointer"
      style={{
        background: s.bg,
        boxShadow: `inset -3px -3px 12px rgba(255,255,255,0.35), 0 12px 32px ${s.shadow}, 0 3px 8px rgba(0,0,0,0.10)`,
        border: '2.5px solid rgba(255,255,255,0.50)',
        minHeight: '130px',
      }}
    >
      {/* Frosted avatar panel — bottom-right corner sticker */}
      <div
        className="absolute bottom-0 right-0 w-28 h-28 rounded-tl-2xl flex items-center justify-center"
        style={{background: 'rgba(255,255,255,0.22)'}}
      >
        <img
          src={GRADE_AVATAR[grade]}
          alt=""
          aria-hidden="true"
          className="w-24 h-24 object-contain pointer-events-none select-none"
          style={{filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))'}}
        />
      </div>

      {/* Grade number */}
      <div className="text-4xl font-black leading-none" style={{textShadow:'0 2px 4px rgba(0,0,0,0.15)'}}>P{grade}</div>
      {/* Grade name */}
      <div className="text-sm font-bold opacity-90 mt-0.5">{GRADE_INFO[grade].nm}</div>

      {/* Topic count / best score badge */}
      <div className="absolute bottom-3 left-4">
        {best > 0 ? (
          <span className="bg-white/35 backdrop-blur-sm text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
            最高 {best}%
          </span>
        ) : (
          <span className="text-white/85 text-xs font-semibold">
            {topicCount} 個課題
          </span>
        )}
      </div>
    </motion.button>
  );
}
