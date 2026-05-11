import { env } from '$env/dynamic/private';

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

export class NotionError extends Error {
	constructor(
		message: string,
		readonly status: number,
		readonly code?: string
	) {
		super(message);
	}
}

function requireEnv(name: string): string {
	const v = env[name];
	if (!v) throw new NotionError(`Server is not configured: missing ${name}`, 500, 'config_missing');
	return v;
}

async function notionFetch(path: string, init: RequestInit) {
	const token = requireEnv('NOTION_TOKEN');
	const res = await fetch(`${NOTION_API}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${token}`,
			'Notion-Version': NOTION_VERSION,
			'Content-Type': 'application/json',
			...(init.headers ?? {})
		}
	});
	const text = await res.text();
	let body: unknown = null;
	if (text) {
		try {
			body = JSON.parse(text);
		} catch {
			body = text;
		}
	}
	if (!res.ok) {
		const obj = (body && typeof body === 'object' ? body : {}) as {
			message?: string;
			code?: string;
		};
		throw new NotionError(
			obj.message ?? `Notion API error ${res.status}`,
			res.status,
			obj.code
		);
	}
	return body;
}

type NotionQueryResponse = { results: unknown[] };

async function emailExists(databaseId: string, email: string): Promise<boolean> {
	const body = (await notionFetch(`/databases/${databaseId}/query`, {
		method: 'POST',
		body: JSON.stringify({
			page_size: 1,
			filter: { property: 'email', email: { equals: email } }
		})
	})) as NotionQueryResponse;
	return Array.isArray(body.results) && body.results.length > 0;
}

export type SubscribeResult = { status: 'created' | 'already_subscribed' };

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
	const databaseId = requireEnv('NOTION_NEWSLETTER_DATABASE_ID');

	if (await emailExists(databaseId, email)) {
		return { status: 'already_subscribed' };
	}

	await notionFetch('/pages', {
		method: 'POST',
		body: JSON.stringify({
			parent: { database_id: databaseId },
			properties: {
				email: { email }
			}
		})
	});

	return { status: 'created' };
}

export async function submitContactMessage(
	name: string,
	email: string,
	message: string
): Promise<void> {
	const databaseId = requireEnv('NOTION_CONTACT_DATABASE_ID');

	await notionFetch('/pages', {
		method: 'POST',
		body: JSON.stringify({
			parent: { database_id: databaseId },
			properties: {
				name: { title: [{ text: { content: name.slice(0, 200) } }] },
				email: { email },
				message: { rich_text: [{ text: { content: message.slice(0, 2000) } }] }
			}
		})
	});
}
