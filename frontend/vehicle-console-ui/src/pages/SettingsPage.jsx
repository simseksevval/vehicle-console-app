import { useState, useEffect } from 'react';
import { getSettings } from '../services/api';
import StatusBar from '../components/StatusBar';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import LightsControl from '../components/LightsControl';

function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = () => {
    getSettings()
      .then(response => {
        setSettings(response.data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching settings:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-vehicle-dark flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vehicle-dark flex flex-col">
      {/* Üst Bar */}
      <StatusBar />
      
      {/* Ana içerik */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sol Sidebar */}
        <Sidebar />
        
        <div className="flex-1 bg-vehicle-dark p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Lights</h2>
          
          {settings && (
            <LightsControl 
              settings={settings} 
              onUpdate={fetchSettings}
            />
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}

export default SettingsPage;