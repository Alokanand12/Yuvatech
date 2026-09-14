/**
 * Predicts the final cost deterministically.
 * Uses a modified Cost Performance Index (CPI) approach based on physical vs financial progress.
 */
export function calculatePredictedFinalCost(project) {
  let baseEstimate = project.revisedCost;
  
  // Calculate cost performance index (CPI) - modified for our structure
  // CPI = Physical Progress / Financial Progress
  // If financial progress is higher, CPI < 1 (over budget)
  
  if (project.financialProgress > 0 && project.physicalProgress > 0) {
    const CPI = project.physicalProgress / project.financialProgress;
    
    if (CPI < 1.0) {
       // Only apply penalty if they are physically behind the financial spend
       // Estimate at completion = Budget / CPI
       baseEstimate = project.revisedCost / Math.max(0.5, CPI); // Cap CPI at 0.5 to prevent extreme explosions
    }
  } else if (project.financialProgress > 0 && project.physicalProgress === 0) {
    // Money spent but no progress
    baseEstimate = project.revisedCost * 1.5; 
  }
  
  return {
    value: Math.round(baseEstimate),
    label: "Rule-Based Forecast",
    disclaimer: "This is a prototype simulation, NOT real ML. Do not claim AI accuracy."
  };
}

/**
 * Predicts delay in months.
 */
export function calculateExpectedDelay(project) {
  const planned = new Date(project.plannedCompletion).getTime();
  const currentExpected = new Date(project.currentExpectedCompletion).getTime();
  const baselineDelayMonths = Math.max(0, (currentExpected - planned) / (1000 * 60 * 60 * 24 * 30));
  
  let additionalDelay = 0;
  
  // Schedule performance penalty using milestone delays
  if (project.totalMilestones > 0) {
    const delayedRatio = project.delayedMilestones / project.totalMilestones;
    if (delayedRatio > 0) {
      additionalDelay += delayedRatio * 12; // up to 12 months extra penalty for milestone delays
    }
  }
  
  // Progress stagnation penalty
  if (project.physicalProgress < 30 && baselineDelayMonths > 6) {
    additionalDelay += 6;
  }
  
  const totalExpectedDelay = Math.round(baselineDelayMonths + additionalDelay);
  
  return {
    value: totalExpectedDelay, // in months
    label: "Rule-Based Forecast",
    disclaimer: "This is a prototype simulation, NOT real ML. Do not claim AI accuracy."
  };
}

/**
 * Predicts completion date based on the expected delay.
 */
export function calculateExpectedCompletion(project) {
  const delayObj = calculateExpectedDelay(project);
  const totalExpectedDelay = delayObj.value;
  
  const plannedDate = new Date(project.plannedCompletion);
  plannedDate.setMonth(plannedDate.getMonth() + totalExpectedDelay);
  
  return {
    value: plannedDate.toISOString().split('T')[0],
    label: "Rule-Based Forecast",
    disclaimer: "This is a prototype simulation, NOT real ML. Do not claim AI accuracy."
  };
}
