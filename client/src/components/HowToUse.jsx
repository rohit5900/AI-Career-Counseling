import React from 'react';

const HowToUse = () => {
    return (
        <section id="how-it-works" style={{ padding: '6rem 2rem' }}>
             <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', borderBottom: '2px solid white', display: 'inline-block' }}>EXECUTION_FLOW_OVERVIEW</h2>
                <div style={{ textAlign: 'center', marginBottom: '3rem', color: '#888', fontFamily: 'monospace' }}>
                     ESTIMATED TIME: INIT_SESSION (~2m) &rarr; INPUT_DATA (~3m) &rarr; EXECUTE_PLAN (INSTANT)
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    
                    <div className="retro-card" style={{ width: '250px' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', borderBottom: '2px solid white' }}>01</div>
                        <h3>INIT_SESSION</h3>
                        <p>Create secure user profile / Initialize database entry.</p>
                    </div>

                    <div className="retro-card" style={{ width: '250px' }}>
                         <div style={{ fontSize: '3rem', marginBottom: '1rem', borderBottom: '2px solid white' }}>02</div>
                        <h3>INPUT_DATA</h3>
                        <p>Feed system with educational parameters and interest vectors.</p>
                    </div>

                     <div className="retro-card" style={{ width: '250px' }}>
                         <div style={{ fontSize: '3rem', marginBottom: '1rem', borderBottom: '2px solid white' }}>03</div>
                        <h3>EXECUTE_PLAN</h3>
                        <p>interact with AI core to generate actionable roadmap.</p>
                    </div>

                </div>
             </div>
        </section>
    );
};

export default HowToUse;
