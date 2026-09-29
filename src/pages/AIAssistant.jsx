<<<<<<< HEAD
import React, { useEffect } from 'react';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';
import { useAIChat } from '../context/AIChatContext';
import './AIAssistant.css';

export default function AIAssistant() {
  const { openChat, closeChat } = useAIChat();

  useEffect(() => {
    // Automatically open the global chatbot when visiting this page
    openChat();
    // return () => closeChat(); // don't close on unmount so they can keep chatting
  }, []);

  return (
    <div className="ai-assistant-page" style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <Bot size={64} color="#1a365d" style={{ marginBottom: '24px' }} />
      <h1 className="page-title" style={{ marginBottom: '16px' }}>Project Intelligence Assistant</h1>
      <p className="page-subtitle" style={{ maxWidth: '600px', marginBottom: '32px' }}>
        The AI Assistant is now a global feature available across all pages of the platform.
        You can access it anytime using the floating button in the bottom right corner.
      </p>
      
      <button className="btn btn-primary btn-lg" onClick={openChat}>
        <Sparkles className="icon-xs" style={{ marginRight: '8px' }} />
        Open Global AI Assistant <ArrowRight className="icon-xs" style={{ marginLeft: '8px' }} />
      </button>

      <div className="mt-8" style={{ marginTop: '2rem' }}>
        <span className="demo-tag">AI ASSISTANT — PROTOTYPE</span>
=======
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot, Send, Sparkles, Cpu, CheckCircle2, AlertCircle,
  ArrowRight, User, ShieldAlert, TrendingUp, Clock,
  DollarSign, Layers, BarChart2, HelpCircle, ChevronRight,
  AlertTriangle, Zap, Search
} from 'lucide-react';
import RiskBadge from '../components/RiskBadge';
import { queryAssistant, PRESET_QUESTIONS, getWelcomeMessage } from '../utils/assistantEngine';
import './AIAssistant.css';

// ─── Risk color helper ────────────────────────────────────────────────────────
const RISK_COLORS = {
  LOW: '#10b981',
  WATCH: '#f59e0b',
  HIGH: '#f97316',
  CRITICAL: '#ef4444',
};

const SEVERITY_COLORS = {
  CRITICAL: '#ef4444',
  HIGH: '#f97316',
  MEDIUM: '#f59e0b',
  LOW: '#10b981',
};

// ─── Metric Mini Tile ─────────────────────────────────────────────────────────
function MetricTile({ label, value, sub, color }) {
  return (
    <div className="asst-metric-tile">
      <div className="asst-metric-val font-mono" style={{ color: color || '#f8fafc' }}>{value}</div>
      <div className="asst-metric-label">{label}</div>
      {sub && <div className="asst-metric-sub">{sub}</div>}
    </div>
  );
}

// ─── Risk Driver Card ─────────────────────────────────────────────────────────
function DriverCard({ driver, index }) {
  return (
    <div className="asst-driver-card" style={{ borderLeftColor: SEVERITY_COLORS[driver.severity] || '#64748b' }}>
      <div className="asst-driver-header">
        <span className="asst-driver-num font-mono">#{index + 1}</span>
        <span className="asst-driver-title">{driver.title}</span>
        <span className="asst-severity-badge" style={{ background: `${SEVERITY_COLORS[driver.severity]}20`, color: SEVERITY_COLORS[driver.severity] }}>
          {driver.severity}
        </span>
      </div>
      <p className="asst-driver-explanation">{driver.explanation}</p>
      <p className="asst-driver-impact">⚡ Impact: {driver.impact}</p>
    </div>
  );
}

// ─── Project Row (in list view) ───────────────────────────────────────────────
function ProjectRow({ project, navigate, showCostTime }) {
  return (
    <tr onClick={() => navigate(`/projects/${project.id}`)} className="asst-proj-row">
      <td>
        <div className="asst-proj-name-cell">
          <span className="font-bold">{project.name}</span>
          <span className="asst-proj-id font-mono">{project.id}</span>
        </div>
      </td>
      <td>
        <span className="asst-sector-chip">{project.sector}</span>
      </td>
      {showCostTime ? (
        <>
          <td className="font-mono" style={{ color: RISK_COLORS.HIGH }}>{project.costRisk}</td>
          <td className="font-mono" style={{ color: RISK_COLORS.WATCH }}>{project.timeRisk}</td>
        </>
      ) : (
        <td>
          <div className="asst-score-cell">
            <span className="font-mono font-bold" style={{ color: RISK_COLORS[project.riskLevel] || '#f8fafc' }}>
              {project.riskScore}
            </span>
            <RiskBadge level={project.riskLevel} />
          </div>
        </td>
      )}
      <td>
        <button className="asst-inspect-btn">Inspect →</button>
      </td>
    </tr>
  );
}

// ─── Sector Row ───────────────────────────────────────────────────────────────
function SectorRow({ sector }) {
  return (
    <tr>
      <td className="font-bold">{sector.sector}</td>
      <td className="font-mono">{sector.totalProjects}</td>
      <td className="font-mono" style={{ color: RISK_COLORS[sector.riskLevel] || '#f8fafc' }}>
        {sector.avgRiskScore}
      </td>
      <td>
        <div className="asst-crit-count font-mono">
          <span style={{ color: '#ef4444' }}>{sector.criticalCount}C</span>
          {' / '}
          <span style={{ color: '#f97316' }}>{sector.highCount}H</span>
        </div>
      </td>
      <td className="font-mono">+{sector.avgCostEscalation}%</td>
      <td className="font-mono text-muted">+{sector.avgDelayMonths} mo</td>
    </tr>
  );
}

// ─── Compare Panel ────────────────────────────────────────────────────────────
function ComparePanel({ projectA, projectB, navigate }) {
  const metrics = [
    { label: 'Overall Risk Score', keyA: 'riskScore', keyB: 'riskScore', suffix: '/100', higherIsBad: true },
    { label: 'Cost Risk', keyA: 'costRisk', keyB: 'costRisk', suffix: '/100', higherIsBad: true },
    { label: 'Time Risk', keyA: 'timeRisk', keyB: 'timeRisk', suffix: '/100', higherIsBad: true },
    { label: 'Physical Progress', keyA: 'physicalProgress', keyB: 'physicalProgress', suffix: '%', higherIsBad: false },
    { label: 'Expected Delay', keyA: 'expectedDelayMonths', keyB: 'expectedDelayMonths', suffix: ' mo', higherIsBad: true },
    { label: 'Cost Escalation', keyA: 'costEscalationPct', keyB: 'costEscalationPct', suffix: '%', higherIsBad: true },
  ];

  return (
    <div className="asst-compare-panel">
      <div className="asst-compare-headers">
        <div className="asst-compare-project-hdr" onClick={() => navigate(`/projects/${projectA.id}`)}>
          <span className="asst-compare-proj-name">{projectA.name}</span>
          <RiskBadge level={projectA.riskLevel} />
        </div>
        <div className="asst-compare-vs">VS</div>
        <div className="asst-compare-project-hdr" onClick={() => navigate(`/projects/${projectB.id}`)}>
          <span className="asst-compare-proj-name">{projectB.name}</span>
          <RiskBadge level={projectB.riskLevel} />
        </div>
      </div>
      <div className="asst-compare-rows">
        {metrics.map(m => {
          const valA = projectA[m.keyA];
          const valB = projectB[m.keyB];
          const aWorse = m.higherIsBad ? valA > valB : valA < valB;
          const bWorse = m.higherIsBad ? valB > valA : valB < valA;
          return (
            <div key={m.label} className="asst-compare-row">
              <div className={`asst-compare-val ${aWorse ? 'asst-compare-worse' : ''}`}>
                {valA}{m.suffix}
              </div>
              <div className="asst-compare-metric-label">{m.label}</div>
              <div className={`asst-compare-val ${bWorse ? 'asst-compare-worse' : ''}`}>
                {valB}{m.suffix}
              </div>
            </div>
          );
        })}
>>>>>>> 7d9f721fd3d4d685d5869fbd5a7d2de92836205f
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

// ─── Single Project Detail Card ───────────────────────────────────────────────
function ProjectDetailCard({ project, navigate }) {
  const costChange = project.forecastCost - project.revisedCost;
  return (
    <div className="asst-detail-card">
      <div className="asst-detail-header">
        <div>
          <h4 className="asst-detail-name">{project.name}</h4>
          <span className="asst-detail-sub">{project.id} · {project.ministry} · {project.state}</span>
        </div>
        <RiskBadge level={project.riskLevel} />
      </div>

      <div className="asst-detail-metrics">
        <MetricTile label="Overall Risk" value={`${project.riskScore}/100`} color={RISK_COLORS[project.riskLevel]} />
        <MetricTile label="Cost Risk" value={project.costRisk} sub="/100" color="#f59e0b" />
        <MetricTile label="Time Risk" value={project.timeRisk} sub="/100" color="#f97316" />
        <MetricTile label="Execution Risk" value={project.executionRisk} sub="/100" color="#ef4444" />
        <MetricTile label="Physical Progress" value={`${project.physicalProgress}%`} />
        <MetricTile label="Financial Progress" value={`${project.financialProgress}%`} />
        <MetricTile label="Cost Escalation" value={`+${project.costEscalationPct}%`} color="#f59e0b" />
        <MetricTile label="Expected Delay" value={`+${project.expectedDelayMonths} mo`} color="#f97316" />
      </div>

      <div className="asst-detail-costs">
        <div className="asst-cost-item">
          <span className="asst-cost-label">Original Cost</span>
          <span className="asst-cost-val font-mono">₹{Number(project.originalCost).toLocaleString('en-IN')} Cr</span>
        </div>
        <ChevronRight className="asst-cost-arrow" />
        <div className="asst-cost-item">
          <span className="asst-cost-label">Revised Cost</span>
          <span className="asst-cost-val font-mono">₹{Number(project.revisedCost).toLocaleString('en-IN')} Cr</span>
        </div>
        <ChevronRight className="asst-cost-arrow" />
        <div className="asst-cost-item">
          <span className="asst-cost-label">Prototype Forecast</span>
          <span className="asst-cost-val font-mono" style={{ color: '#f97316' }}>
            ₹{Number(project.forecastCost).toLocaleString('en-IN')} Cr
          </span>
          {costChange > 0 && (
            <span className="asst-cost-delta">+₹{Number(costChange).toLocaleString('en-IN')} Cr</span>
          )}
        </div>
      </div>

      <button
        className="asst-full-intel-btn"
        onClick={() => navigate(`/projects/${project.id}`)}
      >
        <Zap className="icon-xs" />
        Open Full Project Intelligence Dashboard
      </button>
    </div>
  );
}

// ─── Driver List Response ─────────────────────────────────────────────────────
function DriverListContent({ drivers }) {
  return (
    <div className="asst-driver-list">
      {drivers.map((d, i) => (
        <div key={d.title} className="asst-driver-stat-row">
          <div className="asst-driver-rank font-mono">#{i + 1}</div>
          <div className="asst-driver-stat-body">
            <div className="asst-driver-stat-header">
              <span className="asst-driver-stat-name">{d.title}</span>
              <span className="asst-driver-stat-pct font-mono">{d.affectedPct}% of projects</span>
            </div>
            <div className="asst-driver-bar-track">
              <div
                className="asst-driver-bar-fill"
                style={{ width: `${Math.min(100, d.affectedPct * 1.5)}%` }}
              />
            </div>
            <div className="asst-driver-severity-counts font-mono">
              <span style={{ color: '#ef4444' }}>{d.criticalCount}×CRIT</span>
              <span style={{ color: '#f97316' }}>{d.highCount}×HIGH</span>
              <span style={{ color: '#f59e0b' }}>{d.mediumCount}×MED</span>
              <span style={{ color: '#64748b' }}>({d.totalOccurrences} total)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Analysis Steps ───────────────────────────────────────────────────────────
function AnalysisSteps({ steps }) {
  return (
    <div className="asst-analysis-steps">
      <div className="asst-steps-title">
        <Cpu className="icon-xs" style={{ color: '#38bdf8' }} />
        <span>Deterministic Analysis Chain</span>
      </div>
      <ol className="asst-steps-list">
        {steps.map((s, i) => (
          <li key={i} className="asst-step-item">
            <span className="asst-step-num font-mono">{i + 1}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── Assistant Response Bubble ────────────────────────────────────────────────
function AssistantBubble({ response, navigate }) {
  const { answerType, headline, summary, analysisSteps, projects, sectors, drivers,
    project, projectA, projectB, recommendedActions } = response;

  return (
    <div className="asst-response-card">
      {/* Headline */}
      <div className="asst-response-headline">
        <Bot className="asst-bot-icon" />
        <div>
          <div className="asst-response-title">{headline}</div>
          {response.query && (
            <div className="asst-response-query">
              <Search className="icon-xs" />
              <span className="asst-query-text">{response.query}</span>
            </div>
          )}
        </div>
        <span className="asst-engine-badge font-mono">Rule Engine</span>
      </div>

      {/* Summary */}
      <p
        className="asst-response-summary"
        dangerouslySetInnerHTML={{ __html: summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
      />

      {/* Analysis Steps */}
      <AnalysisSteps steps={analysisSteps} />

      {/* Content by type */}
      {answerType === 'project_list' && projects && projects.length > 0 && (
        <div className="asst-table-wrap">
          <table className="gov-table asst-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Sector</th>
                {(response.intent === 'dual_risk') ? (
                  <>
                    <th>Cost Risk</th>
                    <th>Time Risk</th>
                  </>
                ) : (
                  <th>Risk Score</th>
                )}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <ProjectRow
                  key={p.id}
                  project={p}
                  navigate={navigate}
                  showCostTime={response.intent === 'dual_risk'}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {answerType === 'sector_list' && sectors && (
        <div className="asst-table-wrap">
          <table className="gov-table asst-table">
            <thead>
              <tr>
                <th>Sector</th>
                <th>Projects</th>
                <th>Avg Risk</th>
                <th>CRIT / HIGH</th>
                <th>Avg Cost Esc.</th>
                <th>Avg Delay</th>
              </tr>
            </thead>
            <tbody>
              {sectors.map(s => <SectorRow key={s.sector} sector={s} />)}
            </tbody>
          </table>
        </div>
      )}

      {answerType === 'driver_list' && drivers && (
        <DriverListContent drivers={drivers} />
      )}

      {(answerType === 'project_detail' || answerType === 'why_risk') && project && (
        <>
          <ProjectDetailCard project={project} navigate={navigate} />
          {response.drivers && response.drivers.length > 0 && (
            <div className="asst-drivers-section">
              <div className="asst-section-label">
                <AlertTriangle className="icon-xs" style={{ color: '#f59e0b' }} />
                Active Risk Drivers
              </div>
              {response.drivers.map((d, i) => <DriverCard key={i} driver={d} index={i} />)}
            </div>
          )}
        </>
      )}

      {answerType === 'comparison' && projectA && projectB && (
        <ComparePanel projectA={projectA} projectB={projectB} navigate={navigate} />
      )}

      {answerType === 'welcome' && (
        <div className="asst-welcome-hint">
          <Sparkles className="icon-xs" style={{ color: '#f59e0b' }} />
          Select a suggested query above or type your own question to begin analysis.
        </div>
      )}

      {/* Recommended Actions */}
      {recommendedActions && recommendedActions.length > 0 && (
        <div className="asst-recs-section">
          <div className="asst-section-label">
            <CheckCircle2 className="icon-xs" style={{ color: '#10b981' }} />
            Recommended Actions
          </div>
          <ul className="asst-recs-list">
            {recommendedActions.map((a, i) => (
              <li key={i} className="asst-rec-item">
                <ArrowRight className="asst-rec-arrow" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="asst-disclaimer">
        <HelpCircle className="icon-xs" />
        <span>Deterministic rule-based analysis from MoSPI demo dataset ({new Date().getFullYear()}). Not real AI or ML. Prototype only.</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AIAssistant() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'assistant', response: getWelcomeMessage() }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text) => {
    const query = (text || inputQuery).trim();
    if (!query) return;

    setMessages(prev => [...prev, { type: 'user', text: query }]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate slight processing delay for UX realism
    setTimeout(() => {
      const response = queryAssistant(query);
      setMessages(prev => [...prev, { type: 'assistant', response }]);
      setIsTyping(false);
    }, 420);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-assistant-page">

      {/* ── Header Banner ── */}
      <div className="ai-header-banner">
        <div className="ai-header-left">
          <div className="ai-header-icon-wrap">
            <Bot className="ai-header-icon" />
          </div>
          <div>
            <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>
              Project Intelligence Assistant
            </h1>
            <p className="page-subtitle">
              Ask questions about infrastructure project risks, cost overruns, delays, and sector vulnerabilities.
            </p>
          </div>
        </div>
        <div className="ai-header-badges">
          <div className="ai-status-dot-wrap">
            <span className="ai-status-dot" />
            <span className="ai-status-label">Engine Online</span>
          </div>
          <span className="demo-tag">AI ASSISTANT — PROTOTYPE</span>
          <span className="ai-engine-label font-mono">Rule-Based · No External API</span>
        </div>
      </div>

      {/* ── Suggested Query Chips ── */}
      <div className="ai-preset-bar">
        <span className="ai-preset-label">Suggested Queries:</span>
        <div className="ai-preset-scroll">
          {PRESET_QUESTIONS.map(q => (
            <button
              key={q.id}
              id={`preset-${q.id}`}
              className="ai-preset-chip"
              onClick={() => handleSend(q.text)}
            >
              <span className="ai-chip-icon">{q.icon}</span>
              {q.text}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Chat Window ── */}
      <div className="ai-chat-window">

        {/* Messages */}
        <div className="ai-messages-pane">
          {messages.map((msg, idx) => {
            if (msg.type === 'user') {
              return (
                <div key={idx} className="ai-user-bubble-wrap">
                  <div className="ai-user-bubble">
                    <User className="ai-user-icon" />
                    <div className="ai-user-text">{msg.text}</div>
                  </div>
                </div>
              );
            }

            return (
              <div key={idx} className="ai-assistant-bubble-wrap">
                <AssistantBubble response={msg.response} navigate={navigate} />
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="ai-assistant-bubble-wrap">
              <div className="ai-typing-indicator">
                <Bot className="ai-typing-bot-icon" />
                <div className="ai-typing-dots">
                  <span /><span /><span />
                </div>
                <span className="ai-typing-label">Analyzing portfolio data...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input Bar ── */}
        <div className="ai-input-bar">
          <div className="ai-input-wrap">
            <Search className="ai-input-icon" />
            <input
              id="assistant-query-input"
              type="text"
              className="ai-input"
              placeholder="Ask about project risks, delays, cost overruns, or specific project names..."
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
          </div>
          <button
            id="assistant-send-btn"
            className="gov-btn gov-btn-primary ai-send-btn"
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || isTyping}
          >
            <Send className="icon-xs" />
            Analyse
          </button>
        </div>
      </div>

    </div>
  );
}
>>>>>>> 7d9f721fd3d4d685d5869fbd5a7d2de92836205f
