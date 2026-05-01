<script lang="ts">
	import { NOTION_NEWSLETTER_URL } from '$lib/config';

	type Project = {
		code: string;
		year: string;
		thumb: string;
		thumbLabel: string;
		title: string;
		sub: string;
	};

	const projects: Project[] = [
		{
			code: '// WORK/001',
			year: '2025',
			thumb: 'thumb-a',
			thumbLabel: 'rusty-browser',
			title: 'RUSTY BROWSER',
			sub: 'Rust · distributed · stealth cluster'
		},
		{
			code: '// WORK/002',
			year: '2025',
			thumb: 'thumb-b',
			thumbLabel: 'rustenium',
			title: 'RUSTENIUM',
			sub: 'Rust · WebDriver BiDi · CDP'
		},
		{
			code: '// WORK/003',
			year: '2025',
			thumb: 'thumb-c',
			thumbLabel: 'rustenium-identity',
			title: 'RUSTENIUM IDENTITY',
			sub: 'Rust · fingerprint · spoofing'
		},
		{
			code: '// WORK/004',
			year: '2025',
			thumb: 'thumb-d',
			thumbLabel: 'ish-adf-bot',
			title: 'ISH-ADF-BOT',
			sub: 'Python · anti-detection · nodriver'
		},
		{
			code: '// WORK/005',
			year: '2024',
			thumb: 'thumb-e',
			thumbLabel: 'code-chaos',
			title: 'CODE CHAOS',
			sub: 'Go · E2E stress testing · backend'
		},
		{
			code: '// WORK/006',
			year: '2024',
			thumb: 'thumb-f',
			thumbLabel: 'ish-bot-deploy',
			title: 'BOT DEPLOY',
			sub: 'Kubernetes · HCL · cloud infra'
		}
	];

	const nowList = [
		{ n: '/01', body: 'Pushing WebDriver BiDi multi-session handling in <em>rustenium</em> v2.', cat: 'RUST' },
		{ n: '/02', body: 'Reading <em>Programming Rust</em> (Blandy) — for the second pass.', cat: 'READING' },
		{ n: '/03', body: 'Wiring a WASM compilation target for the browser automation core.', cat: 'WASM' },
		{ n: '/04', body: 'Hardening Kubernetes node affinity rules in <em>bot-deploy</em>.', cat: 'INFRA' },
		{ n: '/05', body: 'Listening to a lot of Burial lately — good for long compile waits.', cat: 'MUSIC' },
		{ n: '/06', body: 'Upstream fix in <em>chromiumoxide</em> for session leak on hard crash.', cat: 'OSS' }
	];

	const yearsBar = ['on', 'on', 'on', 'on', 'on', 'on', 'on', 'on', '', ''];
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
				>COPENHAGEN · 55.6°N</span
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
			Living in the domain of code and self. Eight years in, mostly from a room with fifteen windows, lots of sunlight and a dell keyboard.
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
				<div class="mt-1.5 text-[16px] uppercase tracking-[0.04em] text-accent"><a href="https://github.com/dashn9/rusty-browser">Building Rusty Browser</a></div>
				<div class="mt-1.5 text-[11px] uppercase tracking-[0.04em] text-paper opacity-85">
					FROM NOV 2026 - Launch APR 28
				</div>
			</div>
			<pre
				class="m-0 whitespace-pre border border-dashed border-paper-edge p-2.5 font-mono text-[11px] leading-[1.15] text-paper">╔═══════════════╗
║ <span class="text-accent">▓▓▓▓▓▓▓░░░</span>    ║
║ RUSTY BROWSER ║
║ TILL INFINI   ║
╚═══════════════╝</pre>
			<div class="font-pixel">
				<div class="text-[9px] uppercase tracking-[0.14em] opacity-70">» LAST COMMIT</div>
				<div class="mt-1.5 text-[16px] uppercase tracking-[0.04em] text-paper">
					2026.04.22 · WILDFERN
				</div>
			</div>
		</div>
		<div
			class="flex justify-between border-t-2 border-paper-edge px-3.5 py-3 font-pixel text-[9px] uppercase tracking-[0.14em] text-ink-4"
		>
			<span>UPTIME · 8Y 4M</span><span>WX · 7°C RAIN</span>
		</div>
	</div>
</section>

<!-- MARQUEE -->
<div
	class="shadow-block-sm relative overflow-hidden whitespace-nowrap border-2 border-ink bg-ink py-2.5 font-pixel text-[11px] uppercase tracking-[0.18em] text-paper"
>
	<div class="inline-block animate-marquee pl-[100%]">
		★ WILDFERN BOTANICAL PRESS — TDC EXCELLENCE 2024 <span class="mx-3.5 text-accent">·</span>
		HALFTONE — A READER FOR SLOW ESSAYS, NOW IN PUBLIC BETA <span class="mx-3.5 text-accent">·</span>
		NEW LETTER POSTED — "ON KERNING BY EAR" <span class="mx-3.5 text-accent">·</span>
		TEACHING EDITORIAL DESIGN AT KADK · SPRING 2026 <span class="mx-3.5 text-accent">·</span>
		AVAILABLE FOR NEW WORK FROM 1 MAY <span class="mx-3.5 text-accent">·</span>
		★ WILDFERN BOTANICAL PRESS — TDC EXCELLENCE 2024 <span class="mx-3.5 text-accent">·</span>
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

		{@render stat('YEARS CODING', '08', yearsBar)}
		{@render stat('REPOS SHIPPED', '52', projectsBar)}
		{@render stat('GITHUB STARS', '25', starsBar)}
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
				href="/work"
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
		<a
			href={NOTION_NEWSLETTER_URL}
			target="_blank"
			rel="noopener noreferrer"
			class="border-2 border-dashed border-white/40 px-5 py-3 text-center font-pixel text-[11px] uppercase tracking-[0.1em] text-white/80 no-underline hover:border-white/80 hover:text-white"
			>GET NOTIFIED ↗</a
		>
		<div class="font-pixel text-[9px] uppercase tracking-[0.14em] text-white/[0.78]">
			» NO SPAM · NOTIFY VIA NOTION
		</div>
	</div>
</section>
