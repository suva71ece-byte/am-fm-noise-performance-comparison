/**
 * signalUtils.js
 * Core signal generation for AM/FM simulation.
 * All functions return arrays of { t, value } objects.
 */

/**
 * Generate time axis array.
 * @param {number} duration - seconds
 * @param {number} points - number of samples
 * @returns {number[]}
 */
export function generateTimeAxis(duration, points) {
  const dt = duration / (points - 1);
  return Array.from({ length: points }, (_, i) => i * dt);
}

/**
 * Message signal: m(t) = Am * sin(2π * fm * t)
 */
export function generateMessageSignal(tArr, Am, fm) {
  return tArr.map((t) => ({
    t,
    value: Am * Math.sin(2 * Math.PI * fm * t),
  }));
}

/**
 * Carrier signal: c(t) = Ac * sin(2π * fc * t)
 */
export function generateCarrierSignal(tArr, Ac, fc) {
  return tArr.map((t) => ({
    t,
    value: Ac * Math.sin(2 * Math.PI * fc * t),
  }));
}

/**
 * AM signal: s_AM(t) = Ac * [1 + μ * sin(2π * fm * t)] * sin(2π * fc * t)
 */
export function generateAMSignal(tArr, Ac, fc, mu, fm) {
  return tArr.map((t) => ({
    t,
    value: Ac * (1 + mu * Math.sin(2 * Math.PI * fm * t)) * Math.sin(2 * Math.PI * fc * t),
  }));
}

/**
 * FM signal: s_FM(t) = Ac * sin(2π * fc * t + β * sin(2π * fm * t))
 * β = Δf / fm
 */
export function generateFMSignal(tArr, Ac, fc, beta, fm) {
  return tArr.map((t) => ({
    t,
    value: Ac * Math.sin(2 * Math.PI * fc * t + beta * Math.sin(2 * Math.PI * fm * t)),
  }));
}

/**
 * Add noise array to a signal array.
 * @param {Array<{t,value}>} signal
 * @param {number[]} noiseArr
 * @returns {Array<{t,value}>}
 */
export function addNoiseToSignal(signal, noiseArr) {
  return signal.map((pt, i) => ({
    t: pt.t,
    value: pt.value + (noiseArr[i] ?? 0),
  }));
}
