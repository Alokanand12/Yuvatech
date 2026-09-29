const fs = require('fs');

let seed = 12345;
function random() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}
function randomInt(min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}
function randomChoice(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

const ministries = ['Ministry of Road Transport and Highways', 'Ministry of Power', 'Ministry of Jal Shakti', 'Ministry of Communications', 'Ministry of Health and Family Welfare', 'Ministry of Coal', 'Ministry of Steel', 'Ministry of Mines'];
const sectors = ['Transport & Logistics', 'Energy', 'Water & Sanitation', 'Communication', 'Social Infrastructure', 'Coal', 'Steel', 'Mining'];
const states = ['Maharashtra', 'Uttar Pradesh', 'Tamil Nadu', 'Karnataka', 'Gujarat', 'West Bengal', 'Madhya Pradesh', 'Rajasthan', 'Andhra Pradesh', 'Telangana'];
const agencies = ['NHAI', 'NTPC', 'PGCIL', 'BBNL', 'CPWD', 'Coal India', 'SAIL', 'NMDC', 'State PWD'];

const projects = [];
for (let i = 1; i <= 65; i++) {
  const isHealthy = random() > 0.5;
  const isCritical = random() > 0.85;
  const originalCost = randomInt(150, 15000);
  
  let revisedCost = originalCost;
  if (!isHealthy) {
    revisedCost = Math.round(originalCost * (1 + random() * 0.8));
  }
  if (isCritical) {
    revisedCost = Math.round(originalCost * (1 + 0.5 + random() * 1.5));
  }

  const physicalProgress = isHealthy ? randomInt(40, 95) : randomInt(10, 60);
  
  // Mismatch
  let financialProgress = physicalProgress;
  if (!isHealthy) {
    financialProgress = Math.min(100, physicalProgress + randomInt(5, 30));
  }
  
  const expenditure = Math.round(revisedCost * (financialProgress / 100));

  const totalMilestones = randomInt(5, 20);
  const completedMilestones = Math.round(totalMilestones * (physicalProgress / 100));
  const delayedMilestones = isHealthy ? randomInt(0, 1) : randomInt(2, totalMilestones - completedMilestones);

  const startYear = 2020 + randomInt(0, 3);
  const plannedDuration = randomInt(24, 60);
  const plannedCompletionYear = startYear + Math.floor(plannedDuration / 12);
  const plannedCompletionMonth = (plannedDuration % 12) + 1;
  const plannedCompletion = `${plannedCompletionYear}-${plannedCompletionMonth.toString().padStart(2, '0')}-01`;

  let delayMonths = 0;
  if (!isHealthy) delayMonths = randomInt(6, 24);
  if (isCritical) delayMonths = randomInt(24, 60);
  
  const expectedDate = new Date(plannedCompletion);
  expectedDate.setMonth(expectedDate.getMonth() + delayMonths);
  const currentExpectedCompletion = expectedDate.toISOString().split('T')[0];
  
  let status = 'On Schedule';
  if (delayMonths > 0) status = 'Delayed';
  if (isCritical) status = 'Stalled';

  const hasTrend = i <= 20; // At least 15 projects
  let monthlyTrend = undefined;
  if (hasTrend) {
    monthlyTrend = [];
    let curPhys = physicalProgress;
    let curFin = financialProgress;
    for (let m = 0; m < 6; m++) {
      monthlyTrend.unshift({
        month: `Month -${m}`,
        plannedProgress: Math.max(0, curPhys - randomInt(-2, 5)),
        actualProgress: Math.max(0, curPhys - randomInt(1, 4)),
        plannedExpenditure: Math.round((Math.max(0, curFin - randomInt(-2, 5)) / 100) * revisedCost),
        actualExpenditure: Math.round((Math.max(0, curFin - randomInt(1, 4)) / 100) * revisedCost)
      });
      curPhys = Math.max(0, curPhys - 3);
      curFin = Math.max(0, curFin - 4);
    }
  }

  projects.push({
    id: `PRJ-${String(i).padStart(4, '0')}`,
    projectName: `${randomChoice(sectors)} Infrastructure Development Phase ${randomInt(1, 4)}`,
    ministry: randomChoice(ministries),
    department: 'Core Infrastructure Div',
    sector: randomChoice(sectors),
    state: randomChoice(states),
    district: `District-${randomInt(1, 100)}`,
    implementingAgency: randomChoice(agencies),
    originalCost,
    revisedCost,
    expenditure,
    physicalProgress,
    financialProgress,
    plannedCompletion,
    currentExpectedCompletion,
    status,
    totalMilestones,
    completedMilestones,
    delayedMilestones,
    monthlyTrend
  });
}

const fileContent = `const demoProjects = ${JSON.stringify(projects, null, 2)};\n\nexport default demoProjects;\n`;
fs.writeFileSync('src/data/demoProjects.js', fileContent);
console.log('Created src/data/demoProjects.js with ' + projects.length + ' projects.');
