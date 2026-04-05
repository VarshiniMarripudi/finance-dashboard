import { useFinance } from '../../context/FinanceContext';
import styles from './Topbar.module.css';
import { Wallet, User } from 'lucide-react';

export const Topbar = () => {
  const { role, setRole } = useFinance();

  return (
    <header className={styles.topbar}>
      <div className={styles.logo}>
        <Wallet className={styles.logoIcon} />
        <h2>FinDash</h2>
      </div>
      <div className={styles.controls}>
        <div className={styles.roleSwitcher}>
          <User size={18} />
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className={styles.select}
          >
            <option value="Viewer">Viewer Role</option>
            <option value="Admin">Admin Role</option>
          </select>
        </div>
        <div className={styles.themeToggle}>
           {/* Placeholder for optional dark mode */}
        </div>
      </div>
    </header>
  );
};
