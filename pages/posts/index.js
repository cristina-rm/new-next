import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import { RouteGuard } from "../../components/RouteGuard";
// import { getSession, signIn, signOut } from "next-auth/react";

export default function Posts({ posts, workspaces }) {
    /*const signInButtonNode = () => {
        if (session) {
            return false;
        }

        return (
            <div>
                <Link href="/api/auth/signin">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            signIn();
                        }}
                    >
                        Sign In
                    </button>
                </Link>
            </div>
        );
    };

    const signOutButtonNode = () => {
        if (!session) {
            return false;
        }

        return (
            <div>
                <Link href="/api/auth/signout">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            signOut();
                        }}
                    >
                        Sign Out
                    </button>
                </Link>
            </div>
        );
    };

    if (!session) {
        return (
            <div className="hero">
                <div className="navbar">
                    {signOutButtonNode()}
                    {signInButtonNode()}
                </div>
                <div className="text">
                    You aren't authorized to view this page
                </div>
            </div>
        )
    }

    return (
        <div className="hero">
            <Head>
                <title>Index Page</title>
            </Head>
            <div className="navbar">
                {signOutButtonNode()}
                {signInButtonNode()}
            </div>
            <div className="text">
                Hello world
            </div>
        </div>
    );*/

    return (
        <RouteGuard>
            <Layout workspaces={workspaces}>
                <h1 className="font-bold italic text-green-500 mb-8">Hello posts!</h1>

                <div className="flex-column space-y-8">
                    {posts && posts.length && posts.map((post, index) => (
                        <Link href={`/posts/${post.id}`} key={post.id}>
                            <a className="mb-4">
                                <h2 className="font-bold text-gray-600">{post.attributes.title}</h2>
                                <p>{post.attributes.content}</p>
                                <h3 className="italic text-sm font-semibold mb-4">Author: {post.attributes.user.data.attributes.username}</h3>
                            </a>
                        </Link>
                    ))}
                </div>
            </Layout>
        </RouteGuard>
    )
}

/*export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};*/

/*
export async function getStaticProps() {
    const postsRes = await fetchAPI('/posts?populate=*');

    return {
        props: {
            posts: postsRes.data,
            // categories: categoriesRes.data
        },
        revalidate: 1,
    };
}*/
