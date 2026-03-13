import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { aiAPI } from "../api/ai";
import "./ChatbotPage.css";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "👋 Hi! I'm your AI Shopping Assistant. I can help you find products, get recommendations, or answer questions about your order. What can I do for you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await aiAPI.chat({ message: inputValue });

      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        content: response.reply || "I'm not sure how to help with that. Can you rephrase?",
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage = {
        id: messages.length + 2,
        type: "bot",
        content: "Sorry, I'm having trouble responding. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const quickReplies = [
    "Show me electronics",
    "Find best sellers",
    "What's on sale?",
    "Help with my order"
  ];

  return (
    <div className="chatbot-page">
      <Navbar />

      <main className="chatbot-main">
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="header-content">
              <h1>SmartShop AI Assistant</h1>
              <p>Personalized shopping recommendations powered by AI</p>
            </div>
            <div className="header-badge">🤖 AI Powered</div>
          </div>

          <div className="chatbot-wrapper">
            {/* Chat History */}
            <div className="chat-messages">
              {messages.map(message => (
                <div key={message.id} className={`message message-${message.type}`}>
                  <div className="message-avatar">
                    {message.type === "bot" ? "🤖" : "�"}
                  </div>
                  <div className="message-content">
                    <p>{message.content}</p>
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="message-suggestions">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            className="suggestion-btn"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
              ))}
              {loading && (
                <div className="message message-bot">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="chatbot-input-area">
              {messages.length <= 1 && (
                <div className="quick-replies">
                  <p className="quick-label">Quick actions:</p>
                  <div className="quick-buttons">
                    {quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        className="quick-btn"
                        onClick={() => {
                          setInputValue(reply);
                          setTimeout(() => {
                            const event = new KeyboardEvent('keydown', { key: 'Enter' });
                            document.querySelector('.chat-input').dispatchEvent(event);
                          }, 100);
                        }}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="input-form">
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Ask me about products, recommendations, or your order..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="send-btn"
                  disabled={loading || !inputValue.trim()}
                  aria-label="Send message"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="chatbot-info">
          <div className="container">
            <h2>How AI Assistant Helps</h2>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">🎯</div>
                <h3>Smart Recommendations</h3>
                <p>Get personalized product suggestions based on your preferences</p>
              </div>
              <div className="info-card">
                <div className="info-icon">⚡</div>
                <h3>Quick Search</h3>
                <p>Find exactly what you're looking for in seconds</p>
              </div>
              <div className="info-card">
                <div className="info-icon">💡</div>
                <h3>Expert Advice</h3>
                <p>Get instant answers to your shopping questions</p>
              </div>
              <div className="info-card">
                <div className="info-icon">📦</div>
                <h3>Order Support</h3>
                <p>Track your orders and get delivery updates</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
