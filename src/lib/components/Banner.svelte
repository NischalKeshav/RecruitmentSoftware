<script lang="ts">
	import { onMount } from 'svelte';

	const KEY = 'cm-banner';
	let dismissed = $state(false);

	onMount(() => {
		try {
			dismissed = localStorage.getItem(KEY) === 'x';
		} catch {
			/* storage unavailable */
		}
	});

	function dismiss() {
		dismissed = true;
		try {
			localStorage.setItem(KEY, 'x');
		} catch {
			/* storage unavailable */
		}
	}
</script>

{#if !dismissed}
	<div
		class="fixed inset-x-0 top-[68px] z-40 bg-gradient-to-r from-[#e3bd45] via-[#e98d3a] to-[#ea7a3a] text-sm font-medium text-black"
		role="note"
	>
		<div class="wrap flex items-center justify-between gap-3 py-[13px]">
			<span>
				Concept demo. Not affiliated with or endorsed by J.B. Hunt Transport Services. All
				candidates and results are fictional sample data.
			</span>
			<button
				type="button"
				class="rounded p-1 leading-none text-black transition-colors hover:text-gray-800"
				aria-label="Dismiss notice"
				onclick={dismiss}
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.4"
					stroke-linecap="round"
					aria-hidden="true"
				>
					<path d="M6 6l12 12M18 6 6 18" />
				</svg>
			</button>
		</div>
	</div>
{/if}
