<script lang="ts">
	import NewsletterForm from '$lib/components/NewsletterForm.svelte';
	import type { Post } from '$lib/sanity';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const posts: Post[] = $derived(data.posts);

	const catToolbar = ['ALL', 'ESSAY', 'NOTES', 'LETTER', 'IDEA', 'THOUGHTS'];
	let activeCat = $state('ALL');
	let activeTag = $state<string | null>(null);
	let search = $state('');

	const filtered = $derived(
		posts.filter((p) => {
			const matchCat = activeCat === 'ALL' || p.cat === activeCat;
			const matchTag = !activeTag || (p.tags ?? []).includes(activeTag);
			const matchSearch =
				!search ||
				p.title.toLowerCase().includes(search.toLowerCase()) ||
				p.desc.toLowerCase().includes(search.toLowerCase());
			return matchCat && matchTag && matchSearch;
		})
	);

	const featured = $derived(posts[0]);

	const years = $derived(
		[...new Set(posts.map((p) => p.date.slice(0, 4)))].map((y) => ({
			year: y,
			count: String(posts.filter((p) => p.date.startsWith(y)).length).padStart(2, '0')
		}))
	);

	const cloud = $derived(
		[...new Set(posts.flatMap((p) => p.tags ?? []))].sort((a, b) => a.localeCompare(b))
	);

	const stats = $derived([
		{ k: 'POSTS', v: String(posts.length).padStart(2, '0'), hot: true },
		{ k: 'STARTED', v: 'JAN 2026' },
		{ k: 'AVG. READ', v: '6 MIN' },
		{ k: 'NEXT POST', v: "MAY '26" },
		{ k: 'TRACKING', v: 'NONE.' }
	]);
</script>

<svelte:head>
	<title>Daniel Shogbon — Writing</title>
</svelte:head>

<!-- HEADER -->
<section class="shadow-block-lg grid grid-cols-1 border-2 border-ink bg-paper-lite md:grid-cols-[1.4fr_1fr]">
	<div class="border-b-2 border-ink p-9 md:border-b-0 md:border-r-2">
		<div class="mb-4 font-pixel text-[10px] uppercase tracking-[0.12em] text-ink-3">
			<a href="/" class="text-accent no-underline">INDEX</a>
			<span class="mx-1.5 text-ink-4">/</span> WRITING
		</div>
		<h1
			class="mb-3.5 font-serif text-[clamp(40px,5.5vw,68px)] font-normal leading-none tracking-[-0.025em] text-ink [&_em]:italic [&_em]:text-ink-3"
		>
			Writing, <em>the archive.</em>
		</h1>
		<p class="max-w-[52ch] font-mono text-[15px] leading-[1.6] text-ink-2">
			Things worth writing down — code, ideas, observations, the occasional detour. With a
			particular lean toward automation and how machines interact with the web. Started January 2026.
			No tracking, no ads.
		</p>
	</div>
	<div class="flex flex-col bg-ink text-paper">
		<div
			class="border-b-2 border-paper-edge px-3.5 py-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper"
		>
			// WRITING.STATS
		</div>
		<div class="bg-dot-ink flex flex-1 flex-col gap-4 p-[22px]">
			{#each stats as row, i (row.k)}
				<div
					class={[
						'flex justify-between border-b border-dashed border-paper-edge pb-2 font-pixel text-[10px] uppercase tracking-[0.12em] text-paper',
						i === stats.length - 1 && 'border-b-0'
					]}
				>
					<span>{row.k}</span>
					<span class={row.hot ? 'text-accent' : 'text-ink-4'}>{row.v}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- TOOLBAR -->
<div class="shadow-block-sm flex flex-wrap items-stretch border-2 border-ink bg-paper-lite">
	<div class="flex flex-1 items-center gap-2.5 border-r-2 border-ink px-3.5 py-2.5">
		<label
			for="blog-search"
			class="font-pixel text-[10px] uppercase tracking-[0.14em] text-accent">» SEARCH</label
		>
		<input
			id="blog-search"
			type="text"
			bind:value={search}
			placeholder="search posts…"
			class="flex-1 border-0 bg-transparent font-mono text-[14px] text-ink outline-none"
		/>
	</div>
	<div class="flex flex-wrap items-center gap-1.5 px-3.5 py-2.5">
		{#each catToolbar as cat (cat)}
			<button
				type="button"
				onclick={() => (activeCat = cat)}
				class={[
					'cursor-pointer border-[1.5px] px-2 py-1 font-pixel text-[9px] uppercase tracking-[0.12em]',
					activeCat === cat
						? 'border-accent bg-accent text-paper hover:border-ink hover:bg-ink'
						: 'border-ink bg-paper-lite text-ink hover:bg-ink hover:text-paper'
				]}>{cat}</button
			>
		{/each}
	</div>
</div>

{#if activeTag}
	<div
		class="shadow-block-sm flex items-center justify-between gap-3 border-2 border-ink bg-ink px-3.5 py-2 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper"
	>
		<span>» FILTERING BY TAG · <span class="text-accent">#{activeTag}</span></span>
		<button
			type="button"
			onclick={() => (activeTag = null)}
			class="cursor-pointer border-[1.5px] border-accent px-2 py-0.5 text-accent hover:bg-accent hover:text-paper"
		>
			CLEAR ✕
		</button>
	</div>
{/if}

<!-- MAIN GRID -->
<div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_280px]">
	<div class="flex flex-col gap-4">
		<!-- FEATURED -->
		{#if featured}
		<article class="shadow-block-accent grid grid-cols-1 border-2 border-ink bg-paper-lite md:grid-cols-2">
			<div
				class="thumb-feat flex min-h-[280px] flex-col justify-between border-b-2 border-ink p-7 md:border-b-0 md:border-r-2"
			>
				<div
					class="self-start border-[1.5px] border-accent bg-ink px-2 py-1 font-pixel text-[10px] uppercase tracking-[0.16em] text-accent"
				>
					★ LATEST · NEW
				</div>
				<pre class="m-0 self-start whitespace-pre bg-ink px-3 py-2 font-pixel text-[13px] leading-[1.4] text-accent">{featured.n}
{featured.cat}
{featured.time}</pre>
				<div
					class="self-start bg-ink px-2 py-1 font-pixel text-[9px] uppercase tracking-[0.14em] text-paper"
				>
					{featured.date} · {featured.time} · {featured.cat}
				</div>
			</div>
			<div class="flex flex-col gap-3 p-7">
				<div class="font-pixel text-[10px] uppercase tracking-[0.14em] text-accent">§ POST {featured.n}</div>
				<h2
					class="m-0 font-serif text-[38px] font-normal leading-[1.05] tracking-[-0.02em] text-ink [&_em]:italic [&_em]:text-ink-3"
				>
					{featured.title}{#if featured.titleEm}<em>{featured.titleEm}</em>{/if}{featured.titleTail ?? ''}
				</h2>
				<p class="m-0 font-mono text-[14px] leading-[1.55] text-ink-2">{featured.desc}</p>
				<div class="mt-1.5 flex items-center gap-2.5">
					<a
						href="/blog/{featured.slug}"
						class="border-b-2 border-accent py-1.5 font-pixel text-[11px] uppercase tracking-[0.1em] text-accent no-underline hover:border-ink hover:bg-accent hover:px-2 hover:text-paper"
						>READ POST →</a
					>
					<span class="font-pixel text-[9px] uppercase tracking-[0.12em] text-ink-3">
						{featured.time}
					</span>
				</div>
			</div>
		</article>
		{/if}

		<!-- POSTS -->
		<section class="shadow-block-md border-2 border-ink bg-paper-lite">
			<div
				class="flex justify-between border-b-2 border-ink bg-ink px-3.5 py-2 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper"
			>
				<span>// WRITING.ARCHIVE — {filtered.length} POSTS</span>
			</div>

			{#each filtered as post (post._id ?? post.n)}
				<div
					class="grid grid-cols-1 items-baseline gap-3.5 border-b border-dashed border-ink-4 px-[18px] py-3.5 last:border-b-0 md:grid-cols-[110px_60px_1fr_110px_70px]"
				>
					<a
						href="/blog/{post.slug}"
						class="font-pixel text-[10px] tracking-[0.12em] text-accent no-underline hover:underline"
						>{post.n}</a
					>
					<div class="font-pixel text-[10px] tracking-[0.06em] text-ink-3">{post.date}</div>
					<div>
						<a
							href="/blog/{post.slug}"
							class="block text-inherit no-underline hover:[&_.t]:text-accent"
						>
							<div
								class="t mb-1 font-serif text-[22px] leading-[1.15] tracking-[-0.01em] text-ink [&_em]:italic [&_em]:text-ink-3"
							>
								{post.title}{#if post.titleEm}<em>{post.titleEm}</em>{/if}{post.titleTail ?? ''}
							</div>
							<p class="m-0 max-w-[56ch] font-mono text-[12px] text-ink-3">{post.desc}</p>
						</a>
						{#if post.tags && post.tags.length}
							<div class="mt-2 flex flex-wrap gap-1">
								{#each post.tags as t (t)}
									<button
										type="button"
										onclick={() => (activeTag = t)}
										class={[
											'cursor-pointer border-[1.5px] px-1.5 py-0.5 font-pixel text-[9px] uppercase tracking-[0.1em]',
											activeTag === t
												? 'border-accent bg-accent text-paper'
												: 'border-ink-4 text-ink-3 hover:border-ink hover:bg-ink hover:text-paper'
										]}>#{t}</button
									>
								{/each}
							</div>
						{/if}
					</div>
					<span
						class="self-center justify-self-start border-[1.5px] border-ink px-1.5 py-0.5 font-pixel text-[9px] uppercase tracking-[0.12em] text-ink md:justify-self-start"
						>{post.cat}</span
					>
					<span
						class="self-center justify-self-start font-pixel text-[9px] uppercase tracking-[0.12em] text-ink-3 md:justify-self-end"
						>{post.time}</span
					>
				</div>
			{/each}
		</section>

	</div>

	<!-- SIDEBAR -->
	<aside class="static flex flex-col gap-3.5 lg:sticky lg:top-4">
		{#snippet box(title: string, content: import('svelte').Snippet)}
			<div class="shadow-block-sm border-2 border-ink bg-paper-lite">
				<div
					class="flex justify-between border-b-2 border-ink bg-ink px-3 py-1.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper before:text-accent before:content-['§_']"
				>
					{title}
				</div>
				<div class="p-3.5">
					{@render content()}
				</div>
			</div>
		{/snippet}

		{#snippet notifyBody()}
			<p class="mb-3 font-mono text-[12px] leading-[1.5] text-ink-2">
				New posts on automation, Rust, and stealth systems. No spam.
			</p>
			<NewsletterForm variant="light" />
		{/snippet}

		{#snippet recentBody()}
			<div class="flex flex-col gap-2.5">
				{#each posts.slice(0, 3) as r (r._id ?? r.n)}
					<a
						href="/blog/{r.slug}"
						class="block border-[1.5px] border-ink bg-paper p-2 text-inherit no-underline hover:bg-ink hover:[&_.rd]:text-paper hover:[&_.rt]:text-paper"
					>
						<div class="rd font-pixel text-[9px] uppercase tracking-[0.12em] text-accent">{r.date}</div>
						<div class="rt mt-1 font-serif text-[16px] leading-[1.2] text-ink">
							{r.title}{r.titleEm ?? ''}
						</div>
					</a>
				{/each}
			</div>
		{/snippet}

		{#snippet archiveBody()}
			<ul class="m-0 list-none p-0 font-mono text-[13px]">
				{#each years as row (row.year)}
					<li class="flex justify-between border-b border-dashed border-ink-4 py-1.5 text-ink-2 last:border-b-0">
						<span class="text-ink">{row.year}</span>
						<span class="font-pixel text-[10px] tracking-[0.06em] text-ink-3">{row.count}</span>
					</li>
				{/each}
			</ul>
		{/snippet}

		{#snippet tagsBody()}
			{#if cloud.length}
				<div class="flex flex-wrap gap-1.5">
					{#each cloud as tag (tag)}
						<button
							type="button"
							onclick={() => (activeTag = activeTag === tag ? null : tag)}
							class={[
								'cursor-pointer border-[1.5px] px-1.5 py-0.5 font-pixel text-[9px] uppercase tracking-[0.1em]',
								activeTag === tag
									? 'border-accent bg-accent text-paper'
									: 'border-ink text-ink hover:bg-ink hover:text-paper'
							]}>#{tag}</button
						>
					{/each}
				</div>
			{:else}
				<p class="m-0 font-mono text-[12px] text-ink-3">No tags yet.</p>
			{/if}
		{/snippet}

		{@render box('NOTIFY', notifyBody)}
		{@render box('RECENT', recentBody)}
		{@render box('ARCHIVE', archiveBody)}
		{@render box('TAGS', tagsBody)}
	</aside>
</div>
