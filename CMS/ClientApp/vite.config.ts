import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createBaseConfig } from '../../Site.Core/ClientApp/vite.base.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseConfig = createBaseConfig({ port: 5174 });

export default defineConfig({
	...baseConfig,
	build: {
		outDir: resolve(__dirname, '../wwwroot/dist'),
		emptyOutDir: true,
		manifest: true,
		rolldownOptions: {
			input: {
				main: resolve(__dirname, 'scripts/main.ts'),
				styles: resolve(__dirname, 'styles/main.scss'),
				'events-index': resolve(__dirname, 'scripts/views/events-index/page.ts'),
			},
		},
	},
});
