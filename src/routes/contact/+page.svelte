<script lang="ts">
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let sent = $state(false);

	function onSubmit(e: Event) {
		e.preventDefault();
		sent = true;
		name = '';
		email = '';
		message = '';
	}

	const links = [
		{ label: 'GITHUB', value: 'github.com/dashn9', url: 'https://github.com/dashn9' },
		{ label: 'EMAIL', value: 'ishogbon@gmail.com', url: 'mailto:ishogbon@gmail.com' },
		{ label: 'WRITING', value: '/blog', url: '/blog' }
	];

	const faqs = [
		{
			q: 'What are you working on?',
			a: 'Full-time on Rusty Browser — a distributed, AI-driven browser automation cluster in Rust. Visit rustybrowser.com for the latest.'
		},
		{
			q: 'Are you open to collaboration?',
			a: 'Yes, especially around browser automation and Rust tooling. Open a GitHub issue or email me directly.'
		},
		{
			q: 'What is the best way to reach you?',
			a: 'Email. Response time is usually within 48 hours.'
		}
	];
</script>

<svelte:head>
	<title>Daniel Shogbon — Contact</title>
</svelte:head>

<!-- HEADER -->
<section class="shadow-block-lg grid grid-cols-1 border-2 border-ink bg-paper-lite md:grid-cols-[1.4fr_1fr]">
	<div class="border-b-2 border-ink p-9 md:border-b-0 md:border-r-2">
		<div class="mb-4 font-pixel text-[10px] uppercase tracking-[0.12em] text-ink-3">
			<a href="/" class="text-accent no-underline">INDEX</a>
			<span class="mx-1.5 text-ink-4">/</span> CONTACT
		</div>
		<h1
			class="mb-3.5 font-serif text-[clamp(40px,5.5vw,68px)] font-normal leading-none tracking-[-0.025em] text-ink [&_em]:italic [&_em]:text-ink-3"
		>
			Send a note, <em>hear back.</em>
		</h1>
		<p class="max-w-[52ch] font-mono text-[15px] leading-[1.6] text-ink-2">
			Currently heads-down on
			<a
				href="https://rustybrowser.com"
				target="_blank"
				rel="noopener noreferrer"
				class="text-accent no-underline hover:underline">Rusty Browser</a
			>. Not taking contract work right now, but always open to conversations about browser
			automation, Rust, or distributed systems.
			<br /><br />
			Response time is usually within 48 hours.
		</p>
	</div>
	<div class="grid grid-rows-[auto_1fr] bg-ink text-paper">
		<div
			class="border-b-2 border-paper-edge px-3.5 py-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper"
		>
			// CONTACT.LINKS
		</div>
		<div class="bg-dot-ink flex flex-col justify-center gap-4 p-[22px]">
			{#each links as link (link.label)}
				<a
					href={link.url}
					target={link.url.startsWith('http') ? '_blank' : undefined}
					rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
					class="group flex items-center justify-between border border-dashed border-paper-edge py-2 no-underline hover:border-solid hover:border-accent"
				>
					<span class="font-pixel text-[9px] uppercase tracking-[0.14em] text-ink-4 group-hover:text-accent"
						>{link.label}</span
					>
					<span class="font-mono text-[13px] text-paper group-hover:text-accent">{link.value} ↗</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- FORM + FAQ -->
<div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_360px]">
	<!-- FORM -->
	<section class="shadow-block-md border-2 border-ink bg-paper-lite">
		<div
			class="border-b-2 border-ink bg-ink px-3.5 py-2 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper"
		>
			// SEND.MESSAGE
		</div>
		<div class="p-7">
			{#if sent}
				<div
					class="border-2 border-accent bg-accent-soft px-5 py-6 font-pixel text-[11px] uppercase tracking-[0.12em] text-ink"
				>
					» MESSAGE RECEIVED. TALK SOON.
				</div>
			{:else}
				<form class="flex flex-col gap-4" onsubmit={onSubmit}>
					<div class="flex flex-col gap-1.5">
						<label for="c-name" class="font-pixel text-[9px] uppercase tracking-[0.14em] text-accent"
							>» NAME</label
						>
						<input
							id="c-name"
							type="text"
							bind:value={name}
							required
							placeholder="Your name"
							class="border-2 border-ink bg-paper px-3 py-2.5 font-mono text-[14px] text-ink outline-none placeholder:text-ink-3 focus:border-accent"
						/>
					</div>
					<div class="flex flex-col gap-1.5">
						<label
							for="c-email"
							class="font-pixel text-[9px] uppercase tracking-[0.14em] text-accent">» EMAIL</label
						>
						<input
							id="c-email"
							type="email"
							bind:value={email}
							required
							placeholder="you@elsewhere.com"
							class="border-2 border-ink bg-paper px-3 py-2.5 font-mono text-[14px] text-ink outline-none placeholder:text-ink-3 focus:border-accent"
						/>
					</div>
					<div class="flex flex-col gap-1.5">
						<label for="c-msg" class="font-pixel text-[9px] uppercase tracking-[0.14em] text-accent"
							>» MESSAGE</label
						>
						<textarea
							id="c-msg"
							bind:value={message}
							required
							placeholder="What are you building?"
							rows={5}
							class="resize-none border-2 border-ink bg-paper px-3 py-2.5 font-mono text-[14px] text-ink outline-none placeholder:text-ink-3 focus:border-accent"
						></textarea>
					</div>
					<button
						type="submit"
						class="press-block shadow-block-sm self-start border-2 border-ink bg-accent px-[22px] py-[11px] font-pixel text-[11px] uppercase tracking-[0.1em] text-paper hover:press-block-on hover:bg-ink"
						>SEND NOTE →</button
					>
				</form>
			{/if}
		</div>
	</section>

	<!-- FAQ -->
	<aside class="static flex flex-col gap-3.5 lg:sticky lg:top-4">
		<div class="shadow-block-sm border-2 border-ink bg-paper-lite">
			<div
				class="border-b-2 border-ink bg-ink px-3 py-1.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper before:text-accent before:content-['§_']"
			>
				FAQ
			</div>
			<div class="flex flex-col divide-y divide-dashed divide-ink-4">
				{#each faqs as faq (faq.q)}
					<div class="p-4">
						<div class="mb-2 font-pixel text-[10px] uppercase tracking-[0.12em] text-ink">
							{faq.q}
						</div>
						<p class="m-0 font-mono text-[13px] leading-[1.55] text-ink-2">{faq.a}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="shadow-block-sm border-2 border-ink bg-paper-lite">
			<div
				class="border-b-2 border-ink bg-ink px-3 py-1.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper before:text-accent before:content-['§_']"
			>
				DIRECT
			</div>
			<div class="p-4">
				<p class="m-0 mb-3 font-mono text-[13px] leading-[1.5] text-ink-2">
					Prefer email? Write directly to:
				</p>
				<a
					href="mailto:ishogbon@gmail.com"
					class="font-pixel text-[10px] uppercase tracking-[0.1em] text-accent no-underline hover:underline"
					>ISHOGBON@GMAIL.COM ↗</a
				>
			</div>
		</div>
	</aside>
</div>
