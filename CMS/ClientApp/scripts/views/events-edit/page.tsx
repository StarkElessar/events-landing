import { createRoot } from 'react-dom/client';
import { EventForm } from '../events-create/event-form';
import { usePageData } from '../../shared/hooks/use-page-data';

interface EventsEditData {
	event: Parameters<typeof EventForm>[0]['event'];
	transfers: Parameters<typeof EventForm>[0]['transfers'];
	antiForgeryToken: string;
	siteBaseUrl?: string | null;
	hiddenFields: Record<string, string>;
}

function EventsEditPage() {
	const data = usePageData<EventsEditData>();
	return (
		<EventForm
			{...data}
			pageTitle={`Редактировать: ${data.event.titlePage}`}
			submitLabel="Сохранить"
		/>
	);
}

createRoot(document.getElementById('app')!).render(<EventsEditPage />);
