import { Home, Compass, BarChart2, User } from 'lucide-react';

const TABS = [
  { id: 'home',    Icon: Home,      zh: '主頁', en: 'Home'    },
  { id: 'quests',  Icon: Compass,   zh: '任務', en: 'Quests'  },
  { id: 'history', Icon: BarChart2, zh: '記錄', en: 'History' },
  { id: 'profile', Icon: User,      zh: '我的', en: 'Profile' },
];

export default function BottomTabBar({ activeTab, onTab, lang = 'zh' }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: 'rgba(255,252,248,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,200,150,0.3)',
        boxShadow: '0 -4px 20px rgba(255,140,60,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex h-[62px] px-2">
        {TABS.map(({ id, Icon, zh, en }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 relative cursor-pointer transition-all duration-200"
            >
              {active && (
                <span
                  className="absolute inset-x-2 top-1.5 bottom-1.5 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg,#FF8C42,#FFA850)', opacity: 0.12 }}
                />
              )}
              <Icon
                size={22}
                className={active ? 'relative z-10' : 'text-gray-400'}
                style={active ? { color: '#FF7A2A' } : {}}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span
                className={`text-[10px] font-bold relative z-10 ${active ? '' : 'text-gray-400'}`}
                style={active ? { color: '#FF7A2A' } : {}}
              >
                {lang === 'zh' ? zh : en}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
