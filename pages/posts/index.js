import Link from "next/link";
import { fetchAPI, getPostsByUser } from "../../lib/api";
import Layout from "../../components/Layout";
import { RouteGuard } from "../../components/RouteGuard";
import { useFetchUser } from "../../lib/authContext";
import { useState, useEffect } from "react";
import moment from 'moment';
import Router from 'next/router';
import { useRouter } from 'next/router';
import ProtectedRoute from "../../components/ProtectedRoute";
import { getSession, useSession, signIn } from "next-auth/react";

export default function Posts({ posts, authMessage }) {
    // const { user, id, jwt } = useFetchUser();
    const router = useRouter();
    const { data: session } = useSession();
    // const postsByUser = null;
    console.log('session in profile ', session);

    if (session && session.user) {
        const postsByUser = posts.filter(post => {
            return post.user_id === parseInt(session.user.id);
        });
    }

    /*if (typeof window !== 'undefined') {
        let jwtAuth = window.localStorage.getItem('jwt');
        // const [isLogged, setIsLogged] = useState(!!jwtAuth);
        const [isLogged, setIsLogged] = useState(jwtAuth);
        console.log('posts isLogged ss: ', (user == null), jwtAuth, isLogged); // ok

        if (user == null) {
            router.push("/auth/login");
        }
    }*/

    return (
        // <RouteGuard>
        // <ProtectedRoute router={Router}>
            <Layout user={session.user}>
                <h1 className="font-bold italic text-green-500 mb-8">Hello posts!</h1>
                <h3 className="font-semibold text_lg py-10">{authMessage}</h3>

                <div className="flex-column space-y-8">
                    {postsByUser && postsByUser.length && postsByUser.map((post, index) => (
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
        // </RouteGuard>
        // </ProtectedRoute>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    /*const qs = require('qs');
    const query = qs.stringify({
        filters: {
            user: {
                name: {
                    $eq: 'Wicky',
                },
            },
        },
    }, {
        encodeValuesOnly: true,
    });*/
    /*let jwtAuth = '';

    if (typeof window !== 'undefined') {
        jwtAuth = window.localStorage.getItem('jwt');
    }
    console.log('!jwtAuth: ', !jwtAuth);*/ // ok

    /*if (!jwtAuth) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/login'
            }
        }
    }*/

    /*const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU2NDA2MjU1LCJleHAiOjE2NTg5OTgyNTV9.XiwJQLe49kYtrvL1qJXM6VxS57d9AHdVOHlmo04SkP4';

    const authUserRes = await fetch(`http://localhost:1337/api/users/me`,{
      method:`GET`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    const authUser = await authUserRes.json();
    console.log('authUser ', authUser.id); // undefined
    const id = authUser ? authUser.id : 1;*/

    const postsRes = await fetchAPI('/posts?populate=*');
    // const postsByUserRes = await fetchAPI(`/posts?${query}`);
    // const postsByUserRes = await fetchAPI(`/posts?populate=*&filters[user][id][$eq]=${id}`);
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
            // posts: postsRes.data,
            posts: dataForPosts,
            // postsByUser: postsByUserRes.data,
            authMessage: session ? 'Session found. You are connected' : 'No session found! You are not connected.',
        }
    };
}

Posts.auth = true;