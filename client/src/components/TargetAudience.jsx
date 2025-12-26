import React from 'react';

const TargetAudience = () => {
    return (
        <section style={{ padding: '4rem 2rem', background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="retro-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem' }}>
                    
                    {/* Who is this for? */}
                    <div>
                         <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '2px solid var(--border-color)', display: 'inline-block' }}>TARGET_USER_PROFILES</h3>
                         <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--border-color)', paddingLeft: '1rem' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>STUDENTS</div>
                                <div style={{ color: 'var(--secondary-color)' }}>Seeking optimized entry points into the workforce.</div>
                            </li>
                            <li style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--border-color)', paddingLeft: '1rem' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>CAREER_SWITCHERS</div>
                                <div style={{ color: 'var(--secondary-color)' }}>Migrating domain expertise to new tech stacks.</div>
                            </li>
                            <li style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--border-color)', paddingLeft: '1rem' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>EARLY_PROFESSIONALS</div>
                                <div style={{ color: 'var(--secondary-color)' }}>Calibrating trajectory for maximum velocity.</div>
                            </li>
                         </ul>
                    </div>

                    {/* What problem it solves? */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '2px dashed red', display: 'inline-block', color: 'red' }}>DETECTED_ANOMALIES</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ border: '1px solid red', padding: '1rem', color: 'red' }}>
                                <div style={{ fontWeight: 'bold' }}>&gt; ERROR: CAREER_CONFUSION</div>
                                <div style={{ fontSize: '0.9rem', color: '#ff6666' }}>Analysis paralysis due to market saturation.</div>
                            </div>
                            <div style={{ border: '1px solid red', padding: '1rem', color: 'red' }}>
                                <div style={{ fontWeight: 'bold' }}>&gt; ERROR: SKILL_MISMATCH</div>
                                <div style={{ fontSize: '0.9rem', color: '#ff6666' }}>Inefficient resource allocation on outdated tech.</div>
                            </div>
                            <div style={{ border: '1px solid red', padding: '1rem', color: 'red' }}>
                                <div style={{ fontWeight: 'bold' }}>&gt; ERROR: NULL_ROADMAP</div>
                                <div style={{ fontSize: '0.9rem', color: '#ff6666' }}>Lack of clear, step-by-step execution protocol.</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TargetAudience;
