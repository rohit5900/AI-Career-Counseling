import React, { useState, useEffect } from 'react';

const TrustSection = () => {
    const [logs, setLogs] = useState([
        "[SUCCESS] USER_882 transitioned to DATA_ANALYST",
        "[UPDATE] USER_104 skipped 2 years of junior roles",
        "[NEW] USER_993 started AI_ARCHITECT roadmap",
        "[SUCCESS] USER_771 salary increased by 45%"
    ]);

    useEffect(() => {
        const generateRandomLog = () => {
            const actions = ["transitioned to", "mastered", "promoted to", "started"];
            const roles = ["FULL_STACK_DEV", "ML_ENGINEER", "PRODUCT_LEAD", "CYBER_SEC_ANALYST"];
            const id = Math.floor(Math.random() * 1000 + 1000);
            return `[UPDATE] USER_${id} ${actions[Math.floor(Math.random() * actions.length)]} ${roles[Math.floor(Math.random() * roles.length)]}`;
        };

        const interval = setInterval(() => {
            const newLog = generateRandomLog();
            setLogs(prev => [...prev.slice(1), newLog]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section style={{ borderBottom: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '400px' }}>
            {/* Left: Testimonial Logs */}
            <div style={{ background: 'var(--bg-color)', padding: '2rem', borderRight: '1px solid var(--border-color)', overflow: 'hidden', position: 'relative' }}>
                <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px', color: 'var(--text-color)' }}>LIVE_SUCCESS_FEED</h3>
                <div style={{ fontFamily: 'monospace', color: 'var(--secondary-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {logs.map((log, i) => (
                        <div key={i} style={{ 
                            opacity: (i + 1) / logs.length, 
                            color: i === logs.length - 1 ? '#4ade80' : 'inherit'
                        }}>
                            &gt; {log}
                        </div>
                    ))}
                </div>
                <div className="retro-scanline"></div>
            </div>

            {/* Right: Report Preview */}
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-color)' }}>
                <h3 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>SAMPLE_OUTPUT_PREVIEW</h3>
                
                <div className="retro-card" style={{ width: '100%', maxWidth: '400px', fontSize: '0.8rem', color: 'var(--text-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        <span>CANDIDATE: UNKNOWN</span>
                        <span style={{ color: '#4ade80' }}>MATCH: 94%</span>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <div>SKILL_GAP_ANALYSIS:</div>
                        <div style={{ background: '#333', height: '10px', width: '100%', marginTop: '5px' }}>
                            <div style={{ background: '#4ade80', height: '100%', width: '75%' }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginTop: '2px' }}>
                            <span>CURRENT</span>
                            <span>TARGET</span>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div style={{ border: '1px solid var(--border-color)', padding: '5px', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>$85k</div>
                            <div style={{ fontSize: '0.6rem', color: '#888' }}>EST_STARTING</div>
                        </div>
                        <div style={{ border: '1px solid var(--border-color)', padding: '5px', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>6mo</div>
                            <div style={{ fontSize: '0.6rem', color: '#888' }}>TIME_TO_HIRE</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
