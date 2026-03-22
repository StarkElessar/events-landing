export function usePageData<T>(): T {
	return window.__DATA__ as T;
}
