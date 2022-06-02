import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home({ posts }) {
    const { data } = posts; // unpack `data` from `posts`

  return (
    <div className="p-10">
      <h1 className="font-bold italic text-green-500 mb-8">Hello tailwind</h1>

      <div className="flex-column space-y-8">
        {data && data.length && data.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
                <a className="mb-2">
                  <h2 className="font-bold text-gray-600">{post.attributes.title}</h2>
                  <p>{post.attributes.content}</p>
                  <h3 className="italic text-sm font-semibold">Author: {post.attributes.user.data.attributes.username}</h3>
                </a>
            </Link>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Get posts from the API
    const qs = require('qs');
    const query = qs.stringify({
      populate: '*',
    }, {
      encodeValuesOnly: true,
    });

  // const res = await fetch('http://localhost:1337/api/posts?populate=*');
  const res = await fetch(`http://localhost:1337/api/posts?${query}`);
  const posts = await res.json();
  // console.log(posts.data);

  return {
    props: { posts }
  };
}
