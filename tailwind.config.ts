import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warmano: {
          orange: '#FF4D00',
          'orange-dark': '#E64500',
          'orange-light': '#FF6A2C',
          black: '#0A0A0A',
          'gray-900': '#1A1A1A',
          'gray-800': '#2A2A2A',
          'gray-700': '#3A3A3A',
          'gray-600': '#4A4A4A',
          'gray-500': '#6A6A6A',
          'gray-400': '#8A8A8A',
          'gray-300': '#AAAAAA',
          'gray-200': '#CACACA',
          'gray-100': '#EAEAEA',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'text-reveal': 'textReveal 0.8s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 77, 0, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 77, 0, 0.6)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)', filter: 'blur(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        counter: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
        'warm-gradient': 'linear-gradient(135deg, #FF4D00 0%, #FF6A2C 25%, #F59E0B 50%, #FF6A2C 75%, #FF4D00 100%)',
        'warm-gradient-subtle': 'linear-gradient(135deg, rgba(255,77,0,0.1) 0%, rgba(245,158,11,0.05) 50%, rgba(255,77,0,0.1) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1A1A1A 0%, #0A0A0A 100%)',
        'section-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
      },
      boxShadow: {
        'glow-orange': '0 0 40px rgba(255, 77, 0, 0.3)',
        'glow-orange-lg': '0 0 60px rgba(255, 77, 0, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}

export default config
