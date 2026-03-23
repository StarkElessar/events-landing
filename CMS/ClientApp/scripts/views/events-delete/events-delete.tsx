import { usePageData } from "../../shared/hooks/use-page-data";
import { useRoutes } from "../../shared/hooks/use-routes";
import { buildUrl } from "../../shared/utils/build-url";
import { Button } from "../../shared/ui/button";
import { Table } from "../../shared/ui/table";

interface Event {
	id: number;
	titlePage: string;
	slug: string;
	transfer?: { name: string } | null;
	isPublished: boolean;
}

interface EventDeleteData {
	event: Event;
	antiForgeryToken: string;
}

export function EventsDelete() {
	const data = usePageData<EventDeleteData>();
	const { event, antiForgeryToken } = data;
	const routes = useRoutes();
	const deleteUrl = buildUrl(routes.events.deleteConfirmedTemplate, { id: event.id });
	const cancelUrl = routes.events.index;

	return (
		<>
			<div className="admin-header">
				<h1>Удалить событие</h1>
			</div>

			<div className="card">
				<p style={{ marginBottom: "1rem" }}>
					Вы уверены, что хотите удалить событие <strong>{event.titlePage}</strong>?
				</p>

				<Table style={{ marginBottom: "1.5rem" }}>
					<Table.Body>
						<Table.Row>
							<Table.Head>Заголовок</Table.Head>
							<Table.Cell>{event.titlePage}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Head>Slug</Table.Head>
							<Table.Cell>/{event.slug}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Head>Трансфер</Table.Head>
							<Table.Cell>{event.transfer?.name ?? "—"}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Head>Статус</Table.Head>
							<Table.Cell>{event.isPublished ? "Опубликовано" : "Черновик"}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>

				<form method="post" action={deleteUrl}>
					<input type="hidden" name="__RequestVerificationToken" value={antiForgeryToken} />
					<div style={{ display: "flex", gap: "0.75rem" }}>
						<Button type="submit" variant="danger">
							Удалить
						</Button>
						<Button variant="secondary" asChild>
							<a href={cancelUrl}>Отмена</a>
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
