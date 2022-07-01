import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/Layout";
import moment from 'moment';
import { getSession, useSession } from "next-auth/react";
// import { useState, useEffect } from "react";

export default function Posts({ posts }) {
    const { data: session } = useSession();
    console.log('session in profile ', session);

    return (
        <Layout user={session.user}>
            <h1 className="font-bold italic text-green-500 mb-8">Your posts</h1>

            <div className="flex-column space-y-8">
                {posts && posts.length && posts.map((post, index) => (
                    <Link href={`/posts/${post.id}`} key={post.id}>
                        <a className="mb-4">
                            <h2 className="font-bold text-gray-600">{post.title}</h2>
                            <p>{post.content}</p>
                            <h3 className="italic text-sm font-semibold mb-1">Author: {post.user_name}</h3>
                            <h3 className="text-xs text-green-400 font-semibold mb-4">Created at: {post.created_at}</h3>
                        </a>
                    </Link>
                ))}
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const jwt = session ? session.jwt : null;
    const authUser = session ? session.user : null;

    /*const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU2NDA2MjU1LCJleHAiOjE2NTg5OTgyNTV9.XiwJQLe49kYtrvL1qJXM6VxS57d9AHdVOHlmo04SkP4';

    const authUserRes = await fetch(`http://localhost:1337/api/users/me`,{
      method:`GET`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    const authUser = await authUserRes.json();*/
    const id = authUser ? authUser.id : 1;
    const postsRes = await fetchAPI(`/posts?populate=*&filters[user][id][$eq]=${id}`);
    const dataForPosts = postsRes.data.map((post) => {
        return {
            id: post.id,
            title: post.attributes.title,
            content: post.attributes.content,
            created_at: moment(post.attributes.createdAt).format('DD-MM-YYYY hh:mm'),
            user_id: post.attributes.user.data.id,
            user_name: post.attributes.user.data.attributes.username
        }
    });

    return {
        props: {
            posts: dataForPosts
        }
    };
}

Posts.auth = true;