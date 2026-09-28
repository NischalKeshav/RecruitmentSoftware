<script lang="ts">
	import { CANDIDATES, LOGS } from '$lib/data/candidates';
	import CandidateReport from '$lib/components/CandidateReport.svelte';
	import ScanLog from '$lib/components/ScanLog.svelte';

	let current = $state('maya');
	let run = $state(0);
	let scanning = $state(true);

	let candidate = $derived(CANDIDATES[current]);

	function pick(key: string) {
		current = key;
		rescan();
	}
	function rescan() {
		scanning = true;
		run++;
	}
</script>

<svelte:head>
	<title>Demo report · Candidate Manifest</title>
</svelte:head>

<section class="wrap pt-[150px] pb-10">
	<div class="sec-head !mb-9">
		<p class="hero-title">Demo report</p>
		<h2 class="grad">See It Work</h2>
		<p>Pick a sample candidate. The scan replays, then the recruiter report appears below.</p>
	</div>

	<div class="mb-6 flex flex-wrap items-center justify-center gap-3">
		<div class="flex flex-wrap justify-center gap-2.5" aria-label="Choose candidate">
			{#each Object.entries(CANDIDATES) as [key, c] (key)}
				<button
					type="button"
					class="seg flex flex-col gap-0.5 rounded-[14px] px-[18px] py-3 text-left text-[15px] font-semibold text-white"
					aria-pressed={key === current}
					onclick={() => pick(key)}
				>
					{c.name}
					<small class="text-[13px] font-normal text-[var(--ink-3)]">{c.role}</small>
				</button>
			{/each}
		</div>
		<button class="btn" type="button" disabled={scanning} onclick={rescan}>Run scan again</button>
	</div>

	<ScanLog lines={LOGS[current]} {run} onfinish={() => (scanning = false)} />

	<CandidateReport {candidate} />
</section>

<style>
	.seg {
		background: linear-gradient(to right, var(--glass-a), var(--glass-b));
		transition: box-shadow 0.2s;
	}
	.seg[aria-pressed='true'] {
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
	}
</style>
