import React from 'react';

const MetricCard = ({ title, value, change, isPositive = true }) => {
  const trendClass = isPositive ? 'positive' : 'negative';
  const changeClass = `metric-card__change metric-card__change--${trendClass}`;

  return (
    <>
      {/* Estilos CSS inyectados para garantizar diseño responsive, colores AAA y tarjeta moderna */}
      <style>{`
        .metric-card {
          background: #1e293b;
          color: #ffffff;
          padding: 1.5rem;
          border-radius: 10px;
          border: 2px solid #334155;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .metric-card:hover {
          border-color: #0284c7;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }

        .metric-card__title {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: #cbd5e1;
          letter-spacing: -0.01em;
        }

        .metric-card__body {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .metric-card__value {
          font-size: 2rem;
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.025em;
        }

        .metric-card__change {
          font-size: 0.9rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          borderRadius: 4px;
        }

        .metric-card__change--positive {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.4);
        }

        .metric-card__change--negative {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.4);
        }

        @media (max-width: 480px) {
          .metric-card {
            padding: 1.25rem;
          }
          .metric-card__value {
            font-size: 1.75rem;
          }
        }
      `}</style>

      <article className="metric-card">
        <h3 className="metric-card__title">{title}</h3>
        <div className="metric-card__body">
          <span className="metric-card__value">{value}</span>
          {change && <span className={changeClass}>{change}</span>}
        </div>
      </article>
    </>
  );
};

export default MetricCard;