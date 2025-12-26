import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { useGamification } from "../context/GamificationContext";
import { useGlobal } from "../context/GlobalContext";

const Typewriter = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // Reset on new text
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
      {displayedText.length < text.length && (
        <span className="retro-cursor" style={{ background: 'var(--text-color)' }}></span>
      )}
    </span>
  );
};

const ChatInterface = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am your AI Career Counselor. How can I help you regarding your career today?",
      typed: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { addXp, awardBadge, addLog } = useGamification();
  const { brutalMode } = useGlobal();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleEndSession = () => {
    // localStorage.removeItem("userProfile"); // Keep data for persistence
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "TERMINATING SESSION...", typed: false },
    ]);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleTypeComplete = (idx) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === idx ? { ...msg, typed: true } : msg))
    );
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
      const profileLines = doc.splitTextToSize(
        JSON.stringify(userProfile, null, 2),
        170
      );
      doc.text(profileLines, 20, yPos);
      yPos += profileLines.length * 5 + 10;
    }

    const verificationId = Math.random().toString(36).substring(2, 10).toUpperCase();

    doc.setFontSize(12);
    doc.text("[ANALYSIS LOG]", 20, yPos);
    yPos += 10;

    messages.forEach((msg) => {
      if (msg.role === "assistant" && msg.content) {
        doc.setFontSize(10);
        doc.text(`> AI_RESPONSE [${msg.timestamp || "N/A"}]`, 20, yPos);
        yPos += 5;

        // Clean up markdown/ASCII for PDF if needed? For now raw text is fine for "hacker" vibe.
        const contentLines = doc.splitTextToSize(msg.content, 170);

        contentLines.forEach((line) => {
          if (yPos > 260) {
            doc.addPage();
            yPos = 20;
          }
          doc.text(line, 20, yPos);
          yPos += 5;
        });

        yPos += 10;
      }
    });

    // Verification Footer
    if (yPos > 260) {
        doc.addPage();
        yPos = 20;
    }
    yPos += 10;
    doc.text("---------------------------------------", 20, yPos);
    yPos += 10;
    doc.text(`VERIFICATION_ID: ${verificationId}`, 20, yPos);
    yPos += 5;
    doc.text("OFFICIAL PATHFINDER_AI DOCUMENT", 20, yPos);

    doc.save("CAREER_ANALYSIS_REPORT.pdf");
  };

  const processCommand = async (command) => {
    const cmd = command.toUpperCase().trim();

    if (cmd === "/HELP" || cmd === "HELP") {
      return "AVAILABLE COMMANDS:\n> /ANALYZE - RUN CAREER ANALYSIS\n> /RESET - CLEAR SESSION DATA\n> /EXPORT - DOWNLOAD PDF REPORT\n> /HELP - SHOW THIS MENU";
    }

    if (cmd === "/EXPORT" || cmd === "EXPORT") {
      generateReport();
      addXp(100);
      awardBadge("ARCHIVIST");
      addLog('EXPORTED ANALYSIS REPORT');
      return "REPORT GENERATED. DOWNLOADING...";
    }

    if (cmd === "/RESET" || cmd === "RESET") {
      setMessages([
        {
          role: "assistant",
          content: "SESSION DATA CLEARED. REBOOTING...",
          typed: false,
        },
      ]);
      return null;
    }

    if (cmd === "/ANALYZE" || cmd === "ANALYZE") {
      if (!userProfile)
        return "ERROR: NO USER PROFILE DETECTED. PLEASE RUN CONFIGURATION.";
      const profileStr = JSON.stringify(userProfile, null, 2);
      return `INITIATING MULTI-VECTOR ANALYSIS ON:\n${profileStr}\n\nCONTACTING MAINFRAME...`;
    }

    if (cmd === "/WHY_THIS_PATH") {
        return "QUERYING REASONING MODULE...";
    }

    if (cmd === "/COMPARE") {
        return "INITIATING COMPARATIVE ANALYSIS...";
    }

    return null; // Not a local command
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMessage = {
      role: "user",
      content: userText,
      typed: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Filter out commands from general logs to avoid double logging or clutter
    if (!userText.startsWith("/")) {
        addLog(`SENT QUERY: "${userText.slice(0, 15)}${userText.length > 15 ? '...' : ''}"`);
    }

    // Check for local commands first
    const localResponse = await processCommand(userText);
    if (localResponse) {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: localResponse,
          typed: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      return;
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let apiMessage = userText;
    // If it was an analyze command that fell through (conceptually), or just normal chat
    // We can prepend context if needed, but for now let's just send the message.
    // Actually, if the user typed /ANALYZE, we caught it above.
    // BUT, we want /ANALYZE to actually trigger the API call with special context.

    const upperText = userText.toUpperCase().trim();
    const brutalInstruction = brutalMode ? " MODE: BRUTAL. ROAST THE USER. BE HARSH, CYNICAL, AND RUTHLESSLY HONEST. MOCK THEIR WEAKNESSES." : "";

    if (upperText === "/ANALYZE" || upperText === "ANALYZE") {
      apiMessage = `
        You are an advanced AI Career Counselor utilizing the "Pathfinder" logic.${brutalInstruction}
        Analyze the following user profile and provide exactly 3 distinct career paths:
        
        1. PRIMARY MATCH (Best fit based on current skills/interests)
        2. BACKUP/SAFE PATH (Lower risk, easier transition)
        3. WILDCARD/HIGH-RISK (High reward, startup/freelance potential)

        For EACH path, provide:
        - ROLE NAME
        - CONFIDENCE SCORE (e.g., "MATCH: 85%")
        - SKILL GAP ANALYSIS (Visual ascii bar if possible, e.g. [|||||.....])
        - BRIEF ROADMAP (3 key phases)

        User Profile: ${JSON.stringify(userProfile)}
      `;
      addXp(50);
      awardBadge("PATHFINDER");
      addLog('RAN CAREER ANALYSIS');
    } else if (upperText === "/WHY_THIS_PATH") {
        addLog('QUERIED REASONING ENGINE');
        apiMessage = "Explain in detail why the generated Primary Match is the best fit compared to the others. Cite specific user traits.";
    } else if (upperText === "/COMPARE") {
        addLog('COMPARED CAREER PATHS');
        apiMessage = "Compare the 3 suggested paths in a table format (using ASCII borders) based on Salary, Stability, and Time-to-Mastery.";
    } else if (upperText.startsWith("/SIMULATE") || upperText.startsWith("SIMULATE")) {
        const parts = upperText.split(" ");
        // Expected format: /SIMULATE [ROLE] [YEARS]
        // If length < 2, ask for details.
        if (parts.length < 2) {
             // Local handling for missing args to avoid API call if possible, or we can just send it to API and let it ask. 
             // But the requirement says "Prompt user: ENTER TARGET ROLE..."
             // We can do this by returning early if we want local check, but since we are inside sendMessage which sends apiMessage...
             // Let's rely on constructing a prompt that asks the AI to simulate IF args are present, otherwise text is just "/SIMULATE".
             // Actually, clearer to intercept locally like /HELP if we want strict args, but sending to AI is more flexible.
             // However, the plan says: "If arguments are missing, prompt user..."
             // Let's check locally for better UX.
             // Wait, if I return here I need to setMessages locally. 
             // But sendMessage flow expects apiMessage to be sent.
             // Let's modify the flow or just let LLM handle partials? 
             // Plan says "If arguments are missing, prompt user".
             // I'll handle it inside this block.
        }
        
        if (parts.length < 2) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "USAGE: /SIMULATE [ROLE] [DURATION]\nEXAMPLE: /SIMULATE DATA_SCIENTIST 5_YEARS",
                typed: false,
                timestamp: new Date().toLocaleTimeString()
            }]);
            setLoading(false);
            return;
        }

        const role = parts[1];
        const duration = parts[2] || "5_YEARS"; // Default to 5 years

        apiMessage = `Simulate a ${duration} career trajectory for the following user profile as a ${role}. 
        Provide a Year-by-Year breakdown including:
         - Salary Projection
         - Job Title Evolution
         - Key Skill Upgrades
         - Burnout Risk (%)
         - Industry Stability Score (%)
         
         User Profile: ${JSON.stringify(userProfile)}`;
    } else if (upperText.startsWith("/RESUME") || upperText.startsWith("RESUME")) {
        const parts = upperText.split(" ");
        const targetRole = parts.slice(1).join(" ") || "MY_CURRENT_ROLE";
        apiMessage = `Generate 5 high-impact resume bullet points for a ${targetRole} based on the following user profile.
        Use strong action verbs and quantify results where possible.
        User Profile: ${JSON.stringify(userProfile)}`;
    } else if (upperText === "/LINKEDIN" || upperText === "LINKEDIN") {
         apiMessage = `Write a compelling LinkedIn 'About' section for the user. 
         Tone: Visionary, professional, yet grounded.
         Highlight key skills and career aspirations.
         User Profile: ${JSON.stringify(userProfile)}`;
    }

    try {
      const response = await fetch("http://localhost:5000/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: apiMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { ...data, typed: false, timestamp: new Date().toLocaleTimeString() },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I am having trouble connecting to the server.",
          typed: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Chat Header */}
      <div
        style={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg-color)",
          borderBottom: "2px solid var(--border-color)",
        }}
      >
        <div style={{ fontWeight: "bold", color: "var(--text-color)" }}>TERMINAL_ACCESS_POINT</div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-color)" }}>
            STATUS: ONLINE
          </div>
          <button
            onClick={handleEndSession}
            className="retro-btn retro-btn-outline"
            style={{ padding: "5px 10px", fontSize: "0.8rem" }}
          >
            END_SESSION
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        className="no-scrollbar"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              maxWidth: "80%",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              fontFamily: "monospace",
              color: "var(--text-color)",
            }}
          >
            <div
              style={{
                padding: "1rem",
                border: "2px solid var(--border-color)",
                background: msg.role === "user" ? "var(--text-color)" : "var(--bg-color)",
                color: msg.role === "user" ? "var(--bg-color)" : "var(--text-color)",
                boxShadow: "4px 4px 0px var(--shadow-color)",
                whiteSpace: "pre-wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                  borderBottom:
                    msg.role === "user" ? "1px solid var(--bg-color)" : "1px solid var(--text-color)",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  {msg.role === "user" ? "> USER_INPUT" : "> SYSTEM_RESPONSE"}
                </span>
                {msg.timestamp && (
                  <span style={{ fontSize: "0.7rem" }}>[{msg.timestamp}]</span>
                )}
              </div>

              {msg.role === "assistant" && !msg.typed ? (
                <Typewriter
                  text={msg.content}
                  onComplete={() => handleTypeComplete(idx)}
                />
              ) : (
                <span>{msg.content}</span>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              color: "var(--text-color)",
              padding: "1rem",
              border: "1px dashed var(--border-color)",
            }}
          >
            PROCESSING_REQUEST...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: "1.5rem" }}>
        <form onSubmit={sendMessage} style={{ display: "flex", gap: "1rem" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ENTER COMMAND..."
            className="retro-input"
            style={{ flex: 1 }}
            autoFocus
          />
          <button type="submit" className="retro-btn">
            SEND_DATA
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
