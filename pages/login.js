import Link from "next/link";
import { fetchAPI } from "../lib/api";

export default function Login({ })
{
    return (
        <div className="mx-auto min-h-screen max-w-7xl p-10">
            <Link href='/'><a className="text-green-700 underline italic mb-6">Return</a></Link>
            <div className="text-green-600 font-bold text-2xl">Login form</div>

            <form onSubmit={handleSubmit} className="form-inline">
              <input type="text" name="identifier" placeholder="Username" onChange={handleChange}
                     className="form-input py-2 mx-2 rounded" required/>
              <input type="password" name="password" placeholder="Password" onChange={handleChange}
                     className="form-input py-2 mx-2 rounded" required/>

              <button className="py-2 mx-2 rounded bg-red-200" type="submit">Login</button>
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
