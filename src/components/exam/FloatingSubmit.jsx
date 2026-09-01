import React from 'react';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.button> in JSX
import {motion} from 'framer-motion';
import {Send} from 'lucide-react';

export default function FloatingSubmit({isMarked,answeredQs,totalQs,onSubmit,L}){
  if(isMarked)return null;
  return(
    <motion.button
      initial={{y:20,opacity:0}}
      animate={{y:0,opacity:1}}
      onClick={onSubmit}
      style={{bottom:'calc(1.25rem + env(safe-area-inset-bottom, 0px))', background:'#111'}}
      className="fixed left-1/2 -translate-x-1/2 px-8 py-3.5 text-white font-bold text-base rounded-xl shadow-lg z-40 flex items-center gap-2 active:opacity-80 transition-opacity duration-150"
    >
      <Send size={16}/>
      <span>{L('submit')}</span>
      <span
        className="text-sm px-2 py-0.5 rounded-full"
        style={{background:'rgba(255,255,255,0.15)'}}
      >{answeredQs}/{totalQs}</span>
    </motion.button>
  );
}
