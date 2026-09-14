import React from 'react';
import { X, AlertTriangle, Building2, Calendar, ShieldAlert, ArrowRight, CheckCircle2, Activity } from 'lucide-react';
import RiskBadge from './RiskBadge';
import './WarningModal.css';

export default function WarningModal({ warning, onClose, onNavigateProject, onUpdateStatus }) {
  if (!warning) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-strip">
          <div className="modal-title-group">
            <span className="w-type-tag">{warning.warningType}</span>
            <h2 className="modal-headline">{warning.projectName}</h2>
            <div className="modal-sub-meta">
              <span><Building2 className="icon-xs" /> {warning.ministry}</span>
              <span><Calendar className="icon-xs" /> Detected: {warning.detectedDate}</span>
            </div>
          </div>
          <div className="modal-actions">
            <RiskBadge level={warning.severity} />
            <button className="close-btn" onClick={onClose}>
              <X className="icon-sm" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scroll">
          {/* Status Controls */}
          <div className="modal-section-box status-control-box">
            <div className="sec-title">
              <Activity className="icon-sm" style={{ color: '#38bdf8' }} />
              Alert Lifecycle Management
            </div>
            <div className="status-buttons-row">
              {['NEW', 'UNDER REVIEW', 'MONITORED', 'RESOLVED'].map(status => (
                <button
                  key={status}
                  className={`status-select-btn ${warning.status === status ? 'active' : ''} ${status.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => onUpdateStatus && onUpdateStatus(warning.id, status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Anomaly Trigger Section */}
          <div className="modal-section-box alert">
            <div className="sec-title">
              <AlertTriangle className="icon-sm" style={{ color: '#ef4444' }} />
              Telemetry Anomaly Trigger
            </div>
            <p className="sec-desc">{warning.detectedSignal}</p>
          </div>

          {/* Predicted Impact */}
          <div className="modal-section-box warning">
            <div className="sec-title">
              <ShieldAlert className="icon-sm" style={{ color: '#f59e0b' }} />
              Predicted Project Impact
            </div>
            <p className="sec-desc">{warning.potentialImpact}</p>
          </div>

          {/* Recommended Intervention */}
          <div className="modal-section-box success">
            <div className="sec-title">
              <CheckCircle2 className="icon-sm" style={{ color: '#10b981' }} />
              Recommended Administrative Action
            </div>
            <p className="sec-desc">{warning.recommendedAction}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer-strip">
          <button 
            className="gov-btn gov-btn-secondary"
            onClick={onClose}
          >
            Close Modal
          </button>

          <button 
            className="gov-btn gov-btn-primary"
            onClick={() => {
              onClose();
              if (onNavigateProject) onNavigateProject(warning.projectId);
            }}
          >
            Open Project Intelligence
            <ArrowRight className="icon-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}
