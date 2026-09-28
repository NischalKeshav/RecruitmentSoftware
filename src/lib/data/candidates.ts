export type Status = 'ok' | 'warn' | 'bad' | 'na';

export const STATUS: Record<Status, { cls: string; label: string }> = {
	ok: { cls: 's-ok', label: 'Verified' },
	warn: { cls: 's-warn', label: 'Partial' },
	bad: { cls: 's-bad', label: 'Discrepancy' },
	na: { cls: 's-na', label: 'Not found' }
};

export interface Claim {
	q: string;
	src: string;
	s: Status;
	c: string;
	/** May contain inline <b> markup. */
	ev: string;
	context?: string;
	ask?: string;
}

export interface Repo {
	n: string;
	d: string;
	stars: number;
	langs: [name: string, pct: number, color: string][];
	sig: string[];
}

export interface Candidate {
	initials: string;
	name: string;
	role: string;
	loc: string;
	applied: string;
	req: string;
	consent: string;
	score: number;
	ids: string;
	match: string;
	claims: Claim[];
	code: { total: string; seed: number; repos: Repo[] } | null;
	hidden: { k: string; e: string }[];
	timeline: [year: string, event: string][];
	bg: [check: string, status: Status, result: string][];
	fit: string;
}

export type LogLine = [text: string, cls: '' | 'okc' | 'wc' | 'bc'];

export const CANDIDATES: Record<string, Candidate> = {
	maya: {
		initials: 'MR',
		name: 'Maya Reyes',
		role: 'Software Engineer II',
		loc: 'Lowell, AR · Engineering & Technology',
		applied: 'Sep 22, 2026',
		req: 'REQ-24871',
		consent: 'Signed Sep 22, 2026',
		score: 78,
		ids: 'GitHub @mreyes-dev · Credly · Devpost · LinkedIn',
		match: '96%',
		claims: [
			{
				q: 'AWS Certified Solutions Architect – Associate',
				src: 'credly.com · AWS badge registry',
				s: 'ok',
				c: '99%',
				ev: 'Badge issued to M. Reyes, Mar 2025. Expires Mar 2028. Credential ID matches the resume.'
			},
			{
				q: '1st place, Arkansas State Science & Engineering Fair 2019',
				src: 'state fair results archive · 2019 Senior Division',
				s: 'bad',
				c: '91%',
				ev: 'Results page lists "Maya Reyes, Computer Science category: <b>2nd place</b>". No 1st-place entry under her name.',
				context:
					'Statewide pre-college science fair. Affiliated fairs send their top winners to Regeneron ISEF. A category placement is still a strong result; the question is the rank.',
				ask: 'Your resume lists 1st place at the 2019 state fair. Can you walk us through the project and the result?'
			},
			{
				q: 'Led a team of 4 at NWA Freight Hackathon 2023',
				src: 'devpost.com · project "LoadLens"',
				s: 'warn',
				c: '84%',
				ev: 'Project page confirms 4 team members, including Reyes, and a "Best Use of Data" prize. Nothing on the page says who led.',
				ask: 'What part of LoadLens did you own, and how did you split the work?'
			},
			{
				q: '5 years of Python',
				src: 'github.com/mreyes-dev · commit history',
				s: 'ok',
				c: '93%',
				ev: 'Python commits from Jan 2020 through Sep 2026 across 14 repositories. Steady activity, not a single burst.'
			},
			{
				q: 'CompTIA Security+',
				src: 'CompTIA certification verification',
				s: 'na',
				c: 'n/a',
				ev: 'No record returned for this name and email. The candidate may need to share the verification code.'
			}
		],
		code: {
			total: '1,284 contributions in the last year',
			seed: 7,
			repos: [
				{
					n: 'route-solver',
					d: 'Vehicle routing with time windows (OR-Tools)',
					stars: 140,
					langs: [
						['Python', 78, 'var(--blue-400)'],
						['C++', 22, 'var(--purple-400)']
					],
					sig: ['Tests', 'CI', 'Docs']
				},
				{
					n: 'loadlens',
					d: 'Hackathon project: predicts dwell time at docks',
					stars: 32,
					langs: [
						['TypeScript', 61, 'var(--teal-400)'],
						['Python', 39, 'var(--blue-400)']
					],
					sig: ['Tests', 'Demo video']
				},
				{
					n: 'geo-h3-index',
					d: 'Fast geospatial lookup service in Rust',
					stars: 57,
					langs: [['Rust', 100, 'var(--amber-400)']],
					sig: ['Benchmarks', 'CI']
				}
			]
		},
		hidden: [
			{ k: 'Rust', e: 'geo-h3-index repo and 9 merged PRs to an open-source mapping crate' },
			{
				k: 'Operations research',
				e: 'OR-Tools solver with 140 stars; routing is core to 360° and Dedicated'
			},
			{ k: 'Terraform', e: 'Infra folders in 3 repos, AWS modules' },
			{ k: 'Public speaking', e: 'Talk at a regional Python meetup, 2025 (recording online)' }
		],
		timeline: [
			['2019', 'State science fair, CS category placement (2nd)'],
			['2021', 'First Python package published to PyPI'],
			['2023', 'Hackathon prize for LoadLens, freight data project'],
			['2025', 'AWS Solutions Architect – Associate; meetup talk on routing'],
			['2026', 'route-solver reaches 140 stars; contributor to Rust mapping crate']
		],
		bg: [
			['Identity match (name, email, location history)', 'ok', 'Matched'],
			['Degree: B.S. Computer Science, Univ. of Arkansas', 'ok', 'Confirmed (sample)'],
			['Public sanctions and exclusion lists', 'ok', 'No records'],
			['Criminal history', 'na', 'Sent to Checkr (FCRA)']
		],
		fit: 'Strong match for 360° platform and routing teams. The routing and geospatial work is directly relevant. Use the interview to clear up the science fair rank and the hackathon lead role.'
	},
	derek: {
		initials: 'DT',
		name: 'Derek Thompson',
		role: 'CDL-A Driver, Intermodal',
		loc: 'Kansas City, MO · Drivers',
		applied: 'Sep 25, 2026',
		req: 'DRV-09312',
		consent: 'Signed Sep 25, 2026',
		score: 88,
		ids: 'CDLIS · FMCSA PSP · Clearinghouse · DD-214 upload',
		match: '99%',
		claims: [
			{
				q: 'Class A CDL with Hazmat (H) endorsement',
				src: 'CDLIS state record lookup',
				s: 'ok',
				c: '99%',
				ev: 'Class A, valid until 2029. Endorsements: H, N, T. Medical certificate current.'
			},
			{
				q: '4 years Army truck driving, 88M Motor Transport Operator',
				src: 'DD-214 upload · MOS lookup',
				s: 'ok',
				c: '98%',
				ev: '88M confirmed, 2018–2022, honorable discharge.',
				context:
					"88M operators drive heavy tactical trucks. Their driving time can count toward J.B. Hunt's Driver Apprenticeship requirements, so he is eligible for apprenticeship credit."
			},
			{
				q: 'Zero accidents in 3 years of civilian driving',
				src: 'FMCSA Pre-Employment Screening Program (PSP)',
				s: 'warn',
				c: '97%',
				ev: '1 crash on record, Feb 2024, <b>not preventable</b> (struck while parked). No inspection violations for the driver.',
				ask: 'Tell us about the February 2024 incident. The record shows you were parked.'
			},
			{
				q: 'Drug and alcohol clean record',
				src: 'FMCSA Drug & Alcohol Clearinghouse',
				s: 'ok',
				c: '100%',
				ev: 'Full query returned no violations.'
			},
			{
				q: 'TSA Hazmat threat assessment',
				src: 'TSA HME status',
				s: 'ok',
				c: '99%',
				ev: 'Threat assessment current through 2028.'
			}
		],
		code: null,
		hidden: [
			{ k: 'Forklift certification', e: 'Record from a SkillBridge warehouse placement, 2022' },
			{
				k: 'Trainer experience',
				e: 'Army record shows he served as a vehicle training NCO for 14 months'
			},
			{
				k: 'Community service',
				e: 'Volunteer driver for a Wreaths Across America convoy, 2024 and 2025'
			}
		],
		timeline: [
			['2018', 'Enlists; 88M Motor Transport Operator training'],
			['2020', 'Vehicle training NCO, 14 months'],
			['2022', 'SkillBridge warehouse placement; forklift cert; honorable discharge'],
			['2023', 'Civilian CDL-A with Hazmat; regional carrier'],
			['2024', 'Wreaths Across America volunteer convoy driver']
		],
		bg: [
			['Identity match (CDL, DD-214, application)', 'ok', 'Matched'],
			['Motor vehicle record (MVR)', 'ok', 'Clean (sample)'],
			['DOT employment history, prior 3 years', 'warn', '1 of 2 employers responded'],
			['Criminal history', 'na', 'Sent to Sterling (FCRA)']
		],
		fit: 'Good fit for Intermodal or Dedicated Hazmat lanes. Flag for the apprenticeship credit and for a future driver-trainer track, based on his Army training role.'
	}
};

export const LOGS: Record<string, LogLine[]> = {
	maya: [
		['Parsed resume: 5 claims, 11 skills, 3 links', ''],
		['Consent on file. FCRA items sent to Checkr', ''],
		['credly.com → AWS SA-Associate badge found', 'okc'],
		['Searching 2019 state science fair results…', ''],
		['Results archive → CS category: 2nd place (claim says 1st)', 'bc'],
		['devpost.com → LoadLens, 4 members, lead not stated', 'wc'],
		['github.com/mreyes-dev → 23 repos, 6.7 years of history', 'okc'],
		['CompTIA lookup → no record', 'wc'],
		["Found 4 skills that aren't on the resume", 'okc'],
		['Redacted 2 items (age, family status)', ''],
		['Report ready for recruiter review', 'okc']
	],
	derek: [
		['Parsed application: 5 claims, DD-214 attached', ''],
		['Consent on file. Criminal check sent to Sterling', ''],
		['CDLIS → Class A, H/N/T endorsements', 'okc'],
		['DD-214 → MOS 88M, 2018–2022', 'okc'],
		['FMCSA PSP → 1 non-preventable crash (2024)', 'wc'],
		['Clearinghouse full query → no violations', 'okc'],
		['TSA HME → current', 'okc'],
		["Found 3 skills that aren't on the resume", 'okc'],
		['Report ready for recruiter review', 'okc']
	]
};
