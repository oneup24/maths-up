import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

// kid-practice.DESIGN.md tokens
const CANVAS_DARK = '#010120';
const INK = '#000000';
const BODY = '#959494';
const HAIRLINE = 'rgba(0,0,0,0.08)';

function LeftPanel({ zh }) {
  const features = [
    { ic: '🎯', zh: '智能題目，針對弱點訓練', en: 'Smart questions targeting weak points' },
    { ic: '🧠', zh: '陷阱題訓練，防止粗心失分', en: 'Trap-item training to stop careless errors' },
    { ic: '📊', zh: '追蹤成績，見證孩子進步', en: 'Track scores and watch progress over time' },
  ];
  return (
    <div
      className="hidden lg:flex lg:flex-col lg:justify-between lg:w-[52%] p-14 select-none"
      style={{ background: CANVAS_DARK }}
    >
      <div>
        <p className="text-xs uppercase tracking-widest font-medium mb-4"
          style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'ui-monospace, SF Mono, monospace' }}>
          OneUp24
        </p>
        <h1 className="text-4xl font-black text-white leading-tight">Maths Quests</h1>
        <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.48)' }}>
          {zh ? 'P1–P6 香港小學數學練習' : 'P1–P6 · Hong Kong primary school maths'}
        </p>
      </div>

      <div className="space-y-5">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3.5">
            <span className="text-xl leading-none mt-0.5">{f.ic}</span>
            <p className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.78)' }}>
              {zh ? f.zh : f.en}
            </p>
          </div>
        ))}
      </div>

      {/* Brand gradient stripe — the only decorative chrome */}
      <div style={{
        height: '3px', width: '96px', borderRadius: '9999px',
        background: 'linear-gradient(90deg,#fc4c02,#ef2cc1,#bdbbff)',
      }} />
    </div>
  );
}

const inputBase = {
  borderRadius: '4px',
  border: `1px solid ${HAIRLINE}`,
  background: '#fff',
  color: INK,
  outline: 'none',
  fontSize: '14px',
  padding: '12px 16px 12px 40px',
  transition: 'border-color 0.15s',
  width: '100%',
  boxSizing: 'border-box',
  display: 'block',
};

export default function Login({ onAuth, lang = 'zh' }) {
  const [mode, setMode] = useState(onAuth.isRecovery ? 'update' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const zh = lang === 'zh';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') { await onAuth.signUp(email, password); setSignupDone(true); }
      else if (mode === 'login') { await onAuth.signIn(email, password); }
      else if (mode === 'forgot') { await onAuth.resetPassword(email); setResetSent(true); }
      else if (mode === 'update') {
        await onAuth.updatePassword(password);
        setTimeout(() => setMode('login'), 2000);
      }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const onFocus = e => { e.target.style.borderColor = 'rgba(0,0,0,0.28)'; };
  const onBlur  = e => { e.target.style.borderColor = HAIRLINE; };

  // Right-column content
  let content;

  if (signupDone || resetSent) {
    const icon  = signupDone ? '📧' : '📬';
    const title = signupDone
      ? (zh ? '請查看電郵！' : 'Check your email!')
      : (zh ? '重設連結已發送' : 'Reset link sent');
    const desc  = signupDone
      ? (zh ? `確認連結已發送至 ${email}，請點擊啟用帳戶。` : `Confirmation link sent to ${email}.`)
      : (zh ? `重設連結已發送至 ${email}。` : `Check ${email} for the reset link.`);
    content = (
      <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="text-center w-full max-w-sm">
        <span className="text-5xl">{icon}</span>
        <h2 className="text-xl font-black mt-4" style={{ color: INK }}>{title}</h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>{desc}</p>
        <button
          onClick={() => { setSignupDone(false); setResetSent(false); setMode('login'); }}
          className="mt-6 text-sm font-bold hover:underline cursor-pointer"
          style={{ color: INK }}>
          {zh ? '返回登入' : 'Back to Login'}
        </button>
      </motion.div>
    );
  } else {
    content = (
      <motion.div
        key={mode}
        initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="w-full max-w-sm">

        {/* Mobile wordmark — hidden on desktop (left panel covers it) */}
        <div className="lg:hidden text-center mb-8">
          <h1 className="text-2xl font-black" style={{ color: INK }}>Maths Quests</h1>
          <p className="text-xs mt-1" style={{ color: BODY }}>
            {zh ? 'P1–P6 香港小學數學練習' : 'Maths practice for HK primary students'}
          </p>
        </div>

        {/* Form title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-black" style={{ color: INK }}>
            {mode === 'login'  ? (zh ? '歡迎回來！'  : 'Welcome back!')     :
             mode === 'signup' ? (zh ? '建立帳戶'    : 'Create account')    :
             mode === 'forgot' ? (zh ? '忘記密碼？'  : 'Forgot password?')  :
                                 (zh ? '設定新密碼'  : 'Set new password')}
          </h2>
          {mode === 'login' && (
            <p className="text-xs mt-1" style={{ color: BODY }}>
              {zh ? '為香港小學生而設的數學練習' : 'Maths practice for HK primary students'}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          {mode !== 'update' && (
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: BODY }} />
              <input
                type="email"
                placeholder={zh ? '電郵地址' : 'Email address'}
                value={email} onChange={e => setEmail(e.target.value)}
                required aria-label="Email"
                style={inputBase}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
          )}

          {/* Password */}
          {(mode === 'login' || mode === 'signup' || mode === 'update') && (
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: BODY }} />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder={mode === 'update' ? (zh ? '新密碼（至少6位）' : 'New password (min 6)') : (zh ? '密碼' : 'Password')}
                value={password} onChange={e => setPassword(e.target.value)}
                required minLength={6} aria-label="Password"
                style={{ ...inputBase, paddingRight: '44px' }}
                onFocus={onFocus} onBlur={onBlur}
              />
              <button type="button" onClick={() => setShowPw(p => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ color: BODY }}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          )}

          {/* Forgot password link */}
          {mode === 'login' && (
            <div className="text-right">
              <button type="button" onClick={() => { setMode('forgot'); setError(''); }}
                className="text-xs hover:underline cursor-pointer" style={{ color: BODY }}>
                {zh ? '忘記密碼？' : 'Forgot password?'}
              </button>
            </div>
          )}

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-xs text-center p-2.5"
                style={{ color: '#b00020', background: '#fff5f5', borderRadius: '4px', border: '1px solid rgba(180,0,30,0.10)' }}>
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit — button-primary from design spec */}
          <button type="submit" disabled={loading}
            className="w-full text-white font-bold text-sm cursor-pointer transition-opacity duration-150 active:opacity-75 disabled:opacity-40 uppercase tracking-wider"
            style={{ marginTop: '8px', background: INK, borderRadius: '4px', padding: '14px 24px' }}>
            {loading
              ? <Loader2 size={16} className="animate-spin mx-auto" />
              : mode === 'login'  ? (zh ? '登入'        : 'LOG IN')
              : mode === 'signup' ? (zh ? '建立帳戶'     : 'SIGN UP')
              : mode === 'forgot' ? (zh ? '發送重設連結'  : 'SEND RESET LINK')
              :                     (zh ? '設定新密碼'    : 'SET NEW PASSWORD')}
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-5 flex justify-center items-center gap-5 text-sm">
          {mode === 'login' && (<>
            <button onClick={() => { setMode('signup'); setError(''); }}
              className="font-bold hover:underline cursor-pointer" style={{ color: INK }}>
              {zh ? '注册' : 'Sign Up'}
            </button>
            <span style={{ color: BODY }}>·</span>
            <button onClick={onAuth.skip}
              className="hover:underline cursor-pointer" style={{ color: BODY }}>
              {zh ? '訪客繼續' : 'Guest mode'}
            </button>
          </>)}
          {(mode === 'signup' || mode === 'forgot') && (
            <button onClick={() => { setMode('login'); setError(''); }}
              className="font-bold hover:underline cursor-pointer" style={{ color: INK }}>
              {zh ? '返回登入' : 'Back to Login'}
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <LeftPanel zh={zh} />
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: '#ffffff' }}>
        {content}
      </div>
    </div>
  );
}
