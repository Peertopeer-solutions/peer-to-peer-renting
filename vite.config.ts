/// <reference types="vitest" />
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dynamicImport from 'vite-plugin-dynamic-import';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [dynamicImport(), svgr(), react()],
	resolve: {
		alias: [{ find: '@src', replacement: path.resolve(__dirname, 'src') }],
	},
	test: {
		globals: true,
		setupFiles: ['./test/setup-test.ts'],
		environment: 'jsdom',
	},
	// build: {
	// 	// Fix: https://stackoverflow.com/questions/69260715/skipping-larger-chunks-while-running-npm-run-build
	// 	rollupOptions: {
	// 		output: {
	// 			manualChunks(id) {
	// 				if (id.includes('node_modules')) {
	// 					return id
	// 						.toString()
	// 						.split('node_modules/')[1]
	// 						.split('/')[0]
	// 						.toString();
	// 				}
	// 			},
	// 		},
	// 	},
	// },

	// test: {
	// 	globals: true,
	// 	environment: 'jsdom',
	// 	setupFiles: './test/setup-test.js',
	// },
});

function testPlugin(opts = {}): PluginOption[] {
	return [
		{
			name: 'test-plugin',
			enforce: 'pre',
			resolveId(source) {
				const resolvedPath = path.relative(process.cwd(), source);

				if (
					/\.(tsx|jsx|js|ts)$/.test(source) &&
					!source.includes('__inspect')
				) {
					console.log('--- resolveId', resolvedPath);
					// return { id: resolvedPath };
				}
			},
			load(id) {
				const resolvedPath = path.relative(id, process.cwd());
				// console.log(process.cwd());
				if (/\.(tsx|jsx|js|ts)$/.test(id) && !id.includes('__inspect')) {
					console.log('--- load', resolvedPath);
					// return resolvedPath;
				}
			},
		},
	];
}

function vitePluginAlias(aliasOptions) {
	return {
		name: 'vite-plugin-alias',
		configureServer(server) {
			return () => {
				server.middlewares.use((req, res, next) => {
					console.log(req.headers.host);
					const { pathname } = new URL(req.url, `http://${req.headers.host}`);

					// Check if the request URL matches any of the aliases
					for (const alias in aliasOptions) {
						if (pathname.startsWith(alias)) {
							// Resolve the alias path
							const aliasPath = aliasOptions[alias];
							const resolvedPath = pathname.replace(alias, aliasPath);
							// Rewrite the request URL
							req.url = resolvedPath;
							break;
						}
					}
					next();
				});
			};
		},
	};
}
