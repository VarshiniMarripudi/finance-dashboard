import styles from './Card.module.css';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action }) => (
  <div className={styles.cardHeader}>
    <div>
      <h3 className={styles.cardTitle}>{title}</h3>
      {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
    </div>
    {action && <div className={styles.cardAction}>{action}</div>}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`${styles.cardContent} ${className}`}>
    {children}
  </div>
);
