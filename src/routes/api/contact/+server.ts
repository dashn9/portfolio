import { json, type RequestHandler } from '@sveltejs/kit';
import { NotionError, submitContactMessage } from '$lib/server/notion';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;
const MIN_MESSAGE = 5;

type Body = { name?: unknown; email?: unknown; message?: unknown; website?: unknown };

export const POST: RequestHandler = async ({ request }) => {
	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return json({ error: 'Invalid JSON body.' }, { status: 400 });
	}

	if (typeof payload.website === 'string' && payload.website.trim() !== '') {
		return json({ error: 'Submission rejected.' }, { status: 400 });
	}

	const name = typeof payload.name === 'string' ? payload.name.trim() : '';
	const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
	const message = typeof payload.message === 'string' ? payload.message.trim() : '';

	if (!name) return json({ error: 'Name is required.' }, { status: 400 });
	if (name.length > MAX_NAME) return json({ error: 'Name is too long.' }, { status: 400 });

	if (!email) return json({ error: 'Email is required.' }, { status: 400 });
	if (email.length > MAX_EMAIL) return json({ error: 'Email is too long.' }, { status: 400 });
	if (!EMAIL_RE.test(email))
		return json({ error: 'That email address looks invalid.' }, { status: 400 });

	if (message.length < MIN_MESSAGE)
		return json({ error: 'Message is too short.' }, { status: 400 });
	if (message.length > MAX_MESSAGE)
		return json({ error: 'Message is too long.' }, { status: 400 });

	try {
		await submitContactMessage(name, email, message);
		return json({ status: 'received' });
	} catch (err) {
		if (err instanceof NotionError) {
			if (err.status === 500 && err.code === 'config_missing') {
				console.error('[contact] config missing:', err.message);
				return json(
					{ error: 'Contact form is not available right now.' },
					{ status: 503 }
				);
			}
			console.error('[contact] notion error:', err.status, err.code, err.message);
			return json(
				{ error: 'Could not deliver your message. Please try again later.' },
				{ status: 502 }
			);
		}
		console.error('[contact] unexpected error:', err);
		return json({ error: 'Unexpected error.' }, { status: 500 });
	}
};
