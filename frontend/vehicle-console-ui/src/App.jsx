import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';
import MapPage from './pages/MapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/settings" replace />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;