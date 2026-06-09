import { useState } from 'react';
import { Radio, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard',   label: 'Dashboard'   },
  { id: 'simulator',   label: 'Simulator'   },
  { id: 'comparison',  label: 'Comparison'  },
  { id: 'about',       label: 'About'       },
];

export default function Header({ activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <Radio className="w-6 h-6" />
          <span className="font-bold text-base sm:text-lg leading-tight">
            AM/FM Noise <span className="text-white">Comparison</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activePage === id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-700 bg-navy-800 px-4 py-2">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { onNavigate(id); setMobileOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-all ${
                activePage === id
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
