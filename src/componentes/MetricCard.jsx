import React from 'react';

const MetricCard = ({ title, value, change, isPositive = true }) => {
  const trendClass = isPositive ? 'positive' : 'negative';
  const changeClass = `metric-card__change metric-card__change--${trendClass}`;

  return (
    <article className="metric-card">
      <h3 className="metric-card__title">{title}</h3>
      <div className="metric-card__body">
        <span className="metric-card__value">{value}</span>
        {change && <span className={changeClass}>{change}</span>}
      </div>
    </article>
  );
};

MetricCard.defaultProps = {
  isPositive: true,
  change: null,
};

export default MetricCard;