import { createRoot } from 'react-dom/client';
import { EventForm } from './event-form';
import { usePageData } from '../../shared/hooks/use-page-data';

interface EventsCreateData {
	event: Parameters<typeof EventForm>[0]['event'];
	transfers: Parameters<typeof EventForm>[0]['transfers'];
	antiForgeryToken: string;
	siteBaseUrl?: string | null;
}

function EventsCreatePage() {
	const data = usePageData<EventsCreateData>();
	return <EventForm {...data} pageTitle="Создать событие" submitLabel="Создать" />;
}

createRoot(document.getElementById('app')!).render(<EventsCreatePage />);
