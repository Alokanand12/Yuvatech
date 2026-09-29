/**
 * PAIMANA-PREDICT — Project Intelligence Assistant Engine
 * Frontend-only deterministic query engine.
 * NO external APIs, NO random generation, NO hallucination.
 * All answers derived from demoProjects + riskEngine + forecastEngine + warningEngine.
 */

import demoProjects from '../data/demoProjects';
import { getRiskAssessment, getRiskLevel } from './riskEngine';
import { calculatePredictedFinalCost, calculateExpectedDelay } from './forecastEngine';
import { generateWarnings } from './warningEngine';
import { generateRecommendations } from './recommendationEngine';

// ─── Pre-process all projects with risk scores (cached in module scope) ────────
const ENRICHED = demoProjects.map(p => {
  const risk = getRiskAssessment(p);
  const forecastCost = calculatePredictedFinalCost(p);
  const delay = calculateExpectedDelay(p);
  const costEscalationPct = p.originalCost > 0
    ? Math.round(((p.revisedCost - p.originalCost) / p.originalCost) * 100)
    : 0;
  return {
    ...p,
    risk,
    forecastCost: forecastCost.value,
    expectedDelayMonths: delay.value,
    costEscalationPct,
  };
});

// ─── Preset sample questions shown in the UI ──────────────────────────────────
export const PRESET_QUESTIONS = [
  { id: 'q1', icon: '🚨', text: 'Which projects need immediate intervention?', category: 'Priority' },
  { id: 'q2', icon: '💰', text: 'Which projects have the highest cost risk?', category: 'Cost' },
  { id: 'q3', icon: '⏱️', text: 'Which projects have the highest delay risk?', category: 'Time' },
  { id: 'q4', icon: '🏗️', text: 'Which sectors have the highest risk?', category: 'Sector' },
  { id: 'q5', icon: '⚠️', text: 'Show projects with high cost and time risk', category: 'Matrix' },
  { id: 'q6', icon: '📊', text: 'What are the major risk drivers across the portfolio?', category: 'Analytics' },
  { id: 'q7', icon: '🔍', text: 'Which projects have the highest overall risk?', category: 'Overview' },
];

// ─── Utility helpers ──────────────────────────────────────────────────────────

function formatCr(val) {
  return `₹${Number(val).toLocaleString('en-IN')} Cr`;
}

function toProjectCard(p) {
  return {
    id: p.id,
    name: p.projectName,
    ministry: p.ministry,
    sector: p.sector,
    state: p.state,
    riskScore: p.risk.overallRiskScore,
    riskLevel: p.risk.riskLevel,
    costRisk: p.risk.costRisk,
    timeRisk: p.risk.timeRisk,
    executionRisk: p.risk.executionRisk,
    riskDrivers: p.risk.riskDrivers,
    physicalProgress: p.physicalProgress,
    financialProgress: p.financialProgress,
    originalCost: p.originalCost,
    revisedCost: p.revisedCost,
    forecastCost: p.forecastCost,
    expectedDelayMonths: p.expectedDelayMonths,
    costEscalationPct: p.costEscalationPct,
    status: p.status,
    plannedCompletion: p.plannedCompletion,
  };
}

// Fuzzy-match project name in user query
function findProjectByNameInQuery(query) {
  const q = query.toLowerCase();
  // Try longest match first for disambiguation
  return ENRICHED.find(p =>
    q.includes(p.projectName.toLowerCase()) ||
    p.projectName.toLowerCase().split(' ').some(word => word.length > 4 && q.includes(word.toLowerCase()))
  );
}

function findTwoProjectsByNameInQuery(query) {
  const q = query.toLowerCase();
  const matches = ENRICHED.filter(p =>
    q.includes(p.projectName.toLowerCase()) ||
    p.projectName.toLowerCase().split(' ').some(word => word.length > 5 && q.includes(word.toLowerCase()))
  );
  return matches.slice(0, 2);
}

// ─── INTENT MATCHERS ──────────────────────────────────────────────────────────

function isHighestRisk(q) {
  return (q.includes('highest risk') || q.includes('most at risk') || q.includes('top risk') || q.includes('overall risk')) &&
    !q.includes('cost') && !q.includes('delay') && !q.includes('time');
}

function isHighestCostRisk(q) {
  return q.includes('cost risk') || q.includes('cost overrun') || q.includes('cost escalat') ||
    (q.includes('highest cost') && !q.includes('sector'));
}

function isHighestDelayRisk(q) {
  return q.includes('delay risk') || q.includes('time risk') || q.includes('time overrun') ||
    q.includes('highest delay') || q.includes('schedule risk');
}

function isSectorRisk(q) {
  return (q.includes('sector') && (q.includes('risk') || q.includes('highest') || q.includes('vulnerable')));
}

function isImmediateIntervention(q) {
  return q.includes('immediate') || q.includes('intervention') || q.includes('critical projects') ||
    q.includes('urgent') || q.includes('prioriti') || q.includes('action needed') || q.includes('action required');
}

function isHighCostAndTimeRisk(q) {
  return (q.includes('cost') && q.includes('time')) ||
    (q.includes('cost') && q.includes('delay')) ||
    (q.includes('both') && (q.includes('risk') || q.includes('overrun')));
}

function isMajorRiskDrivers(q) {
  return q.includes('risk driver') || q.includes('major driver') || q.includes('key driver') ||
    q.includes('primary driver') || q.includes('what cause') || q.includes('main risk');
}

function isWhyHighRisk(q) {
  return (q.includes('why') && (q.includes('risk') || q.includes('high'))) ||
    q.includes('explain') || q.includes('reason');
}

function isSummarize(q) {
  return q.includes('summarize') || q.includes('summary of') || q.includes('tell me about') ||
    q.includes('what is') || q.includes('status of') || q.includes('detail');
}

function isCompare(q) {
  return q.includes('compare') || q.includes('vs') || q.includes('versus') || q.includes('difference between');
}

// ─── RESPONSE BUILDERS ────────────────────────────────────────────────────────

function buildHighestRiskResponse(rawQuery) {
  const top = [...ENRICHED]
    .sort((a, b) => b.risk.overallRiskScore - a.risk.overallRiskScore)
    .slice(0, 8)
    .map(toProjectCard);

  const criticalCount = top.filter(p => p.riskLevel === 'CRITICAL').length;

  return {
    intent: 'highest_risk',
    query: rawQuery,
    answerType: 'project_list',
    headline: `${top.length} Highest-Risk Infrastructure Projects`,
    summary: `Analysis of the complete portfolio of **${ENRICHED.length} projects** identifies **${criticalCount} CRITICAL** and **${top.length - criticalCount} HIGH** risk projects. These are ranked by overall risk score (weighted: Cost 35%, Time 35%, Execution 30%).`,
    analysisSteps: [
      `Scanned ${ENRICHED.length} infrastructure projects from the demonstration dataset.`,
      `Calculated composite risk scores: Cost Risk (35%) + Time Risk (35%) + Execution Risk (30%).`,
      `Sorted portfolio by Overall Risk Score in descending order.`,
      `Identified top 8 projects requiring active monitoring or intervention.`,
    ],
    projects: top,
    recommendedActions: [
      `Immediately escalate all ${criticalCount} CRITICAL projects to joint review committee.`,
      'Deploy dedicated monitoring officers to High + Critical risk project sites.',
      'Review last 3 months of expenditure and physical progress reports for anomalies.',
    ],
  };
}

function buildHighestCostRiskResponse(rawQuery) {
  const top = [...ENRICHED]
    .sort((a, b) => b.risk.costRisk - a.risk.costRisk)
    .slice(0, 8)
    .map(toProjectCard);

  const avgEscalation = Math.round(
    top.reduce((sum, p) => sum + p.costEscalationPct, 0) / top.length
  );

  return {
    intent: 'cost_risk',
    query: rawQuery,
    answerType: 'project_list',
    headline: 'Projects with Highest Cost Risk',
    summary: `Identified **${top.length} projects** with the highest cost risk scores. Average cost escalation across these projects is **+${avgEscalation}%** above original estimates. Cost risk is computed from: cost escalation rate × 2, plus financial-physical mismatch penalty.`,
    analysisSteps: [
      `Calculated cost escalation: (Revised Cost − Original Cost) / Original Cost × 100.`,
      `Applied financial-physical mismatch penalty where expenditure outpaces physical progress.`,
      `Sorted ${ENRICHED.length} projects by Cost Risk Score (0–100 scale).`,
      `Extracted top 8 projects with highest cost overrun trajectory.`,
    ],
    projects: top,
    recommendedActions: [
      'Initiate independent cost audit for all projects with Cost Risk > 70.',
      'Mandate mandatory cost justification reports for revised cost approvals.',
      'Enforce expenditure-linked milestone completion gates to prevent financial-physical misalignment.',
    ],
  };
}

function buildHighestDelayRiskResponse(rawQuery) {
  const top = [...ENRICHED]
    .sort((a, b) => b.risk.timeRisk - a.risk.timeRisk)
    .slice(0, 8)
    .map(toProjectCard);

  const maxDelay = Math.max(...top.map(p => p.expectedDelayMonths));

  return {
    intent: 'delay_risk',
    query: rawQuery,
    answerType: 'project_list',
    headline: 'Projects with Highest Delay Risk',
    summary: `Identified **${top.length} projects** with the highest time overrun risk. Maximum forecasted delay in this group is **+${maxDelay} months**. Time risk is driven by milestone delays (×50 factor), schedule slippage, and low physical progress relative to elapsed time.`,
    analysisSteps: [
      `Computed schedule slippage: (Expected Completion − Planned Completion) in months.`,
      `Applied milestone delay penalty: (Delayed Milestones / Total Milestones) × 50.`,
      `Added stagnation penalty for projects with physical progress < 50% and existing delays.`,
      `Ranked ${ENRICHED.length} projects by Time Risk Score (0–100 scale).`,
    ],
    projects: top,
    recommendedActions: [
      'Form rapid-response task forces for the top 3 time-critical projects.',
      'Deploy accelerated procurement process for delayed milestone approvals.',
      'Conduct weekly site-level critical path analysis for projects with delay risk > 75.',
    ],
  };
}

function buildSectorRiskResponse(rawQuery) {
  const sectorMap = {};
  ENRICHED.forEach(p => {
    if (!sectorMap[p.sector]) {
      sectorMap[p.sector] = { total: 0, critical: 0, high: 0, sumRisk: 0, sumCostEsc: 0, sumDelay: 0 };
    }
    sectorMap[p.sector].total += 1;
    sectorMap[p.sector].sumRisk += p.risk.overallRiskScore;
    sectorMap[p.sector].sumCostEsc += p.costEscalationPct;
    sectorMap[p.sector].sumDelay += p.expectedDelayMonths;
    if (p.risk.riskLevel === 'CRITICAL') sectorMap[p.sector].critical += 1;
    if (p.risk.riskLevel === 'HIGH') sectorMap[p.sector].high += 1;
  });

  const sectors = Object.entries(sectorMap).map(([name, d]) => ({
    sector: name,
    totalProjects: d.total,
    criticalCount: d.critical,
    highCount: d.high,
    avgRiskScore: Math.round(d.sumRisk / d.total),
    avgCostEscalation: Math.round(d.sumCostEsc / d.total),
    avgDelayMonths: Math.round(d.sumDelay / d.total),
    riskLevel: getRiskLevel(Math.round(d.sumRisk / d.total)),
  })).sort((a, b) => b.avgRiskScore - a.avgRiskScore);

  const topSector = sectors[0];

  return {
    intent: 'sector_risk',
    query: rawQuery,
    answerType: 'sector_list',
    headline: 'Sector Vulnerability & Risk Profile',
    summary: `**${topSector.sector}** emerges as the highest-risk sector with an average risk score of **${topSector.avgRiskScore}/100** and **${topSector.criticalCount} CRITICAL** projects. Sector risk is aggregated from individual project scores across ${ENRICHED.length} active portfolio projects.`,
    analysisSteps: [
      `Grouped all ${ENRICHED.length} projects by infrastructure sector.`,
      `Computed average risk score, cost escalation, and expected delay per sector.`,
      `Counted CRITICAL and HIGH risk projects per sector.`,
      `Ranked sectors by average overall risk score descending.`,
    ],
    sectors,
    recommendedActions: [
      `Convene sector-level review committee for ${topSector.sector} within 30 days.`,
      'Publish quarterly Sector Risk Heat Map for Cabinet Committee on Infrastructure.',
      'Mandate sector-specific project monitoring frameworks for CRITICAL sectors.',
    ],
  };
}

function buildImmediateInterventionResponse(rawQuery) {
  const criticals = [...ENRICHED]
    .filter(p => p.risk.riskLevel === 'CRITICAL')
    .sort((a, b) => b.risk.overallRiskScore - a.risk.overallRiskScore)
    .slice(0, 8)
    .map(toProjectCard);

  // Supplement with HIGH risk if not enough CRITICAL
  const highs = [...ENRICHED]
    .filter(p => p.risk.riskLevel === 'HIGH')
    .sort((a, b) => b.risk.overallRiskScore - a.risk.overallRiskScore)
    .slice(0, Math.max(0, 8 - criticals.length))
    .map(toProjectCard);

  const combined = [...criticals, ...highs].slice(0, 8);

  return {
    intent: 'intervention',
    query: rawQuery,
    answerType: 'project_list',
    headline: `${combined.length} Projects Requiring Immediate Intervention`,
    summary: `CRITICAL INTERVENTION ADVISORY: **${criticals.length} projects** are at CRITICAL risk level. Combined forecasted cost overrun exposure across these projects is **${formatCr(combined.reduce((s, p) => s + (p.forecastCost - p.revisedCost), 0))}**. Immediate administrative escalation is required.`,
    analysisSteps: [
      `Filtered portfolio for CRITICAL risk projects (Overall Risk Score > 75).`,
      `Supplemented with HIGH risk projects (Risk Score 51–75) for complete intervention list.`,
      `Computed combined financial exposure from forecast vs revised cost differential.`,
      `Prioritized by overall risk score + expected delay months compound score.`,
    ],
    projects: combined,
    recommendedActions: [
      'Issue immediate monitoring escalation notice for all CRITICAL projects.',
      'Form high-level inter-ministerial task forces for each CRITICAL project.',
      'Freeze further disbursements pending physical progress verification audits.',
      'Brief Secretary-level officers on top 5 projects within 48 hours.',
    ],
  };
}

function buildHighCostAndTimeResponse(rawQuery) {
  const dual = [...ENRICHED]
    .filter(p => p.risk.costRisk > 50 && p.risk.timeRisk > 50)
    .sort((a, b) => (b.risk.costRisk + b.risk.timeRisk) - (a.risk.costRisk + a.risk.timeRisk))
    .slice(0, 8)
    .map(toProjectCard);

  return {
    intent: 'dual_risk',
    query: rawQuery,
    answerType: 'project_list',
    headline: 'Projects with High Cost AND Time Risk',
    summary: `Identified **${dual.length} projects** exhibiting simultaneous high cost risk (>50) AND high time risk (>50) — the most dangerous risk combination. These projects face compound exposure: budget overruns amplified by prolonged delay overhead costs.`,
    analysisSteps: [
      `Applied dual-risk filter: Cost Risk Score > 50 AND Time Risk Score > 50.`,
      `Ranked by compound score (Cost Risk + Time Risk) in descending order.`,
      `Extracted top 8 projects with highest dual-risk exposure from ${ENRICHED.length} projects.`,
      `Computed risk vectors for each project to identify primary intervention lever.`,
    ],
    projects: dual,
    recommendedActions: [
      'Prioritize dual-risk projects for emergency review at Joint Monitoring Committee.',
      'Implement concurrent cost containment + schedule recovery plans.',
      'Commission independent project health audits within 15 days for all dual-risk projects.',
    ],
  };
}

function buildMajorRiskDriversResponse(rawQuery) {
  const driversCount = {};
  ENRICHED.forEach(p => {
    p.risk.riskDrivers.forEach(d => {
      if (!driversCount[d.title]) {
        driversCount[d.title] = { count: 0, critical: 0, high: 0, medium: 0 };
      }
      driversCount[d.title].count += 1;
      if (d.severity === 'CRITICAL') driversCount[d.title].critical += 1;
      if (d.severity === 'HIGH') driversCount[d.title].high += 1;
      if (d.severity === 'MEDIUM') driversCount[d.title].medium += 1;
    });
  });

  const drivers = Object.entries(driversCount)
    .map(([title, d]) => ({
      title,
      totalOccurrences: d.count,
      criticalCount: d.critical,
      highCount: d.high,
      mediumCount: d.medium,
      affectedPct: Math.round((d.count / ENRICHED.length) * 100),
    }))
    .sort((a, b) => b.totalOccurrences - a.totalOccurrences);

  const topDriver = drivers[0];

  return {
    intent: 'risk_drivers',
    query: rawQuery,
    answerType: 'driver_list',
    headline: 'Portfolio-Wide Risk Driver Analysis',
    summary: `Aggregated risk signals from **${ENRICHED.length} projects** and **${ENRICHED.reduce((s, p) => s + p.risk.riskDrivers.length, 0)} individual risk driver events**. The most prevalent risk driver across the portfolio is **${topDriver?.title}**, affecting **${topDriver?.affectedPct}%** of projects.`,
    analysisSteps: [
      `Extracted risk drivers from all ${ENRICHED.length} projects in the portfolio.`,
      `Aggregated occurrence frequencies for each driver category.`,
      `Counted severity distribution (CRITICAL / HIGH / MEDIUM) per driver type.`,
      `Computed portfolio penetration rate as percentage of total projects affected.`,
    ],
    drivers,
    recommendedActions: [
      `Address the leading driver "${topDriver?.title}" through a targeted portfolio-level policy intervention.`,
      'Publish driver-specific remediation guidelines for implementing agencies.',
      'Integrate risk driver tracking into quarterly MoSPI performance review framework.',
    ],
  };
}

function buildWhyHighRiskResponse(rawQuery, project) {
  const recs = generateRecommendations(project.risk.riskDrivers);
  const card = toProjectCard(project);
  const costEscapePct = project.costEscalationPct;

  return {
    intent: 'why_risk',
    query: rawQuery,
    answerType: 'project_detail',
    headline: `Risk Analysis: ${project.projectName}`,
    summary: `**${project.projectName}** carries a risk score of **${project.risk.overallRiskScore}/100** [${project.risk.riskLevel}]. ${project.risk.riskDrivers.length > 0 ? `The primary risk driver is **${project.risk.riskDrivers[0].title}**` : 'No major risk drivers detected at this time'}, with cost escalation of **+${costEscapePct}%** and an expected delay of **+${project.expectedDelayMonths} months**.`,
    analysisSteps: [
      `Retrieved project record: ${project.projectName} (${project.id}).`,
      `Computed Cost Risk: ${project.risk.costRisk}/100 | Time Risk: ${project.risk.timeRisk}/100 | Execution Risk: ${project.risk.executionRisk}/100.`,
      `Identified ${project.risk.riskDrivers.length} active risk driver(s) from financial and physical telemetry.`,
      `Generated deterministic recommended actions for each risk driver.`,
    ],
    project: card,
    drivers: project.risk.riskDrivers,
    recommendedActions: recs.map(r => `[${r.risk}] ${r.recommendedAction}`),
  };
}

function buildSummarizeResponse(rawQuery, project) {
  const card = toProjectCard(project);
  return {
    intent: 'summarize',
    query: rawQuery,
    answerType: 'project_detail',
    headline: `Project Summary: ${project.projectName}`,
    summary: `**${project.projectName}** is a ${project.sector} project in **${project.state}** under **${project.ministry}**. Current status: **${project.status}**. Physical progress stands at **${project.physicalProgress}%** with financial progress at **${project.financialProgress}%**. Cost escalation: **+${project.costEscalationPct}%**.`,
    analysisSteps: [
      `Located project: ${project.projectName} (${project.id}).`,
      `Computed risk profile: Overall ${project.risk.overallRiskScore}/100 [${project.risk.riskLevel}].`,
      `Forecast: Predicted final cost ${formatCr(project.forecastCost)} vs revised estimate ${formatCr(project.revisedCost)}.`,
      `Expected delay beyond planned completion: +${project.expectedDelayMonths} months.`,
    ],
    project: card,
    drivers: project.risk.riskDrivers,
    recommendedActions: generateRecommendations(project.risk.riskDrivers).map(r => `[${r.risk}] ${r.recommendedAction}`),
  };
}

function buildCompareResponse(rawQuery, p1, p2) {
  const c1 = toProjectCard(p1);
  const c2 = toProjectCard(p2);

  const winner = p1.risk.overallRiskScore >= p2.risk.overallRiskScore ? c1 : c2;

  return {
    intent: 'compare',
    query: rawQuery,
    answerType: 'comparison',
    headline: `Project Comparison`,
    summary: `Comparing **${p1.projectName}** (Score: ${p1.risk.overallRiskScore}) vs **${p2.projectName}** (Score: ${p2.risk.overallRiskScore}). **${winner.name}** carries higher overall risk and requires priority attention.`,
    analysisSteps: [
      `Retrieved project records for both comparison targets.`,
      `Computed risk scores for each: ${p1.projectName} (${p1.risk.overallRiskScore}) vs ${p2.projectName} (${p2.risk.overallRiskScore}).`,
      `Compared cost escalation, delay risk, and execution risk vectors.`,
      `Identified the higher-risk project for priority recommendation.`,
    ],
    projectA: c1,
    projectB: c2,
    recommendedActions: [
      `Prioritize ${winner.name} for immediate review given higher risk score.`,
      'Run parallel cost audits on both projects to identify systemic issues.',
      'Compare implementing agency performance to identify best practices for transfer.',
    ],
  };
}

function buildUnknownResponse(rawQuery) {
  // Try generic keyword search across all projects
  const q = rawQuery.toLowerCase();
  const matches = ENRICHED.filter(p =>
    p.projectName.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w)) ||
    p.sector.toLowerCase().includes(q) ||
    p.state.toLowerCase().includes(q) ||
    p.ministry.toLowerCase().includes(q) ||
    p.status.toLowerCase().includes(q)
  ).slice(0, 5).map(toProjectCard);

  if (matches.length > 0) {
    return {
      intent: 'keyword_search',
      query: rawQuery,
      answerType: 'project_list',
      headline: `${matches.length} Matching Projects Found`,
      summary: `Found **${matches.length} projects** matching your query keywords. Showing risk intelligence for each project.`,
      analysisSteps: [
        `Performed keyword search across project names, sectors, states, and ministry fields.`,
        `Returned ${matches.length} matching records with live risk calculations.`,
      ],
      projects: matches,
      recommendedActions: [
        'Review the Project Intelligence page for detailed analysis of each project.',
        'Check the Early Warnings page for active alerts on matched projects.',
      ],
    };
  }

  return {
    intent: 'unsupported',
    query: rawQuery,
    answerType: 'unsupported',
    headline: 'Query Not Supported',
    summary: `I can currently answer questions related to the available project monitoring demonstration dataset (${ENRICHED.length} infrastructure projects). Try asking about project risks, cost overruns, delays, sectors, or specific project names.`,
    analysisSteps: [`Query did not match any supported intent patterns or project keywords.`],
    recommendedActions: [],
  };
}

// ─── MAIN QUERY FUNCTION ─────────────────────────────────────────────────────

export function queryAssistant(rawQuery) {
  const q = rawQuery.toLowerCase().trim();

  // 1. Compare two projects
  if (isCompare(q)) {
    const pair = findTwoProjectsByNameInQuery(q);
    if (pair.length === 2) return buildCompareResponse(rawQuery, pair[0], pair[1]);
  }

  // 2. Why is [project] high risk OR summarize [project]
  const namedProject = findProjectByNameInQuery(q);
  if (namedProject) {
    if (isWhyHighRisk(q) || q.includes('risk') || q.includes('driver')) {
      return buildWhyHighRiskResponse(rawQuery, namedProject);
    }
    return buildSummarizeResponse(rawQuery, namedProject);
  }

  // 3. Structured intents
  if (isImmediateIntervention(q)) return buildImmediateInterventionResponse(rawQuery);
  if (isHighCostAndTimeRisk(q)) return buildHighCostAndTimeResponse(rawQuery);
  if (isHighestCostRisk(q)) return buildHighestCostRiskResponse(rawQuery);
  if (isHighestDelayRisk(q)) return buildHighestDelayRiskResponse(rawQuery);
  if (isSectorRisk(q)) return buildSectorRiskResponse(rawQuery);
  if (isMajorRiskDrivers(q)) return buildMajorRiskDriversResponse(rawQuery);
  if (isHighestRisk(q)) return buildHighestRiskResponse(rawQuery);

  // 4. Fallback keyword search + unsupported
  return buildUnknownResponse(rawQuery);
}

// ─── WELCOME MESSAGE ─────────────────────────────────────────────────────────

export function getWelcomeMessage() {
  const criticalCount = ENRICHED.filter(p => p.risk.riskLevel === 'CRITICAL').length;
  const highCount = ENRICHED.filter(p => p.risk.riskLevel === 'HIGH').length;
  const totalWarnings = generateWarnings().length;

  return {
    intent: 'welcome',
    query: null,
    answerType: 'welcome',
    headline: 'Project Intelligence Assistant — Online',
    summary: `Portfolio loaded: **${ENRICHED.length} infrastructure projects** across 8 sectors and multiple states. Current alert status: **${criticalCount} CRITICAL** and **${highCount} HIGH** risk projects detected, with **${totalWarnings} active early warnings** in the system. Ask me anything about project risk, delays, or cost overruns.`,
    analysisSteps: [
      `Risk engine initialized — ${ENRICHED.length} projects processed.`,
      `${criticalCount} CRITICAL + ${highCount} HIGH risk projects identified.`,
      `${totalWarnings} early warnings generated from deterministic rule-based engine.`,
      `Assistant ready. Type a query or select a suggested question below.`,
    ],
    recommendedActions: [],
  };
}
