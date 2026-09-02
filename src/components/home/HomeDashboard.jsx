import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { GC_HEX, GC_SOFT } from '../../lib/colors';
import { GRADE_INFO } from '../../engine/index';
import GradeGrid from './GradeGrid';
import GuestBanner from './GuestBanner';

export default function HomeDashboard({
  grade, onGradeChange, gradeBest, history, streak, isBirthday,
  user, lang, L, onStartExam, onSignUp
}) {
  const [showPicker, setShowPicker] = useState(false);
  const zh = lang === 'zh';
  const co = GRADE_INFO[grade]?.co || 'emerald';
  const gradeHex = GC_HEX[co];
  const soft = GC_SOFT[co];
  const lastExam = history[0] || null;
  const recentExams = history.slice(1, 4);

  return (
    <>
      {/* Grade picker sheet */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-end lg:items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.45)' }}
            onClick={() => setShowPicker(false)}
          >
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="bg-white w-full max-w-lg rounded-t-3xl lg:rounded-2xl p-6 pb-10 lg:pb-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-black text-lg" style={{ color: '#111' }}>
                  {zh ? '選擇年級' : 'Select Grade'}
                </h3>
                <button
                  onClick={() => setShowPicker(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: '#f5f5f5' }}
                ><X size={16} style={{ color: '#777' }} /></button>
              </div>
              <GradeGrid
                gradeBest={gradeBest}
                onSelect={g => { onGradeChange(g); setShowPicker(false); }}
                L={L}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard */}
      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-6">

        {/* Center column */}
        <div>
          {/* Context strip */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowPicker(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-sm transition-opacity duration-150 active:opacity-70"
              style={{ background: soft.bg, color: soft.text }}
            >
              P{grade} {GRADE_INFO[grade]?.nm}
              <ChevronDown size={14} />
            </button>
            <div className="flex items-center gap-3">
              {streak > 0 && (
                <span className="text-sm font-bold flex items-center gap-1" style={{ color: '#FFA040' }}>
                  🔥 {streak}{zh ? '日' : 'd'}
                </span>
              )}
              {isBirthday && <span className="text-base">🎂</span>}
            </div>
          </div>

          {/* START EXAM CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onStartExam}
            className="w-full py-5 rounded-2xl text-white font-black text-xl mb-4 transition-opacity duration-150 active:opacity-85"
            style={{ background: gradeHex }}
          >
            {zh ? '開始練習' : 'Start Exam'}
          </motion.button>

          {/* Last result */}
          {lastExam && (
            <div className="rounded-2xl p-4 mb-3" style={{ border: '1px solid #e8e8e8', background: '#fff' }}>
              <p className="text-xs font-semibold mb-2.5" style={{ color: '#aaa' }}>
                {zh ? '上次結果' : 'Last Result'}
              </p>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-black"
                    style={{ color: lastExam.pct >= 70 ? '#2DC99A' : lastExam.pct >= 50 ? '#FFA040' : '#FF6B95' }}
                  >{lastExam.pct}%</span>
                  <span className="text-sm" style={{ color: '#bbb' }}>{lastExam.score}/{lastExam.total}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color: '#555' }}>P{lastExam.grade}</p>
                  <p className="text-xs" style={{ color: '#bbb' }}>{lastExam.date}</p>
                </div>
              </div>
              <div className="rounded-full h-1.5" style={{ background: '#f0f0f0' }}>
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: lastExam.pct + '%',
                    background: lastExam.pct >= 70 ? '#2DC99A' : lastExam.pct >= 50 ? '#FFA040' : '#FF6B95'
                  }}
                />
              </div>
            </div>
          )}

          {/* Recent history (next 3) */}
          {recentExams.length > 0 && (
            <div className="rounded-2xl p-4 mb-3" style={{ border: '1px solid #e8e8e8', background: '#fff' }}>
              <p className="text-xs font-semibold mb-2.5" style={{ color: '#aaa' }}>
                {zh ? '最近練習' : 'Recent'}
              </p>
              <div className="space-y-2.5">
                {recentExams.map((h, i) => {
                  var hco = GRADE_INFO[h.grade]?.co || 'emerald';
                  var hsoft = GC_SOFT[hco];
                  var hhex = GC_HEX[hco];
                  return (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: hsoft.bg, color: hsoft.text }}
                        >P{h.grade}</span>
                        <span className="text-xs" style={{ color: '#ccc' }}>{h.date}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: hhex }}>{h.pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty state */}
          {history.length === 0 && (
            <div
              className="rounded-2xl p-8 text-center mb-3"
              style={{ border: '1px solid #e8e8e8', background: '#fafafa' }}
            >
              <p className="font-bold text-sm mb-1" style={{ color: '#ccc' }}>{L('noHistory')}</p>
              <p className="text-xs" style={{ color: '#ddd' }}>{L('noHistoryDesc')}</p>
            </div>
          )}

          {/* Guest banner — mobile */}
          {!user && <div className="lg:hidden"><GuestBanner onSignUp={onSignUp} lang={lang} /></div>}
        </div>

        {/* Right column — desktop only */}
        <div className="hidden lg:flex lg:flex-col lg:gap-3">
          {/* Best scores by grade */}
          <div className="rounded-2xl p-4" style={{ border: '1px solid #e8e8e8', background: '#fff' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#aaa' }}>
              {zh ? '各年級最高分' : 'Best by Grade'}
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 2, 3, 4, 5, 6].map(g => {
                var gco = GRADE_INFO[g]?.co || 'emerald';
                var gsoft = GC_SOFT[gco];
                var ghex = GC_HEX[gco];
                var best = gradeBest[g];
                return (
                  <div key={g} className="rounded-xl p-2.5 text-center" style={{ background: gsoft.bg }}>
                    <p className="text-xs font-black" style={{ color: gsoft.text }}>P{g}</p>
                    <p className="text-sm font-black" style={{ color: ghex }}>
                      {best != null ? best + '%' : '—'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guest banner — desktop */}
          {!user && <GuestBanner onSignUp={onSignUp} lang={lang} />}
        </div>
      </div>
    </>
  );
}
