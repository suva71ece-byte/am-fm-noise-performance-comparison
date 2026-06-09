import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Simulator from './pages/Simulator';
import Comparison from './pages/Comparison';
import About from './pages/About';
import { DEFAULT_PARAMS } from './data/projectInfo';

export default function App() {
  const [page, setPage]     = useState('dashboard');
  const [params, setParams] = useState(DEFAULT_PARAMS);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':  return <Dashboard   onNavigate={setPage} />;
      case 'simulator':  return <Simulator   params={params} setParams={setParams} />;
      case 'comparison': return <Comparison  params={params} />;
      case 'about':      return <About       onNavigate={setPage} />;
      default:           return <Dashboard   onNavigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col">
      <Header activePage={page} onNavigate={setPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <footer className="border-t border-slate-800/60 py-3 text-center text-xs text-slate-600">
        AM/FM Noise Performance Comparison Tool — Analog Communication Systems Simulation
      </footer>
    </div>
  );
}
