/**
 * QualityBadge — renders a coloured pill label.
 * variant: 'am-condition' | 'fm-type' | 'snr'
 */
export default function QualityBadge({ label }) {
  const map = {
    // AM condition
    'Under Modulation':    'bg-blue-900/50 border border-blue-400/50 text-blue-300',
    'Critical Modulation': 'bg-emerald-900/50 border border-emerald-400/50 text-emerald-300',
    'Over Modulation':     'bg-red-900/50 border border-red-400/50 text-red-300',
    // FM type
    'Narrowband FM (NBFM)': 'bg-indigo-900/50 border border-indigo-400/50 text-indigo-300',
    'Wideband FM (WBFM)':   'bg-purple-900/50 border border-purple-400/50 text-purple-300',
    // SNR quality
    'Excellent':            'bg-emerald-900/50 border border-emerald-400/50 text-emerald-300',
    'Good':                 'bg-cyan-900/50 border border-cyan-400/50 text-cyan-300',
    'Weak / Noisy':         'bg-yellow-900/50 border border-yellow-400/50 text-yellow-300',
    'Poor / Highly Distorted': 'bg-red-900/50 border border-red-400/50 text-red-300',
  };
  const cls = map[label] ?? 'bg-slate-800 border border-slate-600 text-slate-300';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
}
