import React from 'react';

const About = () => {
    return (
        <section id="about" style={{ padding: '4rem 2rem', position: 'relative' }}>
            <div className="retro-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', borderBottom: '2px solid white', paddingBottom: '1rem' }}>SYSTEM_CAPABILITIES</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{ textAlign: 'left', border: '1px solid white', padding: '1rem' }}>
                        <h3 style={{ borderBottom: '1px solid white', wordBreak: 'break-word', fontSize: '1.2rem', lineHeight: '1.4' }}>&gt; OPTIMIZED_PATHFINDING</h3>
                        <p className="mt-4">Analyzing user input to generate statistically significant career trajectories based on market data.</p>
                    </div>
                    <div style={{ textAlign: 'left', border: '1px solid white', padding: '1rem' }}>
                        <h3 style={{ borderBottom: '1px solid white', wordBreak: 'break-word', fontSize: '1.2rem', lineHeight: '1.4' }}>&gt; REALTIME_QUERY_PROCESSING</h3>
                        <p className="mt-4">24/7 Access to specialized knowledge base for instant resolution of career-related ambiguities.</p>
                    </div>
                    <div style={{ textAlign: 'left', border: '1px solid white', padding: '1rem' }}>
                        <h3 style={{ borderBottom: '1px solid white', wordBreak: 'break-word', fontSize: '1.2rem', lineHeight: '1.4' }}>&gt; DISTRACTION_FREE_INTERFACE</h3>
                        <p className="mt-4">High-contrast, low-latency environment designed for maximum focus and efficiency.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
