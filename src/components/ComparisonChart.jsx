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
 * ComparisonChart — overlays clean vs noisy OR AM vs FM on one chart.
 * cleanData / noisyData: arrays of { t, value }
 * OR amData / fmData for AM vs FM comparison.
 */
export default function ComparisonChart({
  title,
  datasets = [],   // [{ data: [{t,value}], color, label }]
  height = 220,
  downsample = 300,
}) {
  if (!datasets.length) return null;

  // Merge all datasets into one array keyed by index
  const step = Math.max(1, Math.floor(datasets[0].data.length / downsample));
  const merged = datasets[0].data
    .filter((_, i) => i % step === 0)
    .map((pt, i) => {
      const obj = { t: pt.t };
      datasets.forEach((ds, di) => {
        const src = ds.data.filter((_, si) => si % step === 0);
        obj[`ds${di}`] = src[i]?.value ?? 0;
      });
      return obj;
    });

  return (
    <div className="bg-navy-800/60 border border-slate-700/50 rounded-xl p-4 backdrop-blur">
      {title && <h3 className="text-sm font-semibold text-slate-300 mb-3 font-mono">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={merged} margin={{ top: 4, right: 8, bottom: 4, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
          <XAxis
            dataKey="t"
            tickFormatter={(v) => v.toFixed(2)}
            tick={{ fill: '#64748b', fontSize: 10 }}
          />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
          <Tooltip
            contentStyle={{ background: '#0d1529', border: '1px solid #1e3a5f', borderRadius: 8, fontSize: 11 }}
            labelFormatter={(v) => `t = ${Number(v).toFixed(4)} s`}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
          {datasets.map((ds, di) => (
            <Line
              key={di}
              type="monotone"
              dataKey={`ds${di}`}
              name={ds.label}
              stroke={ds.color}
              dot={false}
              strokeWidth={1.5}
              strokeOpacity={ds.opacity ?? 1}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
