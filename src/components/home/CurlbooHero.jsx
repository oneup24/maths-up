export default function CurlbooHero({ name, streak, isBirthday, lang }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-4"
      style={{ background: '#f5f5f5', border: '1px solid #e8e8e8', minHeight: '140px' }}
    >
      {/* Left: text */}
      <div className="absolute left-0 top-0 bottom-0 w-[58%] flex flex-col justify-center pl-5 py-5 z-10">
        {name && (
          <p className="text-xs font-medium mb-1" style={{ color: '#999' }}>
            {lang === 'en' ? `Hi, ${name}` : `你好，${name}`}
          </p>
        )}
        <h2 className="font-black text-2xl leading-tight" style={{ color: '#111', letterSpacing: '-0.5px' }}>
          數學特訓
        </h2>
        <p className="text-xs font-medium mt-0.5" style={{ color: '#aaa' }}>
          Maths Quests
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {streak > 0 && (
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: '#111', color: '#fff' }}
            >
              🔥 {streak}{lang === 'en' ? 'd streak' : '日連續'}
            </span>
          )}
          {isBirthday && (
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: '#111', color: '#fff' }}
            >
              🎂 {lang === 'en' ? 'Birthday!' : '生日快樂！'}
            </span>
          )}
        </div>
      </div>

      {/* Right: mascot — dedicated illustrated zone, no overlap with UI */}
      <div className="absolute right-0 bottom-0 w-[48%] h-[130%] flex items-end justify-end pr-1">
        <img
          src="/curlboo_herobanner.png"
          alt="Curlboo Bear"
          className="w-full h-full object-contain object-bottom"
        />
      </div>
    </div>
  );
}
