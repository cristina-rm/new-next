import Link from "next/link";
import {fetchAPI} from "../../lib/api";

export default function Post({ post }) {
    return (
        <div className="p-10">
            <Link href='/'><a className="text-green-700 underline italic mb-6">Go home</a></Link>
            <div className="text-green-500 font-bold text-2xl">{post.attributes.title}</div>
            {/*<div className="text-green-500 font-bold text-2xl">post.attributes.title</div>*/}
        </div>
    );
}

export async function getStaticPaths() {
    // const resp = await fetch('http://localhost:1337/api/posts?populate=*');
    const postsRes = await fetchAPI('/posts?populate=*');
    const posts = postsRes.data;
    // console.log(posts);

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // const resp = await fetch(`http://localhost:1337/api/posts/${params.id}?populate=*`);
    // const post = await resp.json();
    const postRes = await fetchAPI(`/posts/${params.id}?populate=*`);
    const post = postRes.data;

    return {
        props: { post },
        revalidate: 1
    }
}
