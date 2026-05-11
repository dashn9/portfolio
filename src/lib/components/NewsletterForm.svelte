<script lang="ts">
	type Variant = 'dark' | 'light';
	let { variant = 'light' as Variant }: { variant?: Variant } = $props();

	let email = $state('');
	let website = $state(''); // honeypot
	let status = $state<'idle' | 'submitting' | 'success' | 'already' | 'error'>('idle');
	let errorMessage = $state('');

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (status === 'submitting') return;
		status = 'submitting';
		errorMessage = '';
		try {
			const res = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, website })
			});
			let body: { error?: string; status?: string } = {};
			try {
				body = await res.json();
			} catch {
				/* ignore */
			}
			if (!res.ok) {
				status = 'error';
				errorMessage = body.error ?? `Request failed (${res.status}).`;
				return;
			}
			if (body.status === 'already_subscribed') {
				status = 'already';
			} else {
				status = 'success';
				email = '';
			}
		} catch {
			status = 'error';
			errorMessage = 'Network error. Check your connection and try again.';
		}
	}

	const isDark = $derived(variant === 'dark');
</script>

<form class="flex flex-col gap-2" onsubmit={onSubmit} novalidate>
	<div class="flex flex-col gap-2 sm:flex-row">
		<input
			type="email"
			bind:value={email}
			required
			maxlength={254}
			disabled={status === 'submitting'}
			placeholder="you@domain.com"
			aria-label="Email address"
			class={[
				'min-w-0 flex-1 border-2 px-3 py-2 font-mono text-[13px] outline-none disabled:opacity-60',
				isDark
					? 'border-white/40 bg-transparent text-paper placeholder:text-white/50 focus:border-white'
					: 'border-ink bg-paper text-ink placeholder:text-ink-3 focus:border-accent'
			].join(' ')}
		/>
		<!-- honeypot: hidden from real users, visible to naive bots -->
		<input
			type="text"
			tabindex="-1"
			autocomplete="off"
			bind:value={website}
			aria-hidden="true"
			class="absolute left-[-9999px] h-px w-px opacity-0"
			name="website"
		/>
		<button
			type="submit"
			disabled={status === 'submitting'}
			class={[
				'press-block shadow-block-sm border-2 px-4 py-2 font-pixel text-[10px] uppercase tracking-[0.12em] no-underline disabled:cursor-not-allowed disabled:opacity-60',
				isDark
					? 'border-white/80 bg-paper text-ink hover:bg-accent hover:text-paper'
					: 'border-ink bg-accent text-paper hover:bg-ink'
			].join(' ')}
		>
			{status === 'submitting' ? 'SENDING…' : 'NOTIFY ME →'}
		</button>
	</div>

	<div
		role="status"
		aria-live="polite"
		class={[
			'min-h-[1.2em] font-pixel text-[9px] uppercase tracking-[0.12em]',
			isDark ? 'text-white/80' : 'text-ink-3'
		].join(' ')}
	>
		{#if status === 'success'}
			<span class={isDark ? 'text-paper' : 'text-accent'}>» SUBSCRIBED. CHECK YOUR INBOX SOON.</span>
		{:else if status === 'already'}
			<span>» ALREADY ON THE LIST.</span>
		{:else if status === 'error'}
			<span class={isDark ? 'text-paper' : 'text-accent'}>» {errorMessage}</span>
		{:else}
			<span>» NO SPAM. UNSUBSCRIBE ANYTIME.</span>
		{/if}
	</div>
</form>
