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
      className="hidden lg:flex flex-col w-60 shrink-0 sticky top-0 h-screen z-30 bg-white"
      style={{ borderRight: '1px solid #e8e8e8' }}
    >
      {/* Brand */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base shrink-0"
            style={{ background: '#111' }}
          >
            M
          </div>
          <div>
            <div className="font-black text-sm leading-tight" style={{ color: '#111', letterSpacing: '-0.3px' }}>Maths-Up</div>
            <div className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: '#bbb' }}>OneUp24</div>
          </div>
        </div>
      </div>

      <div className="mx-4 h-px mb-2" style={{ background: '#e8e8e8' }} />

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5">
        {TABS.map(({ id, Icon, zh, en }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              className="relative w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-colors duration-150 cursor-pointer"
              style={active
                ? { background: '#f5f5f5', color: '#111' }
                : { color: '#aaa' }
              }
            >
              {active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                  style={{ background: '#111' }}
                />
              )}
              <Icon
                size={18}
                strokeWidth={active ? 2.5 : 1.8}
                style={{ color: active ? '#111' : '#bbb' }}
              />
              <span className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>
                {lang === 'zh' ? zh : en}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="px-3 pb-4 pt-1">
        {user ? (
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
            style={{ background: '#f9f9f9', border: '1px solid #e8e8e8' }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0"
              style={{ background: '#111' }}
            >
              {(user.email?.[0] || 'U').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold truncate leading-tight" style={{ color: '#333' }}>{user.email}</div>
              <div className="text-[9px] font-medium" style={{ color: '#bbb' }}>{lang === 'zh' ? '已登入' : 'Signed in'}</div>
            </div>
            <button
              onClick={onSignOut}
              className="p-1.5 rounded-lg transition-colors duration-150 shrink-0 cursor-pointer hover:bg-red-50"
              style={{ color: '#ccc' }}
              aria-label={lang === 'zh' ? '登出' : 'Sign out'}
            >
              <LogOut size={13} />
            </button>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
            style={{ background: '#f9f9f9', border: '1px solid #e8e8e8' }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#f0f0f0' }}>
              <User size={13} style={{ color: '#bbb' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold" style={{ color: '#888' }}>{lang === 'zh' ? '訪客模式' : 'Guest Mode'}</div>
              <div className="text-[9px]" style={{ color: '#bbb' }}>Guest</div>
            </div>
          </div>
        )}
        <div className="mt-2 px-1">
          <div className="text-[10px] font-medium" style={{ color: '#ddd' }}>v1.2-beta</div>
        </div>
      </div>
    </aside>
  );
}
