import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock registration logic
        console.log("Registered!");
        navigate('/onboarding');
    };

    return (
        <div className="flex justify-center items-center" style={{ minHeight: '100vh', background: '#000' }}>
            <div className="retro-container max-w-md w-full">
                <h2 className="text-center" style={{ marginBottom: '2rem' }}>
                    INITIALIZE USER
                </h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>USER_ID (NAME)</label>
                        <input 
                            type="text" 
                            placeholder="ENTER NAME..." 
                            className="retro-input"
                            required
                        />
                    </div>

                    <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>COMMFILTER (EMAIL)</label>
                        <input 
                            type="email" 
                            placeholder="ENTER EMAIL..." 
                            className="retro-input"
                            required
                        />
                    </div>

                    <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>ACCESS_CODE (PASSWORD)</label>
                        <input 
                            type="password" 
                            placeholder="ENTER PASSWORD..." 
                            className="retro-input"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="mt-4">
                        EXECUTE REGISTRATION
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p>ALREADY INITIALIZED?</p>
                    <Link to="/login" style={{ marginRight: '1rem' }}>ACCESS TERMINAL</Link>
                </div>

                <div className="text-center mt-4" style={{ marginTop: '2rem' }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '0.8rem' }}>[ &lt; RETURN_TO_BASE ]</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
