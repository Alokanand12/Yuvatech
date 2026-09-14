// ============================================================
// PAIMANA-PREDICT | Risk Analytics Data
// DEMO DATA — Sample values for frontend demonstration
// ============================================================

// Cost & Expenditure trend (₹ Lakh Cr)
export const costOverrunTrend = [
  { quarter: 'Q1 FY22', original: 19.8, revised: 22.4, expenditure: 12.1 },
  { quarter: 'Q2 FY22', original: 20.2, revised: 23.1, expenditure: 12.8 },
  { quarter: 'Q3 FY22', original: 20.8, revised: 23.9, expenditure: 13.4 },
  { quarter: 'Q4 FY22', original: 21.4, revised: 24.8, expenditure: 14.0 },
  { quarter: 'Q1 FY23', original: 21.9, revised: 25.6, expenditure: 14.8 },
  { quarter: 'Q2 FY23', original: 22.4, revised: 26.4, expenditure: 15.5 },
  { quarter: 'Q3 FY23', original: 22.9, revised: 27.2, expenditure: 16.1 },
  { quarter: 'Q4 FY23', original: 23.4, revised: 28.0, expenditure: 16.8 },
  { quarter: 'Q1 FY24', original: 23.8, revised: 28.6, expenditure: 17.4 },
  { quarter: 'Q2 FY24', original: 24.1, revised: 29.0, expenditure: 17.9 },
  { quarter: 'Q3 FY24', original: 24.3, revised: 29.1, expenditure: 18.2 },
  { quarter: 'Q4 FY24', original: 24.5, revised: 29.1, expenditure: 18.4 },
];

// Quarterly delay trend
export const timeOverrunTrend = [
  { quarter: 'Q1 FY22', avgDelayMonths: 11.2, projectsDelayed: 380 },
  { quarter: 'Q2 FY22', avgDelayMonths: 11.8, projectsDelayed: 392 },
  { quarter: 'Q3 FY22', avgDelayMonths: 12.4, projectsDelayed: 406 },
  { quarter: 'Q4 FY22', avgDelayMonths: 12.9, projectsDelayed: 418 },
  { quarter: 'Q1 FY23', avgDelayMonths: 13.3, projectsDelayed: 428 },
  { quarter: 'Q2 FY23', avgDelayMonths: 13.6, projectsDelayed: 438 },
  { quarter: 'Q3 FY23', avgDelayMonths: 13.9, projectsDelayed: 447 },
  { quarter: 'Q4 FY23', avgDelayMonths: 14.1, projectsDelayed: 456 },
  { quarter: 'Q1 FY24', avgDelayMonths: 14.0, projectsDelayed: 460 },
  { quarter: 'Q2 FY24', avgDelayMonths: 14.2, projectsDelayed: 464 },
];

// 2D Risk Matrix points — [timeRisk, costRisk, id, name]
export const riskMatrixPoints = [
  { id: "PRJ-POWR-003", name: "Subansiri Hydro (2000 MW)", x: 88, y: 94, riskLevel: "CRITICAL", sector: "Energy" },
  { id: "PRJ-WATR-016", name: "Polavaram Irrigation Dam", x: 88, y: 94, riskLevel: "CRITICAL", sector: "Water & Sanitation" },
  { id: "PRJ-RAIL-013", name: "Sivok–Rangpo Rail Line", x: 84, y: 88, riskLevel: "CRITICAL", sector: "Transport" },
  { id: "PRJ-COAL-041", name: "Jharia Coalfield Rehab", x: 70, y: 78, riskLevel: "HIGH", sector: "Coal" },
  { id: "PRJ-MORT-001", name: "Delhi–Mumbai Expressway Pkg 7", x: 76, y: 82, riskLevel: "HIGH", sector: "Transport" },
  { id: "PRJ-RAIL-017", name: "USBRL Rail Link", x: 70, y: 76, riskLevel: "HIGH", sector: "Transport" },
  { id: "PRJ-PETR-004", name: "Barmer Refinery Complex", x: 64, y: 76, riskLevel: "HIGH", sector: "Energy" },
  { id: "PRJ-MORT-018", name: "Zojila Tunnel (14.15 km)", x: 66, y: 58, riskLevel: "HIGH", sector: "Transport" },
  { id: "PRJ-NUKE-020", name: "Kudankulam Units 3 & 4", x: 66, y: 72, riskLevel: "HIGH", sector: "Energy" },
  { id: "PRJ-TELE-011", name: "BharatNet Phase III UP", x: 68, y: 56, riskLevel: "HIGH", sector: "Communication" },
  { id: "PRJ-RAIL-050", name: "Gorakhpur–Nautanwa Rail", x: 62, y: 70, riskLevel: "HIGH", sector: "Transport" },
  { id: "PRJ-POWR-054", name: "Dibang Multipurpose (2880 MW)", x: 62, y: 68, riskLevel: "HIGH", sector: "Energy" },
  { id: "PRJ-MORT-055", name: "Pakyong–Rangpo Highway", x: 66, y: 70, riskLevel: "HIGH", sector: "Transport" },
  { id: "PRJ-WATR-038", name: "AMRUT STP Phase III Bihar", x: 62, y: 66, riskLevel: "HIGH", sector: "Water & Sanitation" },
  { id: "PRJ-MORT-052", name: "Raipur–Jagdalpur NH-30", x: 58, y: 62, riskLevel: "HIGH", sector: "Transport" },
  { id: "PRJ-WATR-006", name: "Ken–Betwa Interlink", x: 62, y: 54, riskLevel: "WATCH", sector: "Water & Sanitation" },
  { id: "PRJ-PORT-007", name: "Vadhavan Deep Sea Port", x: 50, y: 38, riskLevel: "WATCH", sector: "Transport" },
  { id: "PRJ-COAL-008", name: "Magadh Thermal Station", x: 52, y: 62, riskLevel: "WATCH", sector: "Coal" },
  { id: "PRJ-RAIL-002", name: "Eastern DFC Ludhiana–Sonnagar", x: 38, y: 48, riskLevel: "WATCH", sector: "Transport" },
  { id: "PRJ-MINE-010", name: "NALCO Bauxite Expansion", x: 44, y: 54, riskLevel: "WATCH", sector: "Mining" },
  { id: "PRJ-WATR-024", name: "Jal Jeevan Mission UP", x: 54, y: 50, riskLevel: "WATCH", sector: "Water & Sanitation" },
  { id: "PRJ-RAIL-033", name: "Chennai Metro Phase 2", x: 52, y: 40, riskLevel: "WATCH", sector: "Transport" },
  { id: "PRJ-AIRT-046", name: "Hollong Airport Assam", x: 56, y: 60, riskLevel: "WATCH", sector: "Transport" },
  { id: "PRJ-HLTH-012", name: "AIIMS Madurai Campus", x: 52, y: 58, riskLevel: "WATCH", sector: "Social Infrastructure" },
  { id: "PRJ-MORT-014", name: "Bengaluru–Chennai Exp. Phase I", x: 32, y: 24, riskLevel: "LOW", sector: "Transport" },
  { id: "PRJ-POWER-015", name: "Green Energy Corridor Rajasthan", x: 30, y: 22, riskLevel: "LOW", sector: "Energy" },
  { id: "PRJ-URBN-005", name: "Mumbai Metro Line 3", x: 24, y: 20, riskLevel: "LOW", sector: "Transport" },
  { id: "PRJ-STEL-009", name: "Bhilai Steel BF-8 Expansion", x: 16, y: 12, riskLevel: "LOW", sector: "Steel" },
  { id: "PRJ-MORT-025", name: "Samruddhi Mahamarg", x: 12, y: 10, riskLevel: "LOW", sector: "Transport" },
];

// Top risk drivers across portfolio
export const topRiskDrivers = [
  { name: "Financial-Physical Progress Gap", impactIndex: 88, projectCount: 418, description: "Expenditure outpacing physical completion on site." },
  { name: "Land Acquisition & RoW Delays", impactIndex: 82, projectCount: 524, description: "State-level land encumbrance and RoW handover delays." },
  { name: "Environmental & Forest Clearances", impactIndex: 76, projectCount: 315, description: "MoEFCC statutory approval bottlenecks." },
  { name: "Contractor Performance Deficit", impactIndex: 70, projectCount: 290, description: "Contractor mobilization and cashflow constraints." },
  { name: "Cost Escalation via Material Prices", impactIndex: 66, projectCount: 480, description: "Steel, cement, bitumen price volatility above DPR estimates." },
  { name: "Geological & Weather Disruptions", impactIndex: 58, projectCount: 180, description: "Himalayan geology, floods, and seasonal work restrictions." },
];

// Sector risk comparison
export const sectorRiskData = [
  { sector: "Water & Sanitation", totalProjects: 195, criticalAndHigh: 62, avgCostOverrun: 28.6, avgDelayMonths: 24.1, riskScore: 74 },
  { sector: "Transport", totalProjects: 784, criticalAndHigh: 226, avgCostOverrun: 22.4, avgDelayMonths: 18.5, riskScore: 68 },
  { sector: "Energy", totalProjects: 412, criticalAndHigh: 108, avgCostOverrun: 19.8, avgDelayMonths: 16.2, riskScore: 62 },
  { sector: "Coal", totalProjects: 128, criticalAndHigh: 28, avgCostOverrun: 15.2, avgDelayMonths: 12.8, riskScore: 54 },
  { sector: "Communication", totalProjects: 110, criticalAndHigh: 20, avgCostOverrun: 8.4, avgDelayMonths: 9.6, riskScore: 46 },
  { sector: "Mining", totalProjects: 92, criticalAndHigh: 14, avgCostOverrun: 12.1, avgDelayMonths: 11.0, riskScore: 44 },
  { sector: "Social Infrastructure", totalProjects: 185, criticalAndHigh: 14, avgCostOverrun: 11.2, avgDelayMonths: 10.4, riskScore: 40 },
  { sector: "Steel", totalProjects: 75, criticalAndHigh: 4, avgCostOverrun: 6.5, avgDelayMonths: 5.2, riskScore: 28 },
];

// ML Model Benchmark — DEMO / SAMPLE VALUES
export const modelBenchmarkData = [
  { model: "Statistical Baseline", accuracy: 68.4, precision: 64.2, recall: 61.8, f1: 0.630, leadTime: 3.2, status: "Baseline" },
  { model: "Random Forest", accuracy: 81.2, precision: 79.5, recall: 76.4, f1: 0.779, leadTime: 6.5, status: "Standard" },
  { model: "Gradient Boosting (XGBoost)", accuracy: 87.6, precision: 85.8, recall: 84.1, f1: 0.849, leadTime: 9.4, status: "High Accuracy" },
  { model: "PAIMANA Hybrid Ensemble", accuracy: 92.8, precision: 91.4, recall: 90.2, f1: 0.908, leadTime: 12.8, status: "Recommended" },
];

// Data Intelligence Variables
export const currentCUFVariables = [
  { name: "Project Cost (Original & Revised)", icon: "IndianRupee" },
  { name: "Cumulative Expenditure", icon: "CreditCard" },
  { name: "Physical Progress (%)", icon: "Activity" },
  { name: "Milestone Completion Dates", icon: "Calendar" },
  { name: "Planned & Expected Completion", icon: "Clock" },
  { name: "Sector & Ministry Classification", icon: "Building2" },
  { name: "Implementing Agency", icon: "Users" },
];

export const recommendedAdditionalVariables = [
  { name: "Contractor Performance Score", potentialGain: "+8.2% accuracy", desc: "Historical delay rate, financial health, and mobilization track record." },
  { name: "Land Acquisition Stage Status", potentialGain: "+11.5% lead time", desc: "Digitized RoW encumbrance and Section 11/19 notification progress." },
  { name: "Statutory Approval Queue Duration", potentialGain: "+6.4% accuracy", desc: "Days-in-queue across Forest, MoEFCC, Railway Safety boards." },
  { name: "Material Price Index (WPI-based)", potentialGain: "+4.8% accuracy", desc: "Live WPI integration for steel, cement, bitumen, copper alloys." },
  { name: "Monsoon & Weather Anomaly Index", potentialGain: "+3.9% accuracy", desc: "Satellite rainfall deviation vs workability windows." },
  { name: "Labour Availability Index", potentialGain: "+3.1% accuracy", desc: "Regional migrant worker availability during harvest and festival seasons." },
  { name: "Tender Revision Frequency", potentialGain: "+5.6% accuracy", desc: "Number and scope of EPC/HAM tender revisions post-award." },
];
