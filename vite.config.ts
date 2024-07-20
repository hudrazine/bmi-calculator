// import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte()],
	build: {
		lib: {
			entry: 'src/lib/index.ts',
			name: 'Shikumito/BmiCalculator',
			fileName: (format) => `bmi-calculator.${format}.js`,
			formats: ['es', 'umd']
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		watch: {
			usePolling: true,
			interval: 1000,
		},
		host: '0.0.0.0',
		port: 5173
	},
});
