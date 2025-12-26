import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GamificationProvider } from './context/GamificationContext';
import { GlobalProvider } from './context/GlobalContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import BootSequence from './components/BootSequence';
import ThemeSwitcher from './components/ThemeSwitcher';
import { soundManager } from './utils/SoundManager';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    // Initialize sound manager on user interaction (handled in ThemeSwitcher or first click)
    // For auto-play boot sound, we might need user interaction first, but we can try
    const handleInteraction = () => {
        soundManager.init();
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('keydown', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
  }, []);

  const handleBootComplete = () => {
    setShowBoot(false);
    soundManager.playBoot();
  };

  return (
    <>
      {showBoot && <BootSequence onComplete={handleBootComplete} />}
      {!showBoot && (
        <GlobalProvider>
          <GamificationProvider>
            <Router>
              <div className="app-container">
                <ThemeSwitcher />
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </div>
            </Router>
          </GamificationProvider>
        </GlobalProvider>
      )}
    </>
  );
}

export default App;
