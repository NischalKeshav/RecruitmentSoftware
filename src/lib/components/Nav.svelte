<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Strategy' },
		{ href: '/demo', label: 'Demo report' }
	];
</script>

<header
	class="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur-md"
>
	<nav class="wrap flex items-center justify-between gap-4 py-[18px]" aria-label="Main">
		<a
			href="/"
			class="flex flex-1 items-center gap-2.5 text-sm font-semibold text-[var(--ink)] no-underline"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				aria-hidden="true"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			>
				<circle cx="12" cy="12" r="4" />
				<path
					d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"
				/>
			</svg>
			<span class="hidden sm:inline">Candidate Manifest</span>
		</a>
		<div class="flex gap-1">
			{#each links as { href, label } (href)}
				<a
					{href}
					class="rounded-full px-3.5 py-1.5 text-sm text-[var(--ink-3)] no-underline transition-colors hover:text-[var(--ink)] aria-[current=page]:text-[var(--ink)]"
					aria-current={page.url.pathname === href ? 'page' : undefined}
				>
					{label}
				</a>
			{/each}
		</div>
		<div class="flex-1" aria-hidden="true"></div>
	</nav>
</header>
