import { createClient } from '@sanity/client';
import { env } from '$env/dynamic/public';

export const sanity = createClient({
	projectId: env.PUBLIC_SANITY_PROJECT_ID,
	dataset: env.PUBLIC_SANITY_DATASET ?? 'production',
	apiVersion: '2026-01-01',
	useCdn: true
});

export type Post = {
	_id: string;
	slug: string;
	n: string;
	date: string;
	title: string;
	titleEm?: string;
	titleTail?: string;
	desc: string;
	cat: string;
	time: string;
	body?: unknown[];
};

function extractText(body: unknown[]): string {
	if (!body?.length) return '';
	return (body as Array<{ _type: string; children?: Array<{ text: string }> }>)
		.filter((b) => b._type === 'block')
		.map((b) => b.children?.map((c) => c.text).join('') ?? '')
		.join(' ');
}

function calcReadTime(body: unknown[]): string {
	const words = extractText(body).trim().split(/\s+/).filter(Boolean).length;
	const mins = Math.max(1, Math.round(words / 220));
	return `${mins} MIN`;
}

function formatDate(iso: string): string {
	return iso.slice(0, 10).replace(/-/g, '.');
}

export async function getPosts(): Promise<Post[]> {
	const raw = await sanity.fetch<Array<{
		_id: string;
		slug: string;
		date: string;
		title: string;
		titleEm?: string;
		titleTail?: string;
		desc: string;
		cat: string;
		body: unknown[];
	}>>(
		`*[_type == "post"] | order(publishedAt desc) {
			_id,
			"slug": slug.current,
			"date": publishedAt,
			title,
			titleEm,
			titleTail,
			"desc": excerpt,
			cat,
			body
		}`
	);

	return raw.map((p, i) => ({
		...p,
		n: '/' + String(raw.length - i).padStart(3, '0'),
		date: formatDate(p.date),
		time: calcReadTime(p.body)
	}));
}

export async function getPost(slug: string): Promise<Post | null> {
	const p = await sanity.fetch<{
		_id: string;
		slug: string;
		date: string;
		title: string;
		titleEm?: string;
		titleTail?: string;
		desc: string;
		cat: string;
		body: unknown[];
	} | null>(
		`*[_type == "post" && slug.current == $slug][0] {
			_id,
			"slug": slug.current,
			"date": publishedAt,
			title,
			titleEm,
			titleTail,
			"desc": excerpt,
			cat,
			body
		}`,
		{ slug }
	);

	if (!p) return null;
	return {
		...p,
		n: '',
		date: formatDate(p.date),
		time: calcReadTime(p.body)
	};
}
