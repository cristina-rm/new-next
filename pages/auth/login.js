import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import { setToken } from "../../lib/auth";
import { useState } from "react";
import Layout from '../../components/Layout';
import { useUser } from "../../lib/authContext";
import { checkCookies } from 'cookies-next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';

export default function Login() {
    // const user = getCookie('username');
    const [data, setData] = useState({
        identifier: '',
        password: ''
    });

    const { user, loading } = useUser();
    // tutorial video: https://www.youtube.com/watch?v=WFh4sNyd8LQ

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetchAPI('/auth/local', {
            method: 'POST',
            body: JSON.stringify({
                identifier: data.identifier,
                password: data.password
            })
        });

        setToken(response);

        if (checkCookies('username')) {
            console.log('You have been successfully logged in. You will be redirected in a few seconds...');
            toast.success('You have been successfully logged in. You will be redirected in a few seconds...');
            Router.push("/profile");
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Layout>
                <ToastContainer position="top-center"/>

                <div className="p-0 w-full">
                    <h1 className="font-bold italic text-green-500 mb-8">Login page</h1>

                    <div className="py-10">
                        <form onSubmit={handleSubmit} className="form-inline">
                            <input type="text" name="identifier" placeholder="Username" onChange={handleChange} className="form-input py-2 px-2 mr-4 rounded" required/>
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-input py-2 px-2 mr-4 rounded" required/>

                            <button className="py-2 px-3 rounded bg-gray-300" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}
