import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Design tokens — design.md §3
        brand: {
          DEFAULT: '#1A56DB',
          dark: '#1E429F',
          light: '#DBEAFE',
        },
        navy: {
          DEFAULT: '#0B1628',
          deep: '#0F172A',
        },
        accent: {
          green: '#059669',
          'green-light': '#D1FAE5',
          amber: '#D97706',
          'amber-light': '#FEF3C7',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          alt: '#F1F5F9',
        },
        border: {
          light: '#E2E8F0',
          DEFAULT: '#CBD5E1',
          dark: '#94A3B8',
        },
        text: {
          primary: '#0F172A',
          secondary: '#334155',
          muted: '#64748B',
          ondark: '#F8FAFC',
        },
        // shadcn semantic tokens — wired to CSS variables in globals.css
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        hero: ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-mobile': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'data-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'data-md': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        pill: '9999px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        elevated:
          '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
      },
      maxWidth: {
        prose: '65ch',
        article: '780px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      zIndex: {
        header: '50',
        modal: '100',
        toast: '150',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 200ms ease-out',
        'accordion-up': 'accordion-up 200ms ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
