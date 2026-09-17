/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f0ff',
          100: '#eae5fe',
          200: '#d7cffe',
          300: '#bba9fd',
          400: '#a88bff',
          500: '#7b61ff',
          600: '#6b4fe0',
          700: '#583cc4',
          800: '#4831a2',
          900: '#3c2b81',
          950: '#231853',
        },
        brand: {
          violet: '#7B61FF',
          'violet-hover': '#6B4FE0',
          'violet-light': '#F3F0FF',
          'violet-subtle': '#EAE5FE',
          blue: '#2D9CDB',
          'blue-light': '#E5F3FE',
          lavender: '#A88BFF',
          'lavender-light': '#F5F3FF',
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          purple: '#8b5cf6',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8F8FB',
          subtle: '#F1F3F9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 8px -1px rgba(15, 23, 42, 0.04), 0 1px 4px -1px rgba(15, 23, 42, 0.02)',
        'card-hover': '0 14px 32px -4px rgba(123, 97, 255, 0.14), 0 4px 12px -2px rgba(15, 23, 42, 0.05)',
        'card-elevated': '0 20px 40px -10px rgba(15, 23, 42, 0.08), 0 1px 3px 0 rgba(15, 23, 42, 0.02)',
        'accent-glow': '0 8px 24px -4px rgba(123, 97, 255, 0.3)',
        'glow': '0 8px 25px -5px rgba(123, 97, 255, 0.25)',
        'glow-emerald': '0 8px 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-cyan': '0 8px 25px -5px rgba(45, 156, 219, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'float-delayed': 'float 3.5s ease-in-out 1.75s infinite',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      }
    },
  },
  plugins: [],
}
