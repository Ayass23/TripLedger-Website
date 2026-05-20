import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#433075',
        'brand-accent': '#A58CF4',
        'brand-danger': '#E5484D',
        'surface-base': '#FAFAFA',
        'surface-card': '#FFFFFF',
        'surface-elevated': '#F4F1FF',
        'text-primary': '#0D0D0D',
        'text-secondary': 'rgba(13, 13, 13, 0.65)',
        'text-tertiary': 'rgba(13, 13, 13, 0.35)',
        'success-green': '#22C55E',
        'warning-amber': '#F59E0B',
        'error-red': '#E5484D',
        'border-soft': '#E9E2FF',
        'border-strong': '#CFC2FF',
      },
      fontFamily: {
        sans: ['ui-rounded', 'SF Pro Rounded', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'large-title': '34px',
        'title-1': '28px',
        'title-2': '22px',
        'title-3': '20px',
      },
      borderRadius: {
        'xs': '6px',
        'sm': '10px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
      boxShadow: {
        'soft': '0 6px 12px rgba(67, 48, 117, 0.08)',
        'medium': '0 8px 16px rgba(67, 48, 117, 0.14)',
      },
    },
  },
  plugins: [],
}

export default config
