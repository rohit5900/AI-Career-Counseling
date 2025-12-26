import React, { useState, useEffect } from 'react';

const BootSequence = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  
  const bootLogs = [
    "INITIALIZING KERNEL...",
    "LOADING MODULES...",
    "MOUNTING VIRTUAL FILESYSTEM...",
    "CHECKING MEMORY INTEGRITY... OK",
    "LOADING USER PROFILE... [ROHIT]",
    "ESTABLISHING SECURE CONNECTION...",
    "AI_CORE: ONLINE",
    "CAREER_ENGINE: STANDBY",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let delay = 0;
    bootLogs.forEach((log, index) => {
      delay += Math.random() * 300 + 100; // Random delay between 100-400ms
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        // Scroll to bottom
        window.scrollTo(0, document.body.scrollHeight);
        
        if (index === bootLogs.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-color)',
      padding: '2rem',
      fontFamily: '"Courier New", Courier, monospace',
      zIndex: 10000,
      overflow: 'hidden'
    }}>
      {logs.map((log, i) => (
        <div key={i} style={{ marginBottom: '0.5rem' }}>
          <span style={{ opacity: 0.7 }}>[{new Date().toLocaleTimeString()}]</span> {log}
        </div>
      ))}
      <div className="retro-cursor" style={{ display: 'inline-block', width: '10px', height: '1.2em', background: '#0f0', verticalAlign: 'text-bottom' }}></div>
    </div>
  );
};

export default BootSequence;
