import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";

export default function Workspace({ workspace, workspaces })
{
    return (
        <Layout workspaces={workspaces}>
            <div className="p-0">
                <Link href='/'><a className="text-green-700 underline italic mb-6">Return</a></Link>
                <div className="text-green-600 font-bold text-2xl">{workspace.attributes.name}</div>
                Offices >
            </div>
        </Layout>
    );
}

export async function getStaticPaths()
{
    const workspacesRes = await fetchAPI('/workspaces?populate=*');
    const workspaces = workspacesRes.data;
    // console.log(workspaces);

    const paths = workspaces.map((workspace) => ({
        params: { id: workspace.id.toString() }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params })
{
    const workspaceRes = await fetchAPI(`/workspaces/${params.id}?populate=*`);
    const workspace = workspaceRes.data;

    return {
        props: { workspace },
        revalidate: 1
    }
}
