// Importa React (necesario siempre en archivos .jsx)
import React from 'react';
// Si tuvieras estilos específicos para este componente, los importarías aquí. 
// Ejemplo: import './_metric-card.scss'; 

// Define el componente funcional con sus propiedades (props)
const MetricCard = ({ title, value, change, isPositive = true }) => {
  // Todo lo que devuelve el "return" es JSX (HTML extendido)
  return (
    <article className="metric-card">
      <h3 className="metric-card__title">{title}</h3>
      <div className="metric-card__body">
        <span className="metric-card__value">{value}</span>
        {change && (
          // Aquí usamos comillas dobles y la estructura de plantilla (` `) para cambiar la clase dinámicamente según si es positivo o negativo.
          <span className={`metric-card__change metric-card__change--${isPositive ? 'positive' : 'negative'}`}>
            {change}
          </span>
        )}
      </div>
    </article>
  );
};

// Exporta el componente para poder usarlo en otros archivos (como en el Dashboard.jsx)
export default MetricCard;