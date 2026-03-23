import { usePageData } from "../../shared/hooks/use-page-data";
import { useRoutes } from "../../shared/hooks/use-routes";
import { buildUrl } from "../../shared/utils/build-url";
import { Button } from "../../shared/ui/button";
import { Table } from "../../shared/ui/table";

interface Transfer {
	id: number;
	name: string;
	slug: string;
	domain: string;
}

interface TransfersIndexData {
	transfers: Transfer[];
}

export function TransfersIndex() {
	const { transfers } = usePageData<TransfersIndexData>();
	const routes = useRoutes();

	const editUrl = (id: number) => buildUrl(routes.transfers.editTemplate, { id });
	const deleteUrl = (id: number) => buildUrl(routes.transfers.deleteTemplate, { id });

	return (
		<>
			<div className="admin-header">
				<h1>Трансферы</h1>
				<Button variant="primary" asChild>
					<a href={routes.transfers.create}>+ Добавить трансфер</a>
				</Button>
			</div>

			<Table>
				<Table.Header>
					<Table.Row>
						<Table.Head>ID</Table.Head>
						<Table.Head>Название</Table.Head>
						<Table.Head>Slug</Table.Head>
						<Table.Head>Домен</Table.Head>
						<Table.Head>Действия</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{transfers.map((t) => (
						<Table.Row key={t.id}>
							<Table.Cell>{t.id}</Table.Cell>
							<Table.Cell>{t.name}</Table.Cell>
							<Table.Cell>{t.slug}</Table.Cell>
							<Table.Cell>{t.domain}</Table.Cell>
							<Table.Cell className="actions">
								<Button variant="secondary" size="sm" asChild>
									<a href={editUrl(t.id)}>Изменить</a>
								</Button>
								<Button variant="danger" size="sm" asChild>
									<a href={deleteUrl(t.id)}>Удалить</a>
								</Button>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</>
	);
}
