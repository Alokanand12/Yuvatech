import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAIChat } from '../context/AIChatContext';
import { 
  ShieldAlert, Grid, BarChart2, Layers, Cpu, GitBranch, ArrowRight, Activity, TrendingUp
} from 'lucide-react';
import { 
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, 
  Tooltip, CartesianGrid, Cell, BarChart, Bar 
} from 'recharts';
import RiskBadge from '../components/RiskBadge';
import demoProjects from '../data/demoProjects';
import { getRiskAssessment } from '../utils/riskEngine';
import { calculateExpectedDelay } from '../utils/forecastEngine';
import './RiskIntelligence.css';

const RISK_COLORS = {
  LOW: '#10b981',
  WATCH: '#f59e0b',
  HIGH: '#f97316',
  CRITICAL: '#ef4444'
};

export default function RiskIntelligence() {
  const navigate = useNavigate();
  const { openChat } = useAIChat();

  // Process data using engines
  const {
    distribution,
    scatterData,
    topDrivers,
    sectorData,
    topProjects
  } = useMemo(() => {
    let dist = { LOW: 0, WATCH: 0, HIGH: 0, CRITICAL: 0 };
    const driversCount = {};
    const sectorsMap = {};

    const processed = demoProjects.map(p => {
      const risk = getRiskAssessment(p);
      const delayObj = calculateExpectedDelay(p);
      const delayMonths = delayObj.value || 0;
      const costOverrun = p.originalCost > 0 ? ((p.revisedCost - p.originalCost) / p.originalCost) * 100 : 0;

      // Distribution
      if (dist[risk.riskLevel] !== undefined) {
        dist[risk.riskLevel] += 1;
      }

      // Top Drivers
      risk.riskDrivers.forEach(d => {
        driversCount[d.title] = (driversCount[d.title] || 0) + 1;
      });

      // Sectors
      if (!sectorsMap[p.sector]) {
        sectorsMap[p.sector] = { total: 0, highRisk: 0, sumOverrun: 0, sumDelay: 0 };
      }
      sectorsMap[p.sector].total += 1;
      if (risk.riskLevel === 'HIGH' || risk.riskLevel === 'CRITICAL') {
        sectorsMap[p.sector].highRisk += 1;
      }
      sectorsMap[p.sector].sumOverrun += costOverrun;
      sectorsMap[p.sector].sumDelay += delayMonths;

      return { ...p, risk, delayMonths, costOverrun };
    });

    const total = demoProjects.length || 1;
    const distArr = [
      { level: 'LOW', count: dist.LOW, pct: ((dist.LOW / total) * 100).toFixed(1) },
      { level: 'WATCH', count: dist.WATCH, pct: ((dist.WATCH / total) * 100).toFixed(1) },
      { level: 'HIGH', count: dist.HIGH, pct: ((dist.HIGH / total) * 100).toFixed(1) },
      { level: 'CRITICAL', count: dist.CRITICAL, pct: ((dist.CRITICAL / total) * 100).toFixed(1) }
    ];

    const scatter = processed.map(p => ({
      id: p.id,
      name: p.projectName,
      sector: p.sector,
      x: p.risk.timeRisk || 0,
      y: p.risk.costRisk || 0,
      z: p.revisedCost || 100,
      riskLevel: p.risk.riskLevel
    }));

    const driversArr = Object.keys(driversCount)
      .map(k => ({ driver: k, impactScore: driversCount[k] }))
      .sort((a, b) => b.impactScore - a.impactScore)
      .slice(0, 5);

    const secArr = Object.keys(sectorsMap).map(k => {
      const s = sectorsMap[k];
      return {
        sector: k,
        totalProjects: s.total,
        highRiskCount: s.highRisk,
        avgCostOverrunPct: s.total ? (s.sumOverrun / s.total).toFixed(1) : 0,
        avgDelayMonths: s.total ? Math.round(s.sumDelay / s.total) : 0
      };
    }).sort((a, b) => b.highRiskCount - a.highRiskCount);

    const topProj = [...processed]
      .sort((a, b) => b.risk.overallRiskScore - a.risk.overallRiskScore)
      .slice(0, 10);

    return { distribution: distArr, scatterData: scatter, topDrivers: driversArr, sectorData: secArr, topProjects: topProj };
  }, []);

  return (
    <div className="risk-intelligence-page">
      {/* Page Title & Subtitle Banner */}
      <div className="risk-header-banner">
        <div>
          <h1 className="page-title">
            <ShieldAlert className="title-icon" style={{ color: '#f97316' }} />
            Risk Intelligence & Predictive Analytics
          </h1>
          <p className="page-subtitle">
            Systemic risk matrix, sector vulnerability profiling, and predictive infrastructure telemetry
          </p>
        </div>
        <div className="header-meta-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="demo-tag">LIVE ANALYTICS ENGINE</span>
          <button className="btn btn-primary" onClick={openChat}>
            Explain these risks <ArrowRight className="icon-xs" />
          </button>
        </div>
      </div>

      {/* 1. PORTFOLIO RISK DISTRIBUTION */}
      <div className="risk-distrib-strip">
        {distribution.map(d => (
          <div key={d.level} className={`dist-card ${d.level.toLowerCase()}`}>
            <span className="dist-label">{d.level} RISK</span>
            <span className="dist-val font-mono">{d.count}</span>
            <span className="dist-pct font-mono">{d.pct}% of Portfolio</span>
          </div>
        ))}
      </div>

      {/* 2. INTERACTIVE RISK MATRIX (Time Risk vs Cost Risk) */}
      <div className="gov-card matrix-card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Grid className="icon-sm" style={{ color: '#38bdf8' }} />
              National Infrastructure 2D Risk Matrix
            </h3>
            <p className="card-subtitle">
              X-Axis: Time Overrun Risk (%) | Y-Axis: Cost Overrun Risk (%) | Node Size: Revised Cost | Click node to inspect project
            </p>
          </div>
          <span className="demo-tag">SCATTER MATRIX</span>
        </div>

        <div className="matrix-chart-wrapper">
          <ResponsiveContainer width="100%" height={360}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Time Overrun Risk" 
                unit="%" 
                domain={[0, 100]} 
                stroke="#64748b" 
                label={{ value: 'Time Overrun Risk (%) →', position: 'insideBottom', offset: -10, fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Cost Overrun Risk" 
                unit="%" 
                domain={[0, 100]} 
                stroke="#64748b"
                label={{ value: '← Cost Overrun Risk (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
              />
              <ZAxis type="number" dataKey="z" range={[50, 400]} name="Project Revised Cost" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="matrix-tooltip">
                        <div className="tt-header">
                          <span className="tt-name">{data.name}</span>
                          <RiskBadge level={data.riskLevel} />
                        </div>
                        <div className="tt-body">
                          <div>Sector: <strong>{data.sector}</strong></div>
                          <div>Cost Risk: <strong>{data.y}%</strong> | Time Risk: <strong>{data.x}%</strong></div>
                          <div>Revised Cost: <strong>₹{data.z.toLocaleString()} Cr</strong></div>
                        </div>
                        <div className="tt-action">Click point to view intelligence</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                data={scatterData} 
                onClick={(node) => {
                  if (node && node.id) navigate(`/projects/${node.id}`);
                }}
              >
                {scatterData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={RISK_COLORS[entry.riskLevel] || '#38bdf8'} 
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. TOP RISK DRIVERS & 4. SECTOR RISK COMPARISON GRID */}
      <div className="risk-dual-grid">
        {/* Top Risk Drivers */}
        <div className="gov-card">
          <div className="card-header">
            <h3 className="card-title">
              <BarChart2 className="icon-sm" style={{ color: '#f59e0b' }} />
              Top Systemic Risk Drivers
            </h3>
            <span className="demo-tag">AGGREGATED ANOMALIES</span>
          </div>

          <div className="drivers-chart-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={topDrivers} layout="vertical" margin={{ top: 10, right: 20, left: 140, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" fontSize={12} allowDecimals={false} />
                <YAxis dataKey="driver" type="category" stroke="#64748b" fontSize={11} width={130} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#1e293b', borderRadius: '6px' }}
                />
                <Bar dataKey="impactScore" name="Occurrence Frequency" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Risk Comparison */}
        <div className="gov-card">
          <div className="card-header">
            <h3 className="card-title">
              <Layers className="icon-sm" style={{ color: '#0284c7' }} />
              Sector Vulnerability Profile
            </h3>
            <span className="demo-tag">SECTORAL PROFILE</span>
          </div>

          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Sector</th>
                  <th>Projects</th>
                  <th>High/Crit Risk</th>
                  <th>Avg Cost Overrun</th>
                  <th>Avg Expected Delay</th>
                </tr>
              </thead>
              <tbody>
                {sectorData.map(s => (
                  <tr key={s.sector}>
                    <td className="font-bold">{s.sector}</td>
                    <td className="font-mono">{s.totalProjects}</td>
                    <td className="font-mono alert-text font-bold">{s.highRiskCount}</td>
                    <td className="font-mono">+{s.avgCostOverrunPct}%</td>
                    <td className="font-mono text-muted">+{s.avgDelayMonths} Mos</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. HIGHEST RISK PROJECTS */}
      <div className="gov-card top-projects-section">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <TrendingUp className="icon-sm" style={{ color: '#ef4444' }} />
              Highest Risk Infrastructure Projects
            </h3>
            <p className="card-subtitle">
              Top 10 projects sorted by overall deterministic risk score
            </p>
          </div>
          <span className="demo-tag">WATCHLIST</span>
        </div>

        <div className="gov-table-container">
          <table className="gov-table clickable-rows">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Sector</th>
                <th>Risk Score</th>
                <th>Risk Level</th>
                <th>Primary Driver</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {topProjects.map(p => (
                <tr key={p.id} onClick={() => navigate(`/projects/${p.id}`)}>
                  <td className="font-bold">{p.projectName}</td>
                  <td>{p.sector}</td>
                  <td className="font-mono font-bold" style={{ color: '#ef4444' }}>{p.risk.overallRiskScore}/100</td>
                  <td><RiskBadge level={p.risk.riskLevel} /></td>
                  <td className="text-muted">{p.risk.riskDrivers.length > 0 ? p.risk.riskDrivers[0].title : 'None'}</td>
                  <td>
                    <button className="gov-btn gov-btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. PREDICTIVE METHODOLOGY */}
      <div className="gov-card methodology-section">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Cpu className="icon-sm" style={{ color: '#10b981' }} />
              Predictive Architecture Methodology
            </h3>
            <p className="card-subtitle">
              Comparison between current rule-based demonstration and future production ML pipelines
            </p>
          </div>
          <span className="demo-tag">SYSTEM ARCHITECTURE</span>
        </div>

        <div className="methodology-grid">
          {/* CURRENT PROTOTYPE */}
          <div className="meth-column prototype">
            <div className="meth-col-header">
              <h4>CURRENT PROTOTYPE</h4>
              <span className="meth-badge current">Deterministic Rules Engine</span>
            </div>
            <div className="flow-container">
              <div className="flow-step">Project Data (Static)</div>
              <ArrowRight className="flow-arrow" />
              <div className="flow-step">Rule-Based Risk Engine</div>
              <ArrowRight className="flow-arrow" />
              <div className="flow-step">Prototype Forecast</div>
              <ArrowRight className="flow-arrow" />
              <div className="flow-step">Risk Score & Early Warning</div>
              <ArrowRight className="flow-arrow" />
              <div className="flow-step">Decision Support Recommendation</div>
            </div>
          </div>

          {/* FUTURE PRODUCTION */}
          <div className="meth-column production">
            <div className="meth-col-header">
              <h4>FUTURE PRODUCTION</h4>
              <span className="meth-badge future">Machine Learning Pipeline</span>
            </div>
            <div className="flow-container">
              <div className="flow-step future">Historical OCMS + PAIMANA Data</div>
              <ArrowRight className="flow-arrow future" />
              <div className="flow-step future">Statistical Baseline Generation</div>
              <ArrowRight className="flow-arrow future" />
              <div className="flow-step future">Machine Learning (Gradient Boosting)</div>
              <ArrowRight className="flow-arrow future" />
              <div className="flow-step future">Hybrid Risk Engine</div>
            </div>
          </div>
        </div>

        <div className="disclaimer-banner meth-disclaimer">
          <Activity className="disclaimer-icon" />
          <div className="disclaimer-text">
            <strong>IMPORTANT ARCHITECTURAL NOTICE:</strong> Real ML evaluation requires historical labelled project data. Current prototype predictions and "AI" terminologies represent deterministic rule-based algorithms for interface demonstration purposes only.
          </div>
        </div>
      </div>

    </div>
  );
}
