<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { post } = data;
</script>

<svelte:head>
	<title>Daniel Shogbon — {post.title}{post.titleEm ?? ''}</title>
	<meta name="description" content={post.desc} />
</svelte:head>

<article class="shadow-block-lg border-2 border-ink bg-paper-lite">
	<!-- POST HEADER -->
	<div class="border-b-2 border-ink bg-ink px-3.5 py-2 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper">
		<a href="/blog" class="text-accent no-underline hover:underline">← WRITING</a>
		<span class="mx-2 text-ink-4">/</span>
		<span>{post.n}</span>
	</div>

	<div class="grid grid-cols-1 border-b-2 border-ink md:grid-cols-[1fr_220px]">
		<div class="border-b-2 border-ink p-9 md:border-b-0 md:border-r-2">
			<div class="mb-3 flex flex-wrap gap-2">
				<span class="border-[1.5px] border-ink px-1.5 py-0.5 font-pixel text-[9px] uppercase tracking-[0.12em] text-ink">{post.cat}</span>
				<span class="border-[1.5px] border-ink px-1.5 py-0.5 font-pixel text-[9px] uppercase tracking-[0.12em] text-ink-3">{post.time}</span>
			</div>
			<h1 class="mb-4 font-serif text-[clamp(32px,4.5vw,56px)] font-normal leading-[1.05] tracking-[-0.025em] text-ink [&_em]:italic [&_em]:text-ink-3">
				{post.title}{#if post.titleEm}<em>{post.titleEm}</em>{/if}{post.titleTail ?? ''}
			</h1>
			<p class="m-0 max-w-[54ch] font-mono text-[15px] leading-[1.6] text-ink-2">{post.desc}</p>
		</div>
		<div class="flex flex-col justify-center gap-3 p-6 font-pixel text-[10px] uppercase tracking-[0.12em]">
			<div class="flex justify-between border-b border-dashed border-ink-4 pb-2">
				<span class="text-ink-3">DATE</span>
				<span class="text-ink">{post.date}</span>
			</div>
			<div class="flex justify-between border-b border-dashed border-ink-4 pb-2">
				<span class="text-ink-3">CATEGORY</span>
				<span class="text-accent">{post.cat}</span>
			</div>
			<div class="flex justify-between">
				<span class="text-ink-3">READ TIME</span>
				<span class="text-ink">{post.time}</span>
			</div>
		</div>
	</div>

	<!-- POST BODY -->
	<div class="portable-text mx-auto max-w-[72ch] px-9 py-10 font-mono text-[15px] leading-[1.75] text-ink-2">
		{#if post.body && Array.isArray(post.body)}
			<PortableText value={post.body} />
		{:else}
			<p class="text-ink-3 italic">Post content coming soon.</p>
		{/if}
	</div>

	<!-- FOOTER NAV -->
	<div class="flex justify-between border-t-2 border-ink px-7 py-4">
		<a href="/blog" class="font-pixel text-[11px] uppercase tracking-[0.1em] text-accent no-underline hover:underline">← ALL POSTS</a>
	</div>
</article>
