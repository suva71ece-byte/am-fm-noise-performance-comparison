import { useMemo } from 'react';
import SidebarControls from '../components/SidebarControls';
import SignalChart from '../components/SignalChart';
import ComparisonChart from '../components/ComparisonChart';
import ResultCard from '../components/ResultCard';
import ParameterTable from '../components/ParameterTable';
import QualityBadge from '../components/QualityBadge';

import {
  generateTimeAxis,
  generateMessageSignal,
  generateCarrierSignal,
  generateAMSignal,
  generateFMSignal,
  addNoiseToSignal,
} from '../utils/signalUtils';
import { generateNoise } from '../utils/noiseUtils';
import {
  amModulationIndex, amBandwidth, amCondition,
  fmModulationIndex, fmBandwidth, fmType,
} from '../utils/modulationUtils';
import { calcSNR, calcSNRdB, signalQuality, buildAnalysis } from '../utils/calculationUtils';

export default function Simulator({ params, setParams }) {
  const signals = useMemo(() => {
    const { Am, Ac, fm, fc, deltaF, noiseLevel, duration, points } = params;
    const t = generateTimeAxis(duration, points);
    const mu = amModulationIndex(Am, Ac);
    const beta = fmModulationIndex(deltaF, fm);

    const message  = generateMessageSignal(t, Am, fm);
    const carrier  = generateCarrierSignal(t, Ac, fc);
    const amSig    = generateAMSignal(t, Ac, fc, mu, fm);
    const fmSig    = generateFMSignal(t, Ac, fc, beta, fm);
    const noise    = generateNoise(points, noiseLevel, 42);
    const noisyAM  = addNoiseToSignal(amSig, noise);
    const noisyFM  = addNoiseToSignal(fmSig, noise);

    return { message, carrier, amSig, fmSig, noisyAM, noisyFM };
  }, [params]);

  const calcs = useMemo(() => {
    const { Am, Ac, fm, deltaF, signalPower, noisePower } = params;
    const mu   = amModulationIndex(Am, Ac);
    const beta = fmModulationIndex(deltaF, fm);
    const snr  = calcSNR(signalPower, noisePower);
    const snrDb = calcSNRdB(snr);
    return {
      mu, beta,
      bwAM: amBandwidth(fm),
      bwFM: fmBandwidth(deltaF, fm),
      amCond: amCondition(mu),
      fmTyp: fmType(beta),
      snr, snrDb,
      quality: signalQuality(snrDb),
      analysis: buildAnalysis({
        mu, beta, snrDb,
        amConditionLabel: amCondition(mu),
        fmTypeLabel: fmType(beta),
        noiseLevel: params.noiseLevel,
      }),
    };
  }, [params]);

  // Merged data for comparison charts
  const amCompare = useMemo(() => signals.amSig.map((pt, i) => ({
    t: pt.t, clean: pt.value, noisy: signals.noisyAM[i].value,
  })), [signals]);

  const fmCompare = useMemo(() => signals.fmSig.map((pt, i) => ({
    t: pt.t, clean: pt.value, noisy: signals.noisyFM[i].value,
  })), [signals]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Signal Simulator</h1>
        <p className="text-slate-400 text-sm mt-1">
          Adjust parameters on the left. All waveforms and calculations update in real-time.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Sidebar */}
        <div className="xl:w-72 flex-shrink-0">
          <SidebarControls params={params} setParams={setParams} />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard title="AM Mod. Index μ" value={calcs.mu} accent="cyan">
              <QualityBadge label={calcs.amCond} />
            </ResultCard>
            <ResultCard title="FM Mod. Index β" value={calcs.beta} accent="purple">
              <QualityBadge label={calcs.fmTyp} />
            </ResultCard>
            <ResultCard title="SNR" value={calcs.snrDb} unit="dB" accent={calcs.quality.level === 'excellent' ? 'emerald' : calcs.quality.level === 'good' ? 'cyan' : calcs.quality.level === 'weak' ? 'yellow' : 'red'}>
              <QualityBadge label={calcs.quality.label} />
            </ResultCard>
            <ResultCard title="AM BW / FM BW" value={`${calcs.bwAM.toFixed(0)} / ${calcs.bwFM.toFixed(0)}`} unit="Hz" accent="cyan"
              sub="AM = 2fm  |  FM = 2(Δf+fm)" />
          </div>

          {/* Base signals */}
          <div className="grid sm:grid-cols-2 gap-4">
            <SignalChart
              title="Message Signal  m(t) = Am·sin(2π·fm·t)"
              data={signals.message}
              lines={[{ key: 'value', color: '#38bdf8', label: 'Message' }]}
            />
            <SignalChart
              title="Carrier Signal  c(t) = Ac·sin(2π·fc·t)"
              data={signals.carrier}
              lines={[{ key: 'value', color: '#818cf8', label: 'Carrier' }]}
            />
          </div>

          {/* Modulated signals */}
          <div className="grid sm:grid-cols-2 gap-4">
            <SignalChart
              title="AM Modulated Signal"
              data={signals.amSig}
              lines={[{ key: 'value', color: '#22d3ee', label: 'AM Signal' }]}
            />
            <SignalChart
              title="FM Modulated Signal"
              data={signals.fmSig}
              lines={[{ key: 'value', color: '#a78bfa', label: 'FM Signal' }]}
            />
          </div>

          {/* Noisy signals */}
          <div className="grid sm:grid-cols-2 gap-4">
            <SignalChart
              title="Noisy AM Signal (after channel)"
              data={signals.noisyAM}
              lines={[{ key: 'value', color: '#f87171', label: 'Noisy AM' }]}
            />
            <SignalChart
              title="Noisy FM Signal (after channel)"
              data={signals.noisyFM}
              lines={[{ key: 'value', color: '#fb923c', label: 'Noisy FM' }]}
            />
          </div>

          {/* Clean vs Noisy comparison */}
          <div className="grid sm:grid-cols-2 gap-4">
            <ComparisonChart
              title="AM: Clean vs Noisy"
              datasets={[
                { data: signals.amSig,   color: '#22d3ee', label: 'AM Clean' },
                { data: signals.noisyAM, color: '#f87171', label: 'AM Noisy', opacity: 0.8 },
              ]}
            />
            <ComparisonChart
              title="FM: Clean vs Noisy"
              datasets={[
                { data: signals.fmSig,   color: '#a78bfa', label: 'FM Clean' },
                { data: signals.noisyFM, color: '#fb923c', label: 'FM Noisy', opacity: 0.8 },
              ]}
            />
          </div>

          {/* AM vs FM noisy comparison */}
          <ComparisonChart
            title="AM Noisy vs FM Noisy — Channel Output Comparison"
            datasets={[
              { data: signals.noisyAM, color: '#f87171', label: 'Noisy AM' },
              { data: signals.noisyFM, color: '#fb923c', label: 'Noisy FM' },
            ]}
            height={240}
          />

          {/* Calculation tables */}
          <div className="grid sm:grid-cols-3 gap-4">
            <ParameterTable
              title="AM Calculations"
              rows={[
                { label: 'Am', value: params.Am, unit: 'V' },
                { label: 'Ac', value: params.Ac, unit: 'V' },
                { label: 'μ = Am/Ac', value: calcs.mu },
                { label: 'BW_AM = 2·fm', value: calcs.bwAM, unit: 'Hz' },
                { label: 'Condition', badge: <QualityBadge label={calcs.amCond} /> },
              ]}
            />
            <ParameterTable
              title="FM Calculations"
              rows={[
                { label: 'Δf', value: params.deltaF, unit: 'Hz' },
                { label: 'fm', value: params.fm, unit: 'Hz' },
                { label: 'β = Δf/fm', value: calcs.beta },
                { label: "BW_FM (Carson's)", value: calcs.bwFM, unit: 'Hz' },
                { label: 'FM Type', badge: <QualityBadge label={calcs.fmTyp} /> },
              ]}
            />
            <ParameterTable
              title="Noise / SNR"
              rows={[
                { label: 'Signal Power', value: params.signalPower, unit: 'W' },
                { label: 'Noise Power', value: params.noisePower, unit: 'W' },
                { label: 'SNR (linear)', value: calcs.snr },
                { label: 'SNR (dB)', value: calcs.snrDb, unit: 'dB' },
                { label: 'Quality', badge: <QualityBadge label={calcs.quality.label} /> },
              ]}
            />
          </div>

          {/* Dynamic Analysis */}
          <div className="bg-navy-800/60 border border-cyan-500/20 rounded-xl p-5 backdrop-blur">
            <h3 className="text-sm font-bold text-cyan-400 mb-3 uppercase tracking-wider">
              Dynamic Result Analysis
            </h3>
            <div className="text-sm text-slate-300 leading-relaxed space-y-2">
              {calcs.analysis.split('**').map((chunk, i) =>
                i % 2 === 1
                  ? <strong key={i} className="text-white">{chunk}</strong>
                  : <span key={i}>{chunk}</span>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
