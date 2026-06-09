import { NOISE_PRESETS } from '../utils/noiseUtils';

function SliderField({ label, symbol, value, min, max, step, onChange, unit = '' }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-xs text-slate-400">
          {label} <span className="font-mono text-cyan-400">{symbol}</span>
        </label>
        <span className="text-xs font-mono text-white bg-navy-700 px-2 py-0.5 rounded">
          {typeof value === 'number' ? value.toFixed(step < 1 ? 2 : 0) : value}
          {unit && <span className="text-slate-500"> {unit}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer
          bg-slate-700 accent-cyan-400"
      />
      <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

export default function SidebarControls({ params, setParams }) {
  const set = (key) => (val) => setParams((p) => ({ ...p, [key]: val }));

  const applyPreset = (preset) => {
    const { noiseLevel, noisePower } = NOISE_PRESETS[preset];
    setParams((p) => ({ ...p, noiseLevel, noisePower }));
  };

  return (
    <aside className="bg-navy-800/60 border border-slate-700/50 rounded-xl p-4 backdrop-blur">
      <h2 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-wider">
        Simulation Parameters
      </h2>

      {/* Noise Presets */}
      <div className="mb-5">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Noise Presets</p>
        <div className="flex gap-2">
          {['low', 'medium', 'high'].map((p) => (
            <button
              key={p}
              onClick={() => applyPreset(p)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all capitalize
                ${p === 'low'    ? 'border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10' : ''}
                ${p === 'medium' ? 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10'   : ''}
                ${p === 'high'   ? 'border-red-500/50 text-red-400 hover:bg-red-500/10'            : ''}
              `}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Signal Parameters */}
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Signal Parameters</p>
      <SliderField label="Message Amplitude" symbol="Am" value={params.Am} min={0.1} max={5} step={0.1} unit="V" onChange={set('Am')} />
      <SliderField label="Carrier Amplitude" symbol="Ac" value={params.Ac} min={0.5} max={5} step={0.1} unit="V" onChange={set('Ac')} />
      <SliderField label="Message Frequency" symbol="fm" value={params.fm} min={1} max={20} step={1} unit="Hz" onChange={set('fm')} />
      <SliderField label="Carrier Frequency" symbol="fc" value={params.fc} min={20} max={200} step={5} unit="Hz" onChange={set('fc')} />

      <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 mt-1">FM Parameters</p>
      <SliderField label="Freq. Deviation" symbol="Δf" value={params.deltaF} min={1} max={100} step={1} unit="Hz" onChange={set('deltaF')} />

      <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 mt-1">Noise & Power</p>
      <SliderField label="Noise Level" symbol="σ" value={params.noiseLevel} min={0} max={2} step={0.05} onChange={set('noiseLevel')} />
      <SliderField label="Signal Power" symbol="Ps" value={params.signalPower} min={0.1} max={50} step={0.1} unit="W" onChange={set('signalPower')} />
      <SliderField label="Noise Power" symbol="Pn" value={params.noisePower} min={0.01} max={10} step={0.01} unit="W" onChange={set('noisePower')} />

      <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 mt-1">Simulation</p>
      <SliderField label="Duration" symbol="T" value={params.duration} min={0.5} max={5} step={0.5} unit="s" onChange={set('duration')} />
      <SliderField label="Sample Points" symbol="N" value={params.points} min={200} max={2000} step={100} onChange={set('points')} />
    </aside>
  );
}
