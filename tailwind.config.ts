import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#000000',
                    light: '#151515',
                    accent: '#E69900',
                    hover: '#FFB52E',
                },
                neutral: {
                    100: '#F5F5F5',
                    200: '#E2E1E1',
                    300: '#959799',
                    400: '#757575',
                    700: '#374151',
                    800: '#1F2937',
                },
            },
            backgroundImage: {
                'filigrame': "url('/images/filigramme.png')",
                'hero-gradient': `
                    radial-gradient(circle at 20% 25%, rgba(230, 153, 0, 0.08) 0%, transparent 40%),
                    radial-gradient(circle at 80% 75%, rgba(255, 181, 46, 0.05) 0%, transparent 30%),
                    linear-gradient(145deg, #000000 0%, #151515 100%)
                `,
            },
            animation: {
                'gradient-x': 'gradient-x 15s ease infinite',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    },
                },
            }
        }
    },
    plugins: [],
} satisfies Config;