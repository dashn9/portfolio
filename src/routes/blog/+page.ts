import { getPosts } from '$lib/sanity';

export const load = async () => {
	const posts = await getPosts();
	return { posts };
};
