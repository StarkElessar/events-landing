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

interface TransferDeleteData {
	transfer: Transfer;
	antiForgeryToken: string;
}

export function TransfersDelete() {
	const data = usePageData<TransferDeleteData>();
	const { transfer, antiForgeryToken } = data;
	const routes = useRoutes();
	const deleteUrl = buildUrl(routes.transfers.deleteConfirmedTemplate, { id: transfer.id });
	const cancelUrl = routes.transfers.index;

	return (
		<>
			<div className="admin-header">
				<h1>Удалить трансфер</h1>
			</div>

			<div className="card">
				<p style={{ marginBottom: "1rem" }}>
					Вы уверены, что хотите удалить трансфер <strong>{transfer.name}</strong>?
				</p>
				<p style={{ color: "#c0392b", marginBottom: "1.5rem" }}>Внимание: все события этого трансфера также будут удалены.</p>

				<Table style={{ marginBottom: "1.5rem" }}>
					<Table.Body>
						<Table.Row>
							<Table.Head>Название</Table.Head>
							<Table.Cell>{transfer.name}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Head>Slug</Table.Head>
							<Table.Cell>{transfer.slug}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Head>Домен</Table.Head>
							<Table.Cell>{transfer.domain}</Table.Cell>
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
