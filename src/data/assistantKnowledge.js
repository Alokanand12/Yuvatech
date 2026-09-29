// MoSPI DIID DEMO DATASET - AI Assistant Knowledge Base & Rule Matcher

export const presetQuestions = [
  {
    id: "q1",
    question: "Which projects have the highest delay risk?",
    category: "Time Risk Analysis"
  },
  {
    id: "q2",
    question: "Why is Mumbai-Delhi Expressway Pkg 4 high risk?",
    category: "Project Deep-Dive"
  },
  {
    id: "q3",
    question: "Which sectors have the highest cost escalation?",
    category: "Sector Intelligence"
  },
  {
    id: "q4",
    question: "What projects should be prioritized this month?",
    category: "Executive Action Plan"
  },
  {
    id: "q5",
    question: "Show projects with high cost risk and low physical progress.",
    category: "Financial Anomaly Search"
  }
];

export function generateAssistantResponse(query, projects) {
  const qLower = query.toLowerCase();

  // 1. Highest Delay Risk Query
  if (qLower.includes("delay risk") || qLower.includes("highest delay") || qLower.includes("time overrun")) {
    const delayedProjects = [...projects]
      .sort((a, b) => b.timeRisk - a.timeRisk)
      .slice(0, 5);

    return {
      userQuestion: query,
      analysisSteps: [
        "Ingested MoSPI CUF dataset of 1,981 infrastructure projects.",
        "Filtered projects by Time Overrun Risk metric (timeRisk > 75%).",
        "Evaluated milestone completion velocity and historical sector delay patterns.",
        "Synthesized top 5 time-critical projects requiring intervention."
      ],
      answerType: "project_list",
      data: delayedProjects.map(p => ({
        id: p.id,
        name: p.name,
        ministry: p.ministry,
        sector: p.sector,
        riskScore: p.riskScore,
        timeRisk: `${p.timeRisk}%`,
        expectedDelay: `+${p.expectedDelayMonths} Mos`,
        riskLevel: p.riskLevel
      })),
      summaryText: `Analysis indicates **${delayedProjects.length} key projects** facing critical delay risks driven primarily by geological surprises, environmental clearance queues, and contractor equipment deficits.`,
      recommendedActions: [
        "Form high-level inter-ministerial task force for top 5 delayed projects.",
        "Initiate mandatory weekly site progress reporting for projects with timeRisk > 80%.",
        "Audit contractor equipment and manpower mobilization status immediately."
      ]
    };
  }

  // 2. Specific project query (e.g. Mumbai-Delhi Expressway or Subansiri or Polavaram or Chenab)
  if (qLower.includes("mumbai") || qLower.includes("expressway") || qLower.includes("why is project") || qLower.includes("subansiri") || qLower.includes("polavaram")) {
    const targetProject = projects.find(p => 
      p.name.toLowerCase().includes("mumbai") || 
      p.name.toLowerCase().includes("subansiri") || 
      p.name.toLowerCase().includes("polavaram")
    ) || projects[0];

    return {
      userQuestion: query,
      analysisSteps: [
        `Retrieved project record for [${targetProject.name}] (${targetProject.id}).`,
        "Executed PAIMANA Multi-Factor Risk Decomposition Model.",
        `Identified Risk Score: ${targetProject.riskScore}/100 [${targetProject.riskLevel}].`,
        "Extracted 4 key explainable risk drivers from CUF financial & physical telemetry."
      ],
      answerType: "project_detail",
      project: targetProject,
      summaryText: `**${targetProject.name}** is flagged as **${targetProject.riskLevel} RISK** (Score: ${targetProject.riskScore}/100). The primary driver is a **${targetProject.financialProgress - targetProject.physicalProgress}% gap** between financial expenditure (${targetProject.financialProgress}%) and physical civil progress (${targetProject.physicalProgress}%).`,
      recommendedActions: targetProject.recommendedActions
    };
  }

  // 3. Sector Cost Escalation Query
  if (qLower.includes("sector") || qLower.includes("cost escalation")) {
    return {
      userQuestion: query,
      analysisSteps: [
        "Aggregated original vs revised costs across 8 key infrastructure sectors.",
        "Calculated mean cost escalation percentage and total monetary variance.",
        "Identified Water & Sanitation and Transport as sectors with highest relative cost escalation."
      ],
      answerType: "sector_summary",
      data: [
        { sector: "Water & Sanitation", avgEscalation: "+28.6%", highRiskProjects: 48, totalRevisedCr: "₹55,548 Cr" },
        { sector: "Transport", avgEscalation: "+22.4%", highRiskProjects: 142, totalRevisedCr: "₹1,42,800 Cr" },
        { sector: "Energy", avgEscalation: "+19.8%", highRiskProjects: 86, totalRevisedCr: "₹1,89,200 Cr" },
        { sector: "Coal", avgEscalation: "+15.2%", highRiskProjects: 24, totalRevisedCr: "₹19,800 Cr" },
        { sector: "Mining", avgEscalation: "+12.1%", highRiskProjects: 7, totalRevisedCr: "₹6,450 Cr" }
      ],
      summaryText: "Sectoral analysis reveals that **Water & Sanitation** (+28.6%) and **Transport** (+22.4%) exhibit the highest cost overrun percentages, driven by land acquisition price escalation and major scope revisions during execution.",
      recommendedActions: [
        "Enforce strict DPR baseline sanity checks prior to tender authorization in Water & Transport sectors.",
        "Establish standardized raw material price index escalation caps in EPC contract clauses.",
        "Conduct quarterly sectoral cost-overrun audits with Ministry Financial Advisers."
      ]
    };
  }

  // 4. Monthly Priority Projects Query
  if (qLower.includes("prioritize") || qLower.includes("prioritized") || qLower.includes("this month") || qLower.includes("action plan")) {
    const criticals = projects.filter(p => p.riskLevel === "CRITICAL" || p.riskLevel === "HIGH").slice(0, 4);

    return {
      userQuestion: query,
      analysisSteps: [
        "Queried active Early Warnings Command Center triggers for September 2026.",
        "Filtered for CRITICAL and HIGH severity projects with impending milestone target dates.",
        "Scored project urgency based on capital expenditure size and delay impact factor."
      ],
      answerType: "project_list",
      data: criticals.map(p => ({
        id: p.id,
        name: p.name,
        ministry: p.ministry,
        riskScore: p.riskScore,
        status: p.status,
        predictedCost: `₹${p.predictedCost} Cr`,
        riskLevel: p.riskLevel
      })),
      summaryText: `Based on risk impact scoring, **${criticals.length} high-impact projects** require immediate executive prioritization this month to prevent cumulative cost overruns exceeding ₹8,500 Cr.`,
      recommendedActions: [
        "Schedule Cabinet Committee on Infrastructure (CCI) review for Polavaram and Subansiri projects.",
        "Authorize fast-track environmental clearance desk for Mumbai-Delhi Expressway Pkg 4.",
        "Release critical milestone funding release for Udhampur-Srinagar Rail Link."
      ]
    };
  }

  // 5. High cost risk & low physical progress query
  if (qLower.includes("low physical") || qLower.includes("high cost risk") || qLower.includes("mismatch") || qLower.includes("anomaly")) {
    const anomalies = projects
      .filter(p => p.costRisk > 60 && p.physicalProgress < 65)
      .slice(0, 5);

    return {
      userQuestion: query,
      analysisSteps: [
        "Filtered projects where Cost Risk > 60% AND Physical Progress < 65%.",
        "Ran disalignment detection algorithm to highlight potential over-disbursement anomalies.",
        "Identified projects where expenditure trajectory significantly outpaces site work."
      ],
      answerType: "project_list",
      data: anomalies.map(p => ({
        id: p.id,
        name: p.name,
        physicalProgress: `${p.physicalProgress}%`,
        financialProgress: `${p.financialProgress}%`,
        costRisk: `${p.costRisk}%`,
        riskLevel: p.riskLevel
      })),
      summaryText: `Identified **${anomalies.length} projects exhibiting severe financial-physical disalignment**, where financial disbursements far outpace actual physical construction completion on site.`,
      recommendedActions: [
        "Order independent physical quantity survey for all identified anomaly projects.",
        "Pause next tranche payments until physical progress aligns with financial billing.",
        "Review contractor bill submission validation workflow at implementing agencies."
      ]
    };
  }

  // Default Fallback query response
  const matches = projects.filter(p => 
    p.name.toLowerCase().includes(qLower) || 
    p.ministry.toLowerCase().includes(qLower) ||
    p.sector.toLowerCase().includes(qLower) ||
    p.state.toLowerCase().includes(qLower)
  ).slice(0, 4);

  return {
    userQuestion: query,
    analysisSteps: [
      `Searched MoSPI project database for query keywords: "${query}".`,
      `Retrieved ${matches.length > 0 ? matches.length : 'relevant portfolio'} project records matching search parameters.`,
      "Synthesized predictive intelligence metrics and risk drivers."
    ],
    answerType: "project_list",
    data: (matches.length > 0 ? matches : projects.slice(0, 4)).map(p => ({
      id: p.id,
      name: p.name,
      ministry: p.ministry,
      sector: p.sector,
      riskScore: p.riskScore,
      riskLevel: p.riskLevel,
      status: p.status
    })),
    summaryText: `Found **${matches.length > 0 ? matches.length : 4} matching projects** in the MoSPI infrastructure portfolio. Predictive analytics indicate heightened monitoring is recommended for items with High or Critical risk levels.`,
    recommendedActions: [
      "Review detailed project intelligence breakdown on the Projects page.",
      "Check Early Warnings Command Center for active alerts related to these projects.",
      "Set up automated warning notifications for any risk score change > +5 points."
    ]
  };
}
