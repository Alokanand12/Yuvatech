// MoSPI DIID DEMO DATASET - Risk Analytics, ML Model Benchmarks & Data Intelligence

// Cost & Time overrun trend data over quarters
export const costOverrunTrend = [
  { quarter: 'Q1 FY23', original: 21.2, revised: 23.8, expenditure: 14.1 },
  { quarter: 'Q2 FY23', original: 21.8, revised: 24.6, expenditure: 15.0 },
  { quarter: 'Q3 FY23', original: 22.4, revised: 25.5, expenditure: 15.8 },
  { quarter: 'Q4 FY23', original: 23.0, revised: 26.4, expenditure: 16.5 },
  { quarter: 'Q1 FY24', original: 23.5, revised: 27.2, expenditure: 17.1 },
  { quarter: 'Q2 FY24', original: 23.9, revised: 27.9, expenditure: 17.6 },
  { quarter: 'Q3 FY24', original: 24.2, revised: 28.5, expenditure: 18.0 },
  { quarter: 'Q4 FY24', original: 24.5, revised: 29.1, expenditure: 18.4 },
];

export const timeOverrunTrend = [
  { month: 'Jan 24', delayedProjects: 410, criticalProjects: 68 },
  { month: 'Mar 24', delayedProjects: 425, criticalProjects: 72 },
  { month: 'May 24', delayedProjects: 440, criticalProjects: 78 },
  { month: 'Jul 24', delayedProjects: 458, criticalProjects: 82 },
  { month: 'Sep 24', delayedProjects: 472, criticalProjects: 87 },
];

// 2D Risk Matrix Scatter Points
export const riskMatrixPoints = [
  { id: "PRJ-MORT-101", name: "Mumbai-Delhi Expressway Pkg 4", x: 85, y: 88, riskLevel: "CRITICAL", cost: 5920, sector: "Transport" },
  { id: "PRJ-RAIL-204", name: "Chenab Bridge & Tunnel Section", x: 76, y: 82, riskLevel: "HIGH", cost: 27900, sector: "Transport" },
  { id: "PRJ-POWR-308", name: "Subansiri Lower Hydroelectric", x: 91, y: 94, riskLevel: "CRITICAL", cost: 19990, sector: "Energy" },
  { id: "PRJ-PETR-402", name: "Barmer Refinery Complex", x: 65, y: 74, riskLevel: "HIGH", cost: 72937, sector: "Energy" },
  { id: "PRJ-URBN-512", name: "Delhi Metro Phase IV Corridors", x: 42, y: 32, riskLevel: "WATCH", cost: 24948, sector: "Transport" },
  { id: "PRJ-WATR-601", name: "Ken-Betwa River Link Phase 1", x: 58, y: 52, riskLevel: "WATCH", cost: 44605, sector: "Water & Sanitation" },
  { id: "PRJ-PORT-705", name: "Vadhavan Deep Sea Port", x: 44, y: 40, riskLevel: "WATCH", cost: 76220, sector: "Transport" },
  { id: "PRJ-COAL-802", name: "Magadh Expansion Coal Mine", x: 70, y: 75, riskLevel: "HIGH", cost: 4680, sector: "Coal" },
  { id: "PRJ-STEL-903", name: "Bhilai Steel Modernization", x: 26, y: 22, riskLevel: "LOW", cost: 20400, sector: "Steel" },
  { id: "PRJ-POWER-315", name: "Green Energy Corridor Transmission", x: 30, y: 25, riskLevel: "LOW", cost: 12031, sector: "Energy" },
  { id: "PRJ-MINE-1004", name: "Nalco Bauxite Mine Expansion", x: 50, y: 46, riskLevel: "WATCH", cost: 6450, sector: "Mining" },
  { id: "PRJ-TELE-1101", name: "BharatNet Phase-III UP Zone", x: 66, y: 58, riskLevel: "HIGH", cost: 65000, sector: "Communication" },
  { id: "PRJ-SOCL-1201", name: "AIIMS Madurai Campus", x: 68, y: 62, riskLevel: "HIGH", cost: 1978, sector: "Social Infrastructure" },
  { id: "PRJ-RAIL-209", name: "Dedicated Freight Corridor Dankuni", x: 71, y: 78, riskLevel: "HIGH", cost: 15800, sector: "Transport" },
  { id: "PRJ-WATR-608", name: "Polavaram Dam & Canals", x: 88, y: 92, riskLevel: "CRITICAL", cost: 55548, sector: "Water & Sanitation" },
  { id: "PRJ-RAIL-215", name: "Sivok-Rangpo Rail Line", x: 84, y: 86, riskLevel: "CRITICAL", cost: 8900, sector: "Transport" },
  { id: "PRJ-POWER-322", name: "Kudankulam Nuclear Units 3 & 4", x: 75, y: 72, riskLevel: "HIGH", cost: 49680, sector: "Energy" },
  { id: "PRJ-SOCL-1208", name: "IIT Hyderabad Phase-II Campus", x: 20, y: 15, riskLevel: "LOW", cost: 1140, sector: "Social Infrastructure" },
];

// System-wide top risk drivers
export const topRiskDrivers = [
  { driver: "Financial-Physical Progress Gap", impactScore: 89, projectAffectedCount: 412, description: "Financial disbursements outpace physical construction site completion." },
  { driver: "Milestone Velocity Deceleration", impactScore: 84, projectAffectedCount: 368, description: "Quarterly milestone completion rate drops by over 30%." },
  { driver: "Land Acquisition & RoW Delays", impactScore: 78, projectAffectedCount: 524, description: "Pending state-level land encumbrance handovers." },
  { driver: "Contractor Liquidity Deficit", impactScore: 71, projectAffectedCount: 290, description: "EPC contractor cashflow constraints slowing equipment deployment." },
  { driver: "Environmental & Forest Clearances", impactScore: 68, projectAffectedCount: 315, description: "Multi-stage statutory regulatory approval bottlenecks." },
  { driver: "Raw Material Escalation Trend", impactScore: 62, projectAffectedCount: 480, description: "Steel, cement, and alloy price volatility exceeding escalation clauses." }
];

// Sector risk comparison
export const sectorRiskComparison = [
  { sector: "Transport", totalProjects: 784, highRiskCount: 142, avgCostOverrunPct: 22.4, avgDelayMonths: 18.5 },
  { sector: "Energy", totalProjects: 412, highRiskCount: 86, avgCostOverrunPct: 19.8, avgDelayMonths: 16.2 },
  { sector: "Water & Sanitation", totalProjects: 195, highRiskCount: 48, avgCostOverrunPct: 28.6, avgDelayMonths: 24.1 },
  { sector: "Coal", totalProjects: 128, highRiskCount: 24, avgCostOverrunPct: 15.2, avgDelayMonths: 12.8 },
  { sector: "Communication", totalProjects: 110, highRiskCount: 18, avgCostOverrunPct: 8.4, avgDelayMonths: 9.6 },
  { sector: "Social Infrastructure", totalProjects: 185, highRiskCount: 14, avgCostOverrunPct: 11.2, avgDelayMonths: 10.4 },
  { sector: "Mining", totalProjects: 92, highRiskCount: 7, avgCostOverrunPct: 12.1, avgDelayMonths: 11.0 },
  { sector: "Steel", totalProjects: 75, highRiskCount: 3, avgCostOverrunPct: 6.5, avgDelayMonths: 5.2 }
];

// ML Model Benchmark Data
export const modelBenchmarkData = [
  {
    modelName: "Statistical Baseline (Linear Regression)",
    accuracy: "68.4%",
    precision: "64.2%",
    recall: "61.8%",
    f1Score: "0.630",
    leadTimeMonths: "3.2 Months",
    status: "Baseline"
  },
  {
    modelName: "Random Forest Classifier",
    accuracy: "81.2%",
    precision: "79.5%",
    recall: "76.4%",
    f1Score: "0.779",
    leadTimeMonths: "6.5 Months",
    status: "Standard"
  },
  {
    modelName: "Gradient Boosting (XGBoost / LightGBM)",
    accuracy: "87.6%",
    precision: "85.8%",
    recall: "84.1%",
    f1Score: "0.849",
    leadTimeMonths: "9.4 Months",
    status: "High Accuracy"
  },
  {
    modelName: "PAIMANA-PREDICT Hybrid Ensemble Engine",
    accuracy: "92.8%",
    precision: "91.4%",
    recall: "90.2%",
    f1Score: "0.908",
    leadTimeMonths: "12.8 Months",
    status: "Recommended (Best)"
  }
];

// Data Intelligence Variable Expansion Comparison
export const dataIntelligenceVariables = {
  currentCUF: [
    { name: "Original & Revised Cost", desc: "Monetary baseline values in ₹ Crore", icon: "DollarSign" },
    { name: "Cumulative Expenditure", desc: "Total funds disbursed to date", icon: "CreditCard" },
    { name: "Physical Progress (%)", desc: "Site civil engineering completion metric", icon: "Activity" },
    { name: "Milestone Completion Dates", desc: "Target vs actual milestone dates", icon: "Calendar" },
    { name: "Sector & Ministry Categorization", desc: "Administrative governance grouping", icon: "Building" },
    { name: "Implementing Agency & State", desc: "Geographic and operational tags", icon: "MapPin" }
  ],
  recommendedAdditional: [
    { name: "Contractor Performance & Credit Score", impact: "High Impact (+8.2% Accuracy)", desc: "Tracks historical delay record and balance sheet health of EPC contractors." },
    { name: "Land Acquisition Stage Status", impact: "Critical Impact (+11.5% Early Lead)", desc: "Digitized 3D land encumbrance and Section 11/19 notification progress." },
    { name: "Statutory Approval Delay Index", impact: "High Impact (+6.4% Accuracy)", desc: "Tracks Days-in-Queue across Forest, MoEFCC, Railway Safety & Wildlife boards." },
    { name: "Material Price Index Volatility", impact: "Medium Impact (+4.8% Accuracy)", desc: "Live integration with WPI for steel, cement, bitumen, and copper alloys." },
    { name: "Seasonal Monsoon & Weather Anomalies", impact: "Medium Impact (+3.9% Accuracy)", desc: "Satellite rainfall anomalies vs historical site workability windows." },
    { name: "Labour Availability Index", impact: "Medium Impact (+3.1% Accuracy)", desc: "Regional migrant worker availability during harvest and festival seasons." }
  ]
};
