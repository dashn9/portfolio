import { getPost } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const post = await getPost(params.slug);
	if (!post) error(404, 'Post not found');
	return { post };
};
