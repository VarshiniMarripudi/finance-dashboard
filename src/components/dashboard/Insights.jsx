import { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardHeader, CardContent } from '../common/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Lightbulb, Info } from 'lucide-react';
import styles from './Insights.module.css';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const Insights = () => {
  const { transactions, totalIncome, totalExpense } = useFinance();

  const spendingByCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categories = {};
    expenses.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });
    
    return Object.keys(categories)
      .map(key => ({ name: key, value: categories[key] }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const topCategory = spendingByCategory.length > 0 ? spendingByCategory[0] : null;

  return (
    <div className={styles.insightsWrapper}>
      <Card className={styles.insightsCard}>
        <CardHeader 
          title="Spending Breakdown" 
          subtitle="Where your money goes"
        />
        <CardContent>
          <div className={styles.chartWrapper}>
            {spendingByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={spendingByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {spendingByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `$${value}`}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className={styles.emptyState}>No expense data available</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className={styles.insightsCard}>
        <CardHeader title="AI Observations" />
        <CardContent>
          <div className={styles.observationList}>
            {topCategory && (
              <div className={styles.observationItem}>
                <div className={`${styles.iconBox} ${styles.blue}`}>
                  <Lightbulb size={20} />
                </div>
                <div>
                  <p className={styles.obsvTitle}>Highest Spending</p>
                  <p className={styles.obsvDesc}>
                    Your top expense is <strong>{topCategory.name}</strong> at ${topCategory.value}. Consider budget limits.
                  </p>
                </div>
              </div>
            )}
            <div className={styles.observationItem}>
              <div className={`${styles.iconBox} ${totalIncome > totalExpense ? styles.green : styles.red}`}>
                <Info size={20} />
              </div>
              <div>
                <p className={styles.obsvTitle}>Financial Health</p>
                <p className={styles.obsvDesc}>
                  {totalIncome > totalExpense 
                    ? "Great job! You are spending less than you earn."
                    : "Warning: Your expenses exceed your income this period."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
