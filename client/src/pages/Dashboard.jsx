import React from 'react';
import ChatInterface from '../components/ChatInterface';
import Navbar from '../components/Navbar';
import { CareerTimeline, SkillTracker, HealthReport, DecisionHistory, UserStats } from '../components/DashboardWidgets';
import { useGamification } from '../context/GamificationContext';


const Dashboard = () => {
    const { xp, level, badges } = useGamification();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-color)', overflow: 'hidden' }}>
            <Navbar />
            <div style={{ 
                flex: 1, 
                paddingTop: '80px', 
                paddingBottom: '20px',
                paddingLeft: '20px',
                paddingRight: '20px',
                display: 'grid', 
                gridTemplateColumns: '300px 1fr 300px', 
                gap: '20px',
                height: '100%',
                boxSizing: 'border-box'
            }}>
                {/* Left Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }} className="no-scrollbar">
                    <UserStats xp={xp} level={level} badges={badges} />
                    <CareerTimeline />
                    <SkillTracker />
                </div>

                {/* Center Panel - Main Terminal */}
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
                    <ChatInterface />
                </div>

                {/* Right Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }} className="no-scrollbar">
                    <HealthReport />
                    <DecisionHistory />
                </div>
            </div>
            
            {/* Mobile overlay warning (optional, since this is complex UI) */}
            <div className="mobile-warning" style={{ display: 'none' }}>
                Please use desktop terminal for optimal experience.
            </div>
        </div>
    );
};

export default Dashboard;
