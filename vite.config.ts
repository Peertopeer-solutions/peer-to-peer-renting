/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svgr(), react()],
	test: {
		globals: true,
		setupFiles: ['./test/setup-test.ts'],
		environment: 'jsdom',
	},
	build: {
		// Fix: https://stackoverflow.com/questions/69260715/skipping-larger-chunks-while-running-npm-run-build
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id
							.toString()
							.split('node_modules/')[1]
							.split('/')[0]
							.toString();
					}
				},
			},
		},
	},

	// test: {
	// 	globals: true,
	// 	environment: 'jsdom',
	// 	setupFiles: './test/setup-test.js',
	// },
});
