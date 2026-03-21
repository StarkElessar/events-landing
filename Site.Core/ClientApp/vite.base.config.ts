import { type UserConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type BaseConfigProps = {
	port: number;
};

/**
 * Shared Vite base configuration for all projects (CMS, Site).
 * Each project extends this with its own entry points and output directory.
 */
export function createBaseConfig(props: BaseConfigProps): UserConfig {
	return {
		base: '/dist/',
		resolve: {
			alias: {
				'@styles.core': join(__dirname, 'styles'),
				'@scripts.core': join(__dirname, 'scripts'),
			},
		},
		server: {
			strictPort: true,
			port: props.port,
			hmr: {
				clientPort: props.port,
			},
		},
	};
}
