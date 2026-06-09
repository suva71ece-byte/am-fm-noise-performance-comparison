import { Radio, Zap, Activity, BarChart2, GitCompare, Wifi } from 'lucide-react';
import SystemFlow from '../components/SystemFlow';

const CARDS = [
  {
    icon: <Radio className="w-5 h-5" />,
    title: 'AM Signal',
    desc: 'Amplitude Modulation: information encoded in carrier amplitude variation.',
    color: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
    page: 'simulator',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'FM Signal',
    desc: 'Frequency Modulation: information encoded in carrier frequency deviation.',
    color: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
    page: 'simulator',
  },
  {
    icon: <Wifi className="w-5 h-5" />,
    title: 'Noise Channel',
    desc: 'Additive White Gaussian Noise (AWGN) corrupts the transmitted signal.',
    color: 'border-red-500/30 bg-red-500/5 text-red-400',
    page: 'simulator',
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: 'SNR Analysis',
    desc: 'Signal-to-Noise Ratio in linear and dB scale with quality classification.',
    color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
    page: 'simulator',
  },
  {
    icon: <BarChart2 className="w-5 h-5" />,
    title: 'Waveform View',
    desc: 'Visualise clean vs noisy waveforms for both AM and FM in real-time.',
    color: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400',
    page: 'simulator',
  },
  {
    icon: <GitCompare className="w-5 h-5" />,
    title: 'AM vs FM',
    desc: 'Side-by-side noise immunity, bandwidth, and performance comparison.',
    color: 'border-orange-500/30 bg-orange-500/5 text-orange-400',
    page: 'comparison',
  },
];

export default function Dashboard({ onNavigate }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <Radio className="w-3 h-3" /> Analog Communication Simulation Tool
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
          Noise Performance Comparison of<br />
          <span className="text-cyan-400">AM and FM</span> Communication Systems
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Generate message and carrier signals, apply AM/FM modulation, inject AWGN channel noise,
          and interactively compare how Amplitude Modulation and Frequency Modulation respond
          under varying noise conditions.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <button
            onClick={() => onNavigate('simulator')}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20"
          >
            Launch Simulator →
          </button>
          <button
            onClick={() => onNavigate('comparison')}
            className="px-6 py-2.5 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold rounded-xl text-sm transition-all"
          >
            View Comparison
          </button>
        </div>
      </div>

      {/* System Flow */}
      <div className="bg-navy-800/60 border border-slate-700/50 rounded-2xl p-5 mb-8 backdrop-blur">
        <p className="text-xs text-slate-500 uppercase tracking-wider text-center mb-4">
          Communication System Flow
        </p>
        <SystemFlow />
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((card) => (
          <button
            key={card.title}
            onClick={() => onNavigate(card.page)}
            className={`text-left rounded-xl border p-4 transition-all hover:scale-[1.02] hover:shadow-lg backdrop-blur ${card.color}`}
          >
            <div className="mb-2">{card.icon}</div>
            <h3 className="font-bold text-white text-sm mb-1">{card.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
          </button>
        ))}
      </div>

      {/* Concepts footer */}
      <div className="mt-8 bg-navy-800/40 border border-slate-700/30 rounded-xl p-5">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Key Concepts Covered</p>
        <div className="flex flex-wrap gap-2">
          {[
            'AM Modulation','FM Modulation','Modulation Index',
            "Carson's Rule",'AM Bandwidth','FM Bandwidth',
            'AWGN Channel','Signal-to-Noise Ratio','SNR in dB',
            'Noise Immunity','NBFM','WBFM',
          ].map((c) => (
            <span key={c} className="text-xs bg-slate-800 border border-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
