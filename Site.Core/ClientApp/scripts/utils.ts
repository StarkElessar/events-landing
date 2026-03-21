/**
 * Shared TypeScript utilities for Site and CMS projects.
 * Import specific utils: import { formatDate } from "@core/utils";
 */

export function formatDate(date: Date | string, locale = 'ru-RU'): string {
	return new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(typeof date === 'string' ? new Date(date) : date);
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout>;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
}
