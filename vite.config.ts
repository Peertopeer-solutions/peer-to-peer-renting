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
	// test: {
	// 	globals: true,
	// 	environment: 'jsdom',
	// 	setupFiles: './test/setup-test.js',
	// },
});
