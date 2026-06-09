/**
 * noiseUtils.js
 * Deterministic pseudo-random noise using a seeded PRNG (mulberry32).
 * Using a fixed seed ensures graphs do not flicker on re-render.
 */

/**
 * Mulberry32 seeded PRNG — returns a float in [0, 1).
 */
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate a deterministic Gaussian-ish noise array via Box-Muller.
 * @param {number} length - number of samples
 * @param {number} noiseLevel - amplitude scale factor
 * @param {number} [seed=42]
 * @returns {number[]}
 */
export function generateNoise(length, noiseLevel, seed = 42) {
  const rand = mulberry32(seed);
  const noise = [];
  for (let i = 0; i < length; i += 2) {
    // Box-Muller transform
    const u1 = rand() || 1e-10;
    const u2 = rand();
    const mag = noiseLevel * Math.sqrt(-2.0 * Math.log(u1));
    const z0 = mag * Math.cos(2 * Math.PI * u2);
    const z1 = mag * Math.sin(2 * Math.PI * u2);
    noise.push(z0);
    if (i + 1 < length) noise.push(z1);
  }
  return noise;
}

/**
 * Noise presets → return { noiseLevel, noisePower }
 */
export const NOISE_PRESETS = {
  low:    { noiseLevel: 0.1,  noisePower: 0.2  },
  medium: { noiseLevel: 0.5,  noisePower: 1.0  },
  high:   { noiseLevel: 1.2,  noisePower: 3.0  },
};
