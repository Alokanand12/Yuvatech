import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAIChat } from '../context/AIChatContext';
import { Search, Filter, ArrowUpDown, Download, ArrowRight } from 'lucide-react';
import RiskBadge from '../components/RiskBadge';
import { projects } from '../data/projects';
import './Projects.css';

const SECTORS = ['All Sectors', ...new Set(projects.map(p => p.sector))];
const RISK_LEVELS = ['All Risk Levels', 'CRITICAL', 'HIGH', 'WATCH', 'LOW'];
const STATES = ['All States', ...new Set(projects.map(p => p.state)).values()].sort();
const MINISTRIES = ['All Ministries', ...new Set(projects.map(p => p.ministry))].slice(0, 12);

function fmt(n) {
  if (n >= 100000) return `₹${(n/100000).toFixed(1)}L Cr`;
  return `₹${n.toLocaleString()} Cr`;
}

export default function Projects() {
  const navigate = useNavigate();
  const { openChat } = useAIChat();
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('All Sectors');
  const [riskFilter, setRiskFilter] = useState('All Risk Levels');
  const [state, setState] = useState('All States');
  const [sortBy, setSortBy] = useState('riskScore');
  const [sortDir, setSortDir] = useState('desc');

  const toggleSort = (field) => {
    if (sortBy === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortDir('desc'); }
  };

  const filtered = useMemo(() => {
    return projects
      .filter(p => {
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()) &&
          !p.id.toLowerCase().includes(search.toLowerCase()) &&
          !p.ministry.toLowerCase().includes(search.toLowerCase()) &&
          !p.agency.toLowerCase().includes(search.toLowerCase())) return false;
        if (sector !== 'All Sectors' && p.sector !== sector) return false;
        if (riskFilter !== 'All Risk Levels' && p.riskLevel !== riskFilter) return false;
        if (state !== 'All States' && p.state !== state) return false;
        return true;
      })
      .sort((a, b) => {
        let va = a[sortBy], vb = b[sortBy];
        if (typeof va === 'string') va = va.toLowerCase(), vb = vb.toLowerCase();
        if (va < vb) return sortDir === 'asc' ? -1 : 1;
        if (va > vb) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
  }, [search, sector, riskFilter, state, sortBy, sortDir]);

  const SortTh = ({ field, children }) => (
    <th onClick={() => toggleSort(field)} className="sortable-th">
      <span>{children}</span>
      <ArrowUpDown className="icon-xs sort-icon" style={{ opacity: sortBy === field ? 1 : 0.35 }} />
    </th>
  );

  return (
    <div className="projects-page">
      {/* ── Header ── */}
      <div className="page-header">
        <div>
          <h1 className="page-title-main">Project Registry</h1>
          <p className="page-subtitle-main">
            {filtered.length} of {projects.length} demo projects shown &nbsp;·&nbsp;
            <span className="demo-tag">DEMO DATA</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary" onClick={openChat}>
            Find risky projects <ArrowRight className="icon-xs" />
          </button>
          <button className="btn btn-secondary" title="Export (demo — no actual file)">
            <Download className="icon-sm" /> Export CSV
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="card filters-card">
        <div className="filters-row">
          <div className="search-wrap">
            <Search className="search-icon icon-sm" />
            <input
              className="form-input search-input"
              placeholder="Search by name, ID, ministry, agency…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="form-select filter-select" value={sector} onChange={e => setSector(e.target.value)}>
            {SECTORS.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="form-select filter-select" value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
            {RISK_LEVELS.map(r => <option key={r}>{r}</option>)}
          </select>
          <select className="form-select filter-select" value={state} onChange={e => setState(e.target.value)}>
            {STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* ── Risk Distribution Strip ── */}
      <div className="risk-strip">
        {['CRITICAL', 'HIGH', 'WATCH', 'LOW'].map(level => {
          const cnt = filtered.filter(p => p.riskLevel === level).length;
          return (
            <div
              key={level}
              className={`risk-strip-item lev-${level.toLowerCase()} ${riskFilter === level ? 'active' : ''}`}
              onClick={() => setRiskFilter(riskFilter === level ? 'All Risk Levels' : level)}
            >
              <span className="rs-count">{cnt}</span>
              <span className="rs-label">{level}</span>
            </div>
          );
        })}
      </div>

      {/* ── Table ── */}
      <div className="card table-card">
        <div className="table-wrap">
          <table className="data-table projects-table">
            <thead>
              <tr>
                <th>Project ID</th>
                <SortTh field="name">Project Name</SortTh>
                <SortTh field="ministry">Ministry / Agency</SortTh>
                <SortTh field="sector">Sector</SortTh>
                <SortTh field="riskScore">AI Risk Score</SortTh>
                <SortTh field="physicalProgress">Physical %</SortTh>
                <SortTh field="financialProgress">Financial %</SortTh>
                <SortTh field="revisedCost">Revised Cost</SortTh>
                <SortTh field="expectedDelayMonths">Exp. Delay</SortTh>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const gap = p.financialProgress - p.physicalProgress;
                return (
                  <tr key={p.id} onClick={() => navigate(`/projects/${p.id}`)}>
                    <td>
                      <span className="proj-id font-mono">{p.id}</span>
                    </td>
                    <td>
                      <div className="proj-name-cell">
                        <span className="text-bold" style={{ fontSize: '0.8rem' }}>{p.name}</span>
                        <span className="text-xs text-muted">{p.state}</span>
                      </div>
                    </td>
                    <td>
                      <div className="proj-name-cell">
                        <span className="text-sm">{p.agency}</span>
                        <span className="text-xs text-muted">{p.ministry.replace('Ministry of ', 'Min. ')}</span>
                      </div>
                    </td>
                    <td className="text-sm text-secondary">{p.sector}</td>
                    <td>
                      <div className="score-cell">
                        <span className="score-num font-mono">{p.riskScore}</span>
                        <RiskBadge level={p.riskLevel} />
                      </div>
                    </td>
                    <td>
                      <div className="progress-col">
                        <span className="font-mono text-sm">{p.physicalProgress}%</span>
                        <div className="progress-track mini">
                          <div className="progress-fill phys" style={{ width: `${p.physicalProgress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="progress-col">
                        <span className={`font-mono text-sm ${Math.abs(gap) > 6 ? 'text-warning' : ''}`}>
                          {p.financialProgress}%
                        </span>
                        <div className="progress-track mini">
                          <div className="progress-fill fin" style={{ width: `${p.financialProgress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-sm">{fmt(p.revisedCost)}</td>
                    <td>
                      {p.expectedDelayMonths > 0
                        ? <span className="delay-chip text-warning font-mono">+{p.expectedDelayMonths}m</span>
                        : <span className="delay-chip on-time">On Time</span>
                      }
                    </td>
                    <td>
                      <span className={`status-pill ${p.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <ArrowRight className="icon-sm text-muted" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty-state">
              <Search className="empty-icon" />
              <p>No projects match your filters.</p>
            </div>
          )}
        </div>
      </div>

      <p className="footnote-text">
        Showing {filtered.length} demo projects. Full PAIMANA-PREDICT platform monitors {(1981).toLocaleString()} central sector projects.
      </p>
    </div>
  );
}
