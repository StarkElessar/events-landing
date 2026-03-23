import { createRoot } from "react-dom/client";
import { TransferForm } from "../transfers-create/transfer-form";
import { usePageData } from "../../shared/hooks/use-page-data";

interface TransfersEditData {
	transfer: Parameters<typeof TransferForm>[0]["transfer"];
	antiForgeryToken: string;
	hiddenFields: Record<string, string>;
}

function TransfersEditPage() {
	const data = usePageData<TransfersEditData>();
	return <TransferForm {...data} pageTitle={`Редактировать: ${data.transfer.name}`} submitLabel="Сохранить" />;
}

createRoot(document.getElementById("app")!).render(<TransfersEditPage />);
