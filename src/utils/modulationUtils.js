/**
 * modulationUtils.js
 * Modulation index, bandwidth, and classification helpers.
 */

// ── AM ──────────────────────────────────────────────────────────────────────

/**
 * AM modulation index: μ = Am / Ac
 */
export function amModulationIndex(Am, Ac) {
  return Ac > 0 ? Am / Ac : 0;
}

/**
 * AM bandwidth: BW = 2 * fm  (Hz)
 */
export function amBandwidth(fm) {
  return 2 * fm;
}

/**
 * Classify AM modulation condition.
 * @returns {'Under Modulation' | 'Critical Modulation' | 'Over Modulation'}
 */
export function amCondition(mu) {
  if (mu < 1)  return 'Under Modulation';
  if (mu === 1) return 'Critical Modulation';
  return 'Over Modulation';
}

// ── FM ──────────────────────────────────────────────────────────────────────

/**
 * FM modulation index: β = Δf / fm
 */
export function fmModulationIndex(deltaF, fm) {
  return fm > 0 ? deltaF / fm : 0;
}

/**
 * FM bandwidth using Carson's Rule: BW = 2(Δf + fm)  (Hz)
 */
export function fmBandwidth(deltaF, fm) {
  return 2 * (deltaF + fm);
}

/**
 * Classify FM type.
 * @returns {'Narrowband FM (NBFM)' | 'Wideband FM (WBFM)'}
 */
export function fmType(beta) {
  return beta < 1 ? 'Narrowband FM (NBFM)' : 'Wideband FM (WBFM)';
}
