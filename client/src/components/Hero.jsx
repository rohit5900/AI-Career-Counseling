import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const targetCount = 1240;

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = targetCount / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= targetCount) {
            setCount(targetCount);
            clearInterval(timer);
        } else {
            setCount(Math.floor(start));
        }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{
      minHeight: '80vh', 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 2rem',
      background: 'var(--bg-color)',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '800px',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: '4rem',
          lineHeight: 1.1,
          marginBottom: '0.5rem',
          color: 'var(--text-color)',
          textShadow: '4px 4px 0px var(--shadow-color)'
        }}>
          CAREER_PATH_OPTIMIZER
        </h1>
        <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2rem', fontFamily: 'monospace' }}>
            &gt; PURPOSE: AI-DRIVEN CAREER ANALYSIS & EXECUTION ENGINE
        </p>

        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-color)',
          marginBottom: '3rem',
          lineHeight: 1.6,
          border: '1px dashed var(--border-color)',
          padding: '2rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto'
        }}>
          &gt; CALCULATING OPTIMAL TRAJECTORY...<br/>
          &gt; PERSONALIZED GUIDANCE DETECTED.<br/>
          <span className="retro-cursor">&gt; EXECUTE CAREER_PLANNING.EXE?</span>
        </p>
        
        <div style={{ marginBottom: '1rem', fontSize: '0.8rem', color: '#4ade80' }}>
            &gt; RECOMMENDED_ACTION: CLICK [EXECUTE] TO BEGIN SYSTEM CONFIGURATION
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="retro-btn retro-btn-primary" autoFocus onClick={() => navigate('/register')}>EXECUTE</button>
          <button className="retro-btn retro-btn-outline" onClick={() => document.getElementById('about').scrollIntoView()}>READ_MANUAL</button>
        </div>

        <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--secondary-color)' }}>
            JOINING <span style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>{count.toLocaleString()}+</span> ACTIVE AGENTS
        </div>
      </div>
    </section>
  );
};

export default Hero;
