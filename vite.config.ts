import { svelte } from "@sveltejs/vite-plugin-svelte"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [svelte()],
	build: {
		rollupOptions: {
			output: {
				entryFileNames: "assets/bmi-calculator.js",
				// chunkFileNames: 'assets/[name].js',
				assetFileNames: "assets/bmi-calculator.[ext]",
			},
		},
	},
	server: {
		watch: {
			usePolling: true,
			interval: 1000,
		},
		host: "0.0.0.0",
		port: 5173,
	},
})
