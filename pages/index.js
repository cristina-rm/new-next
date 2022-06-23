import Link from "next/link";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import Layout from "../components/layout";
import {useFetchUser} from "../lib/authContext";
import dynamic from 'next/dynamic';

const FullCalendar = dynamic(() => import('../components/FullCalendar'), {
    ssr: false
});

export default function Home({ workspaces, dataForCalendar, offices }) {
    const { user, loading } = useFetchUser();
    const handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr);
    };
    // console.log(dataForCalendar);
    console.log('index user ',user);

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

            <div className="p-0 w-full">
                <hr/>
                <h1 className="text-red-700 mb-3">Test calendar</h1>
                <FullCalendar
                    dateClick={handleDateClick}
                    events={dataForCalendar}
                    resources={offices}
                    editable selectable
                />
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const workspacesRes = await fetchAPI('/workspaces?populate=*');
    const officesRes = await fetchAPI('/offices?populate=*');
    const reservationsRes = await fetchAPI('/reservations?populate=*');

    const offices = officesRes.data;
    const dataForResources = offices.map((office) => {
        return {
            id: office.id,
            title: office.attributes.name,
            type1: office.attributes.type
        }
    });

    const reservations = reservationsRes.data;
    const dataForCalendar = reservations.map((reservation) => {
        return {
            id: reservation.id,
            resourceId: reservation.attributes.office.data.id,
            title: reservation.attributes.title,
            start: reservation.attributes.start_date,
            allDay: reservation.attributes.all_day
        }
    });

    return {
        props: {
            workspaces: workspacesRes.data,
            offices: dataForResources,
            reservations: reservations,
            dataForCalendar: dataForCalendar,
        },
        revalidate: 1,
    };
}