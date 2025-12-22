import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        education: 'UNDERGRADUATE',
        field: '',
        skills: [{ name: '', level: 3 }],
        workStyle: 'REMOTE',
        riskTolerance: 'STABLE',
        learningStyle: 'VIDEO'
    });

    const handleSkip = () => {
        navigate('/dashboard');
    };

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            // Save data to localStorage for ChatInterface to access
            localStorage.setItem('userProfile', JSON.stringify(formData));
            console.log('User Data Saved:', formData);
            navigate('/dashboard');
        }
    };

    const updateFormData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSkillChange = (index, field, value) => {
        const newSkills = [...formData.skills];
        newSkills[index][field] = value;
        setFormData(prev => ({ ...prev, skills: newSkills }));
    };

    const addSkill = () => {
        setFormData(prev => ({ ...prev, skills: [...prev.skills, { name: '', level: 3 }] }));
    };

    return (
        <div className="flex justify-center items-center" style={{ minHeight: '100vh', background: 'black' }}>
            <div className="retro-container max-w-md w-full" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid white', paddingBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', margin: 0 }}>USER_CONFIGURATION [STEP {step}/4]</h2>
                     <button onClick={handleSkip} style={{ background: 'none', border: 'none', boxShadow: 'none', color: 'gray', textDecoration: 'underline', padding: 0, fontFamily: 'monospace' }}>SKIP_SETUP &gt;&gt;</button>
                </div>

                {/* STEP 1: EDUCATION */}
                {step === 1 && (
                    <div className="fade-in">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>&gt; EDUCATION_LEVEL</label>
                        <select 
                            className="retro-input" 
                            style={{ marginBottom: '1.5rem', width: '100%' }}
                            value={formData.education}
                            onChange={(e) => updateFormData('education', e.target.value)}
                        >
                            <option value="HIGH_SCHOOL">HIGH_SCHOOL</option>
                            <option value="UNDERGRADUATE">UNDERGRADUATE</option>
                            <option value="POSTGRADUATE">POSTGRADUATE</option>
                            <option value="OTHER">OTHER</option>
                        </select>

                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>&gt; STUDY_FIELD</label>
                         <input 
                            type="text" 
                            placeholder="E.G. COMP_SCI" 
                            className="retro-input" 
                            style={{ marginBottom: '1.5rem', width: '100%' }} 
                            value={formData.field}
                            onChange={(e) => updateFormData('field', e.target.value)}
                         />
                    </div>
                )}

                 {/* STEP 2: SKILLS */}
                {step === 2 && (
                    <div className="fade-in">
                        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>&gt; SKILL_ASSESSMENT (1-5)</label>
                        {formData.skills.map((skill, index) => (
                            <div key={index} style={{ marginBottom: '1rem', border: '1px dashed #333', padding: '0.5rem' }}>
                                <input 
                                    type="text" 
                                    placeholder="SKILL NAME (E.G. REACT)" 
                                    className="retro-input" 
                                    style={{ marginBottom: '0.5rem', width: '100%' }}
                                    value={skill.name}
                                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontSize: '0.8rem' }}>LEVEL:</span>
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="5" 
                                        className="retro-range"
                                        style={{ flex: 1 }}
                                        value={skill.level}
                                        onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                                    />
                                    <span style={{ fontWeight: 'bold' }}>{skill.level}</span>
                                </div>
                            </div>
                        ))}
                        <button onClick={addSkill} className="retro-btn retro-btn-outline" style={{ width: '100%', fontSize: '0.8rem' }}>+ ADD_VECTOR</button>
                    </div>
                )}

                 {/* STEP 3: WORK STYLE & RISK */}
                {step === 3 && (
                    <div className="fade-in">
                        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>&gt; WORK_ENVIRONMENT</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            {['REMOTE', 'HYBRID', 'ON-SITE'].map(opt => (
                                <label key={opt} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: 'bold' }}>{formData.workStyle === opt ? '[X]' : '[ ]'}</span>
                                    <input 
                                        type="radio" 
                                        name="workStyle" 
                                        value={opt} 
                                        checked={formData.workStyle === opt} 
                                        onChange={(e) => updateFormData('workStyle', e.target.value)}
                                        style={{ display: 'none' }}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>

                        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>&gt; RISK_TOLERANCE</label>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {['STABLE', 'BALANCED', 'EXPERIMENTAL'].map(opt => (
                                <label key={opt} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: 'bold' }}>{formData.riskTolerance === opt ? '[X]' : '[ ]'}</span>
                                    <input 
                                        type="radio" 
                                        name="riskTolerance" 
                                        value={opt} 
                                        checked={formData.riskTolerance === opt} 
                                        onChange={(e) => updateFormData('riskTolerance', e.target.value)}
                                        style={{ display: 'none' }}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                 {/* STEP 4: LEARNING STYLE */}
                 {step === 4 && (
                    <div className="fade-in">
                        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>&gt; DATA_INGESTION_METHOD</label>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {['VIDEO', 'READING', 'PRACTICE'].map(opt => (
                                <label key={opt} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: 'bold' }}>{formData.learningStyle === opt ? '[X]' : '[ ]'}</span>
                                    <input 
                                        type="radio" 
                                        name="learningStyle" 
                                        value={opt} 
                                        checked={formData.learningStyle === opt} 
                                        onChange={(e) => updateFormData('learningStyle', e.target.value)}
                                        style={{ display: 'none' }}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                        <div style={{ marginTop: '2rem', border: '1px solid white', padding: '1rem' }}>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>&gt; SYSTEM_READY</p>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>ALL PARAMETERS SET. INITIATING ANALYSIS...</p>
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    {step > 1 ? (
                        <button className="retro-btn retro-btn-outline" onClick={() => setStep(step - 1)}>&lt; BACK</button>
                    ) : (
                        <div></div>
                    )}
                    <button className="retro-btn" onClick={handleNext}>
                        {step === 4 ? 'INITIALIZE_DASHBOARD' : 'NEXT_STEP >'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
