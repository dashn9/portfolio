<script lang="ts">
	const projects = [
		{
			code: '// 001',
			year: '2025',
			thumb: 'thumb-a',
			title: 'RUSTY BROWSER',
			sub: 'Rust · distributed · stealth cluster',
			desc: 'Distributed, AI-driven browser automation cluster built in Rust. Orchestrates headless Chromium instances across nodes with stealth fingerprinting, session pooling, and fault-tolerant task routing.',
			stars: 3,
			url: 'https://rustybrowser.com'
		},
		{
			code: '// 002',
			year: '2025',
			thumb: 'thumb-b',
			title: 'RUSTENIUM',
			sub: 'Rust · WebDriver BiDi · CDP',
			desc: 'Native Rust engine for the WebDriver BiDi Protocol and Chrome DevTools Protocol. Async-first, zero Node.js dependency, full protocol coverage.',
			stars: 17,
			url: 'https://github.com/dashn9/rustenium'
		},
		{
			code: '// 003',
			year: '2025',
			thumb: 'thumb-c',
			title: 'RUSTENIUM IDENTITY',
			sub: 'Rust · fingerprint · spoofing layer',
			desc: 'Browser identity and fingerprint spoofing module for the Rustenium stack. Injects canvas, WebGL, audio, and navigator signals at the protocol layer before JS executes.',
			stars: 0,
			url: 'https://github.com/dashn9/rustenium-identity'
		},
		{
			code: '// 004',
			year: '2025',
			thumb: 'thumb-d',
			title: 'ISH-ADF-BOT',
			sub: 'Python · anti-detection · nodriver',
			desc: 'Fast web automation bot with multi-layer anti-detection on nodriver. Passes Cloudflare Turnstile, DataDome, and PerimeterX.',
			stars: 2,
			url: 'https://github.com/dashn9/ish-adf-bot'
		},
		{
			code: '// 005',
			year: '2024',
			thumb: 'thumb-e',
			title: 'CODE CHAOS',
			sub: 'Go · E2E stress testing · backend',
			desc: 'End-to-end stress testing suite for backend services. Concurrent load patterns, chaos injection, and assertion pipelines across HTTP and gRPC.',
			stars: 0,
			url: 'https://github.com/dashn9/code-chaos'
		},
		{
			code: '// 006',
			year: '2024',
			thumb: 'thumb-f',
			title: 'BOT DEPLOY',
			sub: 'Kubernetes · Terraform · cloud infra',
			desc: 'Kubernetes-native infrastructure for deploying distributed bot clusters at scale. Terraform-managed node pools, auto-scaling, and secret rotation.',
			stars: 0,
			url: 'https://github.com/dashn9/ish-bot-deploy'
		},
		{
			code: '// 007',
			year: '2024',
			thumb: 'thumb-a',
			title: 'SERVERLESS FLUX',
			sub: 'Go · serverless · cloud functions',
			desc: 'Lightweight serverless function runtime in Go. Stateless execution, cold-start optimization, and event-driven dispatch across cloud providers.',
			stars: 1,
			url: 'https://github.com/dashn9/serverless-flux'
		},
		{
			code: '// 008',
			year: '2024',
			thumb: 'thumb-b',
			title: 'SERVERLESS AGENT',
			sub: 'Go · agents · event-driven',
			desc: 'Event-driven agent framework on serverless infrastructure. Stateless task runners, queue-backed orchestration, and zero-idle cost deployment model.',
			stars: 1,
			url: 'https://github.com/dashn9/serverless-agent'
		},
		{
			code: '// 009',
			year: '2025',
			thumb: 'thumb-c',
			title: 'FP SPOOFER',
			sub: 'JS · fingerprint · browser identity spoofing',
			desc: 'JavaScript layer for spoofing browser fingerprints — canvas, WebGL, fonts, and navigator properties — without triggering consistency checks.',
			stars: 0,
			url: 'https://github.com/dashn9/ish-bot-fp-spoofer'
		}
	];
</script>

<svelte:head>
	<title>Daniel Shogbon — Work</title>
</svelte:head>

<!-- CURRENTLY -->
<section
	class="shadow-block-lg grid grid-cols-1 border-2 border-ink bg-paper-lite md:grid-cols-[1.55fr_1fr]"
>
	<div class="border-b-2 border-ink p-9 md:border-b-0 md:border-r-2">
		<div class="mb-4 font-pixel text-[10px] uppercase tracking-[0.12em] text-ink-3">
			<a href="/" class="text-accent no-underline">INDEX</a>
			<span class="mx-1.5 text-ink-4">/</span> WORK
		</div>
		<div class="mb-3 font-pixel text-[10px] uppercase tracking-[0.14em] text-accent">
			★ CURRENTLY SHIPPING
		</div>
		<h1
			class="mb-4 font-serif text-[clamp(44px,6.5vw,80px)] font-normal leading-none tracking-[-0.025em] text-ink [&_em]:italic [&_em]:text-ink-3"
		>
			Rusty <em>Browser.</em>
		</h1>
		<p class="max-w-[50ch] font-mono text-[15px] leading-[1.6] text-ink-2">
			A distributed, AI-driven browser automation cluster in Rust. Stealth fingerprinting, session
			pooling, and fault-tolerant task routing across headless Chromium nodes.
		</p>
		<div class="mt-6 flex flex-wrap gap-2.5">
			<a
				href="https://rustybrowser.com"
				target="_blank"
				rel="noopener noreferrer"
				class="press-block shadow-block-sm border-2 border-ink bg-accent px-[18px] py-[11px] font-pixel text-[11px] uppercase tracking-[0.1em] text-paper no-underline hover:press-block-on hover:bg-ink"
				>RUSTYBROWSER.COM →</a
			>
			<a
				href="https://github.com/dashn9/rusty-browser"
				target="_blank"
				rel="noopener noreferrer"
				class="press-block shadow-block-sm border-2 border-ink bg-paper-lite px-[18px] py-[11px] font-pixel text-[11px] uppercase tracking-[0.1em] text-ink no-underline hover:press-block-on hover:bg-ink hover:text-paper"
				>GITHUB ↗</a
			>
		</div>
	</div>
	<div class="grid grid-rows-[auto_1fr_auto] bg-ink text-paper">
		<div
			class="flex justify-between border-b-2 border-paper-edge px-3.5 py-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper"
		>
			<span>// BUILD.LOG</span><span class="text-accent">▍</span>
		</div>
		<div class="bg-dot-ink flex flex-col gap-[18px] p-[22px]">
			<div class="font-pixel">
				<div class="text-[9px] uppercase tracking-[0.14em] opacity-70">» STACK</div>
				<div class="mt-1.5 text-[14px] uppercase tracking-[0.04em] text-accent">
					RUST · WEBDRIVER BIDI · CDP
				</div>
			</div>
			<pre
				class="m-0 whitespace-pre border border-dashed border-paper-edge p-2.5 font-mono text-[11px] leading-[1.15] text-paper">╔═══════════════╗
║ <span class="text-accent">▓▓▓▓▓▓▓░░░</span>    ║
║ RUSTY BROWSER ║
║ TILL INFINI   ║
╚═══════════════╝</pre>
			<div class="font-pixel">
				<div class="text-[9px] uppercase tracking-[0.14em] opacity-70">» SITE</div>
				<div class="mt-1.5 text-[14px] uppercase tracking-[0.04em] text-paper">
					RUSTYBROWSER.COM
				</div>
			</div>
		</div>
		<div
			class="flex justify-between border-t-2 border-paper-edge px-3.5 py-3 font-pixel text-[9px] uppercase tracking-[0.14em] text-ink-4"
		>
			<span>RUST · OPEN SOURCE</span><span>3 ★ ON GITHUB</span>
		</div>
	</div>
</section>

<!-- ALL PROJECTS -->
<section class="shadow-block-md border-2 border-ink bg-paper-lite">
	<div
		class="flex justify-between border-b-2 border-ink bg-ink px-3.5 py-2 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper"
	>
		<span>// WORK.INDEX — ALL PROJECTS</span>
		<span class="bg-accent px-2 py-0.5">{projects.length} SHOWN</span>
	</div>

	{#each projects as p (p.code)}
		<div
			class="grid grid-cols-1 items-start gap-3 border-b border-dashed border-ink-4 px-[18px] py-4 last:border-b-0 md:grid-cols-[80px_1fr_auto]"
		>
			<div>
				<div class="font-pixel text-[10px] tracking-[0.12em] text-accent">{p.code}</div>
				<div class="mt-0.5 font-pixel text-[9px] tracking-[0.06em] text-ink-4">{p.year}</div>
			</div>
			<div>
				<div class="mb-0.5 font-serif text-[20px] leading-[1.15] tracking-[-0.01em] text-ink">
					{p.title}
				</div>
				<div class="mb-1 font-pixel text-[9px] uppercase tracking-[0.1em] text-ink-3">{p.sub}</div>
				<p class="m-0 max-w-[60ch] font-mono text-[12px] leading-[1.55] text-ink-3">{p.desc}</p>
			</div>
			<div class="flex flex-col items-end gap-2 pt-0.5">
				{#if p.stars > 0}
					<span class="font-pixel text-[9px] uppercase tracking-[0.12em] text-ink-3"
						>{p.stars} ★</span
					>
				{/if}
				{#if p.url}
					<a
						href={p.url}
						target="_blank"
						rel="noopener noreferrer"
						class="border-[1.5px] border-accent px-2 py-1 font-pixel text-[9px] uppercase tracking-[0.1em] text-accent no-underline hover:bg-accent hover:text-paper"
						>OPEN ↗</a
					>
				{:else}
					<span
						class="border-[1.5px] border-ink-4 px-2 py-1 font-pixel text-[9px] uppercase tracking-[0.1em] text-ink-4"
						>PRIVATE</span
					>
				{/if}
			</div>
		</div>
	{/each}
</section>
