/**
 * ResultCard — glass-style info card for metric display.
 */
export default function ResultCard({ title, value, unit = '', sub, accent = 'cyan', children }) {
  const accentMap = {
    cyan:    'border-cyan-500/30 bg-cyan-500/5',
    purple:  'border-purple-500/30 bg-purple-500/5',
    emerald: 'border-emerald-500/30 bg-emerald-500/5',
    yellow:  'border-yellow-500/30 bg-yellow-500/5',
    red:     'border-red-500/30 bg-red-500/5',
  };
  const valMap = {
    cyan:    'text-cyan-400',
    purple:  'text-purple-400',
    emerald: 'text-emerald-400',
    yellow:  'text-yellow-400',
    red:     'text-red-400',
  };
  return (
    <div className={`rounded-xl border p-4 ${accentMap[accent] ?? accentMap.cyan} backdrop-blur`}>
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{title}</p>
      {value !== undefined && (
        <p className={`text-2xl font-bold font-mono ${valMap[accent] ?? valMap.cyan}`}>
          {typeof value === 'number' ? value.toFixed(3) : value}
          {unit && <span className="text-sm text-slate-400 ml-1">{unit}</span>}
        </p>
      )}
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      {children}
    </div>
  );
}
