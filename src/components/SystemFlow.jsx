import { ArrowRight } from 'lucide-react';

const STEPS = [
  { label: 'Message Signal', desc: 'm(t)', color: 'bg-blue-900/50 border-blue-500/40 text-blue-300' },
  { label: 'AM / FM Modulator', desc: 's(t)', color: 'bg-purple-900/50 border-purple-500/40 text-purple-300' },
  { label: 'Noisy Channel', desc: '+n(t)', color: 'bg-red-900/50 border-red-500/40 text-red-300' },
  { label: 'Received Signal', desc: 'r(t)', color: 'bg-orange-900/50 border-orange-500/40 text-orange-300' },
  { label: 'SNR Comparison', desc: 'AM vs FM', color: 'bg-emerald-900/50 border-emerald-500/40 text-emerald-300' },
];

export default function SystemFlow() {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-center">
      {STEPS.map((step, i) => (
        <div key={step.label} className="flex items-center gap-2">
          <div className={`flex flex-col items-center px-3 py-2 rounded-lg border text-center min-w-[90px] ${step.color}`}>
            <span className="text-xs font-semibold leading-tight">{step.label}</span>
            <span className="text-[10px] font-mono opacity-70 mt-0.5">{step.desc}</span>
          </div>
          {i < STEPS.length - 1 && (
            <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}
