import styles from './Table.module.css';

export const Table = ({ children }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        {children}
      </table>
    </div>
  );
};

export const TableHead = ({ children }) => (
  <thead className={styles.thead}>{children}</thead>
);

export const TableBody = ({ children }) => (
  <tbody className={styles.tbody}>{children}</tbody>
);

export const TableRow = ({ children, className = '' }) => (
  <tr className={`${styles.tr} ${className}`}>{children}</tr>
);

export const TableHeader = ({ children }) => (
  <th className={styles.th}>{children}</th>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`${styles.td} ${className}`}>{children}</td>
);
