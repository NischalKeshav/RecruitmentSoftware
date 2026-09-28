<script lang="ts">
	let { score }: { score: number } = $props();

	const r = 30;
	const C = 2 * Math.PI * r;
	let offset = $derived(C * (1 - score / 100));
</script>

<svg
	width="80"
	height="80"
	viewBox="0 0 76 76"
	role="img"
	aria-label="Verification score {score} of 100"
	class="flex-none"
>
	<defs>
		<linearGradient id="ring-grad" x1="0" x2="1">
			<stop offset="0" stop-color="#2563eb" />
			<stop offset="1" stop-color="#7c3aed" />
		</linearGradient>
	</defs>
	<circle cx="38" cy="38" {r} fill="none" stroke="rgba(0,0,0,.08)" stroke-width="7" />
	<circle
		cx="38"
		cy="38"
		{r}
		fill="none"
		stroke="url(#ring-grad)"
		stroke-width="7"
		stroke-linecap="round"
		stroke-dasharray={C.toFixed(1)}
		stroke-dashoffset={offset.toFixed(1)}
		transform="rotate(-90 38 38)"
	/>
	<text x="38" y="45" text-anchor="middle" fill="var(--ink)" style="font:700 20px var(--sans)"
		>{score}</text
	>
</svg>
