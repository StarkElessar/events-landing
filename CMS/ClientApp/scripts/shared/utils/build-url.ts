export function buildUrl(template: string, params: Record<string, string | number>): string {
	return Object.entries(params).reduce(
		(url, [key, val]) => url.replace(`{${key}}`, String(val)),
		template,
	);
}
