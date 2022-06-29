// import withSession from '../lib/session';
import Layout from '../components/Layout';
import { fetchAPI } from "../lib/api";
import { useState } from "react";
import Router from 'next/router';
import { checkCookies, getCookie  } from 'cookies-next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFromStorage } from "../lib/auth";
import { useFetchUser } from "../lib/authContext";
import { useRouter } from 'next/router';
import { getSession, useSession, signIn } from "next-auth/react";

export default function Profile({authMessage}) {
  // const { user } = useFetchUser();
  // const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));
  const router = useRouter();
  const { data: session } = useSession();
  let text = 'hey';
  console.log('session in profile ', session);

  if (session.user) {
    // text = `Welcome ${localStorage.getItem('username')}, you are connected!`;
    text = `Welcome ${session.user.username}, you are connected!`;
  } else {
    text = 'You are not connected. Please log in.';
    // Router.push("/auth/login");
  }

  return (
      <Layout user={session.user}>
        <ToastContainer position="top-center"/>

        <div className="p-0 w-full">
            <h1 className="font-bold italic text-green-500 mb-8">Profile page</h1>

            <div className="py-10">
              <h3 className="text-gray-700 font-medium">{text}</h3>
            </div>
        </div>
      </Layout>
  )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            authMessage: session ? 'Session found. Get user information' : 'No session found! You must connect.',
        }
    };
}

Profile.auth = true;