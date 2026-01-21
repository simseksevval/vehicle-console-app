import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getActiveRoute } from '../services/api';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';

// Leaflet marker icon fix (Vite ile gerekli)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapPage() {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aktif rotayı API'den çek
    getActiveRoute()
      .then(response => {
        setRoute(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching route:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-vehicle-dark flex items-center justify-center text-white">
        Loading map...
      </div>
    );
  }

  if (!route || !route.points || route.points.length === 0) {
    return (
      <div className="min-h-screen bg-vehicle-dark flex items-center justify-center text-white">
        No active route found
      </div>
    );
  }

  // Rota koordinatlarını hazırla
  const coordinates = route.points.map(point => [point.latitude, point.longitude]);
  
  // Harita merkezi (ilk nokta)
  const center = coordinates[0];

  // Araç konumu (ilk nokta)
  const vehiclePosition = coordinates[0];

  return (
    <div className="h-screen flex flex-col bg-vehicle-dark">
      {/* Üst Bar */}
      <StatusBar />

      {/* Harita */}
      <div className="flex-1 relative">
        {/* Rota ismi (sol üst) */}
        <div className="absolute top-4 left-4 z-[1000] bg-black/80 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <span>{route.name}</span>
          <button className="text-gray-400 hover:text-white">✕</button>
        </div>

        {/* Zoom butonları (sağ) */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-[1000] flex flex-col gap-2">
          <button className="bg-vehicle-gray/90 text-white w-10 h-10 rounded-lg hover:bg-vehicle-gray">
            +
          </button>
          <button className="bg-vehicle-gray/90 text-white w-10 h-10 rounded-lg hover:bg-vehicle-gray">
            −
          </button>
        </div>

        {/* Leaflet Harita */}
        <MapContainer
          center={center}
          zoom={13}
          className="h-full w-full"
          zoomControl={false}
        >
          {/* OpenStreetMap katmanı (dark theme) */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* Rota çizgisi (mavi) */}
          <Polyline
            positions={coordinates}
            pathOptions={{
              color: '#5B7FFF',
              weight: 6,
              opacity: 0.9,
            }}
          />

          {/* Rota noktaları */}
          {route.points.map((point, index) => (
            <Marker
              key={point.id}
              position={[point.latitude, point.longitude]}
            >
              <Popup>
                Point {point.order} of {route.points.length}
              </Popup>
            </Marker>
          ))}

          {/* Araç konumu (ilk nokta - farklı ikon) */}
          <Marker
            position={vehiclePosition}
            icon={L.divIcon({
              className: 'custom-vehicle-marker',
              html: '<div style="background: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">📍</div>',
              iconSize: [30, 30],
            })}
          >
            <Popup>Vehicle Position</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Alt Nav */}
      <BottomNav />
    </div>
  );
}

export default MapPage;