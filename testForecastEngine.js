import { calculatePredictedFinalCost, calculateExpectedDelay, calculateExpectedCompletion } from './src/utils/forecastEngine.js';
import demoProjects from './src/data/demoProjects.js';

console.log('Testing Prototype Forecast Engine on 10 projects:');

const testProjects = demoProjects.slice(0, 10);

testProjects.forEach(project => {
  const predictedCost = calculatePredictedFinalCost(project);
  const expectedDelay = calculateExpectedDelay(project);
  const expectedCompletion = calculateExpectedCompletion(project);

  console.log(`\nProject: ${project.id} - ${project.projectName}`);
  console.log(`Original Cost: ₹${project.originalCost}Cr | Revised Cost: ₹${project.revisedCost}Cr`);
  console.log(`Physical Progress: ${project.physicalProgress}% | Financial Progress: ${project.financialProgress}%`);
  console.log(`Predicted Final Cost: ₹${predictedCost.value}Cr [${predictedCost.label}]`);
  
  console.log(`Planned Completion: ${project.plannedCompletion}`);
  console.log(`Current Expected Completion: ${project.currentExpectedCompletion}`);
  console.log(`Total Expected Delay: ${expectedDelay.value} months [${expectedDelay.label}]`);
  console.log(`Predicted Final Completion: ${expectedCompletion.value} [${expectedCompletion.label}]`);
});
