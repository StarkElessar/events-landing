export {};

interface AppRoutes {
	uploadEndpoint: string;
	events: {
		index: string;
		create: string;
		editTemplate: string;
		deleteTemplate: string;
		deleteConfirmedTemplate: string;
	};
	transfers: {
		index: string;
		create: string;
		editTemplate: string;
		deleteTemplate: string;
		deleteConfirmedTemplate: string;
	};
}

declare global {
	interface Window {
		__DATA__: unknown;
		__ROUTES__: AppRoutes;
	}
}
