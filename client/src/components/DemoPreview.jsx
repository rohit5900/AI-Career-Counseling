import React from 'react';

const DemoPreview = () => {
    return (
        <section style={{ padding: '4rem 2rem', background: '#050505', borderBottom: '1px solid white' }}>
            <div className="retro-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                 <h2 className="text-center" style={{ fontSize: '2rem', marginBottom: '3rem' }}>SYSTEM_SIMULATION</h2>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    
                    {/* ASCII Visualization */}
                    <div style={{ border: '1px solid white', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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

                    {/* Sample Terminal Output */}
                    <div style={{ background: 'black', border: '2px solid white', padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.9rem', boxShadow: '5px 5px 0px #333' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <span style={{ color: '#4ade80' }}>&gt; INPUT:</span> B.Tech | Web Dev | AI Curious
                        </div>
                        <div style={{ marginBottom: '1rem', color: 'yellow' }}>
                            &gt; ANALYZING PARAMETERS...<br/>
                            &gt; CROSS-REFERENCING MARKET DATA...
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <span style={{ color: '#4ade80' }}>&gt; MATCH FOUND:</span> AI FULL-STACK ENGINEER
                        </div>
                        <div style={{ color: 'white' }}>
                            &gt; ROADMAP GENERATED: 18 MONTHS<br/>
                            &gt; PHASE 1: Python/FastAPI Mastery<br/>
                            &gt; PHASE 2: LLM Integration Patterns<br/>
                            &gt; PHASE 3: System Architecture
                        </div>
                        <div className="retro-cursor" style={{ marginTop: '1rem' }}>&nbsp;</div>
                    </div>
                 </div>
            </div>
        </section>
    );
};

export default DemoPreview;
