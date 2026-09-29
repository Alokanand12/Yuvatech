/**
 * Deterministic recommendation engine that maps risk drivers to actionable intelligence.
 * IMPORTANT: Recommendations are decision-support suggestions, not official decisions.
 */
export function generateRecommendations(riskDrivers) {
  const recommendations = [];

  // Create a mapping from common driver titles to specific recommendations
  const recommendationMap = {
    'Cost Escalation': {
      action: 'Review revised cost trajectory and expenditure pattern.',
      outcome: 'Identify areas for budget optimization and prevent further overrun.'
    },
    'Financial-Physical Mismatch': {
      action: 'Conduct implementation progress and expenditure review.',
      outcome: 'Align financial disbursement strictly with verifiable physical milestones.'
    },
    'Milestone Delay': {
      action: 'Initiate milestone recovery assessment.',
      outcome: 'Accelerate critical path tasks and unblock pending approvals.'
    },
    'Schedule Slippage': {
      action: 'Review project schedule and identify critical path bottlenecks.',
      outcome: 'Prevent cascading delays in subsequent project phases.'
    },
    'Stagnant Execution': {
      action: 'Conduct high-level intervention and feasibility review.',
      outcome: 'Determine if project should be restructured or temporarily paused.'
    },
    'Moderate Execution Friction': {
      action: 'Enhance routine monitoring frequency.',
      outcome: 'Prevent minor deviations from evolving into systemic risks.'
    }
  };

  riskDrivers.forEach((driver, index) => {
    const template = recommendationMap[driver.title] || {
      action: 'Review underlying project data for anomalies.',
      outcome: 'Ensure project remains within accepted tolerance levels.'
    };

    recommendations.push({
      priority: index + 1,
      risk: driver.title,
      reason: driver.explanation,
      recommendedAction: template.action,
      expectedOutcome: template.outcome
    });
  });

  return recommendations;
}
