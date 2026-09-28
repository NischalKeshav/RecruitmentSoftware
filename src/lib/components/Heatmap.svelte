<script lang="ts">
	let { seed }: { seed: number } = $props();

	const cols = 52;
	const cell = 11;
	const gap = 3;
	const W = cols * (cell + gap) + 28;
	const H = 7 * (cell + gap) + 22;
	const months = [
		'Oct',
		'Nov',
		'Dec',
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep'
	];
	const days = ['Mon', 'Wed', 'Fri'];
	const heat = ['rgba(255,255,255,.06)', '#1f3355', '#2f5ea8', '#6d7ff0', '#c084fc'];

	// Deterministic sample activity so the same candidate always renders the same map.
	let cells = $derived.by(() => {
		let x = seed;
		const rnd = () => {
			x = (x * 9301 + 49297) % 233280;
			return x / 233280;
		};
		const out: { x: number; y: number; lvl: number }[] = [];
		for (let c = 0; c < cols; c++) {
			for (let r = 0; r < 7; r++) {
				const wk = r === 0 || r === 6 ? 0.45 : 1;
				const trend = 0.55 + (c / cols) * 0.6;
				const v = rnd() * wk * trend;
				const lvl = v < 0.18 ? 0 : v < 0.38 ? 1 : v < 0.58 ? 2 : v < 0.78 ? 3 : 4;
				out.push({ x: 28 + c * (cell + gap), y: 16 + r * (cell + gap), lvl });
			}
		}
		return out;
	});
</script>

<div class="overflow-x-auto">
	<svg
		width={W}
		height={H}
		viewBox="0 0 {W} {H}"
		role="img"
		aria-label="Contribution heatmap for the last 52 weeks"
	>
		{#each months as m, i (m)}
			<text
				x={28 + i * (cols / 12) * (cell + gap)}
				y="10"
				fill="#86868b"
				style="font:10px var(--mono)">{m}</text
			>
		{/each}
		{#each days as d, i (d)}
			<text
				x="0"
				y={22 + (1 + i * 2) * (cell + gap) + 9}
				fill="#86868b"
				style="font:10px var(--mono)">{d}</text
			>
		{/each}
		{#each cells as c, i (i)}
			<rect x={c.x} y={c.y} width={cell} height={cell} rx="3" fill={heat[c.lvl]} />
		{/each}
	</svg>
</div>
