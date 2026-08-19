import React from 'react';

const MetricCard = ({ title, value, change, isPositive = true }) => {
  return (
    <article className="metric-card">
      <h3 className="metric-card__title">{title}</h3>
      <div className="metric-card__body">
        <span className="metric-card__value">{value}</span>
        {change && (
          <span className={`metric-card__change metric-card__change--${isPositive ? 'positive' : 'negative'}`}>
            {change}
          </span>
        )}
      </div>
    </article>
  );
};

export default MetricCard;