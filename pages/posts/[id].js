import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";

export default function Post({ post, workspaces })
{
    return (
        <Layout workspaces={workspaces}>
            <div className="p-0">
                <Link href='/posts'><a className="text-green-700 underline italic mb-6">Return to Posts</a></Link>
                <div className="text-green-500 font-bold text-2xl">{post.attributes.title}</div>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const postsRes = await fetchAPI('/posts?populate=*');
    const posts = postsRes.data;

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postRes = await fetchAPI(`/posts/${params.id}?populate=*`);
    const post = postRes.data;

    return {
        props: { post },
        revalidate: 1
    }
}
