/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // EMIT Brand Colors
        'emit-navy': '#050840',
        'emit-sky': '#95C5F2',
        'emit-bg': '#EBF3FA',
        // Status Colors
        'emit-success': '#10B981',
        'emit-success-bg': '#E1F8F0',
        'emit-success-text': '#065F46',
        'emit-warning': '#F59E0B',
        'emit-warning-bg': '#FEF3C7',
        'emit-warning-text': '#92400E',
        'emit-error': '#EF4444',
        'emit-error-bg': '#FFF1F1',
        'emit-error-text': '#991B1B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
