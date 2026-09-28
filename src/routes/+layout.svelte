<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Banner from '$lib/components/Banner.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
	/>
</svelte:head>

<Nav />
<Banner />

<main>
	{@render children()}
</main>

<footer class="mt-10 border-t border-[var(--line)] pt-8 pb-12">
	<div class="wrap text-xs leading-relaxed font-semibold text-[var(--ink-3)]">
		<p>
			Sources:
			<a href="https://careers.jbhunt.com/" target="_blank" rel="noopener">careers.jbhunt.com</a>,
			<a href="https://careers.jbhunt.com/careers/technology" target="_blank" rel="noopener"
				>/careers/technology</a
			>,
			<a href="https://careers.jbhunt.com/careers/entry-level" target="_blank" rel="noopener"
				>/careers/entry-level</a
			>,
			<a
				href="https://careers.jbhunt.com/culture-and-programs/military"
				target="_blank"
				rel="noopener">/culture-and-programs/military</a
			>
			·
			<a href="https://www.greenhouse.com/blog/best-recruiting-tools" target="_blank" rel="noopener"
				>Greenhouse: Top 10 recruiting tools</a
			>
			·
			<a href="https://www.lever.co/applicant-tracking-system" target="_blank" rel="noopener"
				>Lever: Applicant tracking system</a
			>
		</p>
		<p class="mt-2.5">
			Candidate Manifest · Recruitment intelligence concept, prepared for J.B. Hunt
		</p>
	</div>
</footer>

<style>
	footer a {
		color: var(--blue);
	}
	footer a:hover {
		color: #2563eb;
	}
</style>
