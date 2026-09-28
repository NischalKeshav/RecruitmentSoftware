import type { Action } from 'svelte/action';

/** Adds `in` once the element scrolls into view, driving the `.reveal` fade-in. */
export const reveal: Action = (node) => {
	node.classList.add('reveal');
	if (!('IntersectionObserver' in window)) {
		node.classList.add('in');
		return;
	}
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('in');
					io.disconnect();
				}
			}
		},
		{ threshold: 0.12 }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};
