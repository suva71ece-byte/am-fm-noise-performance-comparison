# AM/FM Noise Performance Comparison Tool

> **Noise Performance Comparison of AM and FM Communication Systems**  
> An interactive browser-based simulation tool built with React + Vite + Tailwind CSS.

---

## Objective

Simulate and compare how **Amplitude Modulation (AM)** and **Frequency Modulation (FM)** behave under varying levels of Additive White Gaussian Noise (AWGN). The tool generates real mathematical waveforms, applies modulation, injects channel noise, and displays quantitative SNR analysis — all in real-time from the browser.

---

## Features

- **Live signal generation** — message, carrier, AM, FM, and noisy waveforms computed in real-time
- **Deterministic noise** — seeded PRNG (mulberry32 + Box-Muller) so graphs are stable across renders
- **Interactive sliders** — adjust Am, Ac, fm, fc, Δf, noise level, signal/noise power, duration, sample count
- **Noise presets** — Low / Medium / High noise with one click
- **Waveform charts** — 9 Recharts panels including clean vs noisy and AM vs FM overlays
- **Calculation panel** — AM modulation index, FM modulation index, AM BW, FM BW (Carson's rule)
- **SNR analysis** — linear SNR, SNR in dB, quality classification (Excellent / Good / Weak / Poor)
- **Status badges** — Under/Critical/Over Modulation, NBFM/WBFM, SNR quality
- **Dynamic analysis** — auto-generated technical explanation that adapts to current parameter values
- **Comparison page** — full AM vs FM table + side-by-side waveform comparison
- **Responsive** — works on desktop and mobile
- **No backend** — 100% client-side, fully static

---

## Tech Stack

| Layer       | Technology                |
|-------------|---------------------------|
| UI          | React 18                  |
| Build tool  | Vite 5                    |
| Styling     | Tailwind CSS 3            |
| Charts      | Recharts 2                |
| Icons       | Lucide React              |
| Language    | JavaScript (ES6+)         |
| Deployment  | Any static host (GitHub Pages, Vercel, Netlify) |

---

## Communication System Flow

```
Message Signal m(t)
       │
       ▼
AM / FM Modulator  ──→  s(t)
       │
       ▼
  Noisy Channel  +n(t)
       │
       ▼
 Received Signal  r(t) = s(t) + n(t)
       │
       ▼
SNR Analysis & AM vs FM Comparison
```

---

## Key Formulas

| Signal / Metric         | Formula                                      |
|-------------------------|----------------------------------------------|
| Message signal          | m(t) = Am · sin(2π·fm·t)                    |
| Carrier signal          | c(t) = Ac · sin(2π·fc·t)                    |
| AM modulated            | s_AM(t) = Ac·[1 + μ·sin(2π·fm·t)]·sin(2π·fc·t) |
| AM modulation index     | μ = Am / Ac                                  |
| AM bandwidth            | BW_AM = 2·fm                                 |
| FM modulated            | s_FM(t) = Ac·sin(2π·fc·t + β·sin(2π·fm·t)) |
| FM modulation index     | β = Δf / fm                                  |
| FM bandwidth (Carson's) | BW_FM = 2·(Δf + fm)                         |
| SNR (linear)            | SNR = P_signal / P_noise                     |
| SNR (dB)                | SNR_dB = 10 · log₁₀(SNR)                    |

---

## Project Structure

```
am-fm-noise-performance-comparison/
│
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── README.md
├── .gitignore
│
├── public/
│   ├── favicon.svg
│   └── screenshots/
│
└── src/
    ├── App.jsx           ← Root app + page routing
    ├── main.jsx          ← React entry point
    ├── index.css         ← Tailwind + global styles
    │
    ├── components/
    │   ├── Header.jsx          ← Sticky nav bar
    │   ├── SidebarControls.jsx ← All parameter sliders + noise presets
    │   ├── SignalChart.jsx      ← Single-signal Recharts waveform
    │   ├── ComparisonChart.jsx  ← Multi-signal overlay chart
    │   ├── ResultCard.jsx       ← KPI metric card
    │   ├── QualityBadge.jsx     ← Coloured condition/quality pill
    │   ├── SystemFlow.jsx       ← Communication flow diagram
    │   └── ParameterTable.jsx   ← Key/value calculation table
    │
    ├── pages/
    │   ├── Dashboard.jsx   ← Home page with overview and feature cards
    │   ├── Simulator.jsx   ← Main simulation tool
    │   ├── Comparison.jsx  ← AM vs FM comparison page
    │   └── About.jsx       ← Project info, formulas, future scope
    │
    ├── utils/
    │   ├── signalUtils.js      ← Signal generation (message, carrier, AM, FM, noisy)
    │   ├── modulationUtils.js  ← Modulation index, bandwidth, classification
    │   ├── noiseUtils.js       ← Seeded PRNG, Gaussian noise, noise presets
    │   └── calculationUtils.js ← SNR, quality, dynamic analysis text
    │
    └── data/
        └── projectInfo.js  ← Default simulation parameters, project metadata
```

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/am-fm-noise-performance-comparison.git
cd am-fm-noise-performance-comparison

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

The `dist/` folder contains the fully static site, ready to deploy to GitHub Pages, Vercel, or Netlify.

---

## Screenshots

> _Add screenshots to `public/screenshots/` and reference them here._

| Dashboard | Simulator | Comparison |
|-----------|-----------|------------|
| ![dashboard](public/screenshots/dashboard.png) | ![simulator](public/screenshots/simulator.png) | ![comparison](public/screenshots/comparison.png) |

---

## Signal Quality Classification

| SNR (dB)   | Classification         |
|------------|------------------------|
| ≥ 20 dB    | Excellent              |
| 10 – 19 dB | Good                   |
| 3 – 9 dB   | Weak / Noisy           |
| < 3 dB     | Poor / Highly Distorted|

---

## Future Scope

- AM envelope detector simulation
- FM demodulator using frequency discriminator
- FFT spectrum analyser for bandwidth visualisation
- Real-time audio input modulation and demodulation
- Downloadable PDF simulation reports
- Comparison of DSB-TC, DSB-SC, SSB, and FM modulation schemes
- Phase noise and non-linear channel distortion models

---

## Team Members

| Name | Role |
|------|------|
| Kalyan Kumar Dutta | Developer |
| _(Add teammates here)_ | |

---

## License

MIT — free to use for academic and educational purposes.
