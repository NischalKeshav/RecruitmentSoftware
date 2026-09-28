<script lang="ts">
	import type { LogLine } from '$lib/data/candidates';

	let { lines, run, onfinish }: { lines: LogLine[]; run: number; onfinish?: () => void } = $props();

	let shown = $state<LogLine[]>([]);
	let box: HTMLDivElement | undefined = $state();

	// Replays the log whenever the candidate or the run counter changes.
	$effect(() => {
		void run;
		const all = lines;
		shown = [];
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			shown = all;
			onfinish?.();
			return;
		}
		let i = 0;
		const timer = setInterval(() => {
			shown = [...shown, all[i++]];
			if (box) box.scrollTop = box.scrollHeight;
			if (i >= all.length) {
				clearInterval(timer);
				onfinish?.();
			}
		}, 380);
		return () => clearInterval(timer);
	});

	const stamp = (i: number) =>
		`00:0${Math.floor(i * 0.7)}.${((i * 37) % 100).toString().padStart(2, '0')}`;
</script>

<div
	bind:this={box}
	class="log mb-5 max-h-[230px] overflow-auto rounded-2xl border border-[var(--line)] bg-white/[.04] px-[18px] py-3.5"
	aria-live="polite"
>
	{#each shown as [text, cls], i (i)}
		<div><span class="t">{stamp(i)}</span>&nbsp;&nbsp;<span class={cls}>{text}</span></div>
	{/each}
</div>

<style>
	.log {
		color: #cbd5e1;
		font: 12.5px/1.7 var(--mono);
	}
	.t {
		color: #64748b;
	}
	.okc {
		color: var(--green-400);
	}
	.wc {
		color: var(--amber-400);
	}
	.bc {
		color: var(--red-400);
	}
</style>
