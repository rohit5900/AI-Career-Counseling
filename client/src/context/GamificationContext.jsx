import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }) => {
    const [xp, setXp] = useState(0);
    const [badges, setBadges] = useState([]);
    const [recentUnlock, setRecentUnlock] = useState(null);
    
    // Derived state
    const level = 1 + Math.floor(xp / 100);
    const prevLevelRef = useRef(1);

    useEffect(() => {
        if (level > prevLevelRef.current) {
            setTimeout(() => {
                setRecentUnlock(`LEVEL UP! WELCOME TO LEVEL ${level}`);
            }, 0);
            setTimeout(() => setRecentUnlock(null), 3000);
            prevLevelRef.current = level;
        }
    }, [level]);

    const addXp = (amount) => {
        setXp(prev => prev + amount);
    };

    const awardBadge = (badgeName) => {
        if (!badges.includes(badgeName)) {
            setBadges(prev => [...prev, badgeName]);
            setRecentUnlock(`BADGE UNLOCKED: ${badgeName}`);
            setTimeout(() => setRecentUnlock(null), 3000);
            addXp(50); // Bonus XP for badge
        }
    };

    // Placeholder for streak logic if needed later
    const streak = 1; 

    return (
        <GamificationContext.Provider value={{ xp, level, badges, streak, addXp, awardBadge, recentUnlock }}>
            {children}
            {recentUnlock && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#4ade80',
                    color: 'black',
                    padding: '10px 20px',
                    fontWeight: 'bold',
                    zIndex: 9999,
                    border: '2px solid white',
                    boxShadow: '0 0 10px #4ade80'
                }}>
                    {recentUnlock}
                </div>
            )}
        </GamificationContext.Provider>
    );
};
