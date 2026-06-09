import { Radio, Code2, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import SystemFlow from '../components/SystemFlow';

const TECH = [
  { name: 'React 18',        desc: 'UI library — component-based rendering'   },
  { name: 'Vite',            desc: 'Lightning-fast build tool and dev server'  },
  { name: 'Tailwind CSS',    desc: 'Utility-first styling framework'           },
  { name: 'Recharts',        desc: 'Waveform and comparison visualizations'    },
  { name: 'Lucide React',    desc: 'Clean SVG icon library'                    },
  { name: 'JavaScript (ES6+)', desc: 'Signal math, deterministic PRNG, DSP'   },
];

const FORMULAS = [
  { label: 'Message Signal',   formula: 'm(t) = Am · sin(2π·fm·t)'                      },
  { label: 'Carrier Signal',   formula: 'c(t) = Ac · sin(2π·fc·t)'                      },
  { label: 'AM Signal',        formula: 's_AM(t) = Ac·[1 + μ·sin(2π·fm·t)]·sin(2π·fc·t)' },
  { label: 'AM Modulation Index', formula: 'μ = Am / Ac'                                 },
  { label: 'AM Bandwidth',     formula: 'BW_AM = 2·fm'                                   },
  { label: 'FM Signal',        formula: 's_FM(t) = Ac · sin(2π·fc·t + β·sin(2π·fm·t))'  },
  { label: 'FM Modulation Index', formula: 'β = Δf / fm'                                 },
  { label: "FM Bandwidth (Carson's)", formula: 'BW_FM = 2·(Δf + fm)'                     },
  { label: 'SNR (linear)',     formula: 'SNR = P_signal / P_noise'                       },
  { label: 'SNR (dB)',         formula: 'SNR_dB = 10 · log₁₀(SNR)'                      },
];

const FUTURE = [
  'AM envelope detector simulation',
  'FM demodulator using frequency discriminator',
  'FFT spectrum analyser for bandwidth visualisation',
  'Real-time audio input modulation',
  'Downloadable PDF simulation reports',
  'DSB-TC, DSB-SC and SSB comparison with FM',
  'Phase noise and non-linear distortion models',
];

export default function About({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 space-y-8">

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <BookOpen className="w-3 h-3" /> About This Project
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Noise Performance Comparison of<br />
          <span className="text-cyan-400">AM and FM</span> Communication Systems
        </h1>
      </div>

      {/* Objective */}
      <div className="bg-navy-800/60 border border-slate-700/50 rounded-xl p-5 backdrop-blur">
        <div className="flex items-center gap-2 mb-3">
          <Radio className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Project Objective</h2>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          This tool is an interactive simulation environment for understanding and comparing
          the noise performance of Amplitude Modulation (AM) and Frequency Modulation (FM)
          in analog communication systems. Users can generate real mathematical waveforms,
          inject Gaussian channel noise, and observe — both visually and quantitatively — how
          AM and FM respond under varying noise conditions. The tool reinforces core analog
          communication theory including modulation index, Carson's bandwidth rule, SNR analysis,
          and the fundamental noise immunity advantage of FM over AM.
        </p>
      </div>

      {/* System Flow */}
      <div className="bg-navy-800/60 border border-slate-700/50 rounded-2xl p-5 backdrop-blur">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Communication System Flow</h2>
        </div>
        <SystemFlow />
      </div>

      {/* Formulas */}
      <div className="bg-navy-800/60 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur">
        <div className="px-5 py-3 bg-navy-700/40 border-b border-slate-700/50 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-200">Key Formulas</h2>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {FORMULAS.map(({ label, formula }, i) => (
              <tr key={i} className={`border-b border-slate-800/50 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}>
                <td className="px-5 py-2.5 text-slate-400 w-1/2">{label}</td>
                <td className="px-5 py-2.5 font-mono text-cyan-300 text-xs">{formula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Technologies */}
      <div className="bg-navy-800/60 border border-slate-700/50 rounded-xl p-5 backdrop-blur">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Technologies Used</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {TECH.map(({ name, desc }) => (
            <div key={name} className="flex gap-3 items-start">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
              <div>
                <span className="text-white font-semibold text-sm">{name}</span>
                <p className="text-slate-400 text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-world relevance */}
      <div className="bg-navy-800/60 border border-slate-700/50 rounded-xl p-5 backdrop-blur">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">Real-World Relevance</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          AM broadcasting (530–1700 kHz) is used widely for long-distance, low-bandwidth audio
          transmission. Its simplicity makes it ideal for cheap receivers, but amplitude noise
          from atmospheric and man-made interference directly degrades audio quality.
          FM broadcasting (87.5–108 MHz) sacrifices spectral efficiency for superior noise
          immunity — the FM capture effect and limiter stages in receivers reject amplitude
          variations, delivering high-fidelity stereo audio. Understanding this trade-off is
          fundamental to designing any analog RF communication system, from AM/FM radio to
          legacy telemetry and instrumentation links.
        </p>
      </div>

      {/* Future Scope */}
      <div className="bg-navy-800/60 border border-slate-700/50 rounded-xl p-5 backdrop-blur">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Future Scope</h2>
        </div>
        <ul className="space-y-2">
          {FUTURE.map((item) => (
            <li key={item} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-yellow-400 mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate('simulator')}
          className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20"
        >
          Open Simulator →
        </button>
      </div>
    </div>
  );
}
