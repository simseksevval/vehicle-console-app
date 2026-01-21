function StatusBar() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  const date = now.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-black text-white text-sm">
      {/* Sol: Tarih ve hava */}
      <div className="flex items-center gap-4">
        <span>{date}</span>
        <span>☀ 38°C</span>
      </div>
      
      {/* Orta: Saat */}
      <div className="text-base font-medium">{time}</div>
      
      {/* Sağ: İkonlar */}
      <div className="flex items-center gap-3 text-xs">
        <span>🔒</span>
        <span>📶 4G</span>
        <span>📍 128 mi</span>
        <span>🔋</span>
      </div>
    </div>
  );
}

export default StatusBar;