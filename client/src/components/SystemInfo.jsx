import React from 'react';

const SystemInfo = () => {
    return (
        <section style={{ padding: '4rem 2rem', background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
            <div className="retro-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                    
                    {/* Tech Stack */}
                    <div>
                        <h4 style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>SYSTEM_ARCHITECTURE</h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--secondary-color)' }}>
                            <li style={{ marginBottom: '0.5rem' }}>&gt; FRONTEND: React.js + CRT Emulation Layer</li>
                            <li style={{ marginBottom: '0.5rem' }}>&gt; BACKEND: Node.js Processing Unit</li>
                            <li>&gt; AI_CORE: Gemini LLM Integration</li>
                        </ul>
                    </div>

                    {/* Security */}
                     <div>
                        <h4 style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>DATA_SECURITY_PROTOCOL</h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--secondary-color)' }}>
                            <li style={{ marginBottom: '0.5rem' }}>&gt; ENCRYPTION: TLS 1.3 Standards</li>
                            <li style={{ marginBottom: '0.5rem' }}>&gt; STORAGE: Session-Based Execution</li>
                            <li>&gt; PRIVACY: No Permanent Resume Storage</li>
                        </ul>
                    </div>

                     {/* Social Proof */}
                     <div>
                        <h4 style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>USER_FEEDBACK_LOGS</h4>
                        <div style={{ fontSize: '0.9rem', color: 'var(--secondary-color)', fontStyle: 'italic', marginBottom: '1rem' }}>
                            "Clear roadmap within minutes. System efficiency optimal." <br/>
                            <span style={{ color: '#4ade80' }}>-- Final Year Student</span>
                        </div>
                         <div style={{ fontSize: '0.9rem', color: 'var(--secondary-color)', fontStyle: 'italic' }}>
                            "Helped me execute domain switch to DevOps." <br/>
                            <span style={{ color: '#4ade80' }}>-- Software Engineer</span>
                        </div>
                    </div>
                
                </div>

                <div style={{ marginTop: '4rem', textAlign: 'center', fontSize: '0.8rem', color: '#666', borderTop: '1px dashed #333', paddingTop: '2rem' }}>
                    PATHFINDER_AI v1.0.0 | BUILD: DEV | SYSTEM_READY
                </div>

            </div>
        </section>
    );
};

export default SystemInfo;
