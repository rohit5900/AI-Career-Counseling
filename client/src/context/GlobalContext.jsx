import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [brutalMode, setBrutalMode] = useState(false);

    const toggleBrutalMode = () => {
        setBrutalMode(prev => !prev);
    };

    return (
        <GlobalContext.Provider value={{ brutalMode, toggleBrutalMode }}>
            {children}
        </GlobalContext.Provider>
    );
};
