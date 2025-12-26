import React from 'react';
import { useGamification } from '../context/GamificationContext';

export const CareerTimeline = () => {
  const events = [
    { year: '2023', event: 'INITIATED JOURNEY', status: 'COMPLETED' },
    { year: '2024', event: 'WEB FOUNDATIONS', status: 'IN_PROGRESS' },
    { year: '2025', event: 'FULL STACK MASTERY', status: 'PENDING' },
    { year: '2026', event: 'AI INTEGRATION', status: 'LOCKED' },
  ];

  return (
    <div className="retro-card" style={{ minHeight: '300px', overflowY: 'auto' }}>
      <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>TIMELINE</h4>
      <div style={{ paddingLeft: '10px', borderLeft: '2px solid var(--secondary-color)', marginLeft: '5px' }}>
        {events.map((e, i) => (
          <div key={i} style={{ marginBottom: '20px', position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              left: '-16px', 
              top: '5px', 
              width: '10px', 
              height: '10px', 
              background: e.status === 'COMPLETED' ? '#4ade80' : e.status === 'IN_PROGRESS' ? 'yellow' : '#333',
              borderRadius: '50%'
            }}></div>
            <div style={{ fontSize: '0.8rem', color: 'var(--secondary-color)' }}>{e.year}</div>
            <div style={{ color: e.status === 'LOCKED' ? 'var(--secondary-color)' : 'var(--text-color)' }}>{e.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillTracker = () => {
  const { level } = useGamification();
  const [userProfile, setUserProfile] = React.useState(null);

  React.useEffect(() => {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
        try {
            setUserProfile(JSON.parse(stored));
        } catch (error) {
            console.error("Failed to parse user profile");
        }
    }
  }, []);
  
  // Dynamic skill calculation based on level
  // If user has skills in profile, map them. Otherwise fallback.
  
  let skills = [];
  
  if (userProfile && userProfile.skills && userProfile.skills.length > 0) {
      skills = userProfile.skills.map(s => ({
          name: s.name.toUpperCase() || 'UNKNOWN_VECTOR',
          // Base level from onboarding (1-5) mapped to 20-100 scale, plus gamification bonus
          level: Math.min(100, (parseInt(s.level) * 20) + (level * 2))
      }));
  } else {
      // Fallback if no profile
      const baseSkill = 20 + (level * 5);
      skills = [
        { name: 'REACT.JS', level: Math.min(100, baseSkill + 15) },
        { name: 'NODE.JS', level: Math.min(100, baseSkill) },
        { name: 'PYTHON', level: Math.min(100, baseSkill - 10) },
        { name: 'SYS_DESIGN', level: Math.min(100, baseSkill - 20) },
      ];
  }

  return (
    <div className="retro-card">
      <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>SKILL_MATRIX</h4>
      {skills.slice(0, 5).map((s, i) => (
        <div key={i} style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span>{s.name}</span>
            <span>{s.level}%</span>
          </div>
          <div style={{ height: '8px', background: '#333', marginTop: '2px' }}>
            <div style={{ width: `${s.level}%`, height: '100%', background: i % 2 === 0 ? '#4ade80' : 'yellow' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const HealthReport = () => {
  const { level } = useGamification();
  // Calculate dynamic health based on level
  const healthScore = Math.min(100, 70 + (level * 5)); 
  const burnoutRisk = healthScore > 90 ? 'LOW' : healthScore > 75 ? 'MODERATE' : 'HIGH';
  const burnoutColor = burnoutRisk === 'LOW' ? '#4ade80' : burnoutRisk === 'MODERATE' ? 'yellow' : 'red';
  
  return (
    <div className="retro-card">
      <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>CAREER_HEALTH</h4>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <div style={{ fontSize: '2.5rem', color: '#4ade80', fontWeight: 'bold' }}>{healthScore}%</div>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>OPTIMAL TRAJECTORY</div>
      </div>
      <div style={{ fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>BURNOUT_RISK:</span>
            <span style={{ color: burnoutColor }}>{burnoutRisk}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>MARKET_DEMAND:</span>
            <span style={{ color: '#4ade80' }}>HIGH</span>
        </div>
      </div>
    </div>
  );
};



export const DecisionHistory = () => {
    const { logs } = useGamification();
    
    return (
        <div className="retro-card" style={{ flex: 1, minHeight: '200px' }}>
            <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>LOGS</h4>
            {logs.length === 0 ? (
                <div style={{ color: 'var(--secondary-color)', fontSize: '0.8rem', fontStyle: 'italic' }}>NO_ACTIVITY_DETECTED</div>
            ) : (
                <ul style={{ paddingLeft: '20px', fontSize: '0.8rem', color: 'var(--secondary-color)', listStyleType: 'square' }}>
                    {logs.map((log, i) => (
                        <li key={i}>{log}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export const UserStats = ({ xp, level, badges }) => {
    const nextLevelXp = level * 100;
    const progress = (xp % 100); // Simple progress within current level logic

    return (
        <div className="retro-card">
            <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>OPERATOR_STATUS</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>LVL {level}</div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>{xp} / {nextLevelXp} XP</div>
            </div>
            
            <div style={{ height: '10px', background: '#333', marginBottom: '15px' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: '#4ade80' }}></div>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#aaa' }}>BADGES_UNLOCKED:</div>
            <div style={{ display: 'flex', gap: '5px', marginTop: '5px', flexWrap: 'wrap' }}>
                {badges.length === 0 && <span style={{ color: '#555' }}>[NONE]</span>}
                {badges.map((b, i) => (
                    <span key={i} style={{ background: '#333', padding: '2px 5px', fontSize: '0.7rem' }}>{b}</span>
                ))}
            </div>
        </div>
    );
};
