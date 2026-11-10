import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { retrieveRelevantContext } from "./utils/retrieveContext";
import gsap from "gsap";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi there! I am Minhaj's AI assistant. How can I help you today?" }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const windowRef = useRef(null);
  const btnRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Bobbing animation for the floating button
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(btnRef.current, {
        y: "-12px",
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    });
    return () => ctx.revert();
  }, []);

  // Animation for Chat Window opening
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(windowRef.current,
        { scale: 0.5, opacity: 0, transformOrigin: "bottom left", y: 40 },
        { scale: 1, opacity: 1, duration: 0.6, y: 0, ease: "elastic.out(1, 0.7)" }
      );
    }
  }, [isOpen]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const context = retrieveRelevantContext(input);

    const prompt = `
You are Minhaj's AI assistant.
Answer professionally, briefly, and with a friendly tone.
You have access to Minhaj's portfolio information below. If the user asks about Minhaj, use this context to provide accurate answers.
If the user asks about anything else, feel free to answer them using your general knowledge.

Context about Minhaj:
${context}

User:
${input}
`;

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "API key is not configured. Please set VITE_GEMINI_API_KEY." },
        ]);
        return;
      }

      const models = [
        "gemini-flash-lite-latest",
        "gemini-3.5-flash-lite",
        "gemini-flash-latest",
      ];

      let reply = "";

      for (const model of models) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": apiKey,
              },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
              }),
            }
          );

          if (!res.ok) {
            console.warn(`Model ${model} returned HTTP ${res.status}`);
            continue;
          }

          const data = await res.json();
          const parts = data?.candidates?.[0]?.content?.parts || [];
          const textPart = parts.find((p) => p.text && !p.thought) || parts[0];

          if (textPart?.text) {
            reply = textPart.text;
            break;
          }
        } catch (fetchErr) {
          console.warn(`Error querying ${model}:`, fetchErr);
        }
      }

      if (!reply) {
        reply = "Sorry — I'm temporarily unable to respond. Please try again in a moment.";
      }

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      console.error("chat error:", err);
      setMessages((prev) => [...prev, { role: "bot", text: "Error: Unable to connect to AI." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = () => {
    gsap.to(btnRef.current, { scale: 1.15, duration: 0.3, ease: "back.out(2)" });
  };
  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "fixed",
          bottom: "35px",
          left: "35px",
          background: "linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "65px",
          height: "65px",
          fontSize: "28px",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 10px 25px rgba(0, 114, 255, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Chat with AI"
      >
        <span style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>💬</span>
      </button>

      {isOpen && (
        <div
          ref={windowRef}
          style={{
            position: "fixed",
            bottom: "120px",
            left: "35px",
            width: "380px",
            height: "550px",
            maxWidth: "calc(100vw - 70px)",
            background: "rgba(20, 20, 22, 0.7)", 
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)", 
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#fff",
            borderRadius: "28px",
            display: "flex",
            flexDirection: "column",
            zIndex: 10000,
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div 
                style={{ 
                  width: "10px", 
                  height: "10px", 
                  borderRadius: "50%", 
                  background: "#00E676",
                  boxShadow: "0 0 12px #00E676"
                }} 
              />
              <span style={{ fontWeight: "600", letterSpacing: "0.5px", fontSize: "17px" }}>Minhaj's AI ✨</span>
            </div>
            <button
              onClick={() => {
                gsap.to(windowRef.current, {
                  scale: 0.8,
                  opacity: 0,
                  y: 20,
                  duration: 0.3,
                  ease: "power2.in",
                  onComplete: () => setIsOpen(false)
                });
              }}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "white",
                cursor: "pointer",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              scrollbarWidth: "none", 
            }}
            className="chat-msgs-container"
          >
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}

            {loading && (
              <div style={{ display: "flex", gap: "5px", padding: "14px 16px", background: "rgba(255,255,255,0.06)", borderRadius: "18px", width: "fit-content", borderBottomLeftRadius: "6px" }}>
                <span className="dot-anim" style={{ width: 6, height: 6, background: "#ccc", borderRadius: "50%" }}></span>
                <span className="dot-anim" style={{ width: 6, height: 6, background: "#ccc", borderRadius: "50%", animationDelay: "0.2s" }}></span>
                <span className="dot-anim" style={{ width: 6, height: 6, background: "#ccc", borderRadius: "50%", animationDelay: "0.4s" }}></span>
              </div>
            )}
            <div ref={messagesEndRef} style={{ height: 1 }} />
          </div>

          {/* Input Area */}
          <div style={{ padding: "18px", background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{
              display: "flex", 
              background: "rgba(255,255,255,0.08)", 
              borderRadius: "22px",
              padding: "6px 6px 6px 18px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.15)"
            }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  fontSize: "15px",
                }}
              />
              <button
                onClick={handleSend}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
                style={{
                  padding: "10px 20px",
                  background: "linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "18px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 114, 255, 0.3)"
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .dot-anim {
          animation: bounce 1.4s infinite ease-in-out both;
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .chat-msgs-container::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>
    </>
  );
}

// Separate component to animate individual messages gracefully
function MessageBubble({ msg }) {
  const elRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(elRef.current, 
      { opacity: 0, y: 20, scale: 0.9, transformOrigin: msg.role === "user" ? "bottom right" : "bottom left" },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)", delay: msg.role === "user" ? 0 : 0.1 }
    );
  }, [msg]);

  const isUser = msg.role === "user";

  return (
    <div
      ref={elRef}
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "85%",
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          background: isUser 
            ? "linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)" 
            : "rgba(255, 255, 255, 0.08)",
          color: "#fff",
          fontSize: "15px",
          lineHeight: "1.5",
          letterSpacing: "0.2px",
          boxShadow: isUser 
            ? "0 6px 16px rgba(0, 114, 255, 0.25)" 
            : "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: isUser ? "none" : "blur(12px)",
          borderRadius: isUser ? "22px 22px 6px 22px" : "22px 22px 22px 6px",
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
          wordBreak: "break-word",
        }}
      >
        {msg.text}
      </div>
    </div>
  );
}