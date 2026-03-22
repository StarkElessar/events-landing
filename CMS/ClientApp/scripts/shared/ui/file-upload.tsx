import { useState, useCallback } from 'react';

interface FileUploadProps {
	name: string;
	label: string;
	currentUrl?: string | null;
	uploadEndpoint: string;
}

export function FileUpload({ name, label, currentUrl, uploadEndpoint }: FileUploadProps) {
	const [url, setUrl] = useState<string>(currentUrl ?? '');
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const upload = useCallback(
		async (file: File) => {
			if (file.size > 5 * 1024 * 1024) {
				setError('Файл слишком большой (максимум 5 МБ)');
				return;
			}

			setError(null);
			setUploading(true);

			const formData = new FormData();
			formData.append('file', file);

			try {
				const res = await fetch(uploadEndpoint, { method: 'POST', body: formData });
				if (!res.ok) throw new Error(await res.text());
				const json = (await res.json()) as { url: string };
				setUrl(json.url);
			} 
            catch {
				setError('Ошибка загрузки файла');
			} 
            finally {
				setUploading(false);
			}
		},
		[uploadEndpoint],
	);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) upload(file);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files?.[0];
		if (file) upload(file);
	};

	const handleRemove = () => setUrl('');

	return (
		<div className="file-upload">
			<input type="hidden" name={name} value={url} />
			<label className="file-upload__label">{label}</label>

			<div
				className="file-upload__zone"
				role="button"
				tabIndex={0}
				aria-label={label}
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}
				onClick={() => document.getElementById(`file-input-${name}`)?.click()}
				onKeyDown={(e) => e.key === 'Enter' && document.getElementById(`file-input-${name}`)?.click()}
			>
				{url ? (
					<div className="file-upload__preview">
						<img className="file-upload__img" src={url} alt={label} />
					</div>
				) : (
					<div className="file-upload__placeholder">
						<span className="file-upload__icon">↑</span>
						<span>{uploading ? 'Загружается…' : 'Перетащите файл или нажмите для выбора'}</span>
						<small>JPG, PNG, SVG, WebP — до 5 МБ</small>
					</div>
				)}
			</div>

			<input
				id={`file-input-${name}`}
				type="file"
				accept="image/*"
				className="file-upload__input"
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>

			{url && (
				<button type="button" className="file-upload__remove" onClick={handleRemove}>
					Удалить
				</button>
			)}

			{error && <div className="file-upload__error">{error}</div>}
		</div>
	);
}
