import { useState } from "react";
import { Button } from "../../shared/ui/button";
import { Input } from "../../shared/ui/input";
import { Textarea } from "../../shared/ui/textarea";
import { Select } from "../../shared/ui/select";
import { FileUpload } from "../../shared/ui/file-upload";
import { ColorPicker } from "../../shared/ui/color-picker";
import { useRoutes } from "../../shared/hooks/use-routes";
import { buildUrl } from "../../shared/utils/build-url";

interface TransferOption {
	id: number;
	name: string;
	domain: string;
}

interface EventFormData {
	id?: number;
	transferId: number;
	slug: string;
	title: string;
	description: string;
	titlePage: string;
	topLogoUrl?: string | null;
	bottomLogoUrl?: string | null;
	brandColorStart?: string | null;
	brandColorEnd?: string | null;
	primaryColorStart?: string | null;
	primaryColorEnd?: string | null;
	isPublished: boolean;
	isDefault: boolean;
}

interface EventFormProps {
	event: EventFormData;
	transfers: TransferOption[];
	antiForgeryToken: string;
	pageTitle: string;
	submitLabel: string;
	siteBaseUrl?: string | null;
	hiddenFields?: Record<string, string>;
}

export function EventForm({
	event: initialEvent,
	transfers,
	antiForgeryToken,
	pageTitle,
	submitLabel,
	siteBaseUrl,
	hiddenFields,
}: EventFormProps) {
	const routes = useRoutes();
	const formAction = initialEvent.id ? buildUrl(routes.events.editTemplate, { id: initialEvent.id }) : routes.events.create;
	const cancelUrl = routes.events.index;
	const uploadEndpoint = routes.uploadEndpoint;
	const selectedTransfer = transfers.find((t) => t.id === initialEvent.transferId);
	const landingBase = siteBaseUrl ?? (selectedTransfer ? `https://${selectedTransfer.domain}` : "");

	const [brandInherit, setBrandInherit] = useState(!initialEvent.brandColorStart);
	const [primaryInherit, setPrimaryInherit] = useState(!initialEvent.primaryColorStart);

	const [colors, setColors] = useState({
		brandColorStart: initialEvent.brandColorStart || "#007bff",
		brandColorEnd: initialEvent.brandColorEnd || "#007bff",
		primaryColorStart: initialEvent.primaryColorStart || "#6f42c1",
		primaryColorEnd: initialEvent.primaryColorEnd || "#6f42c1",
	});

	return (
		<>
			<div className="admin-header">
				<h1>{pageTitle}</h1>
				{landingBase && initialEvent.slug && (
					<Button variant="secondary" asChild>
						<a href={`${landingBase}/${initialEvent.slug}`} target="_blank" rel="noopener noreferrer">
							Открыть лендинг ↗
						</a>
					</Button>
				)}
			</div>

			<div className="card">
				<form method="post" action={formAction}>
					<input type="hidden" name="__RequestVerificationToken" value={antiForgeryToken} />
					{hiddenFields && Object.entries(hiddenFields).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}

					<Select name="Event.TransferId" label="Трансфер" defaultValue={String(initialEvent.transferId || "")} required>
						<Select.Trigger placeholder="— выберите —" />
						<Select.Content>
							{transfers.map((t) => (
								<Select.Item key={t.id} value={String(t.id)}>
									{t.name} ({t.domain})
								</Select.Item>
							))}
						</Select.Content>
					</Select>

					<div className="form-row">
						<Input name="Event.Slug" label="Slug (URL)" defaultValue={initialEvent.slug} required placeholder="rsn-2026" />
						<Input name="Event.TitlePage" label="Заголовок страницы (h1)" defaultValue={initialEvent.titlePage} required />
					</div>

					<Input name="Event.Title" label="SEO Title" defaultValue={initialEvent.title} required />

					<Textarea name="Event.Description" label="SEO Description" defaultValue={initialEvent.description} required />

					<h3 className="form-section-title">
						Переопределение дизайна{" "}
						<small style={{ fontWeight: 400, color: "#999" }}>(оставьте пустым для наследования от трансфера)</small>
					</h3>

					<div className="form-row">
						<FileUpload
							name="Event.TopLogoUrl"
							label="Верхнее лого (шапка)"
							currentUrl={initialEvent.topLogoUrl}
							uploadEndpoint={uploadEndpoint}
						/>
						<FileUpload
							name="Event.BottomLogoUrl"
							label="Нижнее лого (подвал)"
							currentUrl={initialEvent.bottomLogoUrl}
							uploadEndpoint={uploadEndpoint}
						/>
					</div>

					<div className="color-pair">
						{!brandInherit && (
							<>
								<ColorPicker
									name="Event.BrandColorStart"
									label="Brand Start"
									value={colors.brandColorStart}
									onChange={(v) => setColors((c) => ({ ...c, brandColorStart: v }))}
								/>
								<ColorPicker
									name="Event.BrandColorEnd"
									label="Brand End"
									value={colors.brandColorEnd}
									onChange={(v) => setColors((c) => ({ ...c, brandColorEnd: v }))}
								/>
							</>
						)}
						{brandInherit && (
							<>
								<input type="hidden" name="Event.BrandColorStart" value="" />
								<input type="hidden" name="Event.BrandColorEnd" value="" />
							</>
						)}
						<div className="form-group" style={{ paddingTop: "1.5rem" }}>
							<label>
								<input type="checkbox" checked={brandInherit} onChange={(e) => setBrandInherit(e.target.checked)} />{" "}
								Наследовать от трансфера
							</label>
						</div>
					</div>

					<div className="color-pair">
						{!primaryInherit && (
							<>
								<ColorPicker
									name="Event.PrimaryColorStart"
									label="Primary Start"
									value={colors.primaryColorStart}
									onChange={(v) => setColors((c) => ({ ...c, primaryColorStart: v }))}
								/>
								<ColorPicker
									name="Event.PrimaryColorEnd"
									label="Primary End"
									value={colors.primaryColorEnd}
									onChange={(v) => setColors((c) => ({ ...c, primaryColorEnd: v }))}
								/>
							</>
						)}
						{primaryInherit && (
							<>
								<input type="hidden" name="Event.PrimaryColorStart" value="" />
								<input type="hidden" name="Event.PrimaryColorEnd" value="" />
							</>
						)}
						<div className="form-group" style={{ paddingTop: "1.5rem" }}>
							<label>
								<input type="checkbox" checked={primaryInherit} onChange={(e) => setPrimaryInherit(e.target.checked)} />{" "}
								Наследовать от трансфера
							</label>
						</div>
					</div>

					<div className="form-row" style={{ marginTop: "1.5rem" }}>
						<div className="form-group">
							<label>
								<input type="checkbox" name="Event.IsPublished" defaultChecked={initialEvent.isPublished} value="true" />{" "}
								Опубликовано
							</label>
						</div>
						<div className="form-group">
							<label>
								<input type="checkbox" name="Event.IsDefault" defaultChecked={initialEvent.isDefault} value="true" /> По
								умолчанию
							</label>
						</div>
					</div>

					<div className="form-actions">
						<Button type="submit" variant="primary">
							{submitLabel}
						</Button>
						<Button variant="secondary" asChild>
							<a href={cancelUrl}>← События</a>
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
