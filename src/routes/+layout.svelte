<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import { theme } from '$lib/theme.svelte';

	let { children } = $props();

	onMount(() => theme.init());

	const navLinks = [
		{ href: '/', label: '» INDEX', match: (p: string) => p === '/' },
		{ href: '/work', label: '// WORK', match: (p: string) => p.startsWith('/work') },
		{ href: '/blog', label: '// WRITING', match: (p: string) => p.startsWith('/blog') },
		{ href: '/about', label: '// ABOUT', match: (p: string) => p.startsWith('/about') },
		{ href: '/contact', label: '// CONTACT ↗', match: (p: string) => p.startsWith('/contact') }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Daniel Shogbon</title>
</svelte:head>

<div class="mx-auto flex max-w-[1180px] flex-col gap-4 px-[clamp(16px,4vw,40px)] pt-4">
	<!-- Titlebar -->
	<div class="shadow-block-md flex border-2 border-ink bg-paper-lite">
		<div
			class="flex flex-1 items-center justify-between border-r-2 border-ink bg-ink px-3.5 py-2 text-paper"
		>
			<div>
				<div class="font-pixel text-[18px] uppercase tracking-[0.04em]">
					D<span class="text-accent">.</span>SHOGBON
				</div>
				<div class="font-pixel text-[9px] uppercase tracking-[0.12em] text-ink-4">
					// CODE · SYSTEMS . MATH · LIFE NOTES
				</div>
			</div>
			<div class="flex gap-1">
				<span class="inline-block size-3.5 border-[1.5px] border-paper"></span>
				<span class="inline-block size-3.5 border-[1.5px] border-paper"></span>
				<span class="inline-block size-3.5 border-[1.5px] border-paper bg-paper"></span>
			</div>
		</div>
		<div
			class="flex items-center gap-2 px-3.5 py-2 font-pixel text-[9px] uppercase tracking-[0.12em] text-ink"
		>
			<span class="inline-block size-2 bg-accent"></span> PUSHING INTELLIGENT AUTOMATION
			<button
				type="button"
				onclick={() => theme.toggle()}
				aria-label="Toggle dark mode"
				title="Toggle dark mode"
				class="ml-2 inline-flex size-7 items-center justify-center border-2 border-ink bg-paper-lite text-ink transition-[background,color] duration-100 ease-[steps(2,end)] hover:bg-ink hover:text-paper"
			>
				{theme.current === 'dark' ? '☀' : '☾'}
			</button>
		</div>
	</div>

	<!-- Nav -->
	<nav class="shadow-block-sm flex border-2 border-ink bg-paper-lite">
		{#each navLinks as link, i (link.href)}
			{@const active = link.match(page.url.pathname)}
			<a
				href={link.href}
				class={[
					'flex-1 px-1.5 py-[11px] text-center font-pixel text-[11px] uppercase tracking-[0.1em] no-underline',
					i < navLinks.length - 1 && 'border-r-2 border-ink',
					active ? 'bg-accent text-paper' : 'text-ink hover:bg-ink hover:text-paper'
				]}
			>
				{link.label}
			</a>
		{/each}
	</nav>

	{@render children()}

	<!-- Footer -->
	<footer
		class="shadow-block-sm mt-2 grid grid-cols-2 border-2 border-ink bg-ink text-paper md:grid-cols-4"
	>
		<div
			class="border-b-2 border-r-2 border-paper-edge p-4 font-pixel text-[10px] uppercase leading-[1.7] tracking-[0.08em] text-ink-4 md:border-b-0"
		>
			<h5 class="mb-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper">
				<span class="text-accent">§</span> D.SHOGBON
			</h5>
			© 2026–2026<br />
			In my mind.
		</div>
		<div
			class="border-b-2 border-paper-edge p-4 font-pixel text-[10px] uppercase leading-[1.7] tracking-[0.08em] text-ink-4 md:border-b-0 md:border-r-2"
		>
			<h5 class="mb-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper">
				<span class="text-accent">§</span> SITEMAP
			</h5>
			<a href="/" class="block py-px text-paper no-underline hover:text-accent">Index</a>
			<a href="/work" class="block py-px text-paper no-underline hover:text-accent">Work</a>
			<a href="/blog" class="block py-px text-paper no-underline hover:text-accent">Writing</a>
			<a href="/about" class="block py-px text-paper no-underline hover:text-accent">About</a>
			<a href="/contact" class="block py-px text-paper no-underline hover:text-accent">Contact</a>
		</div>
		<div
			class="border-r-2 border-paper-edge p-4 font-pixel text-[10px] uppercase leading-[1.7] tracking-[0.08em] text-ink-4"
		>
			<h5 class="mb-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper">
				<span class="text-accent">§</span> ELSEWHERE
			</h5>
			<a href="https://github.com/dashn9" class="block py-px text-paper no-underline hover:text-accent">Github ↗</a>
			<a href="https://x.com/" class="block py-px text-paper no-underline hover:text-accent">X ↗</a>
			<a href="/cv/DanielShogbon_resume_20260513.pdf" target="_blank" rel="noopener noreferrer" class="block py-px text-paper no-underline hover:text-accent">Résumé ↗</a>
		</div>
		<div class="p-4 font-pixel text-[10px] uppercase leading-[1.7] tracking-[0.08em] text-ink-4">
			<h5 class="mb-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper">
				<span class="text-accent">§</span> COLOPHON
			</h5>
			DM Serif Display<br />
			Silkscreen<br />
			JetBrains Mono
		</div>
	</footer>

	<div
		class="px-0 pb-7 pt-3 text-center font-pixel text-[9px] uppercase tracking-[0.1em] text-ink-4"
	>
		// HAND-BUILT · NO TRACKING · WEIGHT &lt; 80KB · LAST TOUCHED 2026-04-23
	</div>
</div>
