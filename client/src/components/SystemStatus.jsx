import React from 'react';

const SystemStatus = () => {
    return (
        <section style={{ padding: '2rem', borderBottom: '1px solid #333', background: '#0a0a0a' }}>
            <div className="retro-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h3 style={{ borderBottom: '1px solid white', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>system_status_monitor</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', fontFamily: 'monospace' }}>
                    {/* Status Indicators */}
                    <div style={{ border: '1px dashed #444', padding: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>CORE_MODULES</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>MODEL_STATUS:</span>
                                <span style={{ color: '#4ade80' }}>ONLINE</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>CAREER_DATASETS:</span>
                                <span style={{ color: '#4ade80' }}>LOADED</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>REC_ENGINE:</span>
                                <span style={{ color: '#4ade80' }}>ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div style={{ border: '1px dashed #444', padding: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>GLOBAL_METRICS</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>USERS_ANALYZED:</span>
                                <span>12,438</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>PATHS_GENERATED:</span>
                                <span>48,902</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>UPTIME:</span>
                                <span>99.9%</span>
                            </div>
                        </div>
                    </div>

                    {/* System Info */}
                    <div style={{ border: '1px dashed #444', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                         <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>LAST_BOOT_SEQUENCE</div>
                         <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>00:00:12 AGO</div>
                         <div style={{ fontSize: '0.7rem', color: '#4ade80' }}>SYSTEM_INTEGRITY_VERIFIED</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SystemStatus;
