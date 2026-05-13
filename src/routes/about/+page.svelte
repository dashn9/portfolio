<svelte:head>
	<title>Daniel Shogbon — About</title>
</svelte:head>

<section
	class="shadow-block-lg grid grid-cols-1 border-2 border-ink bg-paper-lite md:grid-cols-[1.55fr_1fr]"
>
	<div class="border-b-2 border-ink p-9 md:border-b-0 md:border-r-2">
		<div class="mb-4 font-pixel text-[10px] uppercase tracking-[0.12em] text-ink-3">
			<a href="/" class="text-accent no-underline">INDEX</a>
			<span class="mx-1.5 text-ink-4">/</span> ABOUT
		</div>
		<h1
			class="mb-4 font-serif text-[clamp(44px,6.5vw,80px)] font-normal leading-none tracking-[-0.025em] text-ink [&_em]:italic [&_em]:text-ink-3"
		>
			Daniel <em>Shogbon.</em>
		</h1>
		<p class="max-w-[50ch] font-mono text-[15px] leading-[1.6] text-ink-2">
			Software engineer. Eight years across Rust, Go, Python, and JavaScript.
			<br /><br />
			I build things that move fast and stay hidden — browser automation, stealth systems, distributed
			infrastructure. Currently shipping
			<a
				href="https://rustybrowser.com"
				target="_blank"
				rel="noopener noreferrer"
				class="text-accent no-underline hover:underline">Rusty Browser</a
			>, a distributed AI-driven browser automation cluster.
			<br /><br />
			Started in 2017 with a PHP site. Now I write Rust that talks to browsers at the protocol layer.
		</p>
		<div class="mt-6 flex flex-wrap gap-2.5">
			<a
				href="https://github.com/dashn9"
				target="_blank"
				rel="noopener noreferrer"
				class="press-block shadow-block-sm border-2 border-ink bg-accent px-[18px] py-[11px] font-pixel text-[11px] uppercase tracking-[0.1em] text-paper no-underline hover:press-block-on hover:bg-ink"
				>GITHUB ↗</a
			>
			<a
				href="/contact"
				class="press-block shadow-block-sm border-2 border-ink bg-paper-lite px-[18px] py-[11px] font-pixel text-[11px] uppercase tracking-[0.1em] text-ink no-underline hover:press-block-on hover:bg-ink hover:text-paper"
				>SEND A NOTE</a
			>
			<a
				href="/cv/DanielShogbon_resume_20250506.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="press-block shadow-block-sm border-2 border-ink bg-paper-lite px-[18px] py-[11px] font-pixel text-[11px] uppercase tracking-[0.1em] text-ink no-underline hover:press-block-on hover:bg-ink hover:text-paper"
				>RÉSUMÉ ↓</a
			>
		</div>
	</div>
	<div class="grid grid-rows-[auto_1fr_auto] bg-ink text-paper">
		<div
			class="border-b-2 border-paper-edge px-3.5 py-2.5 font-pixel text-[10px] uppercase tracking-[0.14em] text-paper"
		>
			// STACK.LOG
		</div>
		<div class="bg-dot-ink p-[22px]">
			{#each [['RUST', 'AUTOMATION · SYSTEMS'], ['SVELTE 5', 'FRONTEND · PRIMARY'], ['NEXT.JS', 'FRONTEND · SECOND'], ['GO', 'BACKEND · INFRA'], ['PYTHON', 'AUTOMATION · BOTS'], ['KUBERNETES', 'DEPLOYMENT']] as [lang, note] (lang)}
				<div
					class="flex justify-between border-b border-dashed border-paper-edge py-2.5 font-pixel text-[10px] uppercase tracking-[0.12em] last:border-b-0"
				>
					<span class="text-paper">{lang}</span>
					<span class="text-ink-4">{note}</span>
				</div>
			{/each}
		</div>
		<div
			class="border-t-2 border-paper-edge px-3.5 py-3 font-pixel text-[9px] uppercase tracking-[0.14em] text-ink-4"
		>
			● BUILDING RUSTYBROWSER.COM
		</div>
	</div>
</section>
