<script lang="ts">
	import { STATUS, type Candidate, type Status } from '$lib/data/candidates';
	import ScoreRing from './ScoreRing.svelte';
	import Heatmap from './Heatmap.svelte';

	let { candidate: d }: { candidate: Candidate } = $props();

	let tally = $derived.by(() => {
		const n: Record<Status, number> = { ok: 0, warn: 0, bad: 0, na: 0 };
		for (const c of d.claims) n[c.s]++;
		return n;
	});
</script>

<div class="report grid items-start gap-5">
	<aside class="flex min-w-0 flex-col gap-5">
		<div class="glass">
			<div class="mb-[18px] flex items-center gap-3.5">
				<div class="avatar">{d.initials}</div>
				<div>
					<h2>{d.name}</h2>
					<span class="muted text-sm">{d.role}</span>
				</div>
			</div>
			<dl class="kv">
				<dt>Req</dt>
				<dd class="mono">{d.req}</dd>
				<dt>Team</dt>
				<dd>{d.loc}</dd>
				<dt>Applied</dt>
				<dd>{d.applied}</dd>
				<dt>Consent</dt>
				<dd><span class="chip s-ok">{d.consent}</span></dd>
				<dt>Status</dt>
				<dd><span class="chip s-warn">Waiting for review</span></dd>
			</dl>
		</div>

		<div class="glass flex flex-col gap-3.5">
			<span class="eyebrow">Verification score</span>
			<div class="flex items-center gap-4">
				<ScoreRing score={d.score} />
				<span class="muted text-sm">
					Weighted by claim importance and match confidence. Informs the review; never an automatic
					decision.
				</span>
			</div>
			<div class="tally">
				<div>
					<span class="muted text-sm">Verified</span><b style="color:var(--ok)">{tally.ok}</b>
				</div>
				<div>
					<span class="muted text-sm">Partial</span><b style="color:var(--warn)">{tally.warn}</b>
				</div>
				<div>
					<span class="muted text-sm">Discrepancy</span><b style="color:var(--bad)">{tally.bad}</b>
				</div>
				<div>
					<span class="muted text-sm">Not found</span><b style="color:var(--na)">{tally.na}</b>
				</div>
			</div>
		</div>

		<div class="glass flex flex-col gap-3.5">
			<span class="eyebrow">Sources linked</span>
			<span class="text-sm">{d.ids}</span>
			<span class="muted text-sm"
				>Identity match across sources: <b class="text-[var(--ink)] tabular-nums">{d.match}</b
				></span
			>
		</div>

		<div class="glass flex flex-col gap-3.5">
			<span class="eyebrow">Fit for J.B. Hunt</span>
			<p class="text-sm text-[var(--ink-2)]">{d.fit}</p>
		</div>
	</aside>

	<div class="flex min-w-0 flex-col gap-5">
		<div class="glass">
			<div class="panel-head">
				<h2>Resume claims</h2>
				<span class="muted text-sm">{d.claims.length} claims checked</span>
			</div>
			<div>
				{#each d.claims as c (c.q)}
					<div class="claim">
						<div class="flex flex-col gap-1">
							<span class="font-semibold">{c.q}</span>
							<span class="src">{c.src}</span>
						</div>
						<div class="flex flex-col items-end gap-1.5">
							<span class="chip {STATUS[c.s].cls}">{STATUS[c.s].label}</span>
							<span class="conf">match {c.c}</span>
						</div>
						<div class="ev">
							<!-- Evidence strings are our own sample data and may carry inline <b> emphasis. -->
							<q>{@html c.ev}</q>
							{#if c.context}
								<div class="context text-sm">
									<span class="eyebrow">About this</span><br />{c.context}
								</div>
							{/if}
							{#if c.ask}
								<div class="text-sm">
									<b class="text-[var(--blue-400)]">Suggested interview question:</b>
									{c.ask}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		{#if d.code}
			<div class="glass">
				<div class="panel-head">
					<h2>Code history</h2>
					<span class="muted text-sm tabular-nums">{d.code.total}</span>
				</div>
				<Heatmap seed={d.code.seed} />
				<div class="repos mt-[18px] grid gap-3">
					{#each d.code.repos as r (r.n)}
						<div class="repo">
							<div class="flex justify-between gap-2">
								<span class="mono text-sm font-semibold break-all">{r.n}</span>
								<span class="muted text-sm tabular-nums">★ {r.stars}</span>
							</div>
							<span class="muted text-sm">{r.d}</span>
							<div
								class="langbar"
								role="img"
								aria-label={r.langs.map((l) => `${l[0]} ${l[1]}%`).join(', ')}
							>
								{#each r.langs as [name, pct, color] (name)}
									<span style="width:{pct}%;background:{color}"></span>
								{/each}
							</div>
							<span class="muted text-sm">{r.langs.map((l) => `${l[0]} ${l[1]}%`).join(' · ')}</span
							>
							<div class="flex flex-wrap gap-1.5">
								{#each r.sig as s (s)}<span class="badge">{s}</span>{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="glass">
				<div class="panel-head">
					<h2>Driving and safety record</h2>
					<span class="muted text-sm">From DOT and FMCSA sources</span>
				</div>
				<div class="tally" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr))">
					<div>
						<span class="eyebrow">Years driving</span><b>7</b><span class="muted text-sm"
							>4 military, 3 civilian</span
						>
					</div>
					<div>
						<span class="eyebrow">Preventable crashes</span><b>0</b><span class="muted text-sm"
							>PSP, 5-year window</span
						>
					</div>
					<div>
						<span class="eyebrow">Inspection violations</span><b>0</b><span class="muted text-sm"
							>PSP, 3-year window</span
						>
					</div>
					<div>
						<span class="eyebrow">Apprenticeship credit</span><b>Yes</b><span class="muted text-sm"
							>MOS 88M qualifies</span
						>
					</div>
				</div>
			</div>
		{/if}

		<div class="glass">
			<div class="panel-head">
				<h2>Skills not on the resume</h2>
				<span class="muted text-sm">Found in public evidence</span>
			</div>
			<div class="hidden-skills grid gap-3">
				{#each d.hidden as h (h.k)}
					<div class="hs">
						<b class="text-base">{h.k}</b>
						<span class="muted text-sm">{h.e}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="grid gap-5 md:grid-cols-2">
			<div class="glass">
				<div class="panel-head"><h2>Evidence over time</h2></div>
				<ol class="timeline">
					{#each d.timeline as [yr, ev] (yr)}
						<li><span class="yr">{yr}</span><span class="text-sm">{ev}</span></li>
					{/each}
				</ol>
			</div>
			<div class="glass">
				<div class="panel-head"><h2>Basic background check</h2></div>
				<div>
					{#each d.bg as [check, s, result] (check)}
						<div class="bg-row">
							<span class="text-sm">{check}</span>
							<span class="chip {STATUS[s].cls}">{result}</span>
						</div>
					{/each}
				</div>
				<p class="muted mt-3 text-sm">
					Criminal and driving records go through a licensed consumer reporting agency. If a result
					could lead to a rejection, the candidate gets a copy and a chance to respond first.
				</p>
			</div>
		</div>

		<div class="glass redact flex flex-wrap items-center gap-2 text-sm">
			<span class="eyebrow mr-1.5">Hidden from recruiters</span>
			<s>age</s><s>religion</s><s>politics</s><s>health</s><s>family status</s>
			<span class="muted">Protected details are removed before this report is shown.</span>
		</div>
	</div>
</div>

<style>
	.report {
		grid-template-columns: 320px 1fr;
	}
	@media (max-width: 960px) {
		.report {
			grid-template-columns: 1fr;
		}
	}
	.report :global(.glass) {
		padding: 24px;
	}
	h2 {
		font-size: 22px;
		font-weight: 700;
	}
	.avatar {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--blue-400), var(--purple-400));
		display: grid;
		place-items: center;
		font: 700 18px var(--sans);
		color: #fff;
		flex: none;
	}
	.kv {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 10px 14px;
		font-size: 14px;
	}
	.kv dt {
		color: var(--ink-3);
	}
	.kv dd {
		color: var(--ink-2);
	}
	.tally {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
	}
	.tally div {
		background: var(--sunk);
		border-radius: 12px;
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
	}
	.tally b {
		font-size: 24px;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}
	.badge {
		font: 500 11px var(--mono);
		padding: 4px 8px;
		border-radius: 6px;
		background: rgba(0, 0, 0, 0.06);
		color: var(--ink-2);
	}
	.panel-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 10px;
		flex-wrap: wrap;
		margin-bottom: 16px;
	}
	.claim {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 10px 16px;
		padding: 18px 0;
		border-top: 1px solid var(--line);
	}
	.claim:first-child {
		border-top: 0;
		padding-top: 4px;
	}
	.src {
		font: 12px var(--mono);
		color: var(--ink-3);
		word-break: break-word;
	}
	.conf {
		font: 12px var(--mono);
		color: var(--ink-3);
	}
	.ev {
		grid-column: 1 / -1;
		background: var(--sunk);
		border-radius: 12px;
		padding: 12px 14px;
		font-size: 14px;
		color: var(--ink-2);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.ev q {
		font-family: var(--mono);
		font-size: 12.5px;
		color: var(--ink);
		quotes: none;
	}
	.ev q :global(b) {
		color: var(--red-400);
	}
	.context {
		border-left: 2px solid var(--purple-400);
		padding-left: 12px;
		color: var(--ink-3);
	}
	.repos {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
	}
	.repo {
		background: var(--sunk);
		border-radius: 12px;
		padding: 14px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.langbar {
		display: flex;
		height: 6px;
		border-radius: 3px;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.08);
	}
	.hidden-skills {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
	}
	.hs {
		border: 1px dashed rgba(0, 0, 0, 0.2);
		border-radius: 12px;
		padding: 14px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.timeline li {
		display: grid;
		grid-template-columns: 64px 1fr;
		gap: 12px;
		padding: 10px 0;
		border-top: 1px solid var(--line);
	}
	.timeline li:first-child {
		border-top: 0;
	}
	.yr {
		font: 500 13px var(--mono);
		color: var(--purple-400);
	}
	.bg-row {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		align-items: center;
		padding: 10px 0;
		border-top: 1px solid var(--line);
		flex-wrap: wrap;
	}
	.bg-row:first-child {
		border-top: 0;
	}
	.redact s {
		font: 12px var(--mono);
		background: var(--ink);
		color: var(--ink);
		border-radius: 4px;
		padding: 2px 8px;
		text-decoration: none;
	}
</style>
