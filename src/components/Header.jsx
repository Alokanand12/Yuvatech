import React from 'react';
import { ShieldAlert, Cpu, Sparkles, RefreshCw } from 'lucide-react';
import './Header.css';

export default function Header() {
  return (
    <header className="gov-header">
      <div className="gov-header-content">
        {/* Left Branding */}
        <div className="brand-section">
          <div className="emblem-container">
            <div className="emblem-badge">
              <span className="emblem-text">GOI</span>
            </div>
          </div>
          <div className="brand-text">
            <div className="org-title">
              Ministry of Statistics and Programme Implementation (MoSPI)
            </div>
            <div className="org-sub">
              Data Informatics & Innovation Division (DIID) • Problem Statement ID 26103
            </div>
            <div className="app-title">
              PAIMANA-PREDICT
              <span className="app-tagline">AI-Powered Infrastructure Intelligence Platform</span>
            </div>
          </div>
        </div>

        {/* Right Info & Live Telemetry */}
        <div className="telemetry-section">
          <div className="demo-indicator">
            <span className="demo-tag">DEMO DATA</span>
            <span className="live-status">
              <span className="pulse-live"></span>
              Live CUF Feed
            </span>
          </div>

          <div className="system-metrics-badge">
            <Cpu className="icon-sm" />
            <span>AI Risk Engine v2.4</span>
          </div>

          <button className="refresh-btn" title="Refresh Telemetry Feed">
            <RefreshCw className="icon-sm" />
          </button>
        </div>
      </div>
    </header>
  );
}
