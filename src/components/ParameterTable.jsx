/**
 * ParameterTable — renders a two-column key/value table.
 * rows: [{ label, value, unit?, badge? }]
 */
export default function ParameterTable({ title, rows = [] }) {
  return (
    <div className="bg-navy-800/60 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur">
      {title && (
        <div className="px-4 py-2 bg-navy-700/40 border-b border-slate-700/50">
          <h3 className="text-sm font-semibold text-slate-300">{title}</h3>
        </div>
      )}
      <table className="w-full text-sm">
        <tbody>
          {rows.map(({ label, value, unit = '', badge }, i) => (
            <tr
              key={i}
              className={`border-b border-slate-800/60 last:border-0 ${i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}
            >
              <td className="px-4 py-2 text-slate-400">{label}</td>
              <td className="px-4 py-2 text-right">
                {badge ? (
                  badge
                ) : (
                  <span className="font-mono text-cyan-300">
                    {typeof value === 'number' ? value.toFixed(4) : value}
                    {unit && <span className="text-slate-500 ml-1">{unit}</span>}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
