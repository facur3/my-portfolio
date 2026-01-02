/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Deep dark background
				background: '#0f0f0f',
				// Primary Violet
				primary: {
					DEFAULT: '#8b5cf6',
					50: '#f5f3ff',
					100: '#ede9fe',
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#a78bfa',
					500: '#8b5cf6',
					600: '#7c3aed',
					700: '#6d28d9',
					800: '#5b21b6',
					900: '#4c1d95',
					950: '#2e1065',
				},
				// Secondary/Accent (Cyan/Teal for contrast)
				secondary: {
					DEFAULT: '#06b6d4', // Cyan 500
					400: '#22d3ee',
				},
				// Dark mode surface colors
				zinc: {
					850: '#1f1f22',
					900: '#18181b', // Default zinc-900
					950: '#09090b', // Default zinc-950
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Space Grotesk', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'noise': "url('/noise.png')",
			},
			boxShadow: {
				'glow-sm': '0 0 10px rgba(139, 92, 246, 0.3)',
				'glow': '0 0 20px rgba(139, 92, 246, 0.4)',
				'glow-lg': '0 0 30px rgba(139, 92, 246, 0.5)',
			}
		},
	},
	plugins: [],
}
