import React from 'react';
import './KPICard.css';

export default function KPICard({ title, value, subtext, trend, icon: Icon, type = 'normal' }) {
  return (
    <div className={`kpi-card ${type}`}>
      <div className="kpi-top">
        <span className="kpi-title">{title}</span>
        {Icon && (
          <div className="kpi-icon-wrapper">
            <Icon className="kpi-icon" />
          </div>
        )}
      </div>
      <div className="kpi-value">{value}</div>
      {(subtext || trend) && (
        <div className="kpi-bottom">
          {trend && (
            <span className={`kpi-trend ${trend.startsWith('+') ? 'up' : 'down'}`}>
              {trend}
            </span>
          )}
          {subtext && <span className="kpi-subtext">{subtext}</span>}
        </div>
      )}
    </div>
  );
}
