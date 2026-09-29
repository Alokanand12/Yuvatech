import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderGit2, ShieldAlert, Bell, Bot } from 'lucide-react';
import './Navigation.css';

export default function Navigation() {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/projects', label: 'Projects', icon: FolderGit2 },
    { path: '/risk-intelligence', label: 'Risk Intelligence', icon: ShieldAlert },
    { path: '/early-warnings', label: 'Early Warnings', icon: Bell },
    { path: '/ai-assistant', label: 'AI Assistant', icon: Bot },
  ];

  return (
    <nav className="gov-nav">
      <div className="gov-nav-content">
        <ul className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  end={item.path === '/'}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
