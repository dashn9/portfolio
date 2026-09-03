<script lang="ts">
	import { onMount } from 'svelte';
	import NewsletterForm from '$lib/components/NewsletterForm.svelte';

	type Project = {
		code: string;
		year: string;
		thumb: string;
		thumbLabel: string;
		title: string;
		sub: string;
		url?: string;
	};

	type Commit = {
		repo: string;
		sha: string;
		message: string;
		date: string;
		url: string;
	};

	let commits = $state<Commit[]>([]);
	let commitsError = $state(false);
	let commitsLoading = $state(true);

	type GhPushEvent = {
		type: string;
		created_at: string;
		repo: { name: string };
		payload: { head?: string };
	};

	type GhCommit = { sha: string; commit: { message: string } };

	function formatDate(iso: string) {
		const d = new Date(iso);
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, '0');
		const day = String(d.getDate()).padStart(2, '0');
		return `${y}.${m}.${day}`;
	}

	const GH = 'https://api.github.com';
	const GH_HEADERS = { Accept: 'application/vnd.github+json' };

	onMount(async () => {
		try {
			const res = await fetch(`${GH}/users/dashn9/events/public?per_page=100`, {
				headers: GH_HEADERS
			});
			if (!res.ok) throw new Error(`events ${res.status}`);
			const events = (await res.json()) as GhPushEvent[];

			const targets: { repo: string; sha: string; date: string }[] = [];
			for (const e of events) {
				if (e.type !== 'PushEvent') continue;
				const repoFull = e.repo?.name;
				const head = e.payload?.head;
				if (!repoFull || !head) continue;
				targets.push({ repo: repoFull, sha: head, date: e.created_at });
				if (targets.length >= 8) break;
			}

			const details = await Promise.all(
				targets.map((t) =>
					fetch(`${GH}/repos/${t.repo}/commits/${t.sha}`, { headers: GH_HEADERS })
						.then((r) => (r.ok ? (r.json() as Promise<GhCommit>) : null))
						.catch(() => null)
				)
			);

			commits = targets.map((t, i) => {
				const detail = details[i];
				const message = (detail?.commit.message ?? '').split('\n')[0].slice(0, 80);
				const shortName = t.repo.split('/').pop() ?? t.repo;
				return {
					repo: shortName,
					sha: t.sha.slice(0, 7),
					message,
					date: formatDate(t.date),
					url: `https://github.com/${t.repo}/commit/${t.sha}`
				};
			});
		} catch {
			commitsError = true;
		} finally {
			commitsLoading = false;
		}
	});

	const projects: Project[] = [
		{
			code: '// WORK/001',
			year: '2026',
			thumb: 'thumb-a',
			thumbLabel: 'rusty-browser',
			title: 'RUSTY BROWSER',
			sub: 'Rust · distributed · stealth cluster',
			url: 'https://rustybrowser.com'
		},
		{
			code: '// WORK/002',
			year: '2026',
			thumb: 'thumb-f',
			thumbLabel: 'path-findeR',
			title: 'PATH FINDER',
			sub: 'Rust · Go · TS · extraction'
		},
		{
			code: '// WORK/003',
			year: '2025',
			thumb: 'thumb-b',
			thumbLabel: 'rustenium',
			title: 'RUSTENIUM',
			sub: 'Rust · WebDriver BiDi · CDP'
		},
		{
			code: '// WORK/004',
			year: '2025',
			thumb: 'thumb-c',
			thumbLabel: 'rustenium-identity',
			title: 'RUSTENIUM IDENTITY',
			sub: 'Rust · fingerprint · spoofing'
		},
		{
			code: '// WORK/005',
			year: '2025',
			thumb: 'thumb-d',
			thumbLabel: 'ish-adf-bot',
			title: 'ISH-ADF-BOT',
			sub: 'Python · anti-detection · nodriver'
		},
		{
			code: '// WORK/006',
			year: '2024',
			thumb: 'thumb-e',
			thumbLabel: 'code-chaos',
			title: 'CODE CHAOS',
			sub: 'Go · E2E stress testing · backend'
		}
	];

	const nowList = [
		{ n: '/01', body: 'Pushing the bounds of intelligent automation through systems and extraction loops.<br>(Psst, Sometimes I duct tape them just to move fast :-)', cat: 'WORK' },
		{ n: '/02', body: 'Reading <em>Programming Rust and Golang</em> -- S+ Tier languages', cat: 'READING' },
		{ n: '/03', body: 'Currently reading <em>1984</em> by <em>George Orwell</em>', cat: 'READING' },
		{ n: '/05', body: 'Writing personal notes around personal events, routines, and tinkering with ideas.', cat: 'LIFE' },
		{ n: '/06', body: 'OSS experiments around systems languages like Rust, Go, automation libraries', cat: 'OSS' },
		{ n: '/07', body: 'Playing with Quantitative Finance, currently learning Statistics, moving to Linear Algebra and Calculus next year', cat: 'MATH' },
		{ n: '/08', body: '26 now, Looking to become a farmer in my mid to late 30s.', cat: 'LIFE' }
	];

	const yearsBar = ['on', 'on', 'on', 'on', 'on', 'on', 'on', 'on', 'on', ''];
	const projectsBar = ['hot', 'hot', 'hot', 'on', 'on', 'on', 'on', 'on', '', ''];
	const starsBar = ['hot', 'hot', 'on', 'on', 'on', 'on', 'on', 'on', '', ''];

	function barCell(state: string) {
		const base = 'h-2.5 flex-1 border border-ink';
		if (state === 'on') return `${base} bg-ink`;
		if (state === 'hot') return `${base} bg-accent`;
		return `${base} bg-paper-deep`;
	}
</script>

<svelte:head>
	<title>Daniel Shogbon — Index</title>
	<meta
		name="description"
		content="Daniel Shogbon's portfolio for Rust automation, browser tooling, web extraction, AI/ML, mathematics, quantitative trading, systems projects, writing, and personal life notes."
	/>
	<meta
		name="keywords"
		content="Daniel Shogbon, dashn9, Rust developer, browser automation, WebDriver BiDi, CDP, web extraction, path-finder, Rustenium, systems programming, AI, machine learning, AI/ML, mathematics, quantitative trading, quant trading, personal notes, life notes, portfolio"
	/>
</svelte:head>

<!-- HERO -->
<section class="shadow-block-lg grid grid-cols-1 border-2 border-ink bg-paper-lite md:grid-cols-[1.55fr_1fr]">
	<div class="border-b-2 border-ink p-9 md:border-b-0 md:border-r-2">
		<div class="mb-[18px] flex flex-wrap gap-2">
			<span
				class="border-[1.5px] border-ink px-1.5 py-0.5 font-pixel text-[9px] uppercase tracking-[0.12em] text-ink"
				>EST 2026</span
			>
			<span
				class="border-[1.5px] border-ink px-1.5 py-0.5 font-pixel text-[9px] uppercase tracking-[0.12em] text-ink"
				>Planet Earth</span
			>
			<span
				class="border-[1.5px] border-accent bg-accent px-1.5 py-0.5 font-pixel text-[9px] uppercase tracking-[0.12em] text-paper"
				>★ NEW WORK</span
			>
		</div>
		<h1
			class="mb-[22px] font-serif text-[clamp(44px,6.5vw,80px)] font-normal leading-none tracking-[-0.025em] text-ink [&_em]:font-normal [&_em]:italic [&_em]:text-ink-3"
		>
			A place to love.<br /><em>To learn, </em><br /><em>To play, </em><br />A place is Daniel.
		</h1>
		<p class="max-w-[50ch] font-mono text-[15px] leading-[1.6] text-ink-2">
			Hi, I'm <mark>Daniel Shogbon</mark> — A quite tinkerer of symbols that births magic.<br/><br/>
			Living in the domain of code and self. Nine years in, mostly from a room with fifteen windows, lots of sunlight and a dell keyboard.
		</p>
		<div class="mt-6 flex flex-wrap gap-2.5">
			<a
				href="/work"
				class="press-block shadow-block-sm border-2 border-ink bg-accent px-[18px] py-[11px] font-pixel text-[11px] uppercase tracking-[0.1em] text-paper no-underline hover:press-block-on hover:bg-ink"
				>SEE THE WORK →</a
			>
			<a
				href="/contact"
				class="press-block shadow-block-sm border-2 border-ink bg-paper-lite px-[18px] py-[11px] font-pixel text-[11px] uppercase tracking-[0.1em] text-ink no-underline hover:press-block-on hover:bg-ink hover:text-paper"
				>SEND A NOTE</a
			>
			<a
				href="/blog"
				class="press-block shadow-block-sm border-2 border-ink bg-paper-lite px-[18px] py-[11px] font-pixel text-[11px] uppercase tracking-[0.1em] text-ink no-underline hover:press-block-on hover:bg-ink hover:text-paper"
				>READ THE LETTER</a
			>
		</div>
	</div>
	<div class="grid grid-rows-[auto_1fr_auto] bg-ink text-paper">
		<div
			class="flex justify-between border-b-2 border-paper-edge px-3.5 py-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper"
		>
			<span>// STATUS.LOG</span><span class="text-accent">▍</span>
		</div>
		<div class="bg-dot-ink flex flex-col gap-[18px] p-[22px]">
			<div class="font-pixel">
				<div class="text-[9px] uppercase tracking-[0.14em] opacity-70">» CURRENT</div>
				<div class="mt-1.5 text-[16px] uppercase tracking-[0.04em] text-accent">Building Neurun &amp; Loci</div>
				<div class="mt-1.5 text-[11px] uppercase tracking-[0.04em] text-paper opacity-85">
					DETAILS PRIVATE FOR NOW
				</div>
			</div>
			<pre
				class="m-0 whitespace-pre border border-dashed border-paper-edge p-2.5 font-mono text-[11px] leading-[1.15] text-paper">╔═══════════════╗
║ <span class="text-accent">▓▓▓▓▓▓▓░░░</span>    ║
║ NEURUN · LOCI ║
║ PRIVATE BUILD ║
╚═══════════════╝</pre>
			<div class="font-pixel">
				<div class="flex items-baseline justify-between">
					<div class="text-[9px] uppercase tracking-[0.14em] opacity-70">» RECENT PUBLIC COMMITS</div>
					<div class="text-[8px] uppercase tracking-[0.12em] text-accent">@DASHN9</div>
				</div>
				<ul class="mt-2 m-0 list-none p-0">
					{#each commits as c (c.sha)}
						<li class="border-b border-dashed border-paper-edge py-1.5 last:border-b-0">
							<a
								href={c.url}
								target="_blank"
								rel="noopener"
								class="block no-underline text-paper hover:text-accent"
							>
								<div class="flex items-baseline justify-between gap-2">
									<span class="text-[11px] uppercase tracking-[0.04em] truncate">{c.repo}</span>
									<span class="text-[8px] tracking-[0.06em] opacity-65 shrink-0">{c.date}</span>
								</div>
								<div class="mt-0.5 font-mono text-[10px] leading-snug opacity-80 normal-case tracking-normal line-clamp-2">
									{c.message}
								</div>
							</a>
						</li>
					{:else}
						{#if commitsLoading}
							{#each Array(3) as _, i (i)}
								<li class="border-b border-dashed border-paper-edge py-1.5 last:border-b-0">
									<div class="h-3 w-3/4 bg-paper-edge/40"></div>
									<div class="mt-1 h-2 w-1/2 bg-paper-edge/30"></div>
								</li>
							{/each}
						{:else if commitsError}
							<li class="py-1.5 text-[10px] tracking-[0.04em] text-paper opacity-60">
								// GH FEED UNREACHABLE
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		</div>
		<div
			class="flex justify-between border-t-2 border-paper-edge px-3.5 py-3 font-pixel text-[9px] uppercase tracking-[0.14em] text-ink-4"
		>
		Hello
		</div>
	</div>
</section>

<!-- MARQUEE -->
<div
	class="shadow-block-sm relative overflow-hidden whitespace-nowrap border-2 border-ink bg-ink py-2.5 font-pixel text-[11px] uppercase tracking-[0.18em] text-paper"
>
	<div class="inline-block animate-marquee pl-[100%]">
		★ PATH-FINDER — SELF-LEARNING WEB EXTRACTION, NOW PUBLIC <span class="mx-3.5 text-accent">·</span>
		RUSTENIUM v2 — WEBDRIVER BIDI MULTI-SESSION HANDLING <span class="mx-3.5 text-accent">·</span>
		RUSTY BROWSER — DISTRIBUTED STEALTH AUTOMATION IN RUST <span class="mx-3.5 text-accent">·</span>
		NEW LETTER POSTED — STARTED WRITING IN JANUARY 2026 <span class="mx-3.5 text-accent">·</span>
		AVAILABLE FOR NEW WORK FROM JUNE 2026 <span class="mx-3.5 text-accent">·</span>
		★ PATH-FINDER — SELF-LEARNING WEB EXTRACTION, NOW PUBLIC <span class="mx-3.5 text-accent">·</span>
	</div>
</div>

<!-- NOW + STATS -->
<section class="shadow-block-md grid grid-cols-1 border-2 border-ink bg-paper-lite md:grid-cols-[1.7fr_1fr]">
	<div class="border-b-2 border-ink p-7 md:border-b-0 md:border-r-2">
		<h3
			class="mb-4 flex items-center gap-2 font-pixel text-[12px] uppercase tracking-[0.14em] text-ink before:text-accent before:content-['§']"
		>
			ON THE DESK · APRIL 2026
		</h3>
		<ul class="m-0 list-none p-0">
			{#each nowList as item (item.n)}
				<li
					class="grid grid-cols-[50px_1fr_auto] items-baseline gap-3.5 border-b border-dashed border-ink-4 py-2.5 font-mono text-[14px] text-ink-2 last:border-b-0 [&_em]:italic [&_em]:text-ink"
				>
					<span class="font-pixel text-[10px] tracking-[0.1em] text-accent">{item.n}</span>
					<span>{@html item.body}</span>
					<span class="font-pixel text-[9px] uppercase tracking-[0.08em] text-ink-3">{item.cat}</span>
				</li>
			{/each}
		</ul>
	</div>
	<div class="bg-grid-stats p-6">
		<h3
			class="mb-4 flex items-center gap-2 font-pixel text-[12px] uppercase tracking-[0.14em] text-ink before:text-accent before:content-['§']"
		>
			BY THE NUMBERS
		</h3>

		{#snippet stat(label: string, value: string, bar: string[])}
			<div class="mb-3.5 border-2 border-ink bg-paper-lite px-3 py-2.5">
				<div class="font-pixel text-[9px] uppercase tracking-[0.12em] text-accent">{label}</div>
				<div class="mt-1.5 font-pixel text-[30px] leading-none text-ink">{value}</div>
				<div class="mt-2 flex gap-0.5">
					{#each bar as cell, i (i)}
						<span class={barCell(cell)}></span>
					{/each}
				</div>
			</div>
		{/snippet}

		{@render stat('YEARS CODING', '09', yearsBar)}
		{@render stat('REPOS SHIPPED', '52', projectsBar)}
		{@render stat('GITHUB STARS', '40', starsBar)}
	</div>
</section>

<!-- WORK -->
<section class="shadow-block-md border-2 border-ink bg-paper-lite p-7">
	<div class="mb-[18px] flex flex-wrap items-baseline justify-between gap-2.5">
		<h3
			class="flex items-center gap-2 font-pixel text-[12px] uppercase tracking-[0.14em] text-ink before:text-accent before:content-['§']"
		>
			SELECTED WORK · RECENT FIRST
		</h3>
		<a
			href="/work"
			class="font-pixel text-[11px] uppercase tracking-[0.12em] text-accent no-underline hover:bg-accent hover:text-paper"
			>ALL 47 PROJECTS →</a
		>
	</div>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
		{#each projects as p (p.code)}
			<a
				href={p.url ?? '/work'}
				target={p.url ? '_blank' : undefined}
				rel={p.url ? 'noopener noreferrer' : undefined}
				class="press-block shadow-block-md flex flex-col border-2 border-ink bg-paper-lite text-inherit no-underline hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-block-accent-sm"
			>
				<div
					class="flex justify-between border-b-2 border-ink bg-ink px-2.5 py-1.5 font-pixel text-[9px] uppercase tracking-[0.12em] text-paper"
				>
					<span>{p.code}</span><span>{p.year}</span>
				</div>
				<div
					class={[
						'flex aspect-[4/3] items-center justify-center border-b-2 border-ink font-pixel text-[18px] uppercase tracking-[0.05em]',
						p.thumb
					]}
				>
					{p.thumbLabel}
				</div>
				<div class="px-3.5 pb-3.5 pt-3">
					<div class="font-pixel text-[13px] uppercase tracking-[0.04em] text-ink">{p.title}</div>
					<div class="mt-1 font-mono text-[12px] text-ink-3">{p.sub}</div>
				</div>
			</a>
		{/each}
	</div>
</section>

<!-- WRITING CTA -->
<section
	class="shadow-block-md bg-dot-letter grid grid-cols-1 border-2 border-ink bg-accent text-paper md:grid-cols-[1.6fr_1fr]"
>
	<div class="border-b-2 border-dashed border-black/25 p-8 md:border-b-0 md:border-r-2">
		<div class="mb-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-white/85">
			§ WRITING
		</div>
		<h2
			class="mb-3 font-serif text-[clamp(28px,3.5vw,40px)] font-normal leading-[1.05] tracking-[-0.02em] text-paper [&_em]:italic [&_em]:text-white/[0.78]"
		>
			Writing things <em>down.</em>
		</h2>
		<p class="m-0 max-w-[48ch] font-mono text-[14px] leading-[1.55] text-paper">
			Things worth writing down. Code, ideas, observations, the occasional detour — with a
			particular lean toward automation and how machines interact with the web. Started January 2026.
			No tracking, no ads.
		</p>
	</div>
	<div class="flex flex-col justify-center gap-3 p-7 px-6">
		<a
			href="/blog"
			class="press-block shadow-letter-btn border-2 border-ink bg-ink px-5 py-3 text-center font-pixel text-[11px] uppercase tracking-[0.1em] text-paper no-underline hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_rgba(0,0,0,0.4)]"
			>READ THE WRITING →</a
		>
		<NewsletterForm variant="dark" />
	</div>
</section>
