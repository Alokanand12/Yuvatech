import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, AlertTriangle, Bell, IndianRupee, TrendingUp,
  Activity, ArrowRight, ShieldAlert, ChevronRight, BarChart3,
  DollarSign, Clock, Zap, Info
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import RiskBadge from '../components/RiskBadge';
import demoProjects from '../data/demoProjects';
import { getRiskAssessment } from '../utils/riskEngine';
import { calculateExpectedDelay, calculatePredictedFinalCost } from '../utils/forecastEngine';
import { generateWarnings } from '../utils/warningEngine';
import './Dashboard.css';

// ── Palette matches the design system token colors ──────────────────────────
const RISK_COLORS = {
  LOW:      '#607a5c',
  WATCH:    '#b8872f',
  HIGH:     '#c66b32',
  CRITICAL: '#a8463f',
};

// ── Format crores helper ─────────────────────────────────────────────────────
function formatCr(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} Lakh Cr`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(1)}K Cr`;
  return `₹${n} Cr`;
}

// ── Custom Tooltip ────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="ct-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="ct-row">
          <span className="ct-dot" style={{ background: p.color || p.fill }} />
          <span>{p.name}: <strong>{p.value}</strong></span>
        </div>
      ))}
    </div>
  );
}

// ── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ title, value, subtext, trend, icon: Icon, variant }) {
  return (
    <div className={`kpi-card ${variant || ''}`}>
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <div className={`kpi-icon-ring ${variant || ''}`}>
          {Icon && <Icon width={16} height={16} />}
        </div>
      </div>
      <div className="kpi-value font-mono">{value}</div>
      {(subtext || trend) && (
        <div className="kpi-footer">
          {trend && <span className={`kpi-trend ${trend.startsWith('+') ? 'up' : 'down'}`}>{trend}</span>}
          {subtext && <span className="kpi-sub">{subtext}</span>}
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();

  // ── Compute everything from centralized dataset ────────────────────────────
  const {
    kpis,
    riskDistribution,
    sectorRisk,
    costEscalationByType,
    progressComparison,
    priorityProjects,
    recentWarnings,
  } = useMemo(() => {

    // Enrich every project
    const enriched = demoProjects.map(p => {
      const risk = getRiskAssessment(p);
      const delay = calculateExpectedDelay(p);
      const forecast = calculatePredictedFinalCost(p);
      const costEscPct = p.originalCost > 0
        ? Math.round(((p.revisedCost - p.originalCost) / p.originalCost) * 100)
        : 0;
      return { ...p, risk, delayMonths: delay.value, forecastCost: forecast.value, costEscPct };
    });

    // KPIs
    const totalProjects   = enriched.length;
    const criticalProjects = enriched.filter(p => p.risk.riskLevel === 'CRITICAL').length;
    const highRiskProjects = enriched.filter(p => p.risk.riskLevel === 'HIGH' || p.risk.riskLevel === 'CRITICAL').length;
    const costRiskProjects = enriched.filter(p => p.risk.costRisk > 60).length;
    const delayRiskProjects = enriched.filter(p => p.risk.timeRisk > 60).length;

    const totalOriginalCost  = enriched.reduce((s, p) => s + (p.originalCost  || 0), 0);
    const totalRevisedCost   = enriched.reduce((s, p) => s + (p.revisedCost   || 0), 0);
    const totalExpenditure   = enriched.reduce((s, p) => s + (p.expenditure   || 0), 0);
    const overallEscPct = totalOriginalCost > 0
      ? ((totalRevisedCost - totalOriginalCost) / totalOriginalCost * 100).toFixed(1)
      : 0;
    const expenditurePct = totalRevisedCost > 0
      ? ((totalExpenditure / totalRevisedCost) * 100).toFixed(1)
      : 0;

    // Risk distribution for donut
    const dist = { LOW: 0, WATCH: 0, HIGH: 0, CRITICAL: 0 };
    enriched.forEach(p => { if (dist[p.risk.riskLevel] !== undefined) dist[p.risk.riskLevel]++; });
    const riskDistribution = [
      { name: 'LOW',      value: dist.LOW,      color: RISK_COLORS.LOW      },
      { name: 'WATCH',    value: dist.WATCH,    color: RISK_COLORS.WATCH    },
      { name: 'HIGH',     value: dist.HIGH,     color: RISK_COLORS.HIGH     },
      { name: 'CRITICAL', value: dist.CRITICAL, color: RISK_COLORS.CRITICAL },
    ].filter(d => d.value > 0);

    // Sector risk aggregation
    const sectMap = {};
    enriched.forEach(p => {
      if (!sectMap[p.sector]) sectMap[p.sector] = { sumRisk: 0, count: 0, costEsc: 0 };
      sectMap[p.sector].sumRisk += p.risk.overallRiskScore;
      sectMap[p.sector].costEsc += p.costEscPct;
      sectMap[p.sector].count++;
    });
    const sectorRisk = Object.entries(sectMap)
      .map(([sector, d]) => ({
        sector: sector.length > 18 ? sector.slice(0, 16) + '…' : sector,
        riskScore:      Math.round(d.sumRisk / d.count),
        avgCostEsc:     Math.round(d.costEsc / d.count),
      }))
      .sort((a, b) => b.riskScore - a.riskScore);

    // Cost: Original vs Revised vs Forecast (top 8 projects by revised cost)
    const costEscalationByType = [...enriched]
      .sort((a, b) => b.revisedCost - a.revisedCost)
      .slice(0, 8)
      .map(p => ({
        name: p.projectName.split(' ').slice(0, 3).join(' '),
        Original: p.originalCost,
        Revised:  p.revisedCost,
        Forecast: p.forecastCost,
      }));

    // Physical vs Financial progress across all projects (grouped by risk level)
    const byRisk = { LOW: { ph: 0, fi: 0, n: 0 }, WATCH: { ph: 0, fi: 0, n: 0 }, HIGH: { ph: 0, fi: 0, n: 0 }, CRITICAL: { ph: 0, fi: 0, n: 0 } };
    enriched.forEach(p => {
      const rl = p.risk.riskLevel;
      if (byRisk[rl]) {
        byRisk[rl].ph += p.physicalProgress;
        byRisk[rl].fi += p.financialProgress;
        byRisk[rl].n++;
      }
    });
    const progressComparison = Object.entries(byRisk)
      .filter(([, d]) => d.n > 0)
      .map(([level, d]) => ({
        level,
        'Physical Progress': Math.round(d.ph / d.n),
        'Financial Progress': Math.round(d.fi / d.n),
      }));

    // Priority projects (top 10 by overall risk score)
    const priorityProjects = [...enriched]
      .sort((a, b) => b.risk.overallRiskScore - a.risk.overallRiskScore)
      .slice(0, 10);

    // Live warnings from warningEngine
    const allWarnings = generateWarnings();
    const recentWarnings = allWarnings
      .filter(w => w.severity === 'CRITICAL' || w.severity === 'HIGH')
      .slice(0, 4);

    return {
      kpis: {
        totalProjects,
        criticalProjects,
        highRiskProjects,
        costRiskProjects,
        delayRiskProjects,
        totalOriginalCost,
        totalRevisedCost,
        totalExpenditure,
        overallEscPct,
        expenditurePct,
      },
      riskDistribution,
      sectorRisk,
      costEscalationByType,
      progressComparison,
      priorityProjects,
      recentWarnings,
    };
  }, []);

  return (
    <div className="dashboard-page">

      {/* ── DEMO DATA NOTICE ── */}
      <div className="demo-notice-banner">
        <Info className="demo-notice-icon" />
        <span>
          <strong>DEMO DATA:</strong> These are synthetic demonstration records and are not official PAIMANA data.
          All metrics are derived from a prototype dataset of {kpis.totalProjects} infrastructure projects.
        </span>
      </div>

      {/* ── Page Header ── */}
      <div className="page-header">
        <div>
          <h1 className="page-title-main">
            <Activity width={22} height={22} className="text-accent" />
            National Infrastructure Portfolio Overview
          </h1>
          <p className="page-subtitle-main">
            Central Sector projects (≥ ₹150 Cr) monitored by MoSPI · Q4 FY2025–26 ·{' '}
            <span className="demo-tag">DEMO DATA</span>
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/ai-assistant')}>
          Ask Intelligence Assistant <ArrowRight className="icon-xs" />
        </button>
      </div>

      {/* ── KPI Grid — 8 Dynamic Metrics ── */}
      <div className="kpi-grid">
        <KpiCard
          title="Total Projects Monitored"
          value={kpis.totalProjects.toLocaleString()}
          subtext="Demo portfolio — all sectors"
          icon={Building2}
        />
        <KpiCard
          title="High Risk Projects"
          value={kpis.highRiskProjects.toLocaleString()}
          subtext="HIGH + CRITICAL combined"
          trend={`+${kpis.highRiskProjects} flagged`}
          icon={AlertTriangle}
          variant="warning"
        />
        <KpiCard
          title="Critical Projects"
          value={kpis.criticalProjects.toLocaleString()}
          subtext="Requiring immediate action"
          trend={`${kpis.criticalProjects} alerts`}
          icon={ShieldAlert}
          variant="critical"
        />
        <KpiCard
          title="Cost Risk Projects"
          value={kpis.costRiskProjects.toLocaleString()}
          subtext="Cost Risk Score > 60"
          icon={DollarSign}
          variant="warning"
        />
        <KpiCard
          title="Delay Risk Projects"
          value={kpis.delayRiskProjects.toLocaleString()}
          subtext="Time Risk Score > 60"
          icon={Clock}
        />
        <KpiCard
          title="Total Original Cost"
          value={formatCr(kpis.totalOriginalCost)}
          subtext="Sanctioned DPR baselines"
          icon={IndianRupee}
        />
        <KpiCard
          title="Total Revised Cost"
          value={formatCr(kpis.totalRevisedCost)}
          subtext="Approved revisions"
          trend={`+${kpis.overallEscPct}% escalation`}
          icon={TrendingUp}
          variant="warning"
        />
        <KpiCard
          title="Total Expenditure"
          value={formatCr(kpis.totalExpenditure)}
          subtext={`${kpis.expenditurePct}% of revised cost`}
          icon={Activity}
        />
      </div>

      {/* ── Row 1: Risk Distribution Donut + Portfolio Snapshot Bars ── */}
      <div className="portfolio-snapshot">

        {/* Portfolio Snapshot progress bars */}
        <div className="card snap-card">
          <div className="card-header">
            <h3 className="card-title"><BarChart3 className="icon-sm" /> Portfolio Risk Snapshot</h3>
            <span className="demo-tag">LIVE CALCULATED</span>
          </div>
          <div className="snap-rows">
            {riskDistribution.map(d => (
              <div key={d.name} className="snap-row">
                <div className="snap-row-meta">
                  <span className="snap-label">{d.name} Risk</span>
                  <span className="snap-val font-mono">
                    {d.value} ({((d.value / kpis.totalProjects) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(d.value / kpis.totalProjects) * 100}%`,
                      background: d.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="snap-summary font-mono">
            {kpis.totalProjects} projects · {kpis.criticalProjects} CRITICAL · {kpis.highRiskProjects} at risk
          </div>
        </div>

        {/* Risk Distribution Donut */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title"><ShieldAlert className="icon-sm" />Risk Distribution</h3>
            <span className="demo-tag">PORTFOLIO SAMPLE</span>
          </div>
          <div className="donut-wrapper">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%" cy="50%"
                  innerRadius={58} outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [v, n]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Sector Risk Bar Chart ── */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><Building2 className="icon-sm" /> Sector-wise Average Risk Score</h3>
          <span className="demo-tag">SECTORAL PROFILE</span>
        </div>
        <ResponsiveContainer width="100%" height={270}>
          <BarChart
            data={sectorRisk}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 110, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--recharts-grid)" />
            <XAxis type="number" stroke="var(--recharts-text)" tick={{ fontSize: 10 }} domain={[0, 100]} />
            <YAxis dataKey="sector" type="category" stroke="var(--recharts-text)" tick={{ fontSize: 11 }} width={105} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="riskScore" name="Avg Risk Score (0–100)" fill="#b8872f" radius={[0, 3, 3, 0]}>
              {sectorRisk.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.riskScore >= 76 ? '#a8463f' :
                    entry.riskScore >= 51 ? '#c66b32' :
                    entry.riskScore >= 26 ? '#b8872f' : '#607a5c'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Physical vs Financial Progress by Risk Level ── */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title"><Activity className="icon-sm" /> Physical vs Financial Progress by Risk Level</h3>
            <p className="card-subtitle" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
              Average progress across all projects, grouped by risk classification
            </p>
          </div>
          <span className="demo-tag">PROGRESS ANALYSIS</span>
        </div>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={progressComparison} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--recharts-grid)" />
            <XAxis dataKey="level" stroke="var(--recharts-text)" tick={{ fontSize: 11 }} />
            <YAxis stroke="var(--recharts-text)" tick={{ fontSize: 10 }} domain={[0, 100]} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconSize={8} />
            <Bar dataKey="Physical Progress" fill="#607a5c" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Financial Progress" fill="#b8872f" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Cost Escalation: Top 8 Projects ── */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title"><TrendingUp className="icon-sm" /> Cost Trajectory — Top 8 Largest Projects (₹ Cr)</h3>
            <p className="card-subtitle" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
              Original → Revised → Prototype Forecast for highest-value projects
            </p>
          </div>
          <span className="demo-tag">COST INTELLIGENCE</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={costEscalationByType} margin={{ top: 10, right: 20, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--recharts-grid)" />
            <XAxis
              dataKey="name"
              stroke="var(--recharts-text)"
              tick={{ fontSize: 9 }}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis stroke="var(--recharts-text)" tick={{ fontSize: 10 }} tickFormatter={v => `₹${v}`} />
            <Tooltip
              formatter={(v, n) => [`₹${Number(v).toLocaleString('en-IN')} Cr`, n]}
              contentStyle={{ fontSize: '0.78rem' }}
            />
            <Legend iconSize={8} />
            <Bar dataKey="Original" name="Original Cost (₹ Cr)" fill="#607a5c" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Revised"  name="Revised Cost (₹ Cr)"  fill="#b8872f" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Forecast" name="Prototype Forecast (₹ Cr)" fill="#a8463f" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="disclaimer-banner" style={{ marginTop: '0.5rem' }}>
          <Info className="disclaimer-icon" />
          <div className="disclaimer-text" style={{ fontSize: '0.72rem' }}>
            <strong>Prototype Forecast</strong> is a rule-based simulation (not real ML). Derived from cost performance index logic. Not an official estimate.
          </div>
        </div>
      </div>

      {/* ── Bottom Grid: Priority Projects + Recent Warnings ── */}
      <div className="bottom-grid">

        {/* Priority Projects Table */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Zap className="icon-sm" style={{ color: 'var(--critical)' }} />
              Priority Projects — Top 10 by Risk Score
            </h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/projects')}>
              View All <ChevronRight className="icon-xs" />
            </button>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Sector · State</th>
                  <th>Risk Score</th>
                  <th>Cost Risk</th>
                  <th>Time Risk</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {priorityProjects.map(p => (
                  <tr key={p.id} onClick={() => navigate(`/projects/${p.id}`)} className="clickable-row">
                    <td>
                      <div className="proj-name-cell">
                        <span className="text-bold">{p.projectName}</span>
                        <span className="text-xs text-muted">{p.id}</span>
                      </div>
                    </td>
                    <td className="text-sm text-secondary">
                      {p.sector}<br />
                      <span className="text-xs text-muted">{p.state}</span>
                    </td>
                    <td>
                      <div className="risk-score-cell">
                        <span
                          className="risk-num font-mono"
                          style={{ color: RISK_COLORS[p.risk.riskLevel] || 'inherit' }}
                        >
                          {p.risk.overallRiskScore}
                        </span>
                        <RiskBadge level={p.risk.riskLevel} />
                      </div>
                    </td>
                    <td className="font-mono text-sm" style={{ color: RISK_COLORS.HIGH }}>
                      {p.risk.costRisk}
                    </td>
                    <td className="font-mono text-sm" style={{ color: RISK_COLORS.WATCH }}>
                      {p.risk.timeRisk}
                    </td>
                    <td>
                      <span className={`status-chip status-${p.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Early Warnings */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Bell className="icon-sm" style={{ color: 'var(--warning)' }} />
              Recent Early Warnings
            </h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/early-warnings')}>
              All Alerts <ChevronRight className="icon-xs" />
            </button>
          </div>
          <div className="warnings-list">
            {recentWarnings.map(w => (
              <div
                key={w.id}
                className={`warning-item-card sev-${w.severity.toLowerCase()}`}
                onClick={() => navigate('/early-warnings')}
              >
                <div className="wi-top">
                  <span className="wi-type">{w.warningType}</span>
                  <RiskBadge level={w.severity} />
                </div>
                <div className="wi-proj">{w.projectName}</div>
                <div className="wi-trigger">
                  {w.detectedSignal
                    ? w.detectedSignal.substring(0, 90) + (w.detectedSignal.length > 90 ? '…' : '')
                    : 'Signal detected from portfolio analysis.'}
                </div>
                <div className="wi-date">Detected: {w.detectedDate}</div>
              </div>
            ))}
            {recentWarnings.length === 0 && (
              <div className="empty-state-sm">No critical warnings at this time.</div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
