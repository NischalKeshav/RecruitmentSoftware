<script lang="ts">
	import Orb from '$lib/components/Orb.svelte';
	import { reveal } from '$lib/actions/reveal';

	const facts = [
		[
			'Hiring streams',
			'9 career areas',
			'Corporate Services, Customer Experience, Equipment Maintenance, Engineering & Technology, Operations, Sales, Entry-Level, Internships, Drivers (separate portal)'
		],
		[
			'Applicant system',
			'Workday',
			'Applications and accounts run through Workday, plus a Talent Community for people not ready to apply'
		],
		[
			'Tech hiring',
			'Lowell, AR campus',
			'Software, product, logistics engineering, BA, UX, infrastructure and security. Company-paid certifications, hackathons, "13th Week" learning time'
		],
		[
			'Military',
			'Top-10 military-friendly',
			'Veteran founder, DoD SkillBridge partner, Driver Apprenticeship that credits military driving time toward Class A'
		],
		[
			'Early career',
			'Manager Trainee, 3–6 months',
			'Plus dispatcher, logistics rep, warehouse, billing and claims roles. No supply-chain background required'
		],
		[
			'Not published',
			'No hiring targets',
			"The site lists no opening counts, salary ranges or hiring goals, so this plan doesn't invent any"
		]
	];

	const tools = [
		[
			'Workday Recruiting',
			'Native to Workday HCM, payroll and approvals',
			"Already in place. Build on it; don't replace it"
		],
		[
			'Greenhouse',
			'Structured scorecards, explainable AI, configurable stages',
			'Model for consistent, defensible interview scoring'
		],
		[
			'Lever',
			'ATS + CRM nurture, 300+ integrations (Checkr, Sterling, HackerRank, Codility); claims 40% faster time-to-hire',
			'Shows the integration pattern for background checks and assessments'
		],
		[
			'Jobvite',
			'High-volume, regulated-industry automation',
			'Closest match for driver hiring volume and DOT compliance'
		],
		[
			'SmartRecruiters',
			'AI matching, chatbot screening',
			'Useful for 24/7 driver applicant intake'
		],
		[
			'iCIMS · SAP SF · Workable · Ashby · Pinpoint',
			'Custom workflows, global compliance, fast setup, analytics',
			"Ashby-style dashboards fill Workday's reporting gap"
		]
	];

	const steps = [
		['Input', 'Resume + consent', 'From Workday application'],
		['Parse', 'Claim extraction', 'Certs, awards, projects, years of skill'],
		['Crawl', 'Evidence search', 'GitHub, Credly, contest results, DOT records'],
		['Filter', 'Compliance', 'Identity match, redaction, FCRA routing'],
		['Review', 'Recruiter', 'Report written back to Workday']
	];

	const phases = [
		[
			'Keep Workday, add structure',
			'Stay on Workday as the system of record. Add Greenhouse-style structured scorecards per role family so interview scores are consistent and defensible.'
		],
		[
			'Launch Candidate Manifest for tech roles',
			'Start with Engineering & Technology, where public evidence is richest: code history, certification registries, hackathon and competition results. Measure how often claims verify and how often reports change interview focus.'
		],
		[
			'Extend to drivers and veterans',
			'Add CDLIS, PSP and Clearinghouse lookups through a licensed agency. Add MOS-to-role translation and automatic apprenticeship-credit checks for veterans and SkillBridge participants.'
		],
		[
			'Close the loop with outcomes',
			"Tie report signals to 90-day retention and performance. Drop signals that don't predict success, and report source quality to recruiters in an Ashby-style dashboard."
		]
	];

	const kpis = [
		['Time to hire', 'By role family, before and after', 'var(--blue-400)'],
		['Verified-claim rate', 'Share of resume claims confirmed', 'var(--purple-400)'],
		['Driver seat-fill time', 'Days from application to first load', 'var(--green-400)'],
		['90-day retention', 'By source and by report signal', 'var(--amber-400)'],
		['Recruiter hours saved', 'Manual verification time removed', 'var(--teal-400)']
	];
</script>

<svelte:head>
	<title>Candidate Manifest</title>
	<meta
		name="description"
		content="A Workday add-on concept for J.B. Hunt that verifies resume claims and finds skills a resume leaves out."
	/>
</svelte:head>

<section
	class="flex min-h-svh flex-col items-center justify-center gap-2 px-6 pt-40 pb-20 text-center"
>
	<p class="hero-title">Candidate Manifest</p>
	<Orb />
	<h1 class="grad mb-3 max-w-[18ch] text-[clamp(34px,5.4vw,60px)] font-bold">
		Verify what a resume claims, and find what it leaves out
	</h1>
	<p class="max-w-[62ch] text-lg text-[var(--ink-3)]">
		Every major applicant tracking system manages the pipeline well. None of them independently
		checks whether a candidate's claims are true, or looks for skills the candidate never listed.
		Candidate Manifest does that as a Workday add-on. It reads the resume, lists each claim, crawls
		public sources for evidence, and hands a recruiter a short, sourced report to review.
	</p>
	<div class="mt-7 flex flex-wrap justify-center gap-3">
		<a class="btn" href="/demo">See a demo report</a>
		<a class="btn ghost" href="#picture">Read the strategy ›</a>
	</div>
</section>

<section class="sec wrap" id="picture">
	<div class="sec-head" use:reveal>
		<span class="eyebrow">What careers.jbhunt.com tells us</span>
		<h2 class="grad">J.B. Hunt's Hiring Picture</h2>
	</div>
	<div class="glass lg" use:reveal>
		<div class="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-5">
			{#each facts as [label, value, note] (label)}
				<div class="flex flex-col gap-2">
					<span class="eyebrow">{label}</span>
					<b class="text-[22px] font-bold">{value}</b>
					<span class="muted text-[15px]">{note}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="sec wrap">
	<div class="sec-head" use:reveal>
		<span class="eyebrow">Market scan · Greenhouse top-10 list and Lever</span>
		<h2 class="grad grad-pink">The Market</h2>
		<p>What the leading tools do, and what they skip.</p>
	</div>
	<div class="glass overflow-x-auto !p-2" use:reveal>
		<table class="w-full border-collapse text-[15px]">
			<thead>
				<tr><th>Tool</th><th>Strength</th><th>Relevance to J.B. Hunt</th></tr>
			</thead>
			<tbody>
				{#each tools as [tool, strength, relevance] (tool)}
					<tr><td><b class="text-white">{tool}</b></td><td>{strength}</td><td>{relevance}</td></tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="glass gap mt-5" use:reveal>
		<span class="eyebrow" style="color:var(--purple-400)">The gap</span>
		<p class="mt-2.5 text-lg text-[var(--ink-2)]">
			<b class="text-white"
				>No tool on either list verifies claims or finds skills a resume leaves out.</b
			>
			They manage candidates and hand off to outside vendors for tests and background checks. A claim
			like "won the state science fair" or "5 years of Python" goes unchecked until the interview, if
			it gets checked at all.
		</p>
	</div>
</section>

<section class="sec wrap">
	<div class="sec-head" use:reveal>
		<span class="eyebrow">Fit assessment</span>
		<h2 class="grad grad-green">Built for J.B. Hunt</h2>
		<p>Advantages, risks, and how the design handles each risk.</p>
	</div>
	<div class="grid gap-5 lg:grid-cols-2">
		<div class="glass lg" use:reveal>
			<h3>
				<span class="ico">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="var(--green-400)"
						stroke-width="2.4"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg
					>
				</span>
				Advantages
			</h3>
			<ul class="dots">
				<li>
					<span
						><b>Workday is already the system of record</b>, so this can ship as an add-on with no
						migration.</span
					>
				</li>
				<li>
					<span
						><b>High driver hiring volume</b>. Automated license, endorsement and safety-record
						checks save recruiter hours on every file.</span
					>
				</li>
				<li>
					<span
						><b>Strong veteran pipeline</b>. Translating military job codes (MOS) to civilian roles
						and apprenticeship credit is repeatable work that suits automation.</span
					>
				</li>
				<li>
					<span
						><b>The tech org values certifications and hackathons</b>, and both leave public records
						that can be checked.</span
					>
				</li>
				<li>
					<span
						><b>Logistics-relevant side projects</b> (routing, freight matching) are easy to spot in code
						history and connect directly to J.B. Hunt 360° work.</span
					>
				</li>
			</ul>
		</div>
		<div class="glass lg" use:reveal>
			<h3>
				<span class="ico">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="var(--red-400)"
						stroke-width="2.4"
						stroke-linecap="round"
						aria-hidden="true"><path d="M12 7v6M12 17h.01" /></svg
					>
				</span>
				Risks and safeguards
			</h3>
			<ul class="dots red">
				<li>
					<span
						><b>FCRA.</b> Web-sourced background data used for hiring is a consumer report.
						<span class="muted"
							>Handled by a written-consent gate, criminal and motor-vehicle checks run through a
							licensed agency (Checkr/Sterling), and pre-adverse-action notices.</span
						></span
					>
				</li>
				<li>
					<span
						><b>EEOC.</b> Crawling can surface age, religion, health or family status.
						<span class="muted"
							>These categories are redacted before a recruiter sees anything.</span
						></span
					>
				</li>
				<li>
					<span
						><b>Wrong-person matches</b> on common names.
						<span class="muted"
							>Every source shows an identity-match confidence score, and low matches are hidden.</span
						></span
					>
				</li>
				<li>
					<span
						><b>Drivers have a thin online footprint.</b>
						<span class="muted"
							>The driver track leans on CDLIS, PSP and the FMCSA Clearinghouse, not social media.</span
						></span
					>
				</li>
				<li>
					<span
						><b>No automatic rejections.</b>
						<span class="muted"
							>A recruiter reviews every discrepancy and can ask the candidate about it.</span
						></span
					>
				</li>
			</ul>
		</div>
	</div>
</section>

<section class="sec wrap">
	<div class="sec-head" use:reveal>
		<span class="eyebrow">How a report is built</span>
		<h2 class="grad">The Pipeline</h2>
	</div>
	<div
		class="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-4"
		role="list"
		use:reveal
	>
		{#each steps as [label, title, note], i (label)}
			<div class="glass step flex flex-col gap-1.5 !p-6" class:hl={i === 2} role="listitem">
				<span class="mono text-[13px] text-[var(--ink-3)]">0{i + 1}</span>
				<span class="eyebrow" style={i === 2 ? 'color:var(--blue-400)' : ''}>{label}</span>
				<b class="text-[19px]">{title}</b>
				<span class="muted text-sm">{note}</span>
			</div>
		{/each}
	</div>
</section>

<section class="sec wrap">
	<div class="sec-head" use:reveal>
		<span class="eyebrow">Roadmap</span>
		<h2 class="grad grad-amber">The Plan</h2>
		<p>How to get the most out of recruiting.</p>
	</div>
	<div class="flex flex-col gap-3.5">
		{#each phases as [title, body], i (title)}
			<div class="glass grid grid-cols-[auto_1fr] items-start gap-6" use:reveal>
				<span class="grad text-[40px] leading-none font-bold tracking-tighter">0{i + 1}</span>
				<div>
					<h3 class="!mb-2 !text-[22px]">{title}</h3>
					<p class="text-[var(--ink-3)]">{body}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<section class="sec wrap">
	<div class="sec-head" use:reveal>
		<span class="eyebrow">Measure</span>
		<h2 class="grad grad-pink">Metrics to Track</h2>
	</div>
	<div
		class="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-4"
		use:reveal
	>
		{#each kpis as [title, note, color] (title)}
			<div class="glass flex flex-col gap-1.5 !p-6">
				<span class="mb-2 h-[3px] w-7 rounded-sm" style="background:{color}"></span>
				<b class="text-lg">{title}</b>
				<span class="muted text-sm">{note}</span>
			</div>
		{/each}
	</div>
</section>

<style>
	th,
	td {
		text-align: left;
		padding: 16px 20px;
		border-bottom: 1px solid var(--line);
		vertical-align: top;
	}
	th {
		font: 600 12px var(--sans);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--ink-3);
	}
	td {
		color: var(--ink-2);
	}
	tr:last-child td {
		border-bottom: 0;
	}
	.gap {
		border: 1px solid rgba(192, 132, 252, 0.35);
		background: linear-gradient(to right, rgba(96, 165, 250, 0.08), rgba(192, 132, 252, 0.12));
	}
	.step.hl {
		box-shadow:
			inset 0 0 0 1px rgba(96, 165, 250, 0.5),
			0 0 60px -20px rgba(96, 165, 250, 0.6);
	}
</style>
