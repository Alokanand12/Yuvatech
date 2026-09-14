import { getRiskAssessment } from './src/utils/riskEngine.js';
import demoProjects from './src/data/demoProjects.js';

console.log('Testing Frontend Predictive Risk Engine on 10 projects:');

const testProjects = demoProjects.slice(0, 10);

testProjects.forEach(project => {
  const assessment = getRiskAssessment(project);
  console.log(`\nProject: ${project.id} - ${project.projectName}`);
  console.log(`Overall Risk Score: ${assessment.overallRiskScore} (${assessment.riskLevel})`);
  console.log(`- Cost Risk: ${assessment.costRisk}`);
  console.log(`- Time Risk: ${assessment.timeRisk}`);
  console.log(`- Execution Risk: ${assessment.executionRisk}`);
  console.log(`Risk Drivers (${assessment.riskDrivers.length}):`);
  assessment.riskDrivers.forEach(driver => {
    console.log(`  * [${driver.severity}] ${driver.title}: ${driver.explanation}`);
  });
});
