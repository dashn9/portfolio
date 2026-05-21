import { getPosts } from '$lib/sanity';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const posts = await getPosts();
	return { posts };
};
