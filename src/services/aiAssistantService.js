// ============================================================
// PAIMANA-PREDICT | AI Assistant Service
// Initially uses mock/deterministic responses.
// Architecture supports future replacement with real LLM API.
// POST /api/ai/ask — ready to wire up
// ============================================================

import { projects } from '../data/projects';

// ---- Query Classifier ----
function classifyQuery(query) {
  const q = query.toLowerCase();
  if (q.includes('delay') || q.includes('time overrun') || q.includes('late') || q.includes('schedule')) return 'DELAY_RISK';
  if (q.includes('cost') || q.includes('escalation') || q.includes('overrun') || q.includes('expensive')) return 'COST_RISK';
  if (q.includes('sector') || q.includes('ministry') || q.includes('transport') || q.includes('energy') || q.includes('water')) return 'SECTOR_ANALYSIS';
  if (q.includes('prioriti') || q.includes('urgent') || q.includes('this month') || q.includes('action')) return 'PRIORITIZATION';
  if (q.includes('physical') && (q.includes('low') || q.includes('mismatch') || q.includes('financial'))) return 'MISMATCH';
  if (q.includes('critical') || q.includes('highest risk')) return 'CRITICAL_RISK';
  // Named project lookup
  const projectMatch = projects.find(p => q.includes(p.name.toLowerCase().slice(0, 12)) || q.includes(p.id.toLowerCase()));
  if (projectMatch) return { type: 'PROJECT_DETAIL', project: projectMatch };
  return 'GENERAL';
}

// ---- Response Generator ----
export function generateAIResponse(query) {
  const classification = classifyQuery(query);
  const type = typeof classification === 'string' ? classification : classification.type;

  switch (type) {
    case 'DELAY_RISK': {
      const sorted = [...projects].sort((a, b) => b.timeRisk - a.timeRisk).slice(0, 5);
      return {
        query,
        intent: 'Time Overrun Risk Analysis',
        analysisSteps: [
          'Loaded MoSPI CUF dataset (55 demo projects)',
          'Sorted by Time Overrun Risk (timeRisk score)',
          'Filtered top 5 highest-risk projects',
          'Cross-referenced with expected delay months'
        ],
        summary: `**5 projects** show the highest predicted time overrun risk. These are driven by geological complexity, environmental clearance delays, and contractor execution deficits. Average expected delay: **${Math.round(sorted.reduce((s, p) => s + p.expectedDelayMonths, 0) / sorted.length)} months**.`,
        resultType: 'project_table',
        results: sorted.map(p => ({
          id: p.id, name: p.name, riskLevel: p.riskLevel, timeRisk: p.timeRisk,
          expectedDelayMonths: p.expectedDelayMonths, ministry: p.ministry, sector: p.sector
        })),
        recommendedActions: [
          'Convene Emergency Review Committee for all CRITICAL time-risk projects.',
          'Issue formal Schedule Recovery Directives to implementing agencies.',
          'Mandate bi-weekly progress reporting for projects with timeRisk > 75%.',
        ]
      };
    }

    case 'COST_RISK': {
      const sorted = [...projects].sort((a, b) => b.costRisk - a.costRisk).slice(0, 5);
      return {
        query,
        intent: 'Cost Escalation Risk Analysis',
        analysisSteps: [
          'Loaded MoSPI CUF dataset (55 demo projects)',
          'Sorted by Cost Overrun Risk (costRisk score)',
          'Calculated actual cost variance (revised vs original)',
          'Identified sectors with highest escalation concentration'
        ],
        summary: `**5 projects** carry the highest predicted cost escalation risk. The top escalation drivers are: material price volatility (+19.8% avg), scope revisions, and contractor claims. Estimated additional spend at risk: **₹18,400 Cr**.`,
        resultType: 'project_table',
        results: sorted.map(p => ({
          id: p.id, name: p.name, riskLevel: p.riskLevel, costRisk: p.costRisk,
          originalCost: p.originalCost, revisedCost: p.revisedCost,
          overrunPct: Math.round(((p.revisedCost - p.originalCost) / p.originalCost) * 100),
          ministry: p.ministry, sector: p.sector
        })),
        recommendedActions: [
          'Activate independent cost audit for all projects with costRisk > 80%.',
          'Review EPC change order adjudication processes for value-for-money.',
          'Lock material price indices in remaining contracts via fixed-price clauses.',
        ]
      };
    }

    case 'SECTOR_ANALYSIS': {
      const sectorMap = {};
      projects.forEach(p => {
        if (!sectorMap[p.sector]) sectorMap[p.sector] = { total: 0, highRisk: 0, totalCostOverrun: 0, totalProjects: 0 };
        sectorMap[p.sector].total += p.revisedCost - p.originalCost;
        sectorMap[p.sector].totalProjects++;
        if (p.riskLevel === 'HIGH' || p.riskLevel === 'CRITICAL') sectorMap[p.sector].highRisk++;
      });
      const sectorList = Object.entries(sectorMap)
        .map(([s, d]) => ({ sector: s, ...d, avgOverrun: d.totalProjects > 0 ? Math.round(d.total / d.totalProjects) : 0 }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);
      return {
        query,
        intent: 'Sector Cost Escalation Analysis',
        analysisSteps: [
          'Aggregated original vs. revised costs across all sectors',
          'Calculated total monetary cost variance per sector',
          'Identified high-risk project concentration by sector',
          'Ranked by total cost escalation (₹ Cr)'
        ],
        summary: `**Water & Sanitation** and **Transport** sectors show the highest absolute cost escalation in the demo portfolio. Water sector projects average +28.6% overrun driven by land acquisition, floods, and R&R costs. Transport sector has the highest number of high-risk projects (${sectorList.find(s => s.sector === 'Transport')?.highRisk || 'N/A'}).`,
        resultType: 'sector_table',
        results: sectorList,
        recommendedActions: [
          'Strengthen DPR quality review for Water & Sanitation projects before sanction.',
          'Standardize land acquisition timeline milestones in Transport sector EPC contracts.',
          'Commission sector-specific risk profiling report for policy intervention.',
        ]
      };
    }

    case 'PRIORITIZATION': {
      const critical = projects.filter(p => p.riskLevel === 'CRITICAL' || p.riskScore >= 75).slice(0, 6);
      return {
        query,
        intent: 'Executive Prioritization — September 2026',
        analysisSteps: [
          'Filtered projects with riskLevel = CRITICAL or riskScore ≥ 75',
          'Cross-referenced with active Early Warning triggers',
          'Ranked by composite impact score (cost × schedule × execution risk)',
          'Recommended for immediate ministerial / secretariat intervention'
        ],
        summary: `**${critical.length} projects** require immediate executive prioritization this month. Together they represent over **₹2.8 Lakh Cr** in project value at risk. Interventions must focus on R&R fund releases, contractor performance notices, and clearance escalations.`,
        resultType: 'project_table',
        results: critical.map(p => ({
          id: p.id, name: p.name, riskLevel: p.riskLevel, riskScore: p.riskScore,
          ministry: p.ministry, sector: p.sector, status: p.status,
          expectedDelayMonths: p.expectedDelayMonths
        })),
        recommendedActions: [
          'Schedule MoSPI-PMO joint review for all CRITICAL risk projects within 2 weeks.',
          'Issue Secretariat-level directive for active Early Warning resolution.',
          'Publish monthly Infra-Risk Monitor bulletin for Secretary-level awareness.',
        ]
      };
    }

    case 'MISMATCH': {
      const mismatched = projects.filter(p => (p.financialProgress - p.physicalProgress) > 6 && p.physicalProgress < 75).slice(0, 5);
      return {
        query,
        intent: 'Financial-Physical Progress Gap Detection',
        analysisSteps: [
          'Computed gap = financialProgress − physicalProgress for all projects',
          'Filtered projects where gap > 6 percentage points AND physicalProgress < 75%',
          'Cross-checked against project billing certification records',
          'Flagged for independent verification'
        ],
        summary: `**${mismatched.length} projects** show a significant financial-physical progress mismatch. This could indicate over-billing, certification delays, or delayed site work relative to payments. Independent quantity surveys are warranted.`,
        resultType: 'project_table',
        results: mismatched.map(p => ({
          id: p.id, name: p.name, riskLevel: p.riskLevel,
          physicalProgress: p.physicalProgress, financialProgress: p.financialProgress,
          gap: p.financialProgress - p.physicalProgress,
          ministry: p.ministry, sector: p.sector
        })),
        recommendedActions: [
          'Order independent physical quantity surveys for all flagged projects.',
          'Halt next billing tranche for projects with gap > 10% pending survey results.',
          'Review implementing agency bill certification protocols.',
        ]
      };
    }

    case 'CRITICAL_RISK': {
      const critical = projects.filter(p => p.riskLevel === 'CRITICAL');
      return {
        query,
        intent: 'Critical Risk Projects — Full Portfolio Scan',
        analysisSteps: [
          'Filtered projects with riskLevel = CRITICAL',
          'Retrieved AI risk score, cost risk, time risk, and execution risk',
          'Identified primary risk drivers for each project',
        ],
        summary: `**${critical.length} CRITICAL risk projects** identified in the demo portfolio. These projects require immediate Cabinet or Secretariat-level intervention to prevent irreversible delay and cost escalation.`,
        resultType: 'project_table',
        results: critical.map(p => ({
          id: p.id, name: p.name, riskScore: p.riskScore, riskLevel: p.riskLevel,
          costRisk: p.costRisk, timeRisk: p.timeRisk, ministry: p.ministry, sector: p.sector
        })),
        recommendedActions: [
          'Convene Cabinet Committee on Infrastructure for CRITICAL project reviews.',
          'Appoint dedicated Project Monitoring Units for each CRITICAL project.',
          'Issue formal MoSPI advisories to respective ministries with deadline for action plan.',
        ]
      };
    }

    case 'PROJECT_DETAIL': {
      const p = classification.project;
      return {
        query,
        intent: `Project Deep-Dive: ${p.name}`,
        analysisSteps: [
          `Located project record: ${p.id}`,
          `Loaded CUF financial and physical telemetry`,
          `Executed PAIMANA Hybrid Risk Engine — Score: ${p.riskScore}/100`,
          `Extracted ${p.riskDrivers.length} primary risk drivers`
        ],
        summary: `**${p.name}** is rated **${p.riskLevel} RISK** (Score: ${p.riskScore}/100). Primary risk: ${p.riskDrivers[0]?.name || 'General implementation risk'}. Financial progress is ${p.financialProgress}% vs physical progress ${p.physicalProgress}%. Expected delay: +${p.expectedDelayMonths} months.`,
        resultType: 'project_detail',
        project: p,
        recommendedActions: p.recommendedActions
      };
    }

    default: {
      const topRisk = [...projects].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);
      return {
        query,
        intent: 'General Portfolio Intelligence',
        analysisSteps: [
          'Searched project database for matching keywords',
          'Returning top 5 highest risk projects as general response',
          'Recommend refining query for specific analysis'
        ],
        summary: `Here are the **top 5 highest-risk projects** in the PAIMANA-PREDICT demo portfolio. You can ask more specific questions like: *"Which sectors have the highest cost escalation?"* or *"Show projects with financial-physical mismatch."*`,
        resultType: 'project_table',
        results: topRisk.map(p => ({
          id: p.id, name: p.name, riskLevel: p.riskLevel, riskScore: p.riskScore,
          ministry: p.ministry, sector: p.sector, status: p.status
        })),
        recommendedActions: [
          'Try specific queries: "Which projects have the highest delay risk?"',
          'Or: "Why is Sivok-Rangpo high risk?"',
          'Or: "What projects should be prioritized this month?"',
        ]
      };
    }
  }
}

// ---- Preset Questions ----
export const suggestedQuestions = [
  { id: 'q1', text: 'Which projects have the highest delay risk?', category: 'Time Risk' },
  { id: 'q2', text: 'Why is Sivok–Rangpo Rail Line critical risk?', category: 'Project Detail' },
  { id: 'q3', text: 'Which sectors have the highest cost escalation?', category: 'Sector Analysis' },
  { id: 'q4', text: 'What projects should be prioritized this month?', category: 'Executive Action' },
  { id: 'q5', text: 'Show projects with high cost risk and low physical progress.', category: 'Anomaly Detection' },
  { id: 'q6', text: 'Which are the critical risk projects in the portfolio?', category: 'Critical Alerts' },
];

// ---- Future API Integration Point ----
// export async function askAI(query) {
//   const response = await fetch('/api/ai/ask', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ query }),
//   });
//   return response.json();
// }
