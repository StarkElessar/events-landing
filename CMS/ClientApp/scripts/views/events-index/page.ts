import Swal from 'sweetalert2';

declare global {
	interface Window {
		__DISPLACED_EVENT__?: string;
	}
}

if (window.__DISPLACED_EVENT__) {
	Swal.fire({
		icon: 'info',
		title: 'Дефолтное событие сброшено',
		html: `Событие <strong>${window.__DISPLACED_EVENT__}</strong> ранее было указано по умолчанию — теперь оно сброшено.`,
		confirmButtonText: 'Понятно',
	});
}
