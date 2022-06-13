import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import { fetchAPI } from "../lib/api";

export default function Home({ posts }) {
  return (
    <div className="p-10">
      <h1 className="font-bold italic text-green-500 mb-8">Hello my workspaces frontend!</h1>
      <h1 className="font-bold red mb-8">API endpoint: { process.env.API_ENDPOINT }</h1>

      <div className="flex-column space-y-8">
          {/*<h2 className="font-bold text-gray-600">post.attributes.title</h2>
          <p>post.attributes.content</p>
          <h3 className="italic text-sm font-semibold">Author: post.attributes.user.data.attributes.username</h3>*/}
        {posts && posts.length && posts.map((post, index) => (
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
  // Run API calls in parallel
  /*const [postsRes, categoriesRes] = await Promise.all([
    fetchAPI("/posts", { populate: "*" }),
    fetchAPI("/categories", { populate: "*" })
  ]);*/
  const postsRes = await fetchAPI('/posts?populate=*');
  // const categoriesRes = await fetchAPI('/categories?populate=*');
  // console.log(postsRes.data);

  return {
    props: {
      posts: postsRes.data,
      // categories: categoriesRes.data
    },
    revalidate: 1,
  };
}


/*export async function getStaticProps() {
  // Get posts from the API
    const url = process.env.API_URL;
    console.log(url); // undefined

    // const qs = require('qs');
    /!*const query = qs.stringify({
      populate: '*',
    }, {
      encodeValuesOnly: true,
    });*!/

  const res = await fetch(`http://localhost:1337/api/posts?populate=*`);
  // const res = await fetch(`http://localhost:1337/api/posts?${query}`);
  // const res = await fetch(`${url}/posts?populate=*`);
  const posts = await res.json();
  // console.log(posts.data);

  return {
    props: { posts }
  };
}*/

/*export async function getServerSideProps() {
    const url = process.env.API_ENDPOINT;

  // const postRes = await fetch('http://localhost:1337/api/posts?populate=*');
  const postRes = await fetch(`${url}/posts?populate=*`);
  const posts = await postRes.json();

  return {
    props: {
      posts
    }
  };
}*/
