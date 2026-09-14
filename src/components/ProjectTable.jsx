import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, ChevronRight, Eye } from 'lucide-react';
import RiskBadge from './RiskBadge';
import './ProjectTable.css';

export default function ProjectTable({ projects }) {
  const navigate = useNavigate();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('ALL');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  
  // Sorting State
  const [sortField, setSortField] = useState('riskScore');
  const [sortOrder, setSortOrder] = useState('desc');

  // Extract unique filter lists
  const ministries = useMemo(() => {
    const set = new Set(projects.map(p => p.ministry));
    return ['ALL', ...Array.from(set).sort()];
  }, [projects]);

  const sectors = useMemo(() => {
    const set = new Set(projects.map(p => p.sector));
    return ['ALL', ...Array.from(set).sort()];
  }, [projects]);

  const states = useMemo(() => {
    const set = new Set(projects.map(p => p.state));
    return ['ALL', ...Array.from(set).sort()];
  }, [projects]);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.agency.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchMinistry = selectedMinistry === 'ALL' || p.ministry === selectedMinistry;
      const matchSector = selectedSector === 'ALL' || p.sector === selectedSector;
      const matchState = selectedState === 'ALL' || p.state === selectedState;
      const matchRisk = selectedRisk === 'ALL' || p.riskLevel === selectedRisk;
      const matchStatus = selectedStatus === 'ALL' || p.status === selectedStatus;

      return matchSearch && matchMinistry && matchSector && matchState && matchRisk && matchStatus;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [projects, searchTerm, selectedMinistry, selectedSector, selectedState, selectedRisk, selectedStatus, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="project-table-wrapper">
      {/* Search & Filter Toolbar */}
      <div className="table-toolbar">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            className="gov-input search-input"
            placeholder="Search by project name, ID or implementing agency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-grid">
          <div className="filter-group">
            <label>Ministry</label>
            <select
              className="gov-select"
              value={selectedMinistry}
              onChange={(e) => setSelectedMinistry(e.target.value)}
            >
              {ministries.map(m => (
                <option key={m} value={m}>{m === 'ALL' ? 'All Ministries' : m}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sector</label>
            <select
              className="gov-select"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
            >
              {sectors.map(s => (
                <option key={s} value={s}>{s === 'ALL' ? 'All Sectors' : s}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>State</label>
            <select
              className="gov-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {states.map(st => (
                <option key={st} value={st}>{st === 'ALL' ? 'All States' : st}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Risk Level</label>
            <select
              className="gov-select"
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
            >
              <option value="ALL">All Risk Levels</option>
              <option value="LOW">LOW</option>
              <option value="WATCH">WATCH</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">CRITICAL</option>
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
              <option value="On Schedule">On Schedule</option>
              <option value="Delayed">Delayed</option>
              <option value="Cost Escalated">Cost Escalated</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="table-summary-bar">
        <span>Showing <strong>{filteredProjects.length}</strong> of <strong>{projects.length}</strong> Projects</span>
        <span className="demo-tag">MoSPI CUF DATASET</span>
      </div>

      {/* Main Table */}
      <div className="gov-table-container">
        <table className="gov-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Project Name <ArrowUpDown className="inline-icon" />
              </th>
              <th onClick={() => handleSort('ministry')}>Ministry</th>
              <th onClick={() => handleSort('sector')}>Sector</th>
              <th onClick={() => handleSort('state')}>State</th>
              <th onClick={() => handleSort('originalCost')}>Orig. Cost (₹ Cr)</th>
              <th onClick={() => handleSort('revisedCost')}>Rev. Cost (₹ Cr)</th>
              <th onClick={() => handleSort('physicalProgress')}>Physical %</th>
              <th onClick={() => handleSort('financialProgress')}>Financial %</th>
              <th onClick={() => handleSort('riskScore')}>
                Risk Score <ArrowUpDown className="inline-icon" />
              </th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="11" className="empty-row">
                  No projects found matching the selected filters.
                </td>
              </tr>
            ) : (
              filteredProjects.map((p) => {
                const isGapHigh = (p.financialProgress - p.physicalProgress) > 10;
                return (
                  <tr key={p.id} onClick={() => navigate(`/projects/${p.id}`)}>
                    <td className="font-bold">
                      <div className="prj-name-cell">
                        <span>{p.name}</span>
                        <span className="prj-id-sub">{p.id} • {p.agency}</span>
                      </div>
                    </td>
                    <td className="text-muted">{p.ministry}</td>
                    <td>
                      <span className="sector-tag">{p.sector}</span>
                    </td>
                    <td>{p.state}</td>
                    <td className="font-mono">₹{p.originalCost.toLocaleString()}</td>
                    <td className="font-mono">
                      ₹{p.revisedCost.toLocaleString()}
                      {p.revisedCost > p.originalCost && (
                        <span className="cost-overrun-pct">
                          (+{Math.round(((p.revisedCost - p.originalCost) / p.originalCost) * 100)}%)
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="progress-cell">
                        <div className="progress-bar-track">
                          <div 
                            className="progress-fill physical" 
                            style={{ width: `${p.physicalProgress}%` }}
                          />
                        </div>
                        <span className="progress-val">{p.physicalProgress}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="progress-cell">
                        <div className="progress-bar-track">
                          <div 
                            className={`progress-fill financial ${isGapHigh ? 'gap-alert' : ''}`} 
                            style={{ width: `${p.financialProgress}%` }}
                          />
                        </div>
                        <span className="progress-val">{p.financialProgress}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="risk-score-cell">
                        <span className="risk-score-num">{p.riskScore}</span>
                        <RiskBadge level={p.riskLevel} />
                      </div>
                    </td>
                    <td>
                      <span className={`status-pill ${p.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="gov-btn gov-btn-secondary view-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/projects/${p.id}`);
                        }}
                      >
                        <Eye className="icon-xs" />
                        Intelligence
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
