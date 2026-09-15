import React from 'react';

const MetricCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="metric-card card-border-interactive">
      <div className="metric-card__header">
        <span className="metric-card__title">{title}</span>
        <span className="metric-card__icon">📊</span>
      </div>
      <div className="metric-card__value">{value}</div>
      <div className={`metric-card__trend ${isPositive ? 'metric-card__trend--positive' : 'metric-card__trend--negative'}`}>
        {change}
      </div>
    </div>
  );
};

export default MetricCard;