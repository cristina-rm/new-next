import Link from "next/link";
import { fetchAPI } from "../lib/api";
import { setToken } from "../lib/auth";
import { useState } from "react";
import { useUser } from "../lib/authContext";

export default function Login({}) {
    const [data, setData] = useState({
        identifier: '',
        password: ''
    });

    const { user, loading } = useUser();
    // tutorial video: https://www.youtube.com/watch?v=WFh4sNyd8LQ

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(process.env.NEXT_PUBLIC_API_URL); // ok
        // console.log(data); // ok

        const response = await fetchAPI('/auth/local', {
            method: 'POST',
            body: JSON.stringify({
                identifier: data.identifier,
                password: data.password
            })
        });

        setToken(response);
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="mx-auto min-h-screen max-w-7xl p-10">
            <Link href='/'>
                <a className="text-green-700 underline italic">Return</a>
            </Link>

            <div className="text-green-600 font-bold text-2xl mt-12 mb-3">Login form</div>
            <form onSubmit={handleSubmit} className="form-inline">
              <input type="text" name="identifier" placeholder="Username" onChange={handleChange}
                     className="form-input py-2 px-2 mr-4 rounded" required/>
              <input type="password" name="password" placeholder="Password" onChange={handleChange}
                     className="form-input py-2 px-2 mr-4 rounded" required/>

              <button className="py-2 px-3 rounded bg-gray-300" type="submit">Login</button>
            </form>
        </div>
    );
}

/*
export async function getStaticPaths()
{
    const workspacesRes = await fetchAPI('/workspaces?populate=*');
    const workspaces = workspacesRes.data;
    // console.log(workspaces);

    const paths = workspaces.map((workspace) => ({
        params: { id: workspace.id.toString() }
    }));

    return {
        paths: [], fallback: true
    }
}

export async function getStaticProps({ params })
{
    const workspaceRes = await fetchAPI(`/workspaces/${params.id}?populate=*`);
    const workspace = workspaceRes.data;

    return {
        paths: {}
    }
}*/
