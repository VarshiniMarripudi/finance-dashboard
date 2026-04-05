import { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../common/Table';
import { Button } from '../common/Button';
import { Plus, Trash2, Edit } from 'lucide-react';
import styles from './Transactions.module.css';

export const Transactions = () => {
  const { transactions, role, deleteTransaction, addTransaction } = useFinance();
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchType = filterType === 'all' || t.type === filterType;
      const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchType && matchSearch;
    });
  }, [transactions, filterType, searchTerm]);

  const handleAddMock = () => {
    addTransaction({
      date: new Date().toISOString().split('T')[0],
      amount: Math.floor(Math.random() * 500) + 10,
      category: 'Mock Category',
      type: Math.random() > 0.5 ? 'income' : 'expense',
      name: 'Mock Transaction'
    });
  };

  const AdminAction = () => {
    if (role !== 'Admin') return null;
    return (
      <Button onClick={handleAddMock} size="sm">
        <Plus size={16} /> Add Mock Txn
      </Button>
    );
  };

  return (
    <Card className={styles.transactionsCard}>
      <CardHeader 
        title="Recent Transactions" 
        subtitle="Manage and view your recent activity"
        action={<AdminAction />}
      />
      <CardContent>
        <div className={styles.filterBar}>
          <input 
            type="text" 
            placeholder="Search by name or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Amount</TableHeader>
              {role === 'Admin' && <TableHeader>Actions</TableHeader>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={role === 'Admin' ? 5 : 4} className={styles.emptyState}>
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>
                    <div className={styles.nameCell}>
                      <span className={styles.txnName}>{txn.name}</span>
                      <span className={styles.txnId}>ID: {txn.id.substring(0,6)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                  <TableCell>{txn.category}</TableCell>
                  <TableCell>
                    <span className={txn.type === 'income' ? styles.income : styles.expense}>
                      {txn.type === 'income' ? '+' : '-'}${txn.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  {role === 'Admin' && (
                    <TableCell>
                      <div className={styles.actions}>
                        <button className={styles.iconBtn} title="Edit (Demo)"><Edit size={16} /></button>
                        <button className={`${styles.iconBtn} ${styles.delete}`} onClick={() => deleteTransaction(txn.id)} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
