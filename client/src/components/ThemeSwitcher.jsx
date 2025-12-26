import React from 'react';
import { soundManager } from '../utils/SoundManager';
import { useGlobal } from '../context/GlobalContext';

const ThemeSwitcher = () => {
    const { brutalMode, toggleBrutalMode } = useGlobal();

    const themes = {
        green: {
            '--bg-color': '#000000',
            '--text-color': '#33ff00',
            '--accent-color': '#33ff00',
            '--border-color': '#33ff00',
            '--secondary-color': '#1a8000'
        },
        amber: {
            '--bg-color': '#1a1000',
            '--text-color': '#ffb000',
            '--accent-color': '#ffb000',
            '--border-color': '#ffb000',
            '--secondary-color': '#805800'
        },
        blue: {
            '--bg-color': '#00001a',
            '--text-color': '#00aaff',
            '--accent-color': '#00aaff',
            '--border-color': '#00aaff',
            '--secondary-color': '#005580'
        }
    };

    const applyTheme = (themeName) => {
        const theme = themes[themeName];
        const root = document.documentElement;
        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        soundManager.playKeypress();
    };

    return (
        <div className="retro-card" style={{ 
            position: 'fixed', 
            bottom: '1rem', 
            right: '1rem', 
            zIndex: 1000,
            padding: '10px',
            backgroundColor: 'black'
        }}>
            <h5 className="text-center" style={{ fontSize: '0.8rem', marginBottom: '10px' }}>THEME_SELECT</h5>
            <div className="flex gap-4">
                <button 
                    onClick={() => applyTheme('green')}
                    style={{ width: '20px', height: '20px', backgroundColor: '#33ff00', border: '1px solid white', padding: 0 }}
                    title="Green CRT"
                />
                <button 
                    onClick={() => applyTheme('amber')}
                    style={{ width: '20px', height: '20px', backgroundColor: '#ffb000', border: '1px solid white', padding: 0 }}
                    title="Amber Phosphor"
                />
                <button 
                    onClick={() => applyTheme('blue')}
                    style={{ width: '20px', height: '20px', backgroundColor: '#00aaff', border: '1px solid white', padding: 0 }}
                    title="IBM Blue"
                />
            </div>
            <div style={{ marginTop: '10px', textAlign: 'center', display: 'flex', gap: '5px', justifyContent: 'center' }}>
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
