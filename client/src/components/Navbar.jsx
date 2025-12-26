import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = location.pathname.includes('/dashboard') || location.pathname.includes('/onboarding');

  const handleLogout = () => {
    // Mock logout
    navigate('/');
  };

  const [logoText, setLogoText] = useState('');
  const fullText = 'PATHFINDER_AI';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLogoText(fullText.substring(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'var(--bg-color)',
      borderBottom: '2px solid var(--border-color)',
      color: 'var(--text-color)',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} onClick={() => navigate('/')}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'monospace' }}>
          {/* ASCII Logo placeholder */}
          <span style={{ marginRight: '10px' }}>&gt;_</span>
          {logoText}
          <span className="blink" style={{ color: 'var(--text-color)' }}>_</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {!isLoggedIn ? (
            <>
                <a href="/#about" style={{ textDecoration: 'none' }}>SYS_INFO</a>
                <a href="/#how-it-works" style={{ textDecoration: 'none' }}>MANUAL</a>
                <span style={{ color: '#333' }}>|</span>
                <Link to="/login" className="retro-btn retro-btn-outline" style={{ padding: '5px 15px', fontSize: '0.9rem' }}>LOGIN</Link>
                <Link to="/register" className="retro-btn" style={{ padding: '5px 15px', fontSize: '0.9rem' }}>INIT</Link>
            </>
        ) : (
            <>
                <div style={{ color: 'white', fontSize: '0.9rem', marginRight: 'auto' }}>STATUS: <span style={{ color: '#4ade80' }}>ACTIVE</span></div>
                
                <a href="/#about" style={{ textDecoration: 'none', marginRight: '1rem' }}>SYS_INFO</a>
                <button onClick={handleLogout} className="retro-btn retro-btn-outline" style={{ padding: '5px 15px', fontSize: '0.9rem' }}>LOGOUT</button>
            </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
