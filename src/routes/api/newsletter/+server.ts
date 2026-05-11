import { json, type RequestHandler } from '@sveltejs/kit';
import { NotionError, subscribeToNewsletter } from '$lib/server/notion';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LEN = 254;

type Body = { email?: unknown; website?: unknown };

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

	const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
	if (!email) return json({ error: 'Email is required.' }, { status: 400 });
	if (email.length > MAX_EMAIL_LEN)
		return json({ error: 'Email is too long.' }, { status: 400 });
	if (!EMAIL_RE.test(email))
		return json({ error: 'That email address looks invalid.' }, { status: 400 });

	try {
		const result = await subscribeToNewsletter(email);
		return json(result);
	} catch (err) {
		if (err instanceof NotionError) {
			if (err.status === 500 && err.code === 'config_missing') {
				console.error('[newsletter] config missing:', err.message);
				return json(
					{ error: 'Newsletter is not available right now.' },
					{ status: 503 }
				);
			}
			console.error('[newsletter] notion error:', err.status, err.code, err.message);
			return json(
				{ error: 'Could not save your subscription. Please try again later.' },
				{ status: 502 }
			);
		}
		console.error('[newsletter] unexpected error:', err);
		return json({ error: 'Unexpected error.' }, { status: 500 });
	}
};
