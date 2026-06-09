import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

/**
 * SignalChart — generic waveform chart.
 * data: array of objects. Each object must have a `t` key plus one or more signal keys.
 * lines: [{ key, color, label }]
 * downsample: max points to render (default 300)
 */
export default function SignalChart({ title, data = [], lines = [], downsample = 300, height = 200 }) {
  // Downsample for performance
  const step = Math.max(1, Math.floor(data.length / downsample));
  const plotData = data.filter((_, i) => i % step === 0);

  return (
    <div className="bg-navy-800/60 border border-slate-700/50 rounded-xl p-4 backdrop-blur">
      {title && (
        <h3 className="text-sm font-semibold text-slate-300 mb-3 font-mono">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={plotData} margin={{ top: 4, right: 8, bottom: 4, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
          <XAxis
            dataKey="t"
            tickFormatter={(v) => v.toFixed(2)}
            tick={{ fill: '#64748b', fontSize: 10 }}
            label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -4, fill: '#475569', fontSize: 10 }}
          />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
          <Tooltip
            contentStyle={{ background: '#0d1529', border: '1px solid #1e3a5f', borderRadius: 8, fontSize: 11 }}
            labelFormatter={(v) => `t = ${Number(v).toFixed(4)} s`}
          />
          {lines.length > 1 && <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />}
          {lines.map(({ key, color, label }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={label ?? key}
              stroke={color}
              dot={false}
              strokeWidth={1.5}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
