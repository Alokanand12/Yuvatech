import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import RiskIntelligence from './pages/RiskIntelligence';
import EarlyWarnings from './pages/EarlyWarnings';
import AIAssistant from './pages/AIAssistant';
<<<<<<< HEAD
import { AIChatProvider } from './context/AIChatContext';
import GlobalAIChatbot from './components/ai/GlobalAIChatbot';
=======
>>>>>>> 7d9f721fd3d4d685d5869fbd5a7d2de92836205f
import './App.css';

export default function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AIChatProvider>
        <div className="app-container">
          {/* Government Header */}
          <Header />

          {/* 5-Item Navigation */}
          <Navigation />

          {/* Main Content Viewport */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/risk-intelligence" element={<RiskIntelligence />} />
              <Route path="/early-warnings" element={<EarlyWarnings />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
            </Routes>
          </main>
          
          <GlobalAIChatbot />
        </div>
      </AIChatProvider>
=======
    <BrowserRouter>
      <div className="app-container">
        {/* Government Header */}
        <Header />

        {/* 5-Item Navigation */}
        <Navigation />

        {/* Main Content Viewport */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/risk-intelligence" element={<RiskIntelligence />} />
            <Route path="/early-warnings" element={<EarlyWarnings />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
          </Routes>
        </main>
      </div>
>>>>>>> 7d9f721fd3d4d685d5869fbd5a7d2de92836205f
    </BrowserRouter>
  );
}
