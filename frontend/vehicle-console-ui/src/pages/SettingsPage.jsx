import { useState, useEffect } from 'react';
import { getSettings, updateSetting } from '../services/api';
import StatusBar from '../components/StatusBar';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API'den ayarları çek
    getSettings()
      .then(response => {
        setSettings(response.data[0]); // İlk ayar kaydı
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching settings:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-vehicle-dark flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-vehicle-dark flex flex-col">
      {/* Üst Bar */}
      <StatusBar />
      
      {/* Ana içerik */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sol Sidebar */}
        <Sidebar />
        
        {/* Sağ İçerik (Lights) */}
        <div className="flex-1 bg-vehicle-dark p-8">
          <h2 className="text-3xl font-bold text-white mb-8">Lights</h2>
          
          {/* Buraya Lights içeriği gelecek */}
          <div className="text-white">
            <p>Headlights: {settings?.headlights}</p>
            <p>Fog Lights: {settings?.fogLights}</p>
            <p>Angle: {settings?.angle}</p>
          </div>
        </div>
      </div>
      
      {/* Alt Nav */}
      <BottomNav />
    </div>
  );
}

export default SettingsPage;