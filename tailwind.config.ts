import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'], // Added new heading font
      },
      colors: {
        // --- Custom Modern Teal Palette ---
        // Base Hues: Using a teal base for primary, with complementary neutrals.
        // Shadcn/UI uses HSL. Format: H S L
        // Example HSL values:
        // Teal: H around 170-190
        // Gray: H around 220, varying S and L
        
        // Primary: A vibrant but clean teal
        'custom-primary': '180 70% 40%', // A medium vibrant teal
        'custom-primary-foreground': '0 0% 100%', // White text for primary
        
        // Accent: A slightly different shade of teal or a complementary color for interactive elements
        'custom-accent': '190 60% 50%', // A slightly bluer teal
        'custom-accent-foreground': '0 0% 100%', // White text for accent
        
        // Neutrals: Grays for background, foreground, muted elements
        'custom-background': '220 20% 98%', // Very light gray/off-white background
        'custom-foreground': '220 10% 20%', // Dark gray for main text
        
        'custom-card': '0 0% 100%', // White card background
        'custom-card-foreground': '220 10% 20%', // Dark gray text on card
        
        'custom-popover': '0 0% 100%', // White popover background
        'custom-popover-foreground': '220 10% 20%', // Dark gray text on popover
        
        'custom-border': '220 10% 90%', // Light gray border
        'custom-input': '220 10% 90%', // Light gray input background
        'custom-ring': '180 70% 60%', // Lighter primary for ring focus

        // Muted: For secondary text, disabled states
        'custom-muted': '220 20% 90%', // Lighter gray for muted elements
        'custom-muted-foreground': '220 10% 40%', // Medium gray for muted text

        // Destructive: Standard red
        'custom-destructive': '0 84.2% 60.2%',
        'custom-destructive-foreground': '0 0% 98%',
        // --- End Custom Modern Teal Palette ---

        // Shadcn/UI default colors, updated to use our custom palette values
        border: 'hsl(var(--border, var(--custom-border)))',
        input: 'hsl(var(--input, var(--custom-input)))',
        ring: 'hsl(var(--ring, var(--custom-ring)))',
        background: 'hsl(var(--background, var(--custom-background)))',
        foreground: 'hsl(var(--foreground, var(--custom-foreground)))',
        primary: {
          DEFAULT: 'hsl(var(--primary, var(--custom-primary)))',
          foreground: 'hsl(var(--primary-foreground, var(--custom-primary-foreground)))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary, var(--custom-muted)))', // Using muted for secondary default
          foreground: 'hsl(var(--secondary-foreground, var(--custom-muted-foreground)))', // Using muted foreground for secondary foreground
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive, var(--custom-destructive)))',
          foreground: 'hsl(var(--destructive-foreground, var(--custom-destructive-foreground)))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted, var(--custom-muted)))',
          foreground: 'hsl(var(--muted-foreground, var(--custom-muted-foreground)))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent, var(--custom-accent)))',
          foreground: 'hsl(var(--accent-foreground, var(--custom-accent-foreground)))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover, var(--custom-popover)))',
          foreground: 'hsl(var(--popover-foreground, var(--custom-popover-foreground)))',
        },
        card: {
          DEFAULT: 'hsl(var(--card, var(--custom-card)))',
          foreground: 'hsl(var(--card-foreground, var(--custom-card-foreground)))',
        },
      },      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blob: { // Added blob animation
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        blob: 'blob 7s infinite ease-in-out', // Added blob animation
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
