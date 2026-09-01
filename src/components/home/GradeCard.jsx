import React from 'react';
import {motion} from 'framer-motion';
import {GRADE_INFO,TOPICS} from '../../engine/index';

const GRADE_STYLE = {
  1: { bg: '#FF6B95', shadow: 'rgba(255,107,149,0.35)' },
  2: { bg: '#FFA040', shadow: 'rgba(255,160,64,0.35)'  },
  3: { bg: '#9B6EE8', shadow: 'rgba(155,110,232,0.35)' },
  4: { bg: '#2DC99A', shadow: 'rgba(45,201,154,0.35)'  },
  5: { bg: '#4BA3E8', shadow: 'rgba(75,163,232,0.35)'  },
  6: { bg: '#5DC44A', shadow: 'rgba(93,196,74,0.35)'   },
};

export default function GradeCard({grade,best,onClick,L,delay=0}){
  var s = GRADE_STYLE[grade] || GRADE_STYLE[1];
  var topicCount = TOPICS[grade]?.length || 0;

  return(
    <motion.button
      initial={{opacity:0,y:14}}
      animate={{opacity:1,y:0}}
      transition={{delay, type:'spring', stiffness:280, damping:22}}
      whileHover={{scale:1.03, transition:{duration:0.15, ease:'easeOut'}}}
      whileTap={{scale:.93}}
      onClick={onClick}
      className="relative p-4 rounded-2xl text-white text-left w-full cursor-pointer"
      style={{
        background: s.bg,
        boxShadow: `0 8px 24px ${s.shadow}`,
        minHeight: '110px',
      }}
    >
      {/* Grade number */}
      <div className="text-4xl font-black leading-none">P{grade}</div>
      {/* Grade name */}
      <div className="text-sm font-semibold opacity-80 mt-1">{GRADE_INFO[grade].nm}</div>

      {/* Topic count / best score */}
      <div className="absolute bottom-3 left-4">
        {best > 0 ? (
          <span className="bg-black/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            最高 {best}%
          </span>
        ) : (
          <span className="text-white/75 text-xs font-medium">
            {topicCount} 個課題
          </span>
        )}
      </div>
    </motion.button>
  );
}
