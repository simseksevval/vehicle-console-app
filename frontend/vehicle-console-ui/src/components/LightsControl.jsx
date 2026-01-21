import { useState, useEffect } from 'react';
import { updateSetting } from '../services/api';

function LightsControl({ settings, onUpdate }) {
	const [headlights, setHeadlights] = useState(settings?.headlights || 'Auto');
	const [fogLights, setFogLights] = useState(settings?.fogLights || 'Front Fog');
	const [angle, setAngle] = useState(settings?.angle || 11);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (settings) {
			setHeadlights(settings.headlights);
			setFogLights(settings.fogLights);
			setAngle(settings.angle);
		}
	}, [settings]);

	const handleUpdate = async (field, value) => {
		setIsSaving(true);
		try {
			await updateSetting(settings.id, { ...settings, [field]: value });
			onUpdate && onUpdate();
			setTimeout(() => setIsSaving(false), 500);
		} catch (error) {
			console.error('Error updating setting:', error);
			setIsSaving(false);
		}
	};

	const headlightOptions = ['Off', 'Parking', 'On', 'Auto'];
	const fogLightOptions = ['Front Fog', 'Back Fog'];

	const isHeadlightsOn = headlights !== 'Off';
	const showBeam = isHeadlightsOn && (headlights === 'On' || headlights === 'Auto');

	return (
		<div className="flex flex-col lg:flex-row gap-12 items-start">
			{/* Kontroller */}
			<div className="flex-1 space-y-8 w-full">
				{/* Saving Indicator */}
				{isSaving && (
					<div className="bg-vehicle-blue/20 border border-vehicle-blue/50 text-vehicle-blue px-4 py-2 rounded-lg text-sm flex items-center gap-2">
						<span className="animate-spin">⟳</span>
						Saving changes...
					</div>
				)}

				{/* Headlights */}
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<div className={`w-10 h-10 rounded-xl bg-vehicle-gray flex items-center justify-center text-2xl ${showBeam ? 'animate-pulse' : ''}`}>
							💡
						</div>
						<div>
							<h3 className="text-white text-xl font-semibold">Headlights</h3>
							<p className="text-gray-500 text-sm">Control front lighting</p>
						</div>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
						{headlightOptions.map(option => (
							<button
								key={option}
								onClick={() => {
									setHeadlights(option);
									handleUpdate('headlights', option);
								}}
								className={`px-5 py-4 rounded-xl font-medium transition-all ${headlights === option
									? 'bg-vehicle-blue text-white shadow-lg shadow-vehicle-blue/30 scale-105'
									: 'bg-vehicle-gray text-gray-400 hover:bg-vehicle-gray/80 hover:text-white'
									}`}
							>
								{option}
							</button>
						))}
					</div>
				</div>

				{/* Fog Lights */}
				<div className={`space-y-4 transition-opacity ${!isHeadlightsOn ? 'opacity-40 pointer-events-none' : ''}`}>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-vehicle-gray flex items-center justify-center text-2xl">
							🌫️
						</div>
						<div>
							<h3 className="text-white text-xl font-semibold">Fog Lights</h3>
							<p className="text-gray-500 text-sm">Enhanced visibility in fog</p>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3">
						{fogLightOptions.map(option => (
							<button
								key={option}
								onClick={() => {
									if (isHeadlightsOn) {
										setFogLights(option);
										handleUpdate('fogLights', option);
									}
								}}
								className={`px-5 py-4 rounded-xl font-medium transition-all ${fogLights === option
									? 'bg-vehicle-blue text-white shadow-lg shadow-vehicle-blue/30'
									: 'bg-vehicle-gray text-gray-400 hover:bg-vehicle-gray/80 hover:text-white'
									}`}
							>
								{option}
							</button>
						))}
					</div>
				</div>

				{/* Angle */}
				<div className={`space-y-4 transition-opacity ${!isHeadlightsOn ? 'opacity-40 pointer-events-none' : ''}`}>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-xl bg-vehicle-gray flex items-center justify-center text-2xl">
								📐
							</div>
							<div>
								<h3 className="text-white text-xl font-semibold">Beam Angle</h3>
								<p className="text-gray-500 text-sm">Adjust light direction</p>
							</div>
						</div>
						<span className="text-vehicle-blue text-4xl font-bold tabular-nums">{angle}°</span>
					</div>

					<div className="space-y-3">
						<input
							type="range"
							min="0"
							max="100"
							value={angle}
							disabled={!isHeadlightsOn}
							onChange={(e) => setAngle(parseInt(e.target.value))}
							onMouseUp={(e) => isHeadlightsOn && handleUpdate('angle', parseInt(e.target.value))}
							onTouchEnd={(e) => isHeadlightsOn && handleUpdate('angle', parseInt(e.target.value))}
							className="w-full h-3 rounded-full appearance-none cursor-pointer"
							style={{
								background: `linear-gradient(to right, #5B7FFF ${angle}%, #2a2a2a ${angle}%)`
							}}
						/>
						<div className="flex justify-between text-gray-500 text-xs">
							<span>Low Beam</span>
							<span>High Beam</span>
						</div>
					</div>
				</div>
			</div>

			{/* Araç Görseli */}
			<div className="lg:w-96 w-full flex items-center justify-center lg:sticky lg:top-8">
				<div className="relative w-80 h-96">
					{/* Araç Container */}
					<div className="absolute inset-0 flex items-center justify-center">
						{/* Araç Gövdesi */}
						<div className="relative w-64 h-80">
							{/* Ana Gövde */}
							<div className="absolute inset-x-8 top-16 bottom-8 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-900 rounded-[2.5rem] shadow-2xl border-2 border-slate-600">

								{/* Araç İkonu (Büyük) */}
								<div className="absolute inset-0 flex items-center justify-center text-8xl filter drop-shadow-lg">
									🚗
								</div>
							</div>

							{/* Far Işıkları - Sol */}
							{showBeam && (
								<>
									<div
										className="absolute bottom-20 left-2 w-24 h-24 bg-yellow-300/50 rounded-full blur-3xl animate-pulse"
										style={{ animationDuration: '2s' }}
									/>
									{/* Far Işıkları - Sağ */}
									<div
										className="absolute bottom-20 right-2 w-24 h-24 bg-yellow-300/50 rounded-full blur-3xl animate-pulse"
										style={{ animationDuration: '2s', animationDelay: '0.3s' }}
									/>
									{/* Işık Koni Efekti */}
									<div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-48 bg-gradient-to-b from-yellow-200/20 to-transparent blur-xl" />
								</>
							)}

							{/* Sis Farı */}
							{isHeadlightsOn && fogLights && (
								<div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-36 h-16 bg-cyan-300/40 rounded-full blur-2xl animate-pulse"
									style={{ animationDuration: '3s' }}
								/>
							)}
						</div>
					</div>

					{/* Status Badge */}
					<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-vehicle-gray/90 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl">
						<div className="flex items-center gap-3">
							<div className={`w-3 h-3 rounded-full ${showBeam ? 'bg-green-400 shadow-lg shadow-green-400/50 animate-pulse' : 'bg-gray-600'}`} />
							<span className="text-sm text-white font-semibold">
								{headlights}
							</span>
							{fogLights && isHeadlightsOn && (
								<>
									<span className="text-gray-500">•</span>
									<span className="text-sm text-cyan-400">{fogLights}</span>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
  );
}

export default LightsControl;