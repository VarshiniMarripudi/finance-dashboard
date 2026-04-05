import { createContext, useContext, useState, useMemo } from 'react';

const mockTransactions = [
  { id: '1', date: '2023-10-01', amount: 5000, category: 'Salary', type: 'income', name: 'Tech Corp Inc' },
  { id: '2', date: '2023-10-02', amount: 120, category: 'Food', type: 'expense', name: 'Groceries' },
  { id: '3', date: '2023-10-05', amount: 800, category: 'Rent', type: 'expense', name: 'Monthly Rent' },
  { id: '4', date: '2023-10-10', amount: 50, category: 'Entertainment', type: 'expense', name: 'Movie Tickets' },
  { id: '5', date: '2023-10-15', amount: 300, category: 'Utilities', type: 'expense', name: 'Electric Bill' },
  { id: '6', date: '2023-10-20', amount: 1500, category: 'Freelance', type: 'income', name: 'Web Design Project' },
  { id: '7', date: '2023-10-22', amount: 60, category: 'Food', type: 'expense', name: 'Restaurant Dinner' },
  { id: '8', date: '2023-10-28', amount: 200, category: 'Shopping', type: 'expense', name: 'New Shoes' },
];

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState('Viewer'); // 'Viewer' or 'Admin'

  const addTransaction = (txn) => {
    setTransactions((prev) => [{ ...txn, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
  };

  const editTransaction = (id, updatedTxn) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedTxn } : t)));
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Derived state
  const totalIncome = useMemo(() => 
    transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0),
  [transactions]);

  const totalExpense = useMemo(() => 
    transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0),
  [transactions]);

  const totalBalance = totalIncome - totalExpense;

  const value = {
    transactions,
    role,
    setRole,
    addTransaction,
    editTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    totalBalance,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};
