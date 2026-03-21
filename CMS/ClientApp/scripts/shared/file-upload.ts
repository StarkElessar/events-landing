export {};

declare global {
	interface Window {
		__ROUTES__: Record<string, string>;
	}
}

function initFileUpload(container: HTMLElement): void {
	const zone = container.querySelector<HTMLDivElement>('.file-upload__zone')!;
	const fileInput = container.querySelector<HTMLInputElement>('.file-upload__input')!;
	const urlInput = container.querySelector<HTMLInputElement>('.file-upload__url')!;
	const removeBtn = container.querySelector<HTMLButtonElement>('.file-upload__remove')!;
	const errorEl = container.querySelector<HTMLDivElement>('.file-upload__error')!;

	const renderPreview = (url: string): void => {
		zone.innerHTML = `<div class="file-upload__preview"><img class="file-upload__img" src="${url}" alt="" /></div>`;
		removeBtn.classList.remove('file-upload__remove_hidden');
	};

	const renderPlaceholder = (): void => {
		zone.innerHTML = `
			<div class="file-upload__placeholder">
				<span class="file-upload__icon">↑</span>
				<span>Перетащите файл или нажмите для выбора</span>
				<small>JPG, PNG, SVG, WebP — до 5 МБ</small>
			</div>`;
		removeBtn.classList.add('file-upload__remove_hidden');
	};

	const showError = (msg: string): void => {
		errorEl.textContent = msg;
		errorEl.removeAttribute('hidden');
	};

	const clearError = (): void => {
		errorEl.textContent = '';
		errorEl.setAttribute('hidden', '');
	};

	const setLoading = (loading: boolean): void => {
		zone.classList.toggle('file-upload__zone_loading', loading);
	};

	const uploadFile = async (file: File): Promise<void> => {
		clearError();
		setLoading(true);

		const token = document.querySelector<HTMLInputElement>('input[name="__RequestVerificationToken"]')?.value ?? '';
		const formData = new FormData();
		formData.append('file', file);
		formData.append('__RequestVerificationToken', token);

		try {
			const resp = await fetch(window.__ROUTES__.uploadEndpoint, {
				method: 'POST',
				body: formData,
			});

			if (!resp.ok) {
				const err = (await resp.json().catch(() => ({ error: 'Неизвестная ошибка' }))) as { error?: string };
				showError(err.error ?? 'Ошибка загрузки');
				return;
			}

			const data = (await resp.json()) as { url: string };
			urlInput.value = data.url;
			renderPreview(data.url);
		} catch {
			showError('Ошибка сети при загрузке файла');
		} finally {
			setLoading(false);
		}
	};

	zone.addEventListener('click', () => fileInput.click());
	zone.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') fileInput.click();
	});

	fileInput.addEventListener('change', () => {
		const file = fileInput.files?.[0];
		if (file) void uploadFile(file);
		fileInput.value = '';
	});

	zone.addEventListener('dragover', (e) => {
		e.preventDefault();
		zone.classList.add('file-upload__zone_dragover');
	});

	zone.addEventListener('dragleave', () => {
		zone.classList.remove('file-upload__zone_dragover');
	});

	zone.addEventListener('drop', (e) => {
		e.preventDefault();
		zone.classList.remove('file-upload__zone_dragover');
		const file = e.dataTransfer?.files[0];
		if (file) void uploadFile(file);
	});

	removeBtn.addEventListener('click', () => {
		urlInput.value = '';
		renderPlaceholder();
		clearError();
	});
}

document.querySelectorAll<HTMLElement>('.file-upload').forEach(initFileUpload);
