import { useState } from 'react';
import { Button } from '../../shared/ui/button';
import { Input } from '../../shared/ui/input';
import { ColorPicker } from '../../shared/ui/color-picker';
import { useRoutes } from '../../shared/hooks/use-routes';
import { buildUrl } from '../../shared/utils/build-url';

interface TransferFormData {
	id?: number;
	name: string;
	slug: string;
	domain: string;
	logoUrl: string;
	brandColorStart: string;
	brandColorEnd: string;
	primaryColorStart: string;
	primaryColorEnd: string;
	phone: string;
	email: string;
	legalAddress: string;
	transportType: string;
	inn: string;
	ogrn: string;
}

interface TransferFormProps {
	antiForgeryToken: string;
	transfer: TransferFormData;
	submitLabel: string;
	pageTitle: string;
	hiddenFields?: Record<string, string>;
}

export function TransferForm({
	antiForgeryToken,
	transfer: initialTransfer,
	submitLabel,
	pageTitle,
	hiddenFields,
}: TransferFormProps) {
	const routes = useRoutes();
	const formAction = initialTransfer.id
		? buildUrl(routes.transfers.editTemplate, { id: initialTransfer.id })
		: routes.transfers.create;
	const cancelUrl = routes.transfers.index;
	const [colors, setColors] = useState({
		brandColorStart: initialTransfer.brandColorStart || '#007bff',
		brandColorEnd: initialTransfer.brandColorEnd || '#007bff',
		primaryColorStart: initialTransfer.primaryColorStart || '#6f42c1',
		primaryColorEnd: initialTransfer.primaryColorEnd || '#6f42c1',
	});

	return (
		<>
			<div className="admin-header">
				<h1>{pageTitle}</h1>
			</div>

			<div className="card">
				<form method="post" action={formAction}>
					<input type="hidden" name="__RequestVerificationToken" value={antiForgeryToken} />
					{hiddenFields &&
						Object.entries(hiddenFields).map(([k, v]) => (
							<input key={k} type="hidden" name={k} value={v} />
						))}

					<div className="form-row">
						<Input name="Transfer.Name" label="Название" defaultValue={initialTransfer.name} required />
						<Input name="Transfer.Slug" label="Slug" defaultValue={initialTransfer.slug} required />
					</div>

					<Input
						name="Transfer.Domain"
						label="Домен"
						defaultValue={initialTransfer.domain}
						required
						placeholder="events.autobus.ru"
					/>

					<Input
						name="Transfer.LogoUrl"
						label="URL логотипа"
						defaultValue={initialTransfer.logoUrl}
						placeholder="/uploads/logo.png"
					/>

					<h3 className="form-section-title">Цвета бренда</h3>
					<div className="color-pair">
						<ColorPicker
							name="Transfer.BrandColorStart"
							label="Brand Start"
							value={colors.brandColorStart}
							onChange={(v) => setColors((c) => ({ ...c, brandColorStart: v }))}
						/>
						<ColorPicker
							name="Transfer.BrandColorEnd"
							label="Brand End"
							value={colors.brandColorEnd}
							onChange={(v) => setColors((c) => ({ ...c, brandColorEnd: v }))}
						/>
					</div>

					<h3 className="form-section-title">Цвета Primary</h3>
					<div className="color-pair">
						<ColorPicker
							name="Transfer.PrimaryColorStart"
							label="Primary Start"
							value={colors.primaryColorStart}
							onChange={(v) => setColors((c) => ({ ...c, primaryColorStart: v }))}
						/>
						<ColorPicker
							name="Transfer.PrimaryColorEnd"
							label="Primary End"
							value={colors.primaryColorEnd}
							onChange={(v) => setColors((c) => ({ ...c, primaryColorEnd: v }))}
						/>
					</div>

					<h3 className="form-section-title">Контакты</h3>
					<div className="form-row">
						<Input name="Transfer.Phone" label="Телефон" defaultValue={initialTransfer.phone} required />
						<Input name="Transfer.Email" label="Email" type="email" defaultValue={initialTransfer.email} required />
					</div>

					<Input name="Transfer.LegalAddress" label="Юридический адрес" defaultValue={initialTransfer.legalAddress} required />

					<Input name="Transfer.TransportType" label="Тип транспорта" defaultValue={initialTransfer.transportType} required />

					<div className="form-row">
						<Input name="Transfer.INN" label="ИНН" defaultValue={initialTransfer.inn} />
						<Input name="Transfer.OGRN" label="ОГРН" defaultValue={initialTransfer.ogrn} />
					</div>

					<div className="form-actions">
						<Button type="submit" variant="primary">{submitLabel}</Button>
						<Button variant="secondary" asChild>
							<a href={cancelUrl}>Отмена</a>
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
