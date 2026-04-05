import { Topbar } from './Topbar';

export const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Topbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
