import React,{useState} from 'react';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.div> in JSX
import {motion,AnimatePresence} from 'framer-motion';
import {ChevronRight,ArrowLeft,Loader2} from 'lucide-react';
import {t} from './lib/i18n';
import {track} from './lib/track';

/* ── Sample questions per grade ── */
const SAMPLE_QS={
  1:{q:'3 + 4 = ?',opts:['5','6','7','8'],a:'7'},
  2:{q:'15 + 23 = ?',opts:['35','38','42','48'],a:'38'},
  3:{q:'48 × 2 = ?',opts:['86','96','106','84'],a:'96'},
  4:{q:'144 ÷ 12 = ?',opts:['11','12','13','14'],a:'12'},
  5:{q:'3/4 + 1/2 = ?',opts:['1','5/4','1¼','3/2'],a:'5/4'},
  6:{q:'25% of 80 = ?',opts:['15','20','25','30'],a:'20'},
};

const GRADE_NAMES={1:'一',2:'二',3:'三',4:'四',5:'五',6:'六'};

/* ── Slide transition variants ── */
const slideVariants={
  enter:{x:80,opacity:0},
  center:{x:0,opacity:1,transition:{duration:0.3}},
  exit:{x:-80,opacity:0,transition:{duration:0.3}},
};

/* ── Progress dots — indigo on white bg ── */
function OnboardingProgress({current}){
  var dotIdx=current-1;
  if(dotIdx<0||dotIdx>4)return null;
  return(
    <div className="flex gap-2 justify-center mt-5">
      {[0,1,2,3,4].map(i=>(
        <div key={i} className={'rounded-full transition-all duration-300 '+(
          i===dotIdx?'w-6 h-2.5 bg-[#533afd]'
          :i<dotIdx?'w-2.5 h-2.5 bg-[#533afd]/60'
          :'w-2.5 h-2.5 bg-gray-300'
        )}/>
      ))}
    </div>
  );
}

/* ── Mascot above card ── */
function CardMascot({happy=false,write=false,small=false}){
  var src=write?'/bunny-write.webp':happy?'/mascot-happy.webp':'/mascot.webp';
  if(small)return(
    <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-10 w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-white/60 bg-white">
      <img src={src} alt="Curlboo" className="w-full h-full object-contain"/>
    </div>
  );
  return(
    <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10 w-32 h-32 rounded-3xl overflow-hidden shadow-xl border-2 border-white/60 bg-white">
      <img src={src} alt="Curlboo" className="w-full h-full object-contain"/>
    </div>
  );
}

export default function Onboarding({onComplete,lang:initialLang,signUp,signIn}){
  const[step,setStep]=useState(0);
  const[lang,setLang]=useState(initialLang||'zh');
  const[grade,setGrade]=useState(null);
  const[selectedOpt,setSelectedOpt]=useState(null);
  const[wasCorrect,setWasCorrect]=useState(null);
  const[authMode,setAuthMode]=useState(null); // null | 'signup' | 'login'
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[error,setError]=useState('');
  const[loading,setLoading]=useState(false);
  const L=(key,...args)=>t(lang,key,...args);

  useState(()=>{track('onboarding_start')});

  const goBack=()=>{
    if(step===5&&authMode){setAuthMode(null);setError('');return;}
    if(step===3){setSelectedOpt(null);setWasCorrect(null);}
    if(step>0)setStep(step-1);
  };
  const pickLang=(l)=>{setLang(l);localStorage.setItem('lang',l);track('onboarding_language',{language:l});setStep(1);};
  const pickGrade=(g)=>{setGrade(g);track('onboarding_grade',{grade:g});setTimeout(()=>setStep(3),400);};
  const answerQ=(opt)=>{
    if(selectedOpt!==null)return;
    var sq=SAMPLE_QS[grade||4];
    var correct=opt===sq.a;
    setSelectedOpt(opt);
    setWasCorrect(correct);
    track('onboarding_question_answered',{grade:grade||4,correct:correct});
    setTimeout(()=>setStep(4),900);
  };
  const finish=(authData)=>{
    localStorage.setItem('onboarding_done','true');
    if(grade)localStorage.setItem('selected_grade',String(grade));
    localStorage.setItem('app_language',lang);
    if(!authData)track('onboarding_guest');
    onComplete(authData,lang,grade);
  };
  const handleAuth=async(e)=>{
    e.preventDefault();
    setError('');setLoading(true);
    try{
      if(authMode==='signup'){
        var result=await signUp(email,password);
        track('onboarding_signup');
        finish(result||true);
      }else{
        var result=await signIn(email,password);
        track('onboarding_login');
        finish(result||true);
      }
    }catch(err){setError(err.message);}
    finally{setLoading(false);}
  };

  var sq=SAMPLE_QS[grade||4];
  var showCard=step>=1;
  var cardPt=step===3?'pt-16':step===1?'pt-0':step===5&&authMode?'pt-8':'pt-20';

  return(
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-5">

      {/* Top progress bar — steps 1-5 */}
      {step>=1&&step<=5&&(
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-gray-200 z-50">
          <div className="h-full bg-[#533afd] rounded-full transition-all duration-500" style={{width:(step/5*100)+'%'}}/>
        </div>
      )}

      {/* Back button — light ghost on white */}
      {step>=1&&step<=5&&(
        <button onClick={goBack} aria-label="Back"
          className="fixed top-3 left-4 p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-gray-100 text-gray-700 active:bg-gray-200 active:scale-[0.97] transition-all flex items-center justify-center z-50">
          <ArrowLeft size={20}/>
        </button>
      )}

      {/* ═══ Step 0: Language ═══ */}
      {step===0&&(
        <AnimatePresence mode="wait">
          <motion.div key="lang" variants={slideVariants} initial="enter" animate="center" exit="exit"
            className="flex flex-col items-center text-center w-full max-w-sm px-2">

            {/* Hero image */}
            <motion.div
              initial={{opacity:0,y:20,scale:0.95}} animate={{opacity:1,y:0,scale:1}}
              transition={{delay:0.1,type:'spring',stiffness:160,damping:18}}
              className="w-full mb-4 mt-4 rounded-3xl overflow-hidden"
              style={{maxHeight:'42vh',boxShadow:'0 16px 48px rgba(180,80,0,0.22)'}}
            >
              <img src="/onboarding-hero.png" alt="Curlboo Bear and Friends" className="w-full h-full object-cover object-top"/>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
              className="text-4xl font-black text-gray-800 mb-1"
            >Maths Quests</motion.h1>
            <motion.p
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}
              className="text-gray-500 text-sm font-semibold mb-10 tracking-wide"
            >Curlboo Bear &amp; Friends</motion.p>

            {/* Language buttons */}
            <motion.div
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.45}}
              className="flex gap-3 w-full"
            >
              <motion.button whileTap={{scale:0.94}} onClick={()=>pickLang('zh')}
                className="flex-1 py-5 rounded-3xl text-center cursor-pointer transition-all duration-200 active:scale-95"
                style={{background:'rgba(255,255,255,0.92)',boxShadow:'0 8px 24px rgba(255,120,50,0.25)'}}>
                <span className="text-3xl block mb-0.5 font-black text-gray-800">中</span>
                <span className="text-xs font-bold text-gray-500">中文</span>
              </motion.button>
              <motion.button whileTap={{scale:0.94}} onClick={()=>pickLang('en')}
                className="flex-1 py-5 rounded-3xl text-center cursor-pointer transition-all duration-200 active:scale-95"
                style={{background:'rgba(255,255,255,0.92)',boxShadow:'0 8px 24px rgba(255,120,50,0.25)'}}>
                <span className="text-3xl block mb-0.5 font-black text-gray-800">En</span>
                <span className="text-xs font-bold text-gray-500">English</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* ═══ Steps 1-5: card layout ═══ */}
      {showCard&&(
        <div className="relative w-full max-w-sm">

          {/* Mascot overlapping card top — not shown for step 1 (has banner image instead) */}
          {(step!==5||!authMode)&&step!==1?(
            step===3?(
              <CardMascot write small/>
            ):(
              <CardMascot happy={step===4&&!!wasCorrect}/>
            )
          ):null}

          {/* White floating card */}
          <div className={"bg-white rounded-3xl shadow-2xl px-6 pb-8 "+cardPt}>
            <AnimatePresence mode="wait">

              {/* Step 1: Value splash */}
              {step===1&&(
                <motion.div key="value" variants={slideVariants} initial="enter" animate="center" exit="exit"
                  className="flex flex-col items-center text-center">
                  {/* Hero banner — bleeds to card edges */}
                  <div className="-mx-6 w-[calc(100%+3rem)] mb-5 rounded-t-3xl overflow-hidden">
                    <img src="/onboarding-hero.png" alt="Curlboo Bear and Friends" className="w-full block"/>
                  </div>
                  <h1 className="text-2xl font-black text-gray-800 mb-5 leading-snug">{L('obMathMadeFun')}</h1>
                  <div className="grid grid-cols-3 gap-3 w-full mb-6">
                    {[
                      {ic:'🎯',tk:'obSmartQuestions'},
                      {ic:'🧠',tk:'obTrapTraining'},
                      {ic:'📊',tk:'obTrackScore'},
                    ].map((c,i)=>(
                      <motion.div key={c.tk} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.1}}
                        className="bg-orange-50 rounded-2xl p-3 flex flex-col items-center gap-1.5">
                        <span className="text-3xl">{c.ic}</span>
                        <span className="text-xs font-bold text-gray-600 leading-tight">{L(c.tk)}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button whileTap={{scale:0.97}} onClick={()=>setStep(2)}
                    className="w-full py-4 rounded-full font-black text-lg text-white shadow-md bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center gap-2">
                    {L('obNext')}<ChevronRight size={20}/>
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Grade picker */}
              {step===2&&(
                <motion.div key="grade" variants={slideVariants} initial="enter" animate="center" exit="exit"
                  className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-black text-gray-800 mb-5">{L('obWhichGrade')}</h1>
                  <div className="grid grid-cols-3 gap-3 w-full mb-3">
                    {[1,2,3,4,5,6].map((g,i)=>(
                      <motion.button key={g} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
                        whileTap={{scale:0.95}}
                        onClick={()=>pickGrade(g)}
                        className={"py-4 rounded-2xl border-2 shadow-sm text-center transition-all "+(grade===g?'border-orange-500 bg-orange-50 ring-2 ring-orange-200':'border-gray-200 bg-white active:bg-gray-50')}>
                        <span className="text-xl font-black text-gray-800 block">P{g}</span>
                        <span className="text-xs font-bold text-gray-400">{lang==='zh'?`小${GRADE_NAMES[g]}`:`Grade ${g}`}</span>
                      </motion.button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {grade&&(
                      <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
                        className="flex items-center gap-2 bg-amber-100 border border-amber-200 px-4 py-2 rounded-full">
                        <span className="text-xl">🐻</span>
                        <span className="text-sm font-bold text-amber-700">{L('obGradeReact',grade)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Step 3: Try one question */}
              {step===3&&(
                <motion.div key="tryq" variants={slideVariants} initial="enter" animate="center" exit="exit"
                  className="flex flex-col items-center text-center">
                  <h1 className="text-xl font-black text-gray-800 mb-0.5">{L('obLetsTryOne')}</h1>
                  <p className="text-xs font-bold text-gray-400 mb-4">P{grade}</p>
                  <div className="w-full mb-4">
                    <p className="text-2xl font-black text-gray-800 mb-4 text-center">{sq.q}</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {sq.opts.map((opt,i)=>{
                        var isCorrectAnswer=opt===sq.a;
                        var isThisSelected=selectedOpt===opt;
                        var cls=selectedOpt===null
                          ?'border-gray-200 bg-gray-50 active:bg-orange-50 active:border-orange-300'
                          :isCorrectAnswer?'border-emerald-400 bg-emerald-50 text-emerald-700'
                          :isThisSelected?'border-red-400 bg-red-50 text-red-600'
                          :'border-gray-200 bg-gray-100 text-gray-400';
                        return(
                          <motion.button key={i} whileTap={selectedOpt===null?{scale:0.97}:{}}
                            initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.06}}
                            onClick={()=>answerQ(opt)} disabled={selectedOpt!==null}
                            className={"py-4 px-3 rounded-2xl border-2 font-bold text-lg transition-all duration-200 "+cls}>
                            {opt}
                            {selectedOpt!==null&&isCorrectAnswer&&<span className="ml-1">✓</span>}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  <AnimatePresence>
                    {selectedOpt!==null&&(
                      wasCorrect?(
                        <motion.div key="fb" initial={{scale:0}} animate={{scale:[0,1.3,1]}} transition={{duration:0.4}}
                          className="text-4xl">🎉</motion.div>
                      ):(
                        <motion.div key="fb" initial={{x:0}} animate={{x:[0,-12,12,-8,8,-4,4,0]}} transition={{duration:0.5}}
                          className="text-4xl">💪</motion.div>
                      )
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Step 4: Result */}
              {step===4&&(
                <motion.div key="result" variants={slideVariants} initial="enter" animate="center" exit="exit"
                  className="flex flex-col items-center text-center">
                  <motion.div initial={{scale:0}} animate={{scale:[0,1.3,1]}} transition={{duration:0.4}}
                    className="text-6xl mb-3">{wasCorrect?'🎉':'💪'}</motion.div>
                  <h1 className="text-3xl font-black text-gray-800 mb-2">
                    {wasCorrect?L('obCorrect'):L('obGreatTry')}
                  </h1>
                  <p className="text-sm text-gray-500 mb-7 leading-relaxed px-2">
                    {wasCorrect?L('obYoureReady'):L('obThatsWhyWePractice')}
                  </p>
                  <motion.button whileTap={{scale:0.97}} onClick={()=>setStep(5)}
                    className="w-full py-4 rounded-full font-black text-lg text-white shadow-md bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center gap-2">
                    {L('obLetsGo')}<ChevronRight size={20}/>
                  </motion.button>
                </motion.div>
              )}

              {/* Step 5: Auth gate */}
              {step===5&&(
                <motion.div key="auth" variants={slideVariants} initial="enter" animate="center" exit="exit"
                  className="flex flex-col items-center text-center w-full">

                  {!authMode?(
                    <>
                      <h1 className="text-2xl font-black text-gray-800 mb-5">{L('obSaveProgress')}</h1>
                      <div className="w-full space-y-2.5 mb-6">
                        {[
                          {ic:'✅',tk:'obBenefit1'},
                          {ic:'✅',tk:'obBenefit2'},
                          {ic:'✅',tk:'obBenefit3'},
                        ].map((b,i)=>(
                          <motion.div key={b.tk} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:0.15+i*0.1}}
                            className="flex items-center gap-3 bg-orange-50 rounded-2xl px-4 py-3.5 text-left">
                            <span className="text-base">{b.ic}</span>
                            <span className="text-sm font-bold text-gray-700">{L(b.tk)}</span>
                          </motion.div>
                        ))}
                      </div>
                      <motion.button whileTap={{scale:0.97}} onClick={()=>setAuthMode('signup')}
                        className="w-full py-4 rounded-full font-black text-lg text-white shadow-md bg-gradient-to-r from-orange-500 to-amber-500 mb-3">
                        {L('obCreateAccount')}
                      </motion.button>
                      <button onClick={()=>finish(null)}
                        className="text-sm text-gray-400 underline py-2 active:text-gray-600 transition-all">
                        {L('obContinueGuest')}
                      </button>
                      <div className="mt-4 pt-4 border-t border-gray-100 w-full">
                        <p className="text-xs text-gray-400">
                          {L('obHaveAccount')}{' '}
                          <button onClick={()=>setAuthMode('login')} className="text-orange-500 font-bold hover:underline">{L('obLogIn')}</button>
                        </p>
                      </div>
                    </>
                  ):(
                    <>
                      <h1 className="text-2xl font-black text-gray-800 mb-5">
                        {authMode==='signup'?L('obSignUp'):L('obLogIn')}
                      </h1>
                      <form onSubmit={handleAuth} className="w-full space-y-3 mb-4">
                        <input type="email" placeholder={L('obEmail')} value={email}
                          onChange={e=>setEmail(e.target.value)} required aria-label="Email"
                          className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-sm"/>
                        <input type="password" placeholder={L('obPassword')} value={password}
                          onChange={e=>setPassword(e.target.value)} required minLength={6} aria-label="Password"
                          className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-sm"/>
                        {error&&<p className="text-red-500 text-xs bg-red-50 rounded-xl p-2.5">{error}</p>}
                        <motion.button whileTap={{scale:0.97}} type="submit" disabled={loading}
                          className="w-full py-4 rounded-full font-black text-base text-white shadow-md bg-gradient-to-r from-orange-500 to-amber-500 disabled:opacity-50 flex items-center justify-center">
                          {loading?<Loader2 size={18} className="animate-spin"/>:authMode==='signup'?L('obSignUp'):L('obLogIn')}
                        </motion.button>
                      </form>
                      <div className="flex flex-col items-center gap-2">
                        <button onClick={()=>{setAuthMode(null);setError('');}}
                          className="text-sm text-gray-400 underline active:text-gray-600 transition-all">
                          {lang==='zh'?'返回':'Back'}
                        </button>
                        <button onClick={()=>finish(null)}
                          className="text-xs text-gray-300 underline py-1 active:text-gray-500 transition-all">
                          {L('obContinueGuest')}
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Progress dots — indigo on white bg */}
      <OnboardingProgress current={step}/>

    </div>
  );
}
