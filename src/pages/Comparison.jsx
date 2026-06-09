import { useMemo } from 'react';
import ComparisonChart from '../components/ComparisonChart';
import QualityBadge from '../components/QualityBadge';
import ResultCard from '../components/ResultCard';

import {
  generateTimeAxis,
  generateAMSignal,
  generateFMSignal,
  addNoiseToSignal,
} from '../utils/signalUtils';
import { generateNoise } from '../utils/noiseUtils';
import {
  amModulationIndex, amBandwidth, amCondition,
  fmModulationIndex, fmBandwidth, fmType,
} from '../utils/modulationUtils';
import { calcSNR, calcSNRdB, signalQuality } from '../utils/calculationUtils';

const TABLE_DATA = [
  {
    property:  'Information carrier',
    am:        'Amplitude of carrier',
    fm:        'Frequency of carrier',
    winner:    'fm',
  },
  {
    property:  'Noise immunity',
    am:        'Low — noise directly corrupts amplitude',
    fm:        'High — FM capture effect rejects amplitude noise',
    winner:    'fm',
  },
  {
    property:  'Bandwidth (Carson\'s)',
    am:        'BW = 2·fm  (narrow)',
    fm:        'BW = 2(Δf + fm)  (wider)',
    winner:    'am',
  },
  {
    property:  'Modulation index',
    am:        'μ = Am/Ac  (≤ 1 ideal)',
    fm:        'β = Δf/fm  (can be > 1)',
    winner:    'tie',
  },
  {
    property:  'Receiver complexity',
    am:        'Simple envelope detector',
    fm:        'More complex (discriminator / PLL)',
    winner:    'am',
  },
  {
    property:  'Effect of noise',
    am:        'Envelope deformed → signal distorted',
    fm:        'Only minor phase jitter → better quality',
    winner:    'fm',
  },
  {
    property:  'Power efficiency',
    am:        'Lower (carrier power wasted)',
    fm:        'Higher (constant amplitude)',
    winner:    'fm',
  },
  {
    property:  'Signal quality at low SNR',
    am:        'Degrades rapidly',
    fm:        'Degrades gracefully (threshold effect)',
    winner:    'fm',
  },
  {
    property:  'Practical use',
    am:        'AM radio (530–1700 kHz)',
    fm:        'FM radio (87.5–108 MHz)',
    winner:    'tie',
  },
];

export default function Comparison({ params }) {
  const { amSig, fmSig, noisyAM, noisyFM, calcs } = useMemo(() => {
    const { Am, Ac, fm, fc, deltaF, signalPower, noisePower, noiseLevel, duration, points } = params;
    const t    = generateTimeAxis(duration, points);
    const mu   = amModulationIndex(Am, Ac);
    const beta = fmModulationIndex(deltaF, fm);
    const amS  = generateAMSignal(t, Ac, fc, mu, fm);
    const fmS  = generateFMSignal(t, Ac, fc, beta, fm);
    const noise = generateNoise(points, noiseLevel, 42);
    const nAM  = addNoiseToSignal(amS, noise);
    const nFM  = addNoiseToSignal(fmS, noise);
    const snrDb = calcSNRdB(calcSNR(signalPower, noisePower));
    const qual  = signalQuality(snrDb);
    return {
      amSig: amS, fmSig: fmS, noisyAM: nAM, noisyFM: nFM,
      calcs: {
        mu, beta,
        bwAM: amBandwidth(fm),
        bwFM: fmBandwidth(deltaF, fm),
        amCond: amCondition(mu),
        fmTyp: fmType(beta),
        snrDb, quality: qual,
      },
    };
  }, [params]);

  const noisyLabel = params.noiseLevel < 0.3 ? 'Low noise' : params.noiseLevel < 0.8 ? 'Medium noise' : 'High noise';

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">AM vs FM Noise Performance</h1>
        <p className="text-slate-400 text-sm mt-1">
          Side-by-side analysis. Adjust parameters in the Simulator to see results update here.
        </p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <ResultCard title="AM Bandwidth" value={calcs.bwAM} unit="Hz" accent="cyan"
          sub="BW = 2·fm" />
        <ResultCard title="FM Bandwidth" value={calcs.bwFM} unit="Hz" accent="purple"
          sub="Carson's Rule" />
        <ResultCard title="SNR" value={calcs.snrDb} unit="dB"
          accent={calcs.quality.level === 'excellent' ? 'emerald' : calcs.quality.level === 'good' ? 'cyan' : calcs.quality.level === 'weak' ? 'yellow' : 'red'}>
          <QualityBadge label={calcs.quality.label} />
        </ResultCard>
        <ResultCard title="Noise Level" value={params.noiseLevel.toFixed(2)} sub={noisyLabel} accent="red" />
      </div>

      {/* Waveform comparison */}
      <div className="grid sm:grid-cols-2 gap-4">
        <ComparisonChart
          title="AM: Clean vs Noisy"
          datasets={[
            { data: amSig,   color: '#22d3ee', label: 'AM Clean' },
            { data: noisyAM, color: '#f87171', label: 'AM Noisy' },
          ]}
          height={220}
        />
        <ComparisonChart
          title="FM: Clean vs Noisy"
          datasets={[
            { data: fmSig,   color: '#a78bfa', label: 'FM Clean' },
            { data: noisyFM, color: '#fb923c', label: 'FM Noisy' },
          ]}
          height={220}
        />
      </div>

      <ComparisonChart
        title="Noisy AM vs Noisy FM — Direct Output Comparison"
        datasets={[
          { data: noisyAM, color: '#f87171', label: 'AM (after noise)' },
          { data: noisyFM, color: '#a78bfa', label: 'FM (after noise)' },
        ]}
        height={240}
      />

      {/* Comparison Table */}
      <div className="bg-navy-800/60 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur">
        <div className="px-5 py-3 bg-navy-700/40 border-b border-slate-700/50">
          <h2 className="text-sm font-bold text-slate-200">AM vs FM — Technical Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left px-5 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider w-1/4">Property</th>
                <th className="text-left px-5 py-3 text-cyan-400 font-semibold text-xs uppercase tracking-wider w-[37.5%]">AM</th>
                <th className="text-left px-5 py-3 text-purple-400 font-semibold text-xs uppercase tracking-wider w-[37.5%]">FM</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row, i) => (
                <tr key={i} className={`border-b border-slate-800/50 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}>
                  <td className="px-5 py-3 text-slate-400 font-medium">{row.property}</td>
                  <td className={`px-5 py-3 ${row.winner === 'am' ? 'text-emerald-300' : 'text-slate-300'}`}>
                    {row.winner === 'am' && <span className="text-emerald-400 mr-1">✓</span>}
                    {row.am}
                  </td>
                  <td className={`px-5 py-3 ${row.winner === 'fm' ? 'text-emerald-300' : 'text-slate-300'}`}>
                    {row.winner === 'fm' && <span className="text-emerald-400 mr-1">✓</span>}
                    {row.fm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic explanation */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-5">
          <h3 className="text-cyan-400 font-bold text-sm mb-2">AM — Current Status</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Modulation index μ = <strong>{calcs.mu.toFixed(3)}</strong> → <QualityBadge label={calcs.amCond} />.
            Bandwidth = <strong>{calcs.bwAM} Hz</strong>.{' '}
            {calcs.quality.level === 'poor' || calcs.quality.level === 'weak'
              ? 'At the current noise level, the AM envelope is significantly corrupted. The demodulated signal would show audible distortion.'
              : 'Noise level is manageable; AM envelope remains largely intact.'}
          </p>
        </div>
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-5">
          <h3 className="text-purple-400 font-bold text-sm mb-2">FM — Current Status</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Modulation index β = <strong>{calcs.beta.toFixed(3)}</strong> → <QualityBadge label={calcs.fmTyp} />.
            Bandwidth = <strong>{calcs.bwFM} Hz</strong> (Carson's rule).{' '}
            {calcs.quality.level === 'poor' || calcs.quality.level === 'weak'
              ? 'Even under high noise, FM encodes information in frequency — amplitude noise has less impact on the demodulated output.'
              : 'FM performs excellently; frequency deviation carries the message undisturbed by amplitude noise.'}
          </p>
        </div>
      </div>
    </div>
  );
}
