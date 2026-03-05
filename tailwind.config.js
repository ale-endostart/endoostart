/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#01284A',
          lightBlue: '#4A7CA8',
          gold: '#B89A6A',
          darkGray: '#3C3C3C',
          lightGray: '#F3F5F8',
          goldHover: '#9A7A4A',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#4A7CA8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#01284A',
          800: '#075985',
          900: '#0c3d66',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        neutral: {
          50: '#F3F5F8',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#3C3C3C',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      spacing: {
        '7.5': '1.875rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'grain': 'grainShift 8s steps(10) infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'orbit': 'floatOrbit 12s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'border-draw': 'borderDraw 1.5s ease-out forwards',
        'scroll-mouse': 'scrollMouse 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        grainShift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -2%)' },
          '30%': { transform: 'translate(-1%, 3%)' },
          '50%': { transform: 'translate(-3%, 1%)' },
          '70%': { transform: 'translate(-2%, 2%)' },
          '90%': { transform: 'translate(-1%, 1%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatOrbit: {
          '0%': { transform: 'rotate(0deg) translateX(20px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(20px) rotate(-360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(184, 154, 106, 0.3), 0 0 40px rgba(184, 154, 106, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(184, 154, 106, 0.5), 0 0 60px rgba(184, 154, 106, 0.2)' },
        },
        borderDraw: {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
        scrollMouse: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0.5', transform: 'translateY(8px)' },
          '100%': { opacity: '0', transform: 'translateY(16px)' },
        },
      },
      boxShadow: {
        'premium': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 20px 50px rgba(0, 0, 0, 0.15)',
        'gold-glow': '0 0 30px rgba(184, 154, 106, 0.4), 0 0 60px rgba(184, 154, 106, 0.15)',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};
