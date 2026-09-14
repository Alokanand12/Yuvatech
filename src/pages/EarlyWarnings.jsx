import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Filter, AlertTriangle, ShieldAlert, Eye, CheckCircle2, RefreshCw } from 'lucide-react';
import RiskBadge from '../components/RiskBadge';
import WarningModal from '../components/WarningModal';
import { generateWarnings } from '../utils/warningEngine';
import './EarlyWarnings.css';

export default function EarlyWarnings() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedSector, setSelectedSector] = useState('ALL');

  const [activeModalWarning, setActiveModalWarning] = useState(null);
  
  // State for all warnings dynamically generated
  const [warnings, setWarnings] = useState([]);
  
  // State for tracking persisted statuses mapping (warningId -> status)
  const [warningStatuses, setWarningStatuses] = useState({});

  // Initialize warnings and load statuses from localStorage
  useEffect(() => {
    // Generate warnings dynamically from data
    const dynamicWarnings = generateWarnings();
    
    // Load persisted statuses
    const storedStatuses = JSON.parse(localStorage.getItem('paimanaWarningStatuses') || '{}');
    
    // Map stored statuses to warnings
    const updatedWarnings = dynamicWarnings.map(w => ({
      ...w,
      status: storedStatuses[w.id] || 'NEW'
    }));
    
    setWarnings(updatedWarnings);
    setWarningStatuses(storedStatuses);
  }, []);

  // Handle status update
  const handleUpdateStatus = (warningId, newStatus) => {
    const newStatuses = { ...warningStatuses, [warningId]: newStatus };
    setWarningStatuses(newStatuses);
    localStorage.setItem('paimanaWarningStatuses', JSON.stringify(newStatuses));
    
    // Update local state list
    setWarnings(prev => prev.map(w => w.id === warningId ? { ...w, status: newStatus } : w));
    
    // Update active modal warning if open
    if (activeModalWarning && activeModalWarning.id === warningId) {
      setActiveModalWarning(prev => ({ ...prev, status: newStatus }));
    }
  };

  const filteredWarnings = useMemo(() => {
    return warnings.filter(w => {
      const matchSearch = 
        w.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.projectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.ministry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.detectedSignal.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchType = selectedType === 'ALL' || w.warningType === selectedType;
      const matchSeverity = selectedSeverity === 'ALL' || w.severity === selectedSeverity;
      const matchStatus = selectedStatus === 'ALL' || w.status === selectedStatus;
      const matchSector = selectedSector === 'ALL' || w.sector === selectedSector;

      return matchSearch && matchType && matchSeverity && matchStatus && matchSector;
    });
  }, [warnings, searchTerm, selectedType, selectedSeverity, selectedStatus, selectedSector]);

  // Derive unique sectors for filter
  const sectors = useMemo(() => [...new Set(warnings.map(w => w.sector))], [warnings]);

  return (
    <div className="early-warnings-page">
      {/* Page Banner */}
      <div className="ew-header-banner">
        <div>
          <h1 className="page-title">
            <Bell className="title-icon" style={{ color: '#ef4444' }} />
            Early Warnings Command Center
          </h1>
          <p className="page-subtitle">
            Automated CUF anomaly detection engine triggering real-time risk alerts across national infrastructure projects
          </p>
        </div>
        <div className="header-meta-group">
          <span className="demo-tag">LIVE ALERT ENGINE</span>
          <span className="alert-count-pill">{warnings.length} Total Triggers</span>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="ew-toolbar">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            className="gov-input search-input"
            placeholder="Search warnings by project name, ID, ministry or trigger keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="ew-filters">
          <div className="filter-group">
            <label>Warning Type</label>
            <select
              className="gov-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="ALL">All Warning Types</option>
              <option value="COST ESCALATION">COST ESCALATION</option>
              <option value="TIME DELAY">TIME DELAY</option>
              <option value="MILESTONE DELAY">MILESTONE DELAY</option>
              <option value="EXECUTION RISK">EXECUTION RISK</option>
              <option value="FINANCIAL-PHYSICAL MISMATCH">FINANCIAL-PHYSICAL MISMATCH</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Severity Level</label>
            <select
              className="gov-select"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select
              className="gov-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">NEW</option>
              <option value="UNDER REVIEW">UNDER REVIEW</option>
              <option value="MONITORED">MONITORED</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sector</label>
            <select
              className="gov-select"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
            >
              <option value="ALL">All Sectors</option>
              {sectors.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Warning Cards Grid */}
      <div className="warnings-cards-grid">
        {filteredWarnings.length === 0 ? (
          <div className="empty-warnings-box">
            No active early warning alerts match the selected search and filter criteria.
          </div>
        ) : (
          filteredWarnings.map((w) => (
            <div 
              key={w.id} 
              className={`warning-card-main ${w.severity.toLowerCase()} status-${w.status.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setActiveModalWarning(w)}
            >
              <div className="w-card-header">
                <div className="w-card-type-row">
                  <span className="w-type-label">{w.warningType}</span>
                  <div className="w-card-badges">
                    <span className={`w-status-badge ${w.status.replace(/\s+/g, '-').toLowerCase()}`}>{w.status}</span>
                    <RiskBadge level={w.severity} />
                  </div>
                </div>
                <h3 className="w-card-title">{w.projectName}</h3>
                <span className="w-card-meta">{w.projectId} • {w.ministry}</span>
              </div>

              <div className="w-card-body">
                <div className="w-field">
                  <span className="w-field-label">
                    <AlertTriangle className="icon-xs" style={{ color: '#ef4444' }} />
                    Detected Trigger Anomaly:
                  </span>
                  <p className="w-field-text">{w.detectedSignal}</p>
                </div>

                <div className="w-field">
                  <span className="w-field-label">
                    <ShieldAlert className="icon-xs" style={{ color: '#f59e0b' }} />
                    Predicted Impact:
                  </span>
                  <p className="w-field-text">{w.potentialImpact}</p>
                </div>

                <div className="w-field">
                  <span className="w-field-label">
                    <CheckCircle2 className="icon-xs" style={{ color: '#10b981' }} />
                    Recommended Action:
                  </span>
                  <p className="w-field-text action">{w.recommendedAction}</p>
                </div>
              </div>

              <div className="w-card-footer">
                <span className="w-date font-mono">Detected: {w.detectedDate}</span>
                <button 
                  className="gov-btn gov-btn-secondary view-detail-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalWarning(w);
                  }}
                >
                  <Eye className="icon-xs" />
                  Inspect Warning
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Drawer */}
      <WarningModal
        warning={activeModalWarning}
        onClose={() => setActiveModalWarning(null)}
        onNavigateProject={(projId) => navigate(`/projects/${projId}`)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
