import React from 'react';
import ChatInterface from '../components/ChatInterface';
import Navbar from '../components/Navbar'; // Optionally reuse Navbar or a specific Sidebar

const Dashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'black' }}>
            <Navbar />
            <div style={{ flex: 1, overflow: 'hidden', paddingTop: '80px' }}> {/* Padding top for fixed navbar */}
               <ChatInterface />
            </div>
        </div>
    );
};

export default Dashboard;
