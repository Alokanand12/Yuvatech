import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, ShieldAlert, Bell, BrainCircuit,
  Sun, Moon, Bell as BellIcon, User, Activity, ChevronDown, Menu, X
} from 'lucide-react';
import './AppShell.css';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/projects', label: 'Projects', icon: FolderKanban },
  { path: '/risk-intelligence', label: 'Risk Intelligence', icon: ShieldAlert },
  { path: '/early-warnings', label: 'Early Warnings', icon: Bell },
  { path: '/ai-assistant', label: 'AI Assistant', icon: BrainCircuit },
];

export default function AppShell({ children }) {
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('paimana-theme') || 'light');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('paimana-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div className="app-shell">
      {/* ── HEADER ── */}
      <header className="app-header">
        <div className="header-inner">
          {/* Brand */}
          <div className="header-brand">
            <div className="brand-emblem">
              <span>GOI</span>
            </div>
            <div className="brand-text">
              <div className="brand-name">PAIMANA-PREDICT</div>
              <div className="brand-sub">AI-Powered Infrastructure Intelligence · MoSPI DIID</div>
            </div>
          </div>

          {/* Status Indicators (center, desktop only) */}
          <div className="header-status">
            <div className="status-chip online">
              <span className="pulse-dot online" />
              Intelligence Engine Online
            </div>
            <div className="status-chip demo">
              <span className="pulse-dot warn" />
              DEMO DATA MODE
            </div>
          </div>

          {/* Right Controls */}
          <div className="header-controls">
            <button
              className="control-btn theme-btn"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="icon-sm" /> : <Sun className="icon-sm" />}
            </button>
            <button className="control-btn" title="Notifications">
              <BellIcon className="icon-sm" />
              <span className="notif-badge">9</span>
            </button>
            <button className="control-btn user-btn" title="User Profile">
              <User className="icon-sm" />
              <span className="user-label">MoSPI Official</span>
              <ChevronDown className="icon-xs" />
            </button>

            {/* Mobile Nav Toggle */}
            <button
              className="control-btn mobile-nav-toggle"
              onClick={() => setMobileNavOpen(o => !o)}
            >
              {mobileNavOpen ? <X className="icon-sm" /> : <Menu className="icon-sm" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── NAVIGATION ── */}
      <nav className={`app-nav ${mobileNavOpen ? 'mobile-open' : ''}`}>
        <div className="nav-inner">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path ||
              (item.path === '/projects' && location.pathname.startsWith('/projects'));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileNavOpen(false)}
              >
                <Icon className="nav-icon" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <main className="page-content">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="app-footer">
        <div className="footer-inner">
          <span>© 2026 Ministry of Statistics and Programme Implementation (MoSPI) — Data Informatics & Innovation Division (DIID)</span>
          <span className="footer-demo">DEMO DATA · Problem Statement ID 26103 · PAIMANA-PREDICT v1.0</span>
        </div>
      </footer>

      {/* Mobile nav overlay */}
      {mobileNavOpen && <div className="nav-overlay" onClick={() => setMobileNavOpen(false)} />}
    </div>
  );
}
