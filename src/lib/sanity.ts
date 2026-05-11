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

const WORDS_PER_MINUTE = 220;
const AVG_CHARS_PER_WORD = 5;

function readTimeFromChars(chars: number): string {
	const mins = Math.max(1, Math.round(chars / AVG_CHARS_PER_WORD / WORDS_PER_MINUTE));
	return `${mins} MIN`;
}

function readTimeFromText(text: string): string {
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	const mins = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
	return `${mins} MIN`;
}

function extractText(body: unknown[]): string {
	if (!body?.length) return '';
	return (body as Array<{ _type: string; children?: Array<{ text: string }> }>)
		.filter((b) => b._type === 'block')
		.map((b) => b.children?.map((c) => c.text).join('') ?? '')
		.join(' ');
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
		bodyChars: number;
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
			"bodyChars": length(pt::text(body))
		}`
	);

	return raw.map((p, i) => ({
		_id: p._id,
		slug: p.slug,
		title: p.title,
		titleEm: p.titleEm,
		titleTail: p.titleTail,
		desc: p.desc,
		cat: p.cat,
		n: '/' + String(raw.length - i).padStart(3, '0'),
		date: formatDate(p.date),
		time: readTimeFromChars(p.bodyChars ?? 0)
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
		time: readTimeFromText(extractText(p.body))
	};
}
