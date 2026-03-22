import { usePageData } from '../../shared/hooks/use-page-data';
import { useRoutes } from '../../shared/hooks/use-routes';
import { buildUrl } from '../../shared/utils/build-url';
import { Button } from '../../shared/ui/button';
import { Table } from '../../shared/ui/table';

interface Transfer {
	id: number;
	name: string;
}

interface Event {
	id: number;
	titlePage: string;
	slug: string;
	isDefault: boolean;
	isPublished: boolean;
	transfer?: Transfer | null;
	effectiveBrandColorStart: string;
	effectiveBrandColorEnd: string;
}

interface EventsIndexData {
	events: Event[];
	siteBaseUrl?: string | null;
	displacedEventTitle?: string | null;
}

export function EventsIndex() {
	const { events, siteBaseUrl, displacedEventTitle } = usePageData<EventsIndexData>();
	const routes = useRoutes();

	const editUrl = (id: number) => buildUrl(routes.events.editTemplate, { id });
	const deleteUrl = (id: number) => buildUrl(routes.events.deleteTemplate, { id });

	const landingUrl = (e: Event) => {
		const host = siteBaseUrl ?? `https://${e.transfer?.name}`;
		return `${host}/${e.slug}`;
	};

	return (
		<>
			{displacedEventTitle && (
				<div className="admin-notice">
					<strong>Дефолтное событие сброшено:</strong> событие «{displacedEventTitle}» ранее было
					указано по умолчанию — теперь оно сброшено.
				</div>
			)}

			<div className="admin-header">
				<h1>События</h1>
				<Button variant="primary" asChild>
					<a href={routes.events.create}>+ Создать событие</a>
				</Button>
			</div>

			<Table>
				<Table.Header>
					<Table.Row>
						<Table.Head>ID</Table.Head>
						<Table.Head>Трансфер</Table.Head>
						<Table.Head>Название</Table.Head>
						<Table.Head>Slug</Table.Head>
						<Table.Head>По умолчанию</Table.Head>
						<Table.Head>Бренд</Table.Head>
						<Table.Head>Статус</Table.Head>
						<Table.Head>Действия</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{events.map((e) => (
						<Table.Row key={e.id}>
							<Table.Cell>{e.id}</Table.Cell>
							<Table.Cell>{e.transfer?.name ?? '—'}</Table.Cell>
							<Table.Cell>{e.titlePage}</Table.Cell>
							<Table.Cell>
								<a href={landingUrl(e)} target="_blank" rel="noopener noreferrer">
									/{e.slug}
								</a>
							</Table.Cell>
							<Table.Cell>
								{e.isDefault ? (
									<span className="badge badge_success">Да</span>
								) : (
									<span className="badge badge_muted">Нет</span>
								)}
							</Table.Cell>
							<Table.Cell>
								<div
									style={{
										width: 60,
										height: 24,
										borderRadius: 4,
										background: `linear-gradient(135deg, ${e.effectiveBrandColorStart}, ${e.effectiveBrandColorEnd})`,
									}}
								/>
							</Table.Cell>
							<Table.Cell>
								{e.isPublished ? (
									<span className="badge badge_success">Опубликовано</span>
								) : (
									<span className="badge badge_muted">Черновик</span>
								)}
							</Table.Cell>
							<Table.Cell className="actions">
								<Button variant="secondary" size="sm" asChild>
									<a href={editUrl(e.id)}>Изменить</a>
								</Button>
								<Button variant="danger" size="sm" asChild>
									<a href={deleteUrl(e.id)}>Удалить</a>
								</Button>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</>
	);
}
