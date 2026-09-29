import React, { useEffect } from 'react';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';
import { useAIChat } from '../context/AIChatContext';
import './AIAssistant.css';

export default function AIAssistant() {
  const { openChat, closeChat } = useAIChat();

  useEffect(() => {
    // Automatically open the global chatbot when visiting this page
    openChat();
    // return () => closeChat(); // don't close on unmount so they can keep chatting
  }, []);

  return (
    <div className="ai-assistant-page" style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <Bot size={64} color="#1a365d" style={{ marginBottom: '24px' }} />
      <h1 className="page-title" style={{ marginBottom: '16px' }}>Project Intelligence Assistant</h1>
      <p className="page-subtitle" style={{ maxWidth: '600px', marginBottom: '32px' }}>
        The AI Assistant is now a global feature available across all pages of the platform.
        You can access it anytime using the floating button in the bottom right corner.
      </p>
      
      <button className="btn btn-primary btn-lg" onClick={openChat}>
        <Sparkles className="icon-xs" style={{ marginRight: '8px' }} />
        Open Global AI Assistant <ArrowRight className="icon-xs" style={{ marginLeft: '8px' }} />
      </button>

      <div className="mt-8" style={{ marginTop: '2rem' }}>
        <span className="demo-tag">AI ASSISTANT — PROTOTYPE</span>
      </div>
    </div>
  );
}
