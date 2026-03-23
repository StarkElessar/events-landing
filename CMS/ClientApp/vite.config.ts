import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { basename, dirname, resolve } from 'node:path';
import { globSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import { createBaseConfig } from '../../Site.Core/ClientApp/vite.base.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseConfig = createBaseConfig({ port: 5174 });

const viewEntries = Object.fromEntries(
	(globSync as unknown as (pattern: string, opts: { cwd: string }) => string[])('scripts/views/*/page.tsx', { cwd: __dirname }).map(
		(file: string) => [basename(dirname(file)), resolve(__dirname, file)],
	),
);

export default defineConfig({
	...baseConfig,
	plugins: [...(baseConfig.plugins ?? []), react()],
	build: {
		outDir: resolve(__dirname, '../wwwroot/dist'),
		emptyOutDir: true,
		manifest: true,
		rolldownOptions: {
			input: {
				main: resolve(__dirname, 'scripts/main.ts'),
				styles: resolve(__dirname, 'styles/main.scss'),
				...viewEntries,
			},
		},
	},
});
