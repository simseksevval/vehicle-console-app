function Sidebar() {
  const menuItems = [
    { icon: '🚗', label: 'Car' },
    { icon: '🎯', label: 'Driving' },
    { icon: '💺', label: 'Seating' },
    { icon: '❄️', label: 'Air' },
    { icon: '💡', label: 'Lights', active: true },
    { icon: '📺', label: 'Display' },
    { icon: '🔧', label: 'Services' },
    { icon: '⬇️', label: 'Software' },
  ];

  return (
    <div className="w-64 bg-vehicle-gray h-full flex flex-col p-6">
      <h2 className="text-2xl font-bold text-white mb-8">Settings</h2>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              item.active
                ? 'bg-vehicle-dark text-white'
                : 'text-gray-500'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;