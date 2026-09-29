import React from 'react';

export default function RiskBadge({ level }) {
  const l = (level || 'LOW').toUpperCase();
  let cls = 'low';
  if (l === 'WATCH') cls = 'watch';
  else if (l === 'HIGH') cls = 'high';
  else if (l === 'CRITICAL') cls = 'critical';

  return (
    <span className={`risk-badge ${cls}`}>
      <span className="badge-dot" />
      {l}
    </span>
  );
}
