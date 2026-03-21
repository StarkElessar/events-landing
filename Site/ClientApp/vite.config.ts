import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createBaseConfig } from '../../Site.Core/ClientApp/vite.base.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const coreDir = resolve(__dirname, '../../Site.Core/ClientApp');

const baseConfig = createBaseConfig({ port: 5175 });

export default defineConfig({
	...baseConfig,
	// Serve wwwroot as Vite's public dir in dev so absolute paths like /fonts/... work.
	// copyPublicDir: false prevents Vite from copying wwwroot into outDir on build
	// (ASP.NET Core serves wwwroot itself).
	publicDir: resolve(__dirname, '../wwwroot'),
	build: {
		outDir: resolve(__dirname, '../wwwroot/dist'),
		emptyOutDir: true,
		manifest: true,
		copyPublicDir: false,
		rolldownOptions: {
			input: {
				main: resolve(__dirname, 'scripts/main.ts'),
				styles: resolve(__dirname, 'styles/main.scss'),
				'not-found': resolve(__dirname, 'styles/views/not-found.scss'),
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				// Allows @use "base/variables" to resolve from Site.Core shared styles
				loadPaths: [resolve(coreDir, 'styles')],
			},
		},
	},
});
