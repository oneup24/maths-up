import React from 'react';
import {RotateCcw,Printer,Home} from 'lucide-react';
import {GC_HEX} from '../../lib/colors';

export default function ExamActions({isMarked,co,resetMarking,generate,onPrint,onHome,L}){
  var gradeHex = GC_HEX[co] || '#111';
  return(
    <div className="grid grid-cols-2 gap-2 mt-2 pb-4">
      {isMarked?<>
        <button
          onClick={resetMarking}
          className="py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition-opacity duration-150 active:opacity-70"
          style={{background:'#f5f5f5',color:'#111',border:'1px solid #e8e8e8'}}
        ><RotateCcw size={14}/>{L('retryFull')}</button>
        <button
          onClick={generate}
          className="py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 text-white transition-opacity duration-150 active:opacity-70"
          style={{background:gradeHex}}
        ><RotateCcw size={14}/>{L('newExamFull')}</button>
        <button
          onClick={onPrint}
          className="py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition-opacity duration-150 active:opacity-70"
          style={{background:'#f5f5f5',color:'#111',border:'1px solid #e8e8e8'}}
        ><Printer size={14}/>{L('print')}</button>
        <button
          onClick={onHome}
          className="py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition-opacity duration-150 active:opacity-70"
          style={{background:'#f5f5f5',color:'#111',border:'1px solid #e8e8e8'}}
        ><Home size={14}/>{L('home')}</button>
      </>:<>
        <button
          onClick={onPrint}
          className="py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition-opacity duration-150 active:opacity-70"
          style={{background:'#f5f5f5',color:'#111',border:'1px solid #e8e8e8'}}
        ><Printer size={14}/>{L('print')}</button>
        <button
          onClick={generate}
          className="py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 text-white transition-opacity duration-150 active:opacity-70"
          style={{background:gradeHex}}
        ><RotateCcw size={14}/>{L('newExamFull')}</button>
      </>}
    </div>
  );
}
