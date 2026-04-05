import { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardHeader, CardContent } from '../common/Card';
import styles from './Overview.module.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export const Overview = () => {
  const { totalBalance, totalIncome, totalExpense, transactions } = useFinance();

  // Prepare chart data: group by date and calculate running balance
  const chartData = useMemo(() => {
    // Sort transactions by date
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Group by date
    const grouped = {};
    sorted.forEach(t => {
      if (!grouped[t.date]) {
        grouped[t.date] = 0;
      }
      grouped[t.date] += (t.type === 'income' ? t.amount : -t.amount);
    });

    let cumulative = 0;
    return Object.keys(grouped).map(date => {
      cumulative += grouped[date];
      return {
        date,
        balance: cumulative
      };
    });
  }, [transactions]);

  const cards = [
    { title: 'Total Balance', amount: totalBalance, icon: <DollarSign className={styles.iconBlue} />, type: 'neutral' },
    { title: 'Total Income', amount: totalIncome, icon: <TrendingUp className={styles.iconGreen} />, type: 'success' },
    { title: 'Total Expenses', amount: totalExpense, icon: <TrendingDown className={styles.iconRed} />, type: 'danger' }
  ];

  return (
    <div className={styles.overviewContainer}>
      <div className="overview-cards">
        {cards.map((card, idx) => (
          <Card key={idx} className={styles.summaryCard}>
            <div className={styles.cardInfo}>
              <p className={styles.cardTitle}>{card.title}</p>
              <h3 className={styles.cardAmount}>${card.amount.toLocaleString()}</h3>
            </div>
            <div className={`${styles.iconWrapper} ${styles[card.type]}`}>
              {card.icon}
            </div>
          </Card>
        ))}
      </div>

      <div className="chart-section">
        <Card className={styles.chartCard}>
          <CardHeader title="Balance Trends" subtitle="Overview of your financial growth over time" />
          <CardContent className={styles.chartContent}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                  stroke="var(--text-muted)"
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="var(--text-muted)"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-main)' }}
                  labelStyle={{ color: 'var(--text-muted)' }}
                  formatter={(value) => [`$${value}`, 'Balance']}
                />
                <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
