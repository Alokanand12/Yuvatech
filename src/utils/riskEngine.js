/**
 * Predicts Cost Risk on a scale of 0-100.
 * Escalation calculation: ((revisedCost - originalCost) / originalCost) * 100
 */
export function calculateCostRisk(project) {
  const escalation = ((project.revisedCost - project.originalCost) / project.originalCost) * 100;
  
  // Base risk from escalation (e.g., 20% escalation -> 40 risk, 50% escalation -> 100 risk)
  let risk = escalation * 2;
  
  // Financial progress factor
  // If expenditure is very high compared to physical progress, cost risk increases.
  const financialMismatch = project.financialProgress - project.physicalProgress;
  if (financialMismatch > 0) {
    risk += financialMismatch * 1.5;
  }
  
  return Math.min(100, Math.max(0, Math.round(risk)));
}

/**
 * Predicts Time Risk on a scale of 0-100.
 */
export function calculateTimeRisk(project) {
  const planned = new Date(project.plannedCompletion).getTime();
  const expected = new Date(project.currentExpectedCompletion).getTime();
  
  const delayDays = (expected - planned) / (1000 * 60 * 60 * 24);
  const delayMonths = delayDays / 30;
  
  // Base risk: 2 risk points per month of delay
  let risk = delayMonths * 2;
  
  // Milestone delay factor
  if (project.totalMilestones > 0) {
    const delayRatio = project.delayedMilestones / project.totalMilestones;
    risk += delayRatio * 50; 
  }
  
  // Progress factor: low physical progress near expected completion adds risk
  if (project.physicalProgress < 50 && delayMonths > 0) {
    risk += 10;
  }
  
  return Math.min(100, Math.max(0, Math.round(risk)));
}

/**
 * Predicts Execution Risk on a scale of 0-100.
 */
export function calculateExecutionRisk(project) {
  let risk = 0;
  
  // Financial-physical mismatch
  const mismatch = project.financialProgress - project.physicalProgress;
  if (mismatch > 5) risk += mismatch * 2;
  
  // Milestone performance
  if (project.totalMilestones > 0) {
    const completionRatio = project.completedMilestones / project.totalMilestones;
    const delayRatio = project.delayedMilestones / project.totalMilestones;
    
    risk += delayRatio * 40;
    if (completionRatio < 0.2 && project.physicalProgress > 40) {
      risk += 15; // Inconsistent reporting
    }
  }
  
  // Stalled status
  if (project.status === 'Stalled') risk += 30;
  if (project.physicalProgress < 10) risk += 10;

  return Math.min(100, Math.max(0, Math.round(risk)));
}

/**
 * Predicts Overall Risk on a scale of 0-100.
 */
export function calculateOverallRisk(project) {
  const costRisk = calculateCostRisk(project);
  const timeRisk = calculateTimeRisk(project);
  const executionRisk = calculateExecutionRisk(project);
  
  // Transparent weighted calculation
  // Cost: 35%, Time: 35%, Execution: 30%
  const overall = (costRisk * 0.35) + (timeRisk * 0.35) + (executionRisk * 0.30);
  
  return Math.min(100, Math.max(0, Math.round(overall)));
}

export function getRiskLevel(score) {
  if (score <= 25) return 'LOW';
  if (score <= 50) return 'WATCH';
  if (score <= 75) return 'HIGH';
  return 'CRITICAL';
}

export function getRiskDrivers(project) {
  const drivers = [];
  
  // Cost Escalation Driver
  const escalationPct = ((project.revisedCost - project.originalCost) / project.originalCost) * 100;
  if (escalationPct > 5) {
    drivers.push({
      title: 'Cost Escalation',
      severity: escalationPct > 20 ? 'CRITICAL' : 'HIGH',
      explanation: `Project cost has escalated by ${escalationPct.toFixed(1)}% (from ₹${project.originalCost}Cr to ₹${project.revisedCost}Cr).`,
      impact: 'High risk of budget overrun and funding shortfall.'
    });
  }

  // Financial-Physical Mismatch Driver
  const mismatch = project.financialProgress - project.physicalProgress;
  if (mismatch > 10) {
    drivers.push({
      title: 'Financial-Physical Mismatch',
      severity: mismatch > 20 ? 'CRITICAL' : 'HIGH',
      explanation: `Financial progress (${project.financialProgress}%) is ${mismatch}% ahead of physical progress (${project.physicalProgress}%).`,
      impact: 'Indicates potential fund diversion or severe implementation bottleneck.'
    });
  }

  // Milestone Delay Driver
  if (project.delayedMilestones > 1) {
    drivers.push({
      title: 'Milestone Delay',
      severity: project.delayedMilestones > 4 ? 'CRITICAL' : (project.delayedMilestones > 2 ? 'HIGH' : 'MEDIUM'),
      explanation: `${project.delayedMilestones} out of ${project.totalMilestones} critical milestones are currently delayed.`,
      impact: 'Cascading effect on subsequent project phases.'
    });
  }

  // Schedule Slippage Driver
  const planned = new Date(project.plannedCompletion).getTime();
  const expected = new Date(project.currentExpectedCompletion).getTime();
  const delayMonths = Math.round((expected - planned) / (1000 * 60 * 60 * 24 * 30));
  
  if (delayMonths > 3) {
    drivers.push({
      title: 'Schedule Slippage',
      severity: delayMonths > 12 ? 'CRITICAL' : (delayMonths > 6 ? 'HIGH' : 'MEDIUM'),
      explanation: `Project completion is delayed by approximately ${delayMonths} months from the original baseline.`,
      impact: 'Extended overhead costs and delayed public utility delivery.'
    });
  }
  
  // Low Physical Progress Driver
  if (project.physicalProgress < 20 && delayMonths > 6) {
    drivers.push({
      title: 'Stagnant Execution',
      severity: 'CRITICAL',
      explanation: `Physical progress is extremely low (${project.physicalProgress}%) despite significant time elapsed.`,
      impact: 'Project is at risk of becoming a stranded asset.'
    });
  }

  // Sort by severity
  const severityScore = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
  drivers.sort((a, b) => severityScore[b.severity] - severityScore[a.severity]);
  
  return drivers;
}

export function getRiskAssessment(project) {
  const costRisk = calculateCostRisk(project);
  const timeRisk = calculateTimeRisk(project);
  const executionRisk = calculateExecutionRisk(project);
  const overallRiskScore = calculateOverallRisk(project);
  const riskLevel = getRiskLevel(overallRiskScore);
  const riskDrivers = getRiskDrivers(project);
  
  return {
    overallRiskScore,
    riskLevel,
    costRisk,
    timeRisk,
    executionRisk,
    riskDrivers
  };
}
