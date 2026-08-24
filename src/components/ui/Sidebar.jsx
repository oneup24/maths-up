import { Home, Compass, BarChart2, User, LogOut } from 'lucide-react';

const TABS = [
  { id: 'home',    Icon: Home,      zh: '主頁', en: 'Home'    },
  { id: 'quests',  Icon: Compass,   zh: '任務', en: 'Quests'  },
  { id: 'history', Icon: BarChart2, zh: '記錄', en: 'History' },
  { id: 'profile', Icon: User,      zh: '我的', en: 'Profile' },
];

export default function Sidebar({ activeTab, onTab, lang = 'zh', user, onSignOut }) {
  return (
    <aside
      className="hidden lg:flex flex-col w-60 shrink-0 sticky top-0 h-screen z-30"
      style={{
        background: 'rgba(255,252,248,0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,200,150,0.45)',
        boxShadow: '4px 0 24px rgba(255,140,60,0.07)',
      }}
    >
      {/* Brand */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-base shadow-md shrink-0"
            style={{
              background: 'linear-gradient(135deg,#FF8C42,#FFA850)',
              boxShadow: '0 4px 12px rgba(255,140,66,0.38)',
            }}
          >
            M
          </div>
          <div>
            <div className="font-black text-gray-800 text-[15px] leading-tight tracking-tight">Maths-Up</div>
            <div className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase">OneUp24</div>
          </div>
        </div>
      </div>

      <div className="mx-4 h-px bg-gradient-to-r from-orange-200/80 via-orange-100/60 to-transparent mb-2" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5">
        {TABS.map(({ id, Icon, zh, en }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              className={`relative w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                active
                  ? 'text-orange-700 font-bold'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/70 font-semibold'
              }`}
              style={active ? {
                background: 'linear-gradient(135deg,rgba(255,140,66,0.13),rgba(255,168,80,0.07))',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 8px rgba(255,140,66,0.09)',
              } : {}}
            >
              {active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                  style={{ background: 'linear-gradient(180deg,#FF8C42,#FFB347)' }}
                />
              )}
              <Icon
                size={19}
                style={active ? { color: '#FF7A2A' } : {}}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className="text-sm">{lang === 'zh' ? zh : en}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="px-3 pb-4 pt-1">
        {user ? (
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
            style={{
              background: 'rgba(255,140,66,0.07)',
              border: '1px solid rgba(255,200,150,0.35)',
            }}
          >
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0"
              style={{
                background: 'linear-gradient(135deg,#FF8C42,#FFA850)',
                boxShadow: '0 2px 6px rgba(255,140,66,0.3)',
              }}
            >
              {(user.email?.[0] || 'U').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-gray-700 truncate leading-tight">{user.email}</div>
              <div className="text-[9px] text-gray-400 font-medium">{lang === 'zh' ? '已登入' : 'Signed in'}</div>
            </div>
            <button
              onClick={onSignOut}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shrink-0 cursor-pointer"
              aria-label={lang === 'zh' ? '登出' : 'Sign out'}
            >
              <LogOut size={13} />
            </button>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
            style={{
              background: 'rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div className="w-7 h-7 rounded-xl bg-gray-200 flex items-center justify-center shrink-0">
              <User size={13} className="text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-gray-500">{lang === 'zh' ? '訪客模式' : 'Guest Mode'}</div>
              <div className="text-[9px] text-gray-400">Guest</div>
            </div>
          </div>
        )}
        <div className="mt-2 px-1">
          <div className="text-[10px] text-gray-300 font-medium">v1.2-beta</div>
        </div>
      </div>
    </aside>
  );
}
