/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090d14',
        surface: '#0d121c',
        'surface-card': '#111724',
        'surface-subtle': '#162032',
        'surface-border': '#1e293b',
        primary: '#4edea3',
        'primary-glow': 'rgba(78, 222, 163, 0.15)',
        secondary: '#38bdf8',
        'cyan-glow': 'rgba(56, 189, 248, 0.15)',
        'terminal-bg': '#080c13',
        'on-surface': '#e2e8f0',
        'on-surface-variant': '#94a3b8',
        'text-muted': '#64748b',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.65', transform: 'scale(1.03)' },
        },
        dataPulse: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      animation: {
        glow: 'pulseGlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
