<script lang="ts">
	let email = $state('');
	let joined = $state(false);

	function onSubscribe(e: Event) {
		e.preventDefault();
		joined = true;
		email = '';
	}

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
			code: '// WORK/008',
			year: '2025',
			thumb: 'thumb-a',
			thumbLabel: 'WILDFERN',
			title: 'BOTANICAL PRESS',
			sub: 'Identity · wordmark · packaging'
		},
		{
			code: '// WORK/007',
			year: '2025',
			thumb: 'thumb-b',
			thumbLabel: 'HALFTONE',
			title: 'SLOW READER',
			sub: 'Product · web · calmer reading'
		},
		{
			code: '// WORK/006',
			year: '2025',
			thumb: 'thumb-c',
			thumbLabel: 'NORDLYS',
			title: 'FESTIVAL IDENTITY',
			sub: 'Identity · poster · Tromsø'
		},
		{
			code: '// WORK/005',
			year: '2024',
			thumb: 'thumb-d',
			thumbLabel: 'KINFOLK',
			title: 'THE REISSUE',
			sub: 'Editorial · type'
		},
		{
			code: '// WORK/004',
			year: '2023',
			thumb: 'thumb-e',
			thumbLabel: 'GRAINS',
			title: 'CERAMICS STUDIO',
			sub: 'Identity · web'
		},
		{
			code: '// WORK/003',
			year: '2022',
			thumb: 'thumb-f',
			thumbLabel: 'EMBER',
			title: 'JOURNALING APP',
			sub: 'Product · iOS'
		}
	];

	const nowList = [
		{ n: '/01', body: 'Finishing a wordmark for a botanical press in Oslo.', cat: 'IDENTITY' },
		{ n: '/02', body: 'Reading <em>Shape of Time</em> (Kubler) — for the third time.', cat: 'READING' },
		{ n: '/03', body: 'Drawing 36 dingbats for fun, not for money.', cat: 'TYPE' },
		{ n: '/04', body: 'Teaching a half-course on editorial design at KADK.', cat: 'TEACHING' },
		{ n: '/05', body: 'Listening to a lot of Grouper, mostly <em>Ruins</em>.', cat: 'MUSIC' },
		{ n: '/06', body: 'Slow-cooking a typeface called <em>Småby</em>.', cat: 'TYPE' }
	];

	const yearsBar = ['on', 'on', 'on', 'on', 'on', 'on', 'on', 'on', '', ''];
	const projectsBar = ['hot', 'hot', 'on', 'on', 'on', 'on', 'on', '', '', ''];
	const cupsBar = ['hot', 'hot', 'hot', 'on', 'on', 'on', 'on', 'on', '', ''];

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
				>EST 2018</span
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
			A small studio<br />for <em>careful things,</em><br />made on the internet.
		</h1>
		<p class="max-w-[50ch] font-mono text-[15px] leading-[1.6] text-ink-2">
			I'm <mark>Daniel Shogbon</mark> — an independent designer working on identity, product, and
			the quieter edges of interface design. Eight years in, mostly from a second-floor apartment
			with a cat named Biscuit and a window that faces north.
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
				<div class="mt-1.5 text-[16px] uppercase tracking-[0.04em] text-accent">OPEN FOR WORK</div>
				<div class="mt-1.5 text-[11px] uppercase tracking-[0.04em] text-paper opacity-85">
					FROM 1 MAY 2026
				</div>
			</div>
			<pre
				class="m-0 whitespace-pre border border-dashed border-paper-edge p-2.5 font-mono text-[11px] leading-[1.15] text-paper">╔═══════════════╗
║ <span class="text-accent">▓▓▓▓▓▓▓░░░</span> 7/10 ║
║ PROJECT BOOKED ║
║ NEXT QUARTER   ║
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

		{@render stat('YEARS INDEPENDENT', '08', yearsBar)}
		{@render stat('PROJECTS SHIPPED', '47', projectsBar)}
		{@render stat('CUPS / WK', '22', cupsBar)}
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

<!-- LETTER -->
<section
	class="shadow-block-md bg-dot-letter grid grid-cols-1 border-2 border-ink bg-accent text-paper md:grid-cols-[1.6fr_1fr]"
>
	<div class="border-b-2 border-dashed border-black/25 p-8 md:border-b-0 md:border-r-2">
		<div
			class="mb-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-white/85"
		>
			§ 005 — DEAR LETTER
		</div>
		<h2
			class="mb-3 font-serif text-[clamp(28px,3.5vw,40px)] font-normal leading-[1.05] tracking-[-0.02em] text-paper [&_em]:italic [&_em]:text-white/[0.78]"
		>
			A quarterly letter,<br /><em>once every three months.</em>
		</h2>
		<p class="m-0 max-w-[48ch] font-mono text-[14px] leading-[1.55] text-paper">
			About type, process, the studio, things I read on the train, and occasionally a recipe for
			soup. Usually arrives on a Sunday. No tracking, no ads, easy to leave.
		</p>
	</div>
	<div class="flex flex-col justify-center gap-2.5 p-7 px-6">
		<form onsubmit={onSubscribe} class="flex gap-1.5">
			<input
				type="email"
				placeholder="you@elsewhere.com"
				bind:value={email}
				required
				aria-label="Email address"
				class="flex-1 border-2 border-ink bg-paper px-3 py-2.5 font-mono text-[14px] text-ink outline-none placeholder:text-ink-3"
			/>
			<button
				type="submit"
				class="press-block shadow-letter-btn border-2 border-ink bg-ink px-3.5 py-2.5 font-pixel text-[11px] uppercase tracking-[0.1em] text-paper hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_rgba(0,0,0,0.4)]"
				>JOIN →</button
			>
		</form>
		{#if joined}
			<div class="font-pixel text-[9px] uppercase tracking-[0.14em] text-white/[0.78]">
				» THANKS. YOU ARE ON THE LIST.
			</div>
		{:else}
			<div class="font-pixel text-[9px] uppercase tracking-[0.14em] text-white/[0.78]">
				» CURRENT SUBSCRIBERS: 1,247 · 0% TRACKING · 100% LETTERS
			</div>
		{/if}
	</div>
</section>
