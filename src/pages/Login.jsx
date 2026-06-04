import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

// ── swap this to '/login-banner.png' once the forest image is in public/ ──
const BANNER = '/login-banner.png';

export default function Login({ onAuth, lang = 'zh' }) {
  const [mode, setMode] = useState(onAuth.isRecovery ? 'update' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

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
        setPasswordUpdated(true);
        setTimeout(() => { setPasswordUpdated(false); setMode('login'); }, 2000);
      }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  /* ── Success states ── */
  if (signupDone || resetSent) {
    const icon = signupDone ? '📧' : '📬';
    const title = signupDone
      ? (zh ? '請查看電郵！' : 'Check your email!')
      : (zh ? '重設連結已發送' : 'Reset link sent');
    const body = signupDone
      ? (zh ? `確認連結已發送至 ${email}，請點擊啟用帳戶。` : `We sent a confirmation link to ${email}.`)
      : (zh ? `重設連結已發送至 ${email}。` : `Check ${email} for the reset link.`);
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{background:'linear-gradient(160deg,#FF8C42 0%,#FFA850 60%,#FFB347 100%)'}}>
        <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}}
          className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center">
          <span className="text-5xl">{icon}</span>
          <h2 className="text-xl font-black mt-4 text-gray-800">{title}</h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">{body}</p>
          <button onClick={()=>{setSignupDone(false);setResetSent(false);setMode('login');}}
            className="mt-6 text-orange-500 font-bold text-sm hover:underline cursor-pointer">
            {zh?'返回登入':'Back to Login'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{background:'linear-gradient(160deg,#FF8C42 0%,#FFA850 60%,#FFB347 100%)'}}>

      <motion.div initial={{y:24,opacity:0}} animate={{y:0,opacity:1}}
        transition={{type:'spring',stiffness:200,damping:22}}
        className="bg-white w-full max-w-sm overflow-hidden"
        style={{borderRadius:'28px',boxShadow:'0 20px 60px rgba(200,80,0,0.25)'}}>

        {/* ── Banner image ── */}
        <div className="relative w-full overflow-hidden bg-[#FEF3E2]">
          <img
            src={BANNER}
            alt="Curlboo Bear and Friends"
            className="w-full block"
          />
          {/* Soft fade at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20"
            style={{background:'linear-gradient(to bottom,transparent,white)'}}/>
        </div>

        {/* ── Form ── */}
        <div className="px-6 pb-8 pt-2">

          {/* Title */}
          <div className="text-center mb-5">
            <h1 className="text-2xl font-black text-gray-800">
              {mode === 'login'  ? (zh ? '歡迎回來！'  : 'Welcome back!')     :
               mode === 'signup' ? (zh ? '建立帳戶'    : 'Create account')    :
               mode === 'forgot' ? (zh ? '忘記密碼？'  : 'Forgot password?')  :
                                   (zh ? '設定新密碼'  : 'Set new password')}
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">
              {zh ? '為香港小學生而設的數學練習' : 'Maths practice for HK primary students'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            {mode !== 'update' && (
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"/>
                <input type="email" placeholder={zh?'電郵地址':'Email address'}
                  value={email} onChange={e=>setEmail(e.target.value)} required
                  aria-label="Email"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 text-sm font-medium focus:outline-none focus:border-orange-300 focus:bg-white transition-all duration-200"/>
              </div>
            )}

            {/* Password */}
            {(mode === 'login' || mode === 'signup' || mode === 'update') && (
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"/>
                <input type={showPw?'text':'password'}
                  placeholder={mode==='update'?(zh?'新密碼（至少6位）':'New password (min 6)'):(zh?'密碼':'Password')}
                  value={password} onChange={e=>setPassword(e.target.value)} required minLength={6}
                  aria-label="Password"
                  className="w-full pl-10 pr-12 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 text-sm font-medium focus:outline-none focus:border-orange-300 focus:bg-white transition-all duration-200"/>
                <button type="button" onClick={()=>setShowPw(p=>!p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 cursor-pointer">
                  {showPw?<EyeOff size={16}/>:<Eye size={16}/>}
                </button>
              </div>
            )}

            {/* Forgot password link */}
            {mode==='login' && (
              <div className="text-right -mt-1">
                <button type="button" onClick={()=>{setMode('forgot');setError('');}}
                  className="text-xs text-orange-500 font-semibold hover:underline cursor-pointer">
                  {zh?'忘記密碼？':'Forgot password?'}
                </button>
              </div>
            )}

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                  className="text-red-500 text-xs text-center bg-red-50 rounded-xl p-2.5 border border-red-100">
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-2xl text-white font-black text-base cursor-pointer transition-all duration-200 active:scale-[0.97] disabled:opacity-50"
              style={{marginTop:'8px',background:'linear-gradient(135deg,#FF8C42,#FF6B1A)',boxShadow:'0 6px 20px rgba(255,107,26,0.40)'}}>
              {loading
                ? <Loader2 size={18} className="animate-spin mx-auto"/>
                : mode==='login'  ? (zh?'登入':'Log In')
                : mode==='signup' ? (zh?'建立帳戶':'Sign Up')
                : mode==='forgot' ? (zh?'發送重設連結':'Send Reset Link')
                :                   (zh?'設定新密碼':'Set New Password')}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-5 flex justify-center gap-6 text-sm">
            {mode==='login' && (<>
              <button onClick={()=>{setMode('signup');setError('');}}
                className="text-orange-500 font-bold hover:underline cursor-pointer">
                {zh?'注册':'Sign Up'}
              </button>
              <span className="text-gray-200">|</span>
              <button onClick={onAuth.skip}
                className="text-gray-400 hover:text-gray-600 cursor-pointer">
                {zh?'訪客繼續':'Guest mode'}
              </button>
            </>)}
            {(mode==='signup'||mode==='forgot') && (
              <button onClick={()=>{setMode('login');setError('');}}
                className="text-orange-500 font-bold hover:underline cursor-pointer">
                {zh?'返回登入':'Back to Login'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
