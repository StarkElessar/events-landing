import type { ReactNode, TdHTMLAttributes, ThHTMLAttributes, HTMLAttributes, TableHTMLAttributes } from "react";

// ── Compound Components ───────────────────────────────────────────────────────

function TableHeader({ children }: { children: ReactNode }) {
	return <thead className="table__header">{children}</thead>;
}

function TableBody({ children }: { children: ReactNode }) {
	return <tbody className="table__body">{children}</tbody>;
}

function TableRow({ children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
	return (
		<tr className="table__row" {...props}>
			{children}
		</tr>
	);
}

function TableHead({ children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
	return (
		<th className="table__head" {...props}>
			{children}
		</th>
	);
}

function TableCell({ children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
	return (
		<td className="table__cell" {...props}>
			{children}
		</td>
	);
}

// ── Render Props ──────────────────────────────────────────────────────────────

export interface TableColumn<T> {
	key: string;
	header: ReactNode;
	render?: (row: T) => ReactNode;
}

// ── Root ─────────────────────────────────────────────────────────────────────

type TableProps<T = never> =
	| ({
			data: T[];
			columns: TableColumn<T>[];
			children?: never;
	  } & TableHTMLAttributes<HTMLTableElement>)
	| ({
			data?: never;
			columns?: never;
			children: ReactNode;
	  } & TableHTMLAttributes<HTMLTableElement>);

export function Table<T extends object>({ data, columns, children, ...tableProps }: TableProps<T>) {
	if (data && columns) {
		return (
			<table className="table" {...tableProps}>
				<TableHeader>
					<TableRow>
						{columns.map((col) => (
							<TableHead key={col.key}>{col.header}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((row, i) => (
						<TableRow key={i}>
							{columns.map((col) => (
								<TableCell key={col.key}>
									{col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? "")}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</table>
		);
	}

	return (
		<table className="table" {...tableProps}>
			{children}
		</table>
	);
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
