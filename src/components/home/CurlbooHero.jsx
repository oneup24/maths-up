export default function CurlbooHero({ name, streak, isBirthday, lang }) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-xl mb-4"
      style={{
        background: 'linear-gradient(135deg,#FF8C42 0%,#FFA850 45%,#FFB347 100%)',
        minHeight: '160px',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/10"/>
      <div className="absolute -bottom-4 left-16 w-16 h-16 rounded-full bg-white/10"/>

      {/* Left: text */}
      <div className="absolute left-0 top-0 bottom-0 w-[55%] flex flex-col justify-center pl-5 py-5 z-10">
        {name && (
          <p className="text-white/90 font-bold text-xs mb-0.5">
            {lang === 'en' ? `Hi, ${name}!` : `你好，${name}！`}
          </p>
        )}
        <h2 className="text-white font-black text-[26px] leading-tight tracking-tight drop-shadow-sm">
          數學特訓
        </h2>
        <p className="text-white/80 text-[11px] font-semibold mb-3 tracking-wide">
          Maths Quests
        </p>

        <div className="flex flex-wrap gap-1.5">
          {streak > 0 && (
            <span className="inline-flex items-center gap-1 bg-white/25 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/30">
              🔥 {streak}{lang === 'en' ? 'd streak' : '日連續'}
            </span>
          )}
          {isBirthday && (
            <span className="inline-flex items-center gap-1 bg-white/25 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/30">
              🎂 {lang === 'en' ? 'Happy Birthday!' : '生日快樂！'}
            </span>
          )}
        </div>
      </div>

      {/* Right: mascot */}
      <div className="absolute right-0 bottom-0 w-[50%] h-[130%] flex items-end justify-end pr-1">
        <img
          src="/curlboo_herobanner.png"
          alt="Curlboo Bear and Fluffy Bunny"
          className="w-full h-full object-contain object-bottom drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
