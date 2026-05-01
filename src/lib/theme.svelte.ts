import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function readInitial(): Theme {
	if (!browser) return 'light';
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved === 'light' || saved === 'dark') return saved;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(theme: Theme) {
	if (!browser) return;
	document.documentElement.classList.toggle('dark', theme === 'dark');
}

class ThemeStore {
	current = $state<Theme>('light');

	init() {
		if (!browser) return;
		this.current = readInitial();
		apply(this.current);
	}

	set(theme: Theme) {
		this.current = theme;
		if (browser) {
			localStorage.setItem(STORAGE_KEY, theme);
			apply(theme);
		}
	}

	toggle() {
		this.set(this.current === 'dark' ? 'light' : 'dark');
	}
}

export const theme = new ThemeStore();
