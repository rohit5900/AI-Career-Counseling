import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState('IDLE'); // IDLE, LOADING, SUCCESS, ERROR
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (status === 'ERROR') setStatus('IDLE');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('LOADING');
        setErrorMessage('');

        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (!formData.email || !formData.password) {
            setStatus('ERROR');
            setErrorMessage('INPUT_MISSING: FIELDS_REQUIRED');
            return;
        }

        // Mock simple validation
        if (formData.email.includes('@')) {
            setStatus('SUCCESS');
            setTimeout(() => navigate('/onboarding'), 800);
        } else {
             setStatus('ERROR');
             setErrorMessage('INVALID_SYNTAX: EMAIL_FORMAT_ERROR');
        }
    };

    return (
        <div className="flex justify-center items-center" style={{ minHeight: '100vh', background: '#000' }}>
            <div className="retro-container max-w-md w-full">
                <h2 className="text-center" style={{ marginBottom: '2rem' }}>
                    SYSTEM ACCESS
                </h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>COMMFILTER (EMAIL)</label>
                        <input 
                            name="email"
                            type="email" 
                            placeholder="ENTER EMAIL..." 
                            className="retro-input"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={status === 'LOADING' || status === 'SUCCESS'}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>ACCESS_CODE (PASSWORD)</label>
                        <input 
                            name="password"
                            type="password" 
                            placeholder="ENTER PASSWORD..." 
                            className="retro-input"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={status === 'LOADING' || status === 'SUCCESS'}
                        />
                    </div>

                    {status === 'ERROR' && (
                        <div style={{ color: 'red', fontFamily: 'monospace', fontWeight: 'bold' }}>
                            &gt; ERROR: {errorMessage} <span className="retro-cursor"></span>
                        </div>
                    )}

                    {status === 'LOADING' && (
                        <div style={{ color: 'yellow', fontFamily: 'monospace' }}>
                            &gt; AUTHENTICATING... <span className="retro-cursor"></span>
                        </div>
                    )}

                    {status === 'SUCCESS' && (
                        <div style={{ color: '#4ade80', fontFamily: 'monospace', fontWeight: 'bold' }}>
                            &gt; ACCESS GRANTED. INITIALIZING...
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className="retro-btn retro-btn-primary mt-4"
                        disabled={status === 'LOADING' || status === 'SUCCESS'}
                        style={{ opacity: (status === 'LOADING' || status === 'SUCCESS') ? 0.7 : 1 }}
                    >
                        {status === 'LOADING' ? 'PROCESSING...' : 'INITIATE SESSION'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p>NEW USER DETECTED?</p>
                    <Link to="/register" style={{ marginRight: '1rem' }}>INITIALIZE PROTOCAL</Link>
                </div>
                 <div className="text-center mt-4" style={{ marginTop: '2rem' }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '0.8rem' }}>[ &lt; RETURN_TO_BASE ]</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

