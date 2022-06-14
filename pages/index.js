import Link from "next/link";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import Layout from "../components/layout";
import {useFetchUser} from "../lib/authContext";

export default function Home({ workspaces }) {
    const { user, loading } = useFetchUser();

    return (
        <Layout workspaces={workspaces} user={user}>
            <h1 className="text-lg lg:text-xl font-semibold tracking-wider uppercase text-green-500">
                Workspaces
                ({workspaces && workspaces.length && <span>{workspaces.length}</span>}
                {!workspaces || workspaces.length == 0 && <span>0</span>})
            </h1>

            <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-10 lg:gap-y-0">
                {workspaces && workspaces.length && workspaces.map((workspace, index) => (
                    <Link href={`/workspaces/${workspace.id}`} key={workspace.id}>
                        <a className="mb-6">
                            <div className="flex flex-col">
                                <div className="h-auto w-auto relative">
                                    {workspace.attributes.image && (
                                        <img src={getStrapiMedia(workspace.attributes.image)} alt={workspace.attributes.image.data.attributes.alternativeText}/>
                                    )}
                                </div>

                                <div className="mt-3 flex justify-between items-center">
                                    <h3 className="tracking-wider text-lg font-semibold uppercase leading-6 text-gray-800 dark:text-white">{workspace.attributes.name}</h3>

                                    <div className="flex justify-center items-center">
                                        <p className="italic text-sm font-semibold">Offices: {workspace.attributes.offices.data.length}</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <p className="tracking-tight text-xl text-gray-600 dark:text-white">{workspace.attributes.description}</p>
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const workspacesRes = await fetchAPI('/workspaces?populate=*');
    console.log(workspacesRes.data);
    // npm run build:tailwind

    return {
        props: {
        workspaces: workspacesRes.data,
        // categories: categoriesRes.data
        },
        revalidate: 1,
    };
}