/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                terminal: {
                    black: '#0a0a0a',
                    dark: '#111111',
                    border: '#333333',
                    text: '#e5e5e5',
                    green: '#22c55e',
                    blue: '#3b82f6',
                    gray: '#888888'
                }
            },
            animation: {
                'cursor-blink': 'blink 1s step-start infinite',
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                }
            }
        },
    },
    plugins: [],
};
