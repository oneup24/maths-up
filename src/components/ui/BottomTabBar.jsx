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
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white"
      style={{
        borderTop: '1px solid #e8e8e8',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex h-[60px] px-1">
        {TABS.map(({ id, Icon, zh, en }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 cursor-pointer transition-opacity duration-150"
            >
              <Icon
                size={21}
                strokeWidth={active ? 2.5 : 1.8}
                style={{ color: active ? '#111' : '#bbb' }}
              />
              <span
                className="text-[10px] font-bold"
                style={{ color: active ? '#111' : '#bbb' }}
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
