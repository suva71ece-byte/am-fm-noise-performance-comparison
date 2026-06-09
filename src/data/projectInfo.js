export const PROJECT_INFO = {
  title: 'AM/FM Noise Performance Comparison Tool',
  fullTitle: 'Noise Performance Comparison of AM and FM Communication Systems',
  version: '1.0.0',
  description:
    'An interactive simulation tool for comparing how Amplitude Modulation (AM) and ' +
    'Frequency Modulation (FM) behave under Additive White Gaussian Noise (AWGN) channel conditions.',
  techStack: ['React 18', 'Vite', 'Tailwind CSS', 'Recharts', 'JavaScript ES6+'],
  repository: 'https://github.com/your-username/am-fm-noise-performance-comparison',
};

export const DEFAULT_PARAMS = {
  Am:          1,
  Ac:          2,
  fm:          5,
  fc:          50,
  deltaF:      25,
  noiseLevel:  0.2,
  signalPower: 10,
  noisePower:  1,
  duration:    1,
  points:      1000,
};
