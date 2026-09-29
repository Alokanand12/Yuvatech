import React, { createContext, useContext, useState, useEffect } from 'react';
import { queryAssistant, getWelcomeMessage } from '../utils/assistantEngine';
import { useLocation } from 'react-router-dom';
import demoProjects from '../data/demoProjects';

const AIChatContext = createContext();

export const useAIChat = () => useContext(AIChatContext);

export const AIChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('paimana_ai_chat');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [getWelcomeMessage()];
      }
    }
    return [getWelcomeMessage()];
  });
  const [isTyping, setIsTyping] = useState(false);
  
  // Context state
  const [contextData, setContextData] = useState({
    currentPage: 'Dashboard',
    currentProject: null,
  });

  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem('paimana_ai_chat', JSON.stringify(messages));
  }, [messages]);

  // Update context based on location
  useEffect(() => {
    let page = 'Dashboard';
    let project = null;

    if (location.pathname.startsWith('/projects/')) {
      page = 'Project Intelligence';
      const projectId = location.pathname.split('/')[2];
      project = demoProjects.find(p => p.id === projectId) || null;
    } else if (location.pathname === '/projects') {
      page = 'Projects';
    } else if (location.pathname === '/risk-intelligence') {
      page = 'Risk Intelligence';
    } else if (location.pathname === '/early-warnings') {
      page = 'Early Warnings';
    } else if (location.pathname === '/ai-assistant') {
      page = 'AI Assistant';
    }

    setContextData(prev => ({
      ...prev,
      currentPage: page,
      currentProject: project
    }));
  }, [location.pathname]);

  const toggleChat = () => setIsOpen(prev => !prev);
  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const sendMessage = (query) => {
    if (!query.trim()) return;
    
    // Add user message
    const userMsg = {
      intent: 'user',
      query: query,
      answerType: 'user',
      text: query
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      // Modify query based on context if it contains "this"
      let effectiveQuery = query;
      if (contextData.currentProject && (query.toLowerCase().includes('this project') || query.toLowerCase().includes('this'))) {
         effectiveQuery = `${query} ${contextData.currentProject.projectName}`;
      }

      const response = queryAssistant(effectiveQuery);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const clearConversation = () => {
    const welcome = getWelcomeMessage();
    setMessages([welcome]);
    sessionStorage.removeItem('paimana_ai_chat');
  };

  return (
    <AIChatContext.Provider value={{
      isOpen,
      toggleChat,
      openChat,
      closeChat,
      messages,
      sendMessage,
      isTyping,
      contextData,
      clearConversation
    }}>
      {children}
    </AIChatContext.Provider>
  );
};
