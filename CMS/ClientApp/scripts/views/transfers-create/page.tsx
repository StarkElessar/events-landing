import { createRoot } from 'react-dom/client';
import { TransferForm } from './transfer-form';
import { usePageData } from '../../shared/hooks/use-page-data';

interface TransfersCreateData {
	transfer: Parameters<typeof TransferForm>[0]['transfer'];
	antiForgeryToken: string;
}

function TransfersCreatePage() {
	const data = usePageData<TransfersCreateData>();
	return (
		<TransferForm
			{...data}
			pageTitle="Новый трансфер"
			submitLabel="Создать"
		/>
	);
}

createRoot(document.getElementById('app')!).render(<TransfersCreatePage />);
