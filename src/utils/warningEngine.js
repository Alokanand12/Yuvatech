import demoProjects from '../data/demoProjects';
import { getRiskAssessment } from './riskEngine';
import { generateRecommendations } from './recommendationEngine';

export function generateWarnings() {
  const warnings = [];
  const today = new Date().toISOString().split('T')[0];

  demoProjects.forEach(project => {
    const riskAssessment = getRiskAssessment(project);
    const recommendations = generateRecommendations(riskAssessment.riskDrivers);

    // Map each risk driver to a specific warning
    riskAssessment.riskDrivers.forEach(driver => {
      // Find the corresponding recommendation for this driver
      const rec = recommendations.find(r => r.risk === driver.title);
      
      let warningType = 'EXECUTION RISK';
      if (driver.title === 'Cost Escalation') warningType = 'COST ESCALATION';
      if (driver.title === 'Schedule Slippage') warningType = 'TIME DELAY';
      if (driver.title === 'Milestone Delay') warningType = 'MILESTONE DELAY';
      if (driver.title === 'Financial-Physical Mismatch') warningType = 'FINANCIAL-PHYSICAL MISMATCH';

      // We don't want to create warnings for very low level "Moderate Execution Friction" 
      // unless we want to show low level alerts. The spec asks for CRITICAL, HIGH, MEDIUM, LOW.
      // So we will include it if it's there.
      
      const warningId = `${project.id}-${warningType.replace(/\s+/g, '-')}`;

      warnings.push({
        id: warningId,
        projectId: project.id,
        projectName: project.projectName,
        ministry: project.ministry,
        sector: project.sector,
        warningType: warningType,
        severity: driver.severity,
        detectedSignal: driver.explanation, // detectedSignal maps to explanation
        potentialImpact: driver.impact,     // potentialImpact maps to impact
        recommendedAction: rec ? rec.recommendedAction : 'Investigate project parameters.',
        detectedDate: today,
        // Status is handled via localStorage in the UI, default is 'NEW'
        status: 'NEW'
      });
    });
  });

  return warnings;
}
