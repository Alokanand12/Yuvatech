import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
<<<<<<< HEAD
  ArrowLeft, Building2, MapPin, Calendar, DollarSign, Activity, ArrowRight,
  ShieldAlert, AlertCircle, AlertTriangle, CheckCircle2, TrendingUp, Cpu, HelpCircle, FileText
} from 'lucide-react';
import { useAIChat } from '../context/AIChatContext';
=======
  ArrowLeft, Building2, MapPin, Calendar, DollarSign, Activity, 
  ShieldAlert, AlertCircle, AlertTriangle, CheckCircle2, TrendingUp, Cpu, HelpCircle, FileText
} from 'lucide-react';
>>>>>>> 7d9f721fd3d4d685d5869fbd5a7d2de92836205f
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line, Cell
} from 'recharts';
import RiskBadge from '../components/RiskBadge';
import demoProjects from '../data/demoProjects';
import { getRiskAssessment } from '../utils/riskEngine';
import { calculatePredictedFinalCost, calculateExpectedDelay, calculateExpectedCompletion } from '../utils/forecastEngine';
import { generateRecommendations } from '../utils/recommendationEngine';
import './ProjectDetail.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="ct-label" style={{ fontWeight: 'bold', marginBottom: '5px' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: 0, fontSize: '0.85rem' }}>
            {entry.name}: {entry.value}{entry.name.includes('Progress') ? '%' : ' Cr'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { openChat } = useAIChat();
=======
>>>>>>> 7d9f721fd3d4d685d5869fbd5a7d2de92836205f

  const project = demoProjects.find(p => p.id === id) || demoProjects[0];

  // Run risk engine
  const riskAssessment = getRiskAssessment(project);
  
  // Run forecast engine
  const predictedCostObj = calculatePredictedFinalCost(project);
  const expectedDelayObj = calculateExpectedDelay(project);
  const expectedCompletionObj = calculateExpectedCompletion(project);

  // Run recommendation engine
  const recommendations = generateRecommendations(riskAssessment.riskDrivers);

  const costVariancePct = Math.round(((project.revisedCost - project.originalCost) / project.originalCost) * 100);
  const gapPct = project.financialProgress - project.physicalProgress;

  // Chart Data Preparation
  const costChartData = [
    { name: 'Original', Cost: project.originalCost, color: '#3b82f6' },
    { name: 'Revised', Cost: project.revisedCost, color: '#f59e0b' },
    { name: 'Forecast', Cost: predictedCostObj.value, color: '#ef4444' }
  ];

  const progressChartData = [
    { 
      name: 'Progress Metrics', 
      'Planned Physical': Math.min(100, project.physicalProgress + (expectedDelayObj.value > 0 ? 15 : 0)), 
      'Actual Physical': project.physicalProgress, 
      'Financial': project.financialProgress 
    }
  ];

  return (
    <div className="project-detail-page">
      {/* Top Back Navigation Bar */}
      <div className="detail-top-nav">
        <button className="gov-btn gov-btn-secondary back-btn" onClick={() => navigate('/projects')}>
          <ArrowLeft className="icon-xs" />
          Back to Projects Inventory
        </button>

<<<<<<< HEAD
        <div className="detail-meta" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="demo-tag">DEMO DATASET</span>
          <span className="prj-code-badge font-mono">{project.id}</span>
          <button className="btn btn-primary" onClick={openChat}>
            Ask AI about this project <ArrowRight className="icon-xs" />
          </button>
=======
        <div className="detail-meta">
          <span className="demo-tag">DEMO DATASET</span>
          <span className="prj-code-badge font-mono">{project.id}</span>
>>>>>>> 7d9f721fd3d4d685d5869fbd5a7d2de92836205f
        </div>
      </div>

      {/* 1. PROJECT OVERVIEW CARD */}
      <div className="gov-card overview-card">
        <div className="overview-header">
          <div className="overview-title-block">
            <span className="sector-tag">{project.sector}</span>
            <h1 className="project-headline">{project.projectName}</h1>
            <div className="meta-pills">
              <span><Building2 className="icon-xs" /> {project.ministry} ({project.department})</span>
              <span><Activity className="icon-xs" /> Agency: <strong>{project.implementingAgency}</strong></span>
              <span><MapPin className="icon-xs" /> Location: <strong>{project.district}, {project.state}</strong></span>
            </div>
          </div>
          <div className="status-badge-block">
            <span className="label-sm">System Status</span>
            <span className={`status-pill ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Financial & Progress Metric Grid */}
        <div className="metrics-grid">
          <div className="metric-box">
            <span className="m-label">Original Cost</span>
            <span className="m-val font-mono">₹{project.originalCost.toLocaleString()} Cr</span>
            <span className="m-sub">Initial DPR sanction</span>
          </div>

          <div className="metric-box">
            <span className="m-label">Revised Cost</span>
            <span className="m-val font-mono">₹{project.revisedCost.toLocaleString()} Cr</span>
            <span className={`m-sub ${costVariancePct > 0 ? 'alert-text' : ''}`}>
              {costVariancePct > 0 ? `+${costVariancePct}% escalation` : 'No escalation'}
            </span>
          </div>

          <div className="metric-box">
            <span className="m-label">Cumulative Expenditure</span>
            <span className="m-val font-mono">₹{project.expenditure.toLocaleString()} Cr</span>
            <span className="m-sub">Disbursed to date</span>
          </div>

          <div className="metric-box">
            <span className="m-label">Physical Progress</span>
            <div className="m-val progress-val-block font-mono">
              {project.physicalProgress}%
            </div>
            <div className="mini-track">
              <div className="mini-fill physical" style={{ width: `${project.physicalProgress}%` }} />
            </div>
          </div>

          <div className="metric-box">
            <span className="m-label">Financial Progress</span>
            <div className="m-val progress-val-block font-mono">
              {project.financialProgress}%
            </div>
            <div className="mini-track">
              <div className={`mini-fill financial ${gapPct > 10 ? 'gap' : ''}`} style={{ width: `${project.financialProgress}%` }} />
            </div>
          </div>

          <div className="metric-box">
            <span className="m-label">Planned Completion</span>
            <span className="m-val font-mono">{project.plannedCompletion}</span>
            <span className="m-sub">Target baseline</span>
          </div>
        </div>
      </div>

      {/* 2. OVERALL AI RISK SCORE & PREDICTION CARDS */}
      <div className="detail-grid-two">
        {/* Risk Engine Card */}
        <div className="gov-card risk-score-card">
          <div className="card-header">
            <h3 className="card-title">
              <Cpu className="icon-sm" style={{ color: '#38bdf8' }} />
              PAIMANA AI Risk Engine Score
            </h3>
            <RiskBadge level={riskAssessment.riskLevel} />
          </div>

          <div className="risk-display-hero">
            <div className="score-ring-container">
              <div className={`score-number-big ${riskAssessment.riskLevel.toLowerCase()}`}>
                {riskAssessment.overallRiskScore}
              </div>
              <div className="score-denom">/ 100</div>
            </div>
            <div className="score-classification">
              <div className="class-title">{riskAssessment.riskLevel} IMPLEMENTATION RISK</div>
              <p className="class-desc">
                Project predictive telemetry indicates probability of schedule & cost overrun based on deterministic modeling.
              </p>
            </div>
          </div>

          {/* Risk Component Breakdown Progress Bars */}
          <div className="risk-breakdown-section">
            <div className="sub-risk-row">
              <div className="sub-risk-label">
                <span>Cost Risk Score</span>
                <span className="font-mono font-bold">{riskAssessment.costRisk}%</span>
              </div>
              <div className="sub-track">
                <div className="sub-fill cost" style={{ width: `${riskAssessment.costRisk}%` }} />
              </div>
            </div>

            <div className="sub-risk-row">
              <div className="sub-risk-label">
                <span>Time Overrun Risk</span>
                <span className="font-mono font-bold">{riskAssessment.timeRisk}%</span>
              </div>
              <div className="sub-track">
                <div className="sub-fill time" style={{ width: `${riskAssessment.timeRisk}%` }} />
              </div>
            </div>

            <div className="sub-risk-row">
              <div className="sub-risk-label">
                <span>Execution Risk</span>
                <span className="font-mono font-bold">{riskAssessment.executionRisk}%</span>
              </div>
              <div className="sub-track">
                <div className="sub-fill exec" style={{ width: `${riskAssessment.executionRisk}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Cards Grid */}
        <div className="predictions-stack">
          {/* COST INTELLIGENCE */}
          <div className="gov-card pred-card-extended">
            <div className="pred-header">
              <div className="pred-icon-wrapper">
                <DollarSign className="pred-icon" />
              </div>
              <div className="pred-content">
                <span className="pred-label">Predicted Final Cost</span>
                <span className="pred-value font-mono">₹{predictedCostObj.value.toLocaleString()} Cr</span>
                <span className="pred-sub alert-text">{predictedCostObj.label}</span>
              </div>
            </div>
            <div className="chart-container" style={{ height: '120px', marginTop: '1rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costChartData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={60} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Cost" radius={[0, 4, 4, 0]}>
                    {costChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* TIME INTELLIGENCE */}
          <div className="gov-card pred-card-extended">
            <div className="pred-header">
              <div className="pred-icon-wrapper warning">
                <Calendar className="pred-icon" />
              </div>
              <div className="pred-content">
                <span className="pred-label">Expected Completion & Delay</span>
                <span className="pred-value font-mono">{expectedCompletionObj.value}</span>
                <span className="pred-sub alert-text">{expectedDelayObj.label} — +{expectedDelayObj.value} Months</span>
              </div>
            </div>
            <div className="time-details">
              <div className="time-line">
                <span>Planned:</span> <strong>{project.plannedCompletion}</strong>
              </div>
              <div className="time-line">
                <span>Current Expected:</span> <strong>{project.currentExpectedCompletion}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESS ANALYSIS (New Section) */}
      <div className="gov-card progress-analysis-card">
        <div className="card-header">
          <h3 className="card-title">
            <TrendingUp className="icon-sm" style={{ color: '#0284c7' }} />
            PROGRESS ANALYSIS
          </h3>
          <span className="demo-tag">EXECUTION TELEMETRY</span>
        </div>
        <div className="progress-chart-container" style={{ height: '180px', marginTop: '1rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Planned Physical" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Actual Physical" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Financial" fill={gapPct > 10 ? '#ef4444' : '#f59e0b'} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {gapPct > 10 && (
          <div className="gap-warning-banner">
            <AlertTriangle className="icon-xs" style={{ color: '#ef4444' }} />
            Critical Financial-Physical Mismatch: Expenditure is {gapPct}% ahead of physical execution.
          </div>
        )}
      </div>

      {/* 3. WHY IS THIS PROJECT AT RISK? (Explainable AI Risk Drivers) */}
      {riskAssessment.riskDrivers.length > 0 && (
        <div className="gov-card drivers-card">
          <div className="card-header">
            <h3 className="card-title">
              <AlertCircle className="icon-sm" style={{ color: '#f59e0b' }} />
              WHY IS THIS PROJECT AT RISK?
            </h3>
            <span className="demo-tag">RISK ENGINE DRIVERS</span>
          </div>

          <div className="drivers-content">
            <div className="horizontal-drivers-list">
              {riskAssessment.riskDrivers.map((driver, index) => (
                <div key={index} className="driver-horizontal-item">
                  <div className="driver-index-badge">0{index + 1}</div>
                  <div className="driver-text-block">
                    <div className="driver-header-line">
                      <span className="driver-name">{driver.title}</span>
                      <span className={`driver-impact-tag ${driver.severity.toLowerCase()}`}>
                        Severity: {driver.severity}
                      </span>
                    </div>
                    <p className="driver-description">{driver.explanation}</p>
                    <p className="driver-impact-text"><strong>Impact:</strong> {driver.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. RECOMMENDED ACTION */}
      <div className="gov-card actions-card">
        <div className="card-header">
          <h3 className="card-title">
            <CheckCircle2 className="icon-sm" style={{ color: '#10b981' }} />
            RECOMMENDED ACTION
          </h3>
          <span className="demo-tag">DECISION SUPPORT ENGINE</span>
        </div>

        <div className="actions-grid">
          {recommendations.length > 0 ? recommendations.map((rec, idx) => (
            <div key={idx} className="action-item-card">
              <div className="action-header">
                <div className="action-priority-badge">Priority {rec.priority}</div>
                <div className="action-risk-label">{rec.risk}</div>
              </div>
              <div className="action-body">
                <p className="action-reason"><strong>Reason:</strong> {rec.reason}</p>
                <p className="action-text"><strong>Action:</strong> {rec.recommendedAction}</p>
                <p className="action-outcome"><strong>Expected Outcome:</strong> {rec.expectedOutcome}</p>
              </div>
              <button className="gov-btn gov-btn-secondary action-btn">
                Initiate Workflow Directive
              </button>
            </div>
          )) : (
            <div className="action-item-card">
              <div className="action-header">
                <div className="action-priority-badge">Standard</div>
                <div className="action-risk-label">On Track</div>
              </div>
              <div className="action-body">
                <p className="action-text">Continue routine monitoring. No critical interventions required.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* IMPORTANT DISCLAIMER FOOTER */}
      <div className="disclaimer-banner">
        <HelpCircle className="disclaimer-icon" />
        <div className="disclaimer-text">
          <strong>MoSPI Intelligence Transparency Notice:</strong> {predictedCostObj.disclaimer} Recommendations are decision-support suggestions. They are not official government decisions. Risk scoring indicates predicted execution vulnerability based on static logic parameters.
        </div>
      </div>
    </div>
  );
}
