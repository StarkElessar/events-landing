function initColorToggle(checkboxId: string, startName: string, endName: string): void {
	const cb = document.getElementById(checkboxId) as HTMLInputElement | null;
	if (!cb) return;

	const apply = (): void => {
		const start = document.querySelector<HTMLInputElement>(`[name="${startName}"]`);
		const end = document.querySelector<HTMLInputElement>(`[name="${endName}"]`);
		if (!start || !end) return;

		if (cb.checked) {
			start.value = '';
			end.value = '';
			start.type = 'text';
			end.type = 'text';
			start.disabled = true;
			end.disabled = true;
		} 
		else {
			start.disabled = false;
			end.disabled = false;
			start.type = 'color';
			end.type = 'color';
		}
	};

	cb.addEventListener('change', apply);
	apply();
}

initColorToggle('clearBrandColors', 'Event.BrandColorStart', 'Event.BrandColorEnd');
initColorToggle('clearPrimaryColors', 'Event.PrimaryColorStart', 'Event.PrimaryColorEnd');
