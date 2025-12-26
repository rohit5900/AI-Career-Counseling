import React from 'react';

export const CareerTimeline = () => {
  const events = [
    { year: '2023', event: 'INITIATED JOURNEY', status: 'COMPLETED' },
    { year: '2024', event: 'WEB FOUNDATIONS', status: 'IN_PROGRESS' },
    { year: '2025', event: 'FULL STACK MASTERY', status: 'PENDING' },
    { year: '2026', event: 'AI INTEGRATION', status: 'LOCKED' },
  ];

  return (
    <div className="retro-card" style={{ height: '100%', overflowY: 'auto' }}>
      <h4 style={{ borderBottom: '1px solid white', paddingBottom: '10px' }}>TIMELINE</h4>
      <div style={{ paddingLeft: '10px', borderLeft: '2px solid #333', marginLeft: '5px' }}>
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
            <div style={{ fontSize: '0.8rem', color: '#888' }}>{e.year}</div>
            <div style={{ color: e.status === 'LOCKED' ? '#555' : 'white' }}>{e.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillTracker = () => {
  const skills = [
    { name: 'REACT.JS', level: 75 },
    { name: 'NODE.JS', level: 60 },
    { name: 'PYTHON', level: 40 },
    { name: 'SYS_DESIGN', level: 30 },
  ];

  return (
    <div className="retro-card">
      <h4 style={{ borderBottom: '1px solid white', paddingBottom: '10px' }}>SKILL_MATRIX</h4>
      {skills.map((s, i) => (
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
  return (
    <div className="retro-card">
      <h4 style={{ borderBottom: '1px solid white', paddingBottom: '10px' }}>CAREER_HEALTH</h4>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <div style={{ fontSize: '2.5rem', color: '#4ade80', fontWeight: 'bold' }}>82%</div>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>OPTIMAL TRAJECTORY</div>
      </div>
      <div style={{ fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>BURNOUT_RISK:</span>
            <span style={{ color: 'yellow' }}>MODERATE</span>
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
    return (
        <div className="retro-card" style={{ flex: 1 }}>
            <h4 style={{ borderBottom: '1px solid white', paddingBottom: '10px' }}>LOGS</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '0.8rem', color: '#aaa', listStyleType: 'square' }}>
                <li>Searched: "Data Science"</li>
                <li>Compared: "Frontend vs Backend"</li>
                <li>Simulated: "DevOps 5 Years"</li>
                <li>Exported: PDF Report</li>
            </ul>
        </div>
    );
};

export const UserStats = ({ xp, level, badges }) => {
    const nextLevelXp = level * 100;
    const progress = (xp % 100); // Simple progress within current level logic

    return (
        <div className="retro-card">
            <h4 style={{ borderBottom: '1px solid white', paddingBottom: '10px' }}>OPERATOR_STATUS</h4>
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
