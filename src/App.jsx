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
import './App.css';

export default function App() {
  return (
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
    </BrowserRouter>
  );
}
