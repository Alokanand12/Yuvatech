import React, { useState, useRef, useEffect } from 'react';
import { useAIChat } from '../../context/AIChatContext';
import { useNavigate } from 'react-router-dom';
import './GlobalAIChatbot.css';

export default function GlobalAIChatbot() {
  const {
    isOpen,
    toggleChat,
    closeChat,
    messages,
    sendMessage,
    isTyping,
    contextData,
    clearConversation
  } = useAIChat();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Handle escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeChat]);

  // Prevent background scrolling on mobile when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('chat-open-mobile');
    } else {
      document.body.classList.remove('chat-open-mobile');
    }
    return () => document.body.classList.remove('chat-open-mobile');
  }, [isOpen]);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleProjectClick = (projectId) => {
    closeChat();
    navigate(`/projects/${projectId}`);
  };

  const renderMessageContent = (msg) => {
    if (msg.intent === 'user') {
      return <div className="chat-msg-user">{msg.text}</div>;
    }

    return (
      <div className="chat-msg-ai">
        {msg.headline && <h4 className="chat-msg-headline">{msg.headline}</h4>}
        {msg.summary && <p className="chat-msg-summary" dangerouslySetInnerHTML={{ __html: msg.summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />}
        
        {msg.projects && msg.projects.length > 0 && (
          <div className="chat-project-cards">
            {msg.projects.map(p => (
              <div key={p.id} className="chat-project-card" onClick={() => handleProjectClick(p.id)}>
                <div className="chat-project-card-header">
                  <span className={`risk-badge risk-${p.riskLevel.toLowerCase()}`}>{p.riskLevel} RISK</span>
                  <span className="project-id">{p.id}</span>
                </div>
                <div className="chat-project-name">{p.name}</div>
                <div className="chat-project-metrics">
                  <span>Score: {p.riskScore}/100</span>
                  <span>Cost Risk: {p.costRisk}</span>
                  <span>Time Risk: {p.timeRisk}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {msg.project && (
           <div className="chat-project-card" onClick={() => handleProjectClick(msg.project.id)}>
             <div className="chat-project-card-header">
                <span className={`risk-badge risk-${msg.project.riskLevel.toLowerCase()}`}>{msg.project.riskLevel} RISK</span>
                <span className="project-id">{msg.project.id}</span>
             </div>
             <div className="chat-project-name">{msg.project.name}</div>
             <div className="chat-project-metrics">
                <span>Score: {msg.project.riskScore}/100</span>
                <span>Cost Risk: {msg.project.costRisk}</span>
                <span>Time Risk: {msg.project.timeRisk}</span>
             </div>
           </div>
        )}

        {msg.sectors && msg.sectors.length > 0 && (
           <div className="chat-sector-cards">
             {msg.sectors.map(s => (
               <div key={s.sector} className="chat-sector-card">
                  <div className="chat-sector-name">{s.sector}</div>
                  <div className="chat-sector-metrics">
                     <span>Projects: {s.totalProjects}</span>
                     <span>Avg Risk: {s.avgRiskScore}/100</span>
                  </div>
               </div>
             ))}
           </div>
        )}

        {msg.recommendedActions && msg.recommendedActions.length > 0 && (
          <div className="chat-recommendations">
            <strong>Recommended Actions:</strong>
            <ul>
              {msg.recommendedActions.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const getQuickQuestions = () => {
    switch(contextData.currentPage) {
      case 'Dashboard':
        return ['Which projects need attention?', 'What are the major risks?', 'Show critical projects'];
      case 'Projects':
        return ['Show highest-risk projects', 'Show cost-risk projects', 'Show delay-risk projects'];
      case 'Project Intelligence':
        return ['Why is this project risky?', 'What should we do?', 'Summarize this project'];
      case 'Risk Intelligence':
        return ['What is driving the risk?', 'Which sector is riskiest?', 'Explain the risk matrix'];
      case 'Early Warnings':
        return ['Which alerts are critical?', 'What needs immediate action?', 'Summarize current warnings'];
      default:
        return ['Which projects have the highest risk?', 'Show projects with high cost and time risk'];
    }
  };

  return (
    <>
      <button 
        className={`global-chat-fab ${isOpen ? 'hidden' : ''}`}
        onClick={toggleChat}
        aria-label="Open AI Assistant"
      >
        <span className="fab-icon">🤖</span>
        <span className="fab-label">AI</span>
      </button>

      {isOpen && (
        <div className="global-chat-window">
          <div className="chat-header">
            <div className="chat-header-title">
              <h3>Project Intelligence Assistant</h3>
              <span className="prototype-badge">AI Assistant — Prototype</span>
            </div>
            <div className="chat-header-actions">
              <button onClick={clearConversation} className="icon-btn" title="Clear conversation">🔄</button>
              <button onClick={closeChat} className="icon-btn" title="Minimize/Close">✖</button>
            </div>
          </div>
          <div className="chat-subtitle">
            Ask about project risks, forecasts and warnings.
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-msg-wrapper ${msg.intent === 'user' ? 'user' : 'ai'}`}>
                {renderMessageContent(msg)}
              </div>
            ))}
            
            {isTyping && (
              <div className="chat-msg-wrapper ai">
                <div className="chat-msg-ai typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-quick-questions">
            {getQuickQuestions().map(q => (
              <button key={q} onClick={() => sendMessage(q)} className="quick-q-btn">{q}</button>
            ))}
          </div>

          <div className="chat-input-area">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about project risks..."
              rows={1}
            />
            <button 
              onClick={handleSend} 
              disabled={!inputValue.trim() || isTyping}
              className="send-btn"
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
