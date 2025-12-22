import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Typewriter = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText(''); // Reset on new text
        let currentIndex = 0;
        
        if (!text) return;

        const intervalId = setInterval(() => {
            if (currentIndex < text.length) {
                // We don't need 'prev' here since we construct slice from 'text' and 'currentIndex'
                setDisplayedText(text.substring(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(intervalId);
                if (onComplete) onComplete(); 
            }
        }, 20);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line
    }, [text]); // Intentionally omitting onComplete to prevent re-runs

    return (
        <span>
            {displayedText}
            {displayedText.length < text.length && <span className="retro-cursor"></span>}
        </span>
    );
};

const ChatInterface = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI Career Counselor. How can I help you regarding your career today?', typed: false }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            setUserProfile(JSON.parse(storedProfile));
        }
    }, []);

    const handleEndSession = () => {
        localStorage.removeItem('userProfile'); // Clear session data
        setMessages(prev => [...prev, { role: 'assistant', content: 'TERMINATING SESSION...', typed: false }]);
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    const handleTypeComplete = (idx) => {
        setMessages(prev => prev.map((msg, i) => i === idx ? { ...msg, typed: true } : msg));
    };

    const generateReport = () => {
        const doc = new jsPDF();
        doc.setFont("courier");
        doc.setFontSize(12);
        
        let yPos = 20;
        doc.text("PATHFINDER_AI // CAREER ANALYSIS REPORT", 20, yPos);
        yPos += 10;
        doc.text("=======================================", 20, yPos);
        yPos += 10;
        doc.text(`GENERATED: ${new Date().toLocaleString()}`, 20, yPos);
        yPos += 20;

        if (userProfile) {
            doc.text("[USER PROFILE]", 20, yPos);
            yPos += 10;
            doc.setFontSize(10);
            const profileLines = doc.splitTextToSize(JSON.stringify(userProfile, null, 2), 170);
            doc.text(profileLines, 20, yPos);
            yPos += (profileLines.length * 5) + 10;
        }

        doc.setFontSize(12);
        doc.text("[ANALYSIS LOG]", 20, yPos);
        yPos += 10;
        
        messages.forEach(msg => {
            if (msg.role === 'assistant' && msg.content) {
                doc.setFontSize(10);
                doc.text(`> AI_RESPONSE [${msg.timestamp || 'N/A'}]`, 20, yPos);
                yPos += 5;
                
                const contentLines = doc.splitTextToSize(msg.content, 170);
                // Check if we need a new page
                if (yPos + (contentLines.length * 5) > 280) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.text(contentLines, 20, yPos);
                yPos += (contentLines.length * 5) + 10;
            }
        });

        doc.save("CAREER_ANALYSIS_REPORT.pdf");
    };

    const processCommand = async (command) => {
        const cmd = command.toUpperCase().trim();
        
        if (cmd === '/HELP' || cmd === 'HELP') {
            return "AVAILABLE COMMANDS:\n> /ANALYZE - RUN CAREER ANALYSIS\n> /RESET - CLEAR SESSION DATA\n> /EXPORT - DOWNLOAD PDF REPORT\n> /HELP - SHOW THIS MENU";
        }
        
        if (cmd === '/EXPORT' || cmd === 'EXPORT') {
             generateReport();
             return "REPORT GENERATED. DOWNLOADING...";
        }
        
        if (cmd === '/RESET' || cmd === 'RESET') {
             setMessages([{ role: 'assistant', content: 'SESSION DATA CLEARED. REBOOTING...', typed: false }]);
             return null;
        }

        if (cmd === '/ANALYZE' || cmd === 'ANALYZE') {
            if (!userProfile) return "ERROR: NO USER PROFILE DETECTED. PLEASE RUN CONFIGURATION.";
            const profileStr = JSON.stringify(userProfile, null, 2);
            return `INITIATING ANALYSIS ON:\n${profileStr}\n\nCONTACTING MAINFRAME...`;
        }

        return null; // Not a local command
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input;
        const userMessage = { role: 'user', content: userText, typed: true, timestamp: new Date().toLocaleTimeString() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        // Check for local commands first
        const localResponse = await processCommand(userText);
        if (localResponse) {
             setLoading(false);
             setMessages(prev => [...prev, { 
                 role: 'assistant', 
                 content: localResponse, 
                 typed: false, 
                 timestamp: new Date().toLocaleTimeString() 
             }]);
             return;
        }

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let apiMessage = userText;
        // If it was an analyze command that fell through (conceptually), or just normal chat
        // We can prepend context if needed, but for now let's just send the message.
        // Actually, if the user typed /ANALYZE, we caught it above.
        // BUT, we want /ANALYZE to actually trigger the API call with special context.
        
        if (userText.toUpperCase().trim() === '/ANALYZE' || userText.toUpperCase().trim() === 'ANALYZE') {
             apiMessage = `Analyze this user profile and suggest 3 career paths with reasoning, skill gaps, and a roadmap: ${JSON.stringify(userProfile)}`;
        }

        try {
            const response = await fetch('http://localhost:5000/api/chat/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: apiMessage })
            });
            
            const data = await response.json();
            setMessages(prev => [...prev, { ...data, typed: false, timestamp: new Date().toLocaleTimeString() }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting to the server.', typed: false, timestamp: new Date().toLocaleTimeString() }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
             {/* Chat Header */}
             <div style={{ padding: '1rem', borderBottom: '2px solid white', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'black' }}>
                 <div style={{ fontWeight: 'bold' }}>TERMINAL_ACCESS_POINT</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'white' }}>STATUS: ONLINE</div>
                    <button onClick={handleEndSession} className="retro-btn retro-btn-outline" style={{ padding: '5px 10px', fontSize: '0.8rem' }}>END_SESSION</button>
                 </div>
             </div>

             {/* Messages Area */}
             <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="no-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} style={{
                        maxWidth: '80%',
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        fontFamily: 'monospace',
                        color: 'white',
                    }}>
                        <div style={{
                            padding: '1rem',
                            border: '2px solid white',
                            background: msg.role === 'user' ? 'white' : 'black',
                            color: msg.role === 'user' ? 'black' : 'white',
                            boxShadow: '4px 4px 0px white'
                        }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: msg.role === 'user' ? '1px solid black' : '1px solid white' }}>
                                <span style={{ fontWeight: 'bold' }}>
                                    {msg.role === 'user' ? '> USER_INPUT' : '> SYSTEM_RESPONSE'}
                                </span>
                                {msg.timestamp && <span style={{ fontSize: '0.7rem' }}>[{msg.timestamp}]</span>}
                            </div>
                            
                            {msg.role === 'assistant' && !msg.typed ? (
                                <Typewriter text={msg.content} onComplete={() => handleTypeComplete(idx)} />
                            ) : (
                                <span>{msg.content}</span>
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div style={{ alignSelf: 'flex-start', color: 'white', padding: '1rem', border: '1px dashed white' }}>
                        PROCESSING_REQUEST...
                    </div>
                )}
                <div ref={messagesEndRef} />
             </div>

             {/* Input Area */}
             <div style={{ padding: '1.5rem' }}>
                 <form onSubmit={sendMessage} style={{ display: 'flex', gap: '1rem' }}>
                     <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="ENTER COMMAND..."
                        className="retro-input"
                        style={{ flex: 1 }}
                        autoFocus
                     />
                     <button type="submit" className="retro-btn">SEND_DATA</button>
                 </form>
             </div>
        </div>
    );
};

export default ChatInterface;
