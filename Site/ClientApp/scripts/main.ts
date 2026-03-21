// Smooth scroll for anchor links
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
	link.addEventListener('click', (e) => {
		const href = link.getAttribute('href');
		if (!href) return;
		const target = document.querySelector(href);
		if (target) {
			e.preventDefault();
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	});
});

// Header elevation on scroll
const header = document.querySelector<HTMLElement>('.header');
if (header) {
	window.addEventListener('scroll', () => header.classList.toggle('header_scrolled', window.scrollY > 0), { passive: true });
}
