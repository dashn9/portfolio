<script lang="ts">
	type Post = {
		n: string;
		date: string;
		title: string;
		titleEm?: string;
		titleTail?: string;
		desc: string;
		cat: string;
		time: string;
	};

	const posts: Post[] = [
		{
			n: '/037',
			date: '2025.11.02',
			title: 'Slow tools for ',
			titleEm: 'slow people.',
			desc: 'A list of seven small applications I keep coming back to, all under 10 megabytes, none with a subscription, and what each one taught me about the shape of attention.',
			cat: 'NOTES',
			time: '11 MIN'
		},
		{
			n: '/036',
			date: '2025.07.19',
			title: 'What the light does in ',
			titleEm: 'July.',
			desc: "Notes from two weeks at a friend's cabin in northern Sweden, with a borrowed camera and no deadlines. Mostly about latitude, a little about how you photograph quiet.",
			cat: 'ESSAY',
			time: '4 MIN'
		},
		{
			n: '/035',
			date: '2025.03.30',
			title: 'A letter to anyone ',
			titleEm: 'starting a press.',
			desc: 'After working with three independent presses in two years, the things I wish someone had told me about pricing, paper, the first cover, the second cover, and the long quiet middle.',
			cat: 'LETTER',
			time: '9 MIN'
		},
		{
			n: '/034',
			date: '2024.12.08',
			title: 'Twelve fonts I keep ',
			titleEm: 'coming back to.',
			desc: 'A short, opinionated, mostly-not-revival list. Each entry has one project where it earned its place. Includes one font you have probably never heard of and one you definitely have.',
			cat: 'LIST',
			time: '7 MIN'
		},
		{
			n: '/033',
			date: '2024.09.21',
			title: 'On naming things, ',
			titleEm: 'finally.',
			desc: "Twelve years of trying to name files, projects, brands, kids' bands, paint colors. A small theory about why naming is the only honest part of the work — and three rules I now refuse to break.",
			cat: 'NOTES',
			time: '5 MIN'
		},
		{
			n: '/032',
			date: '2024.06.01',
			title: 'Nine years of ',
			titleEm: 'one-to-one',
			titleTail: ' websites.',
			desc: 'An essay on building websites for individual people — not products, not brands, not platforms — and what that has taught me about scale, attention, and the strange small economy of personal sites.',
			cat: 'ESSAY',
			time: '14 MIN'
		},
		{
			n: '/031',
			date: '2024.02.19',
			title: 'What I learned from ',
			titleEm: 'leaving',
			titleTail: ' a studio.',
			desc: 'Five years independent, after five years on a team. The trade-offs I expected, the ones I didn\'t, and the question I now ask anyone who tells me they want to "go solo".',
			cat: 'LETTER',
			time: '8 MIN'
		},
		{
			n: '/030',
			date: '2023.10.03',
			title: 'A small theory of ',
			titleEm: 'captions.',
			desc: 'Why captions, footnotes, and image credits are the most honest typography on any page — and how I now design them first, not last. With examples from three recent projects.',
			cat: 'NOTES',
			time: '6 MIN'
		}
	];

	const tagsToolbar = ['ALL', 'ESSAY', 'NOTES', 'LETTER', 'LIST', 'TYPE'];
	let activeTag = $state('ALL');
	let search = $state('');

	const archive = [
		{ year: '2026', count: '02' },
		{ year: '2025', count: '09' },
		{ year: '2024', count: '11' },
		{ year: '2023', count: '07' },
		{ year: '2022', count: '05' },
		{ year: '2021', count: '03' },
		{ year: '2020', count: '02' },
		{ year: '2019', count: '01' }
	];

	const cloud = [
		{ label: 'ESSAY', hot: true },
		{ label: 'NOTES' },
		{ label: 'LETTER' },
		{ label: 'LIST' },
		{ label: 'TYPE' },
		{ label: 'PROCESS' },
		{ label: 'WILDFERN' },
		{ label: 'HALFTONE' },
		{ label: 'READING' },
		{ label: 'TEACHING' },
		{ label: 'STUDIO' },
		{ label: 'SOUP' }
	];

	const stats = [
		{ k: 'SUBSCRIBERS', v: '1,247', hot: true },
		{ k: 'LETTERS POSTED', v: '38' },
		{ k: 'SINCE', v: 'JAN 2019' },
		{ k: 'AVG. READ', v: '7 MIN' },
		{ k: 'NEXT LETTER', v: "MAY '26" },
		{ k: 'TRACKING', v: 'NONE.' }
	];

	let subEmail = $state('');
	let subJoined = $state(false);
	function onSubscribe(e: Event) {
		e.preventDefault();
		subJoined = true;
		subEmail = '';
	}
</script>

<svelte:head>
	<title>Daniel Shogbon — Dear Letter</title>
</svelte:head>

<!-- HEADER -->
<section class="shadow-block-lg grid grid-cols-1 border-2 border-ink bg-paper-lite md:grid-cols-[1.4fr_1fr]">
	<div class="border-b-2 border-ink p-9 md:border-b-0 md:border-r-2">
		<div class="mb-4 font-pixel text-[10px] uppercase tracking-[0.12em] text-ink-3">
			<a href="/" class="text-accent no-underline">INDEX</a>
			<span class="mx-1.5 text-ink-4">/</span> WRITING
			<span class="mx-1.5 text-ink-4">/</span> DEAR LETTER
		</div>
		<h1
			class="mb-3.5 font-serif text-[clamp(40px,5.5vw,68px)] font-normal leading-none tracking-[-0.025em] text-ink [&_em]:italic [&_em]:text-ink-3"
		>
			Dear letter, <em>the archive.</em>
		</h1>
		<p class="max-w-[52ch] font-mono text-[15px] leading-[1.6] text-ink-2">
			A quarterly letter on type, process, the studio, things I read on the train, and occasionally
			a recipe for soup. Started in 2019. 38 letters and counting. No tracking, no ads, easy to
			leave.
		</p>
	</div>
	<div class="flex flex-col bg-ink text-paper">
		<div
			class="border-b-2 border-paper-edge px-3.5 py-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper"
		>
			// LETTER.STATS
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
			placeholder="search 38 letters — type, process, the studio…"
			class="flex-1 border-0 bg-transparent font-mono text-[14px] text-ink outline-none"
		/>
	</div>
	<div class="flex flex-wrap items-center gap-1.5 px-3.5 py-2.5">
		{#each tagsToolbar as tag (tag)}
			<button
				type="button"
				onclick={() => (activeTag = tag)}
				class={[
					'cursor-pointer border-[1.5px] px-2 py-1 font-pixel text-[9px] uppercase tracking-[0.12em]',
					activeTag === tag
						? 'border-accent bg-accent text-paper hover:border-ink hover:bg-ink'
						: 'border-ink bg-paper-lite text-ink hover:bg-ink hover:text-paper'
				]}>{tag}</button
			>
		{/each}
	</div>
</div>

<!-- MAIN GRID -->
<div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_280px]">
	<div class="flex flex-col gap-4">
		<!-- FEATURED -->
		<article class="shadow-block-accent grid grid-cols-1 border-2 border-ink bg-paper-lite md:grid-cols-2">
			<div
				class="thumb-feat flex min-h-[280px] flex-col justify-between border-b-2 border-ink p-7 md:border-b-0 md:border-r-2"
			>
				<div
					class="self-start border-[1.5px] border-accent bg-ink px-2 py-1 font-pixel text-[10px] uppercase tracking-[0.16em] text-accent"
				>
					★ FEATURED · NEW
				</div>
				<div
					class="self-start bg-ink px-3 py-1 font-serif text-[96px] italic leading-none text-paper"
				>
					K
				</div>
				<div
					class="self-start bg-ink px-2 py-1 font-pixel text-[9px] uppercase tracking-[0.14em] text-paper"
				>
					2026.02.14 · 6 MIN · ESSAY
				</div>
			</div>
			<div class="flex flex-col gap-3 p-7">
				<div class="font-pixel text-[10px] uppercase tracking-[0.14em] text-accent">§ LETTER 038</div>
				<h2
					class="m-0 font-serif text-[38px] font-normal leading-[1.05] tracking-[-0.02em] text-ink [&_em]:italic [&_em]:text-ink-3"
				>
					On <em>kerning</em> by ear.
				</h2>
				<p class="m-0 font-mono text-[14px] leading-[1.55] text-ink-2">
					Why I gave up on automated kerning years ago, what I learned from reading old type
					specimens out loud on the bus, and a small set of rules I keep on a postcard pinned above
					my desk. With samples from a wordmark I'm finishing this month.
				</p>
				<div
					class="flex gap-2.5 font-pixel text-[9px] uppercase tracking-[0.14em] text-ink-3 [&>span]:before:text-ink-4 [&>span]:before:content-['·_'] [&>span:first-child]:before:content-none"
				>
					<span>FILED · ESSAY</span><span>TYPE</span><span>PROCESS</span><span>WILDFERN</span>
				</div>
				<div class="mt-1.5 flex items-center gap-2.5">
					<a
						href="#"
						class="border-b-2 border-accent py-1.5 font-pixel text-[11px] uppercase tracking-[0.1em] text-accent no-underline hover:border-ink hover:bg-accent hover:px-2 hover:text-paper"
						>READ THE LETTER →</a
					>
					<span class="font-pixel text-[9px] uppercase tracking-[0.12em] text-ink-3">
						2,847 WORDS · 6 MIN
					</span>
				</div>
			</div>
		</article>

		<!-- POSTS -->
		<section class="shadow-block-md border-2 border-ink bg-paper-lite">
			<div
				class="flex justify-between border-b-2 border-ink bg-ink px-3.5 py-2 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper"
			>
				<span>// LETTER.ARCHIVE — 37 OTHER POSTS</span>
				<span class="bg-accent px-2 py-0.5">PAGE 1 OF 4</span>
			</div>

			{#each posts as post (post.n)}
				<div
					class="grid cursor-pointer grid-cols-1 items-baseline gap-3.5 border-b border-dashed border-ink-4 px-[18px] py-3.5 transition-colors duration-100 ease-[steps(2,end)] last:border-b-0 hover:bg-accent hover:text-paper hover:[&_*]:text-paper md:grid-cols-[110px_60px_1fr_110px_70px]"
				>
					<div class="font-pixel text-[10px] tracking-[0.12em] text-accent">{post.n}</div>
					<div class="font-pixel text-[10px] tracking-[0.06em] text-ink-3">{post.date}</div>
					<div>
						<div
							class="mb-1 font-serif text-[22px] leading-[1.15] tracking-[-0.01em] text-ink [&_em]:italic [&_em]:text-ink-3"
						>
							{post.title}{#if post.titleEm}<em>{post.titleEm}</em>{/if}{post.titleTail ?? ''}
						</div>
						<p class="m-0 max-w-[56ch] font-mono text-[12px] text-ink-3">{post.desc}</p>
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

		<!-- PAGER -->
		<div class="mt-1 flex justify-center gap-1.5 py-3.5">
			<a
				href="#"
				class="shadow-pager inline-flex h-9 items-center justify-center border-2 border-ink bg-paper-lite px-3 font-pixel text-[11px] uppercase tracking-[0.1em] text-ink no-underline hover:bg-ink hover:text-paper"
				>← PREV</a
			>
			<span
				class="shadow-pager inline-flex size-9 items-center justify-center border-2 border-ink bg-accent font-pixel text-[11px] uppercase tracking-[0.1em] text-paper"
				>1</span
			>
			<a
				href="#"
				class="shadow-pager inline-flex size-9 items-center justify-center border-2 border-ink bg-paper-lite font-pixel text-[11px] uppercase tracking-[0.1em] text-ink no-underline hover:bg-ink hover:text-paper"
				>2</a
			>
			<a
				href="#"
				class="shadow-pager inline-flex size-9 items-center justify-center border-2 border-ink bg-paper-lite font-pixel text-[11px] uppercase tracking-[0.1em] text-ink no-underline hover:bg-ink hover:text-paper"
				>3</a
			>
			<a
				href="#"
				class="shadow-pager inline-flex size-9 items-center justify-center border-2 border-ink bg-paper-lite font-pixel text-[11px] uppercase tracking-[0.1em] text-ink no-underline hover:bg-ink hover:text-paper"
				>4</a
			>
			<a
				href="#"
				class="shadow-pager inline-flex h-9 items-center justify-center border-2 border-ink bg-paper-lite px-3 font-pixel text-[11px] uppercase tracking-[0.1em] text-ink no-underline hover:bg-ink hover:text-paper"
				>NEXT →</a
			>
		</div>
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

		{#snippet subscribeBody()}
			<p class="mb-2.5 font-mono text-[12px] leading-[1.5] text-ink-2">
				A quarterly letter, once every three months. Usually a Sunday.
			</p>
			<form class="flex flex-col gap-2" onsubmit={onSubscribe}>
				<input
					type="email"
					bind:value={subEmail}
					placeholder="you@elsewhere.com"
					required
					aria-label="Email address"
					class="border-2 border-ink bg-paper px-2.5 py-2 font-mono text-[13px] text-ink outline-none placeholder:text-ink-3 focus:border-accent"
				/>
				<button
					type="submit"
					class="press-block shadow-block-sm cursor-pointer border-2 border-ink bg-accent px-3 py-2 font-pixel text-[10px] uppercase tracking-[0.12em] text-paper hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-ink hover:shadow-[1px_1px_0_var(--color-ink)]"
					>JOIN 1,247 OTHERS →</button
				>
			</form>
			{#if subJoined}
				<p class="mt-2.5 font-mono text-[12px] leading-[1.5] text-ink-2">
					» Thanks. You are on the list.
				</p>
			{/if}
		{/snippet}

		{#snippet recentBody()}
			<div class="flex flex-col gap-2.5">
				{#each [{ d: '2026.02.14', t: 'On kerning by ear' }, { d: '2025.11.02', t: 'Slow tools for slow people' }, { d: '2025.07.19', t: 'What the light does in July' }] as r (r.d)}
					<a
						href="#"
						class="block border-[1.5px] border-ink bg-paper p-2 text-inherit no-underline hover:bg-ink hover:[&_.rd]:text-paper hover:[&_.rt]:text-paper"
					>
						<div class="rd font-pixel text-[9px] uppercase tracking-[0.12em] text-accent">
							{r.d}
						</div>
						<div class="rt mt-1 font-serif text-[16px] leading-[1.2] text-ink">{r.t}</div>
					</a>
				{/each}
			</div>
		{/snippet}

		{#snippet archiveBody()}
			<ul class="m-0 list-none p-0 font-mono text-[13px]">
				{#each archive as row (row.year)}
					<li
						class="flex justify-between border-b border-dashed border-ink-4 py-1.5 text-ink-2 last:border-b-0"
					>
						<a href="#" class="text-ink no-underline hover:bg-transparent hover:text-accent"
							>{row.year}</a
						>
						<span class="font-pixel text-[10px] tracking-[0.06em] text-ink-3">{row.count}</span>
					</li>
				{/each}
			</ul>
		{/snippet}

		{#snippet tagsBody()}
			<div class="flex flex-wrap gap-1.5">
				{#each cloud as tag (tag.label)}
					<span
						class={[
							'border-[1.5px] px-1.5 py-0.5 font-pixel text-[9px] uppercase tracking-[0.1em]',
							tag.hot
								? 'border-accent bg-accent text-paper'
								: 'border-ink text-ink'
						]}>{tag.label}</span
					>
				{/each}
			</div>
		{/snippet}

		{#snippet rssBody()}
			<p class="mb-2 font-mono text-[13px] leading-[1.5] text-ink-2">
				An RSS feed exists, because of course.
			</p>
			<a
				href="#"
				class="font-pixel text-[10px] uppercase tracking-[0.12em] text-accent no-underline"
				>FEED.XML →</a
			>
		{/snippet}

		{@render box('SUBSCRIBE', subscribeBody)}
		{@render box('RECENT', recentBody)}
		{@render box('ARCHIVE', archiveBody)}
		{@render box('TAGS', tagsBody)}
		{@render box('RSS', rssBody)}
	</aside>
</div>
