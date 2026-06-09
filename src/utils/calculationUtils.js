/**
 * calculationUtils.js
 * SNR, signal quality, and dynamic analysis text.
 */

/**
 * SNR (linear) = signalPower / noisePower
 */
export function calcSNR(signalPower, noisePower) {
  return noisePower > 0 ? signalPower / noisePower : Infinity;
}

/**
 * SNR in dB = 10 * log10(SNR)
 */
export function calcSNRdB(snr) {
  return snr > 0 ? 10 * Math.log10(snr) : -Infinity;
}

/**
 * Signal quality classification.
 * @param {number} snrDb
 * @returns {{ label: string, color: string, level: 'excellent'|'good'|'weak'|'poor' }}
 */
export function signalQuality(snrDb) {
  if (snrDb >= 20) return { label: 'Excellent',            color: 'text-emerald-400', bg: 'bg-emerald-900/40 border-emerald-500', level: 'excellent' };
  if (snrDb >= 10) return { label: 'Good',                 color: 'text-cyan-400',    bg: 'bg-cyan-900/40 border-cyan-500',       level: 'good'      };
  if (snrDb >= 3)  return { label: 'Weak / Noisy',         color: 'text-yellow-400',  bg: 'bg-yellow-900/40 border-yellow-500',   level: 'weak'      };
  return            { label: 'Poor / Highly Distorted',  color: 'text-red-400',     bg: 'bg-red-900/40 border-red-500',         level: 'poor'      };
}

/**
 * Build dynamic analysis paragraph based on current simulation parameters.
 */
export function buildAnalysis({ mu, beta, snrDb, amConditionLabel, fmTypeLabel, noiseLevel }) {
  const qual = signalQuality(snrDb);

  const amPart = `The AM modulation index μ = ${mu.toFixed(3)}, indicating **${amConditionLabel}**. `
    + (mu > 1
      ? 'Over-modulation causes envelope distortion and carrier-phase reversal, degrading demodulated audio quality.'
      : mu === 1
      ? 'At critical modulation, the envelope just touches zero — the maximum efficient condition without distortion.'
      : 'The carrier envelope faithfully tracks the message; no over-modulation distortion is present.');

  const fmPart = ` The FM modulation index β = ${beta.toFixed(3)}, classifying this as **${fmTypeLabel}**. `
    + (beta < 1
      ? 'Narrowband FM uses modest bandwidth, similar to AM, but already enjoys frequency-domain noise immunity.'
      : `Wideband FM trades bandwidth (Carson's BW = ${(2 * (beta + 1)).toFixed(1)}× fm) for significantly improved noise rejection through FM capture effect.`);

  const noisePart = ` Current SNR = ${snrDb.toFixed(1)} dB — **${qual.label}**. `
    + (qual.level === 'excellent'
      ? 'Both AM and FM outputs appear nearly clean; noise is negligible.'
      : qual.level === 'good'
      ? 'AM output shows slight amplitude ripple from noise. FM output remains comparatively cleaner due to frequency-domain encoding.'
      : qual.level === 'weak'
      ? 'AM output is visibly degraded — channel noise directly corrupts the envelope. FM output shows less perceptual distortion owing to noise immunity.'
      : 'Severe noise environment. AM output is heavily distorted; its envelope no longer reliably represents the message. FM, despite noise, retains better intelligibility due to the FM capture effect and limiter action in the receiver.');

  const tradeoff = ` Bandwidth trade-off: AM BW = 2fm vs FM BW = 2(Δf + fm). FM requires wider bandwidth but delivers superior noise performance — the classic bandwidth-vs-noise-immunity exchange in analog communications.`;

  return amPart + fmPart + noisePart + tradeoff;
}
