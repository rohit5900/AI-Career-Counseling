import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 2rem',
      background: 'black',
      position: 'relative',
      borderBottom: '2px solid white'
    }}>
      <div style={{
        maxWidth: '800px',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: '4rem',
          lineHeight: 1.1,
          marginBottom: '0.5rem',
          color: 'white',
          textShadow: '4px 4px 0px #333'
        }}>
          CAREER_PATH_OPTIMIZER
        </h1>
        <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2rem', fontFamily: 'monospace' }}>
            &gt; PURPOSE: AI-DRIVEN CAREER ANALYSIS & EXECUTION ENGINE
        </p>

        <p style={{
          fontSize: '1.25rem',
          color: 'white',
          marginBottom: '3rem',
          lineHeight: 1.6,
          border: '1px dashed white',
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
      </div>
    </section>
  );
};

export default Hero;
