import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          green: '#8CB89F',
          'green-bright': '#36e27b',
          orange: '#ee7c2b',
          'orange-dark': '#e68019',
          lime: '#80e619',
        },
        // Background Colors
        background: {
          light: '#fdfbf7',
          warm: '#f8f7f6',
          dark: '#221810',
          'dark-alt': '#192111',
        },
        // Surface Colors
        surface: {
          light: '#ffffff',
          dark: '#36332E',
          'dark-alt': '#2c2018',
        },
        // Text Colors
        text: {
          main: '#544D45',
          'main-dark': '#4a3b32',
          muted: '#948D83',
          'muted-warm': '#9a6c4c',
          light: '#5e6e52',
        },
        // Accent Colors
        accent: {
          sand: '#EBE5DA',
          'sand-light': '#F2EFE9',
          attention: '#E0A458',
          'attention-light': '#E0A865',
          care: '#EA7A7A',
          'care-light': '#D67C7C',
        },
        // Member Colors
        member: {
          blue: '#8FBAD6',
          orange: '#E8CC9F',
          purple: '#C9B6D1',
          green: '#A8D5BA',
        },
        // Icon Background Colors
        'icon-bg': {
          amber: '#FEF8EC',
          green: '#F2F8F5',
          purple: '#FAF6FB',
          blue: '#F0F6FA',
        },
        // Input Colors
        input: {
          bg: '#f5f4f2',
          border: '#e8e6e1',
        },
      },
      fontFamily: {
        display: ['var(--font-spline-sans)', 'var(--font-plus-jakarta)', 'sans-serif'],
        sans: ['var(--font-noto-sans)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'button': '0 4px 12px rgba(238, 124, 43, 0.3)',
        'button-green': '0 4px 12px rgba(54, 226, 123, 0.3)',
      },
      animation: {
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
