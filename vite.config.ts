import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte()],
	build: {
		rollupOptions: {
			output: {
				entryFileNames: 'assets/[name].js',
				chunkFileNames: 'assets/[name].js',
				assetFileNames: 'assets/[name].[ext]'
			}
		}
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