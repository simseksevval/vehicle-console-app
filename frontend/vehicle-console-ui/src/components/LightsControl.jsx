import { useState, useEffect } from 'react';
import { updateSetting } from '../services/api';

function LightsControl({ settings, onUpdate }) {
  const [headlights, setHeadlights] = useState(settings?.headlights || 'Auto');
  const [fogLights, setFogLights] = useState(settings?.fogLights || 'Front Fog');
  const [angle, setAngle] = useState(settings?.angle || 11);

  // Ayar değişince API'ye kaydet
  const handleUpdate = async (field, value) => {
    try {
      await updateSetting(settings.id, {
        ...settings,
        [field]: value
      });
      onUpdate && onUpdate();
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  };

  const headlightOptions = ['Off', 'Parking', 'On', 'Auto'];
  const fogLightOptions = ['Front Fog', 'Back Fog'];

  return (
    <div className="flex gap-8">
      {/* Sol: Kontroller */}
      <div className="flex-1 space-y-8">
        {/* Headlights */}
        <div>
          <h3 className="text-white text-lg mb-4">Headlights</h3>
          <div className="flex gap-3">
            {headlightOptions.map(option => (
              <button
                key={option}
                onClick={() => {
                  setHeadlights(option);
                  handleUpdate('headlights', option);
                }}
                className={`px-6 py-3 rounded-full transition-all ${
                  headlights === option
                    ? 'bg-vehicle-blue text-white'
                    : 'bg-vehicle-gray text-gray-400 hover:bg-vehicle-gray/70'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Fog Lights */}
        <div>
          <h3 className="text-white text-lg mb-4">Fog Lights</h3>
          <div className="flex gap-3">
            {fogLightOptions.map(option => (
              <button
                key={option}
                onClick={() => {
                  setFogLights(option);
                  handleUpdate('fogLights', option);
                }}
                className={`px-6 py-3 rounded-full transition-all ${
                  fogLights === option
                    ? 'bg-vehicle-blue text-white'
                    : 'bg-vehicle-gray text-gray-400 hover:bg-vehicle-gray/70'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Angle Slider */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg">Angle</h3>
            <span className="text-vehicle-blue text-2xl font-bold">{angle}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={angle}
            onChange={(e) => {
              const newAngle = parseInt(e.target.value);
              setAngle(newAngle);
            }}
            onMouseUp={(e) => {
              handleUpdate('angle', parseInt(e.target.value));
            }}
            onTouchEnd={(e) => {
              handleUpdate('angle', parseInt(e.target.value));
            }}
            className="w-full h-2 bg-vehicle-gray rounded-lg appearance-none cursor-pointer accent-vehicle-blue"
          />
          <div className="flex justify-between text-gray-500 text-sm mt-2">
            <span>0°</span>
            <span>100°</span>
          </div>
        </div>
      </div>

      {/* Sağ: Araç Görseli */}
      <div className="w-80 flex items-center justify-center">
        <div className="relative">
          {/* Basit araç placeholder */}
          <div className="w-64 h-64 bg-gradient-to-b from-gray-700 to-gray-900 rounded-3xl flex items-center justify-center">
            <div className="text-6xl">🚗</div>
          </div>
          {/* Far göstergesi */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-yellow-400 text-4xl">
            💡
          </div>
        </div>
      </div>
    </div>
  );
}

export default LightsControl;