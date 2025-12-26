import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/SoundManager';

import { useGamification } from '../context/GamificationContext';

const DemoPreview = () => {
    const { resetGamification } = useGamification();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([
        { type: 'system', text: '> SYSTEM_READY' },
        { type: 'info', text: 'Type /HELP for available commands' }
    ]);
    const [blinkSpeed, setBlinkSpeed] = useState(1);

    const handleInputChange = (e) => {
        setInput(e.target.value.toUpperCase());
        soundManager.playKeypress();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            processCommand();
        }
    };

    const processCommand = () => {
        const cmd = input.trim();
        let response = [];
        
        switch(cmd) {
            case '/HELP':
                response = [
                    { type: 'success', text: 'AVAILABLE COMMANDS:' },
                    { type: 'info', text: '  /ANALYZE   - Start career analysis' },
                    { type: 'info', text: '  /SIMULATE  - Run career simulation' },
                    { type: 'info', text: '  /ANALYZE   - Start career analysis' },
                    { type: 'info', text: '  /SIMULATE  - Run career simulation' },
                    { type: 'info', text: '  /RESET     - Clear terminal' },
                    { type: 'info', text: '  /DELETE_ALL - Purge all user data' }
                ];
                break;
            case '/DELETE_ALL':
                localStorage.clear();
                resetGamification();
                response = [{ type: 'success', text: 'SYSTEM PURGED. ALL USER DATA DELETED.' }];
                break;
            case '/RESET':
                setOutput([]);
                setInput('');
                return;
            default:
                response = [{ type: 'error', text: `UNKNOWN COMMAND: ${cmd}` }];
        }

        setOutput(prev => [...prev, { type: 'input', text: `> ${cmd}` }, ...response]);
        setInput('');
        soundManager.playKeypress(); // Extra click for enter
    };

    useEffect(() => {
        document.documentElement.style.setProperty('--blink-speed', `${blinkSpeed}s`);
    }, [blinkSpeed]);

    return (
        <section style={{ padding: '4rem 2rem', background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="retro-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                 <h2 className="text-center" style={{ fontSize: '2rem', marginBottom: '3rem' }}>SYSTEM_SIMULATION</h2>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    
                    {/* ASCII Visualization */}
                    <div style={{ border: '1px solid var(--border-color)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', lineHeight: '1.2', textAlign: 'center', whiteSpace: 'pre' }}>
{`
    [ CURRENT_STATE ]
          |
          v
   +--------------+
   |  FOUNDATION  |
   +--------------+
          |
          v
   +--------------+
   |  SKILL_ACQ.  |
   +--------------+
          |
          v
   +--------------+
   |  OPTIMIZED   |
   |     ROLE     |
   +--------------+
`}
                        </div>
                        <p style={{ marginTop: '2rem', color: '#888', fontStyle: 'italic' }}>&gt; VISUALIZING PATHWAY...</p>
                    </div>


                    {/* Interactive Terminal */}
                    <div style={{ background: 'var(--bg-color)', border: '2px solid var(--border-color)', padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.9rem', boxShadow: '5px 5px 0px var(--shadow-color)', height: '400px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
                            {output.map((line, i) => (
                                <div key={i} style={{ 
                                    marginBottom: '0.5rem', 
                                    color: line.type === 'error' ? 'red' : line.type === 'success' ? '#4ade80' : line.type === 'input' ? 'var(--text-color)' : 'var(--secondary-color)' 
                                }}>
                                    {line.text}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: '#4ade80', marginRight: '10px' }}>&gt;</span>
                            <input 
                                type="text" 
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                className="retro-input"
                                style={{ border: 'none', padding: 0, height: 'auto', background: 'transparent' }}
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div style={{ marginTop: '2rem', gridColumn: '1 / -1' }}>
                         <label style={{ display: 'block', marginBottom: '10px' }}>CURSOR BLINK SPEED: {blinkSpeed}s</label>
                         <input 
                            type="range" 
                            min="0.1" 
                            max="2" 
                            step="0.1" 
                            value={blinkSpeed} 
                            onChange={(e) => setBlinkSpeed(parseFloat(e.target.value))}
                            className="retro-range"
                         />
                    </div>
                 </div>
            </div>
        </section>
    );
};

export default DemoPreview;
