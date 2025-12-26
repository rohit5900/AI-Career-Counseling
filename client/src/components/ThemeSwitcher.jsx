import React from 'react';
import { soundManager } from '../utils/SoundManager';
import { useGlobal } from '../context/GlobalContext';

const ThemeSwitcher = () => {
    const { brutalMode, toggleBrutalMode } = useGlobal();

    return (
        <div className="retro-card" style={{ 
            position: 'fixed', 
            bottom: '1rem', 
            right: '1rem', 
            zIndex: 1000,
            padding: '10px',
            backgroundColor: 'var(--bg-color)',
            border: '2px solid var(--border-color)'
        }}>
            <h5 className="text-center" style={{ fontSize: '0.8rem', marginBottom: '10px' }}>SYSTEM_OPTS</h5>
            
            <div style={{ textAlign: 'center', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                <button 
                    onClick={() => soundManager.toggleMute()} 
                    className="retro-btn-outline"
                    style={{ fontSize: '0.7rem', padding: '2px 5px' }}
                >
                    🔊 SFX
                </button>
                <button 
                    onClick={toggleBrutalMode} 
                    className="retro-btn-outline"
                    style={{ fontSize: '0.7rem', padding: '2px 5px', color: brutalMode ? 'red' : 'inherit', borderColor: brutalMode ? 'red' : 'inherit' }}
                >
                    {brutalMode ? '😈 ON' : '😈 OFF'}
                </button>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
