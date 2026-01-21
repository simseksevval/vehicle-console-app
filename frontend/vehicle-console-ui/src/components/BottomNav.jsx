import { useNavigate, useLocation } from 'react-router-dom';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', icon: '⊞', label: 'DASHBOARD', disabled: true },
    { id: 'controls', icon: '≡', label: 'QUICK CONTROLS', disabled: true },
    { id: 'navigation', icon: '📍', label: 'NAVIGATION', path: '/map' },
    { id: 'phone', icon: '📱', label: 'PHONE', disabled: true },
    { id: 'media', icon: '▶', label: 'MEDIA', disabled: true },
    { id: 'settings', icon: '🚙', label: 'SETTINGS', path: '/settings' },
  ];

  return (
    <div className="bg-black border-t border-gray-800">
      <div className="flex items-center justify-around py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => !item.disabled && navigate(item.path)}
              disabled={item.disabled}
              className={`flex flex-col items-center gap-1 transition-colors ${
                item.disabled 
                  ? 'text-gray-700 cursor-not-allowed' 
                  : isActive 
                    ? 'text-vehicle-blue' 
                    : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNav;