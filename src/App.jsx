import { Layout } from './components/layout/Layout';
import { Overview } from './components/dashboard/Overview';
import { Transactions } from './components/dashboard/Transactions';
import { Insights } from './components/dashboard/Insights';

function App() {
  return (
    <Layout>
      <div className="dashboard-grid">
        <div className="chart-section">
          <Overview />
          <Transactions />
        </div>
        <div className="insights-section">
          <Insights />
        </div>
      </div>
    </Layout>
  );
}

export default App;
