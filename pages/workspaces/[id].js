import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import {useFetchUser} from "../../lib/authContext"; // needed for dayClick
import dynamic from 'next/dynamic';

const FullCalendar = dynamic(() => import('../../components/FullCalendar'), {
    ssr: false
});

export default function Workspace({ workspace, workspaces, dataForCalendar }) {
    const { user, loading } = useFetchUser();
    const handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr);
    };

    return (
        <Layout workspaces={workspaces}  user={user}>
            <div className="p-0 w-full">
                <Link href='/'><a className="text-green-700 underline italic mb-6">Return</a></Link>
                <div className="text-green-600 font-bold text-2xl">{workspace.attributes.name} workspace</div>

                <h3 className="mb-8">Offices</h3>

                <h3 className="mb-4">Reservations</h3>

                <FullCalendar
                    dateClick={handleDateClick}
                    events={dataForCalendar}
                    // color='black' textColor='yellow'
                    editable selectable
                />
            </div>
        </Layout>
    );
}

export async function getStaticPaths()
{
    const workspacesRes = await fetchAPI('/workspaces?populate=*');
    const workspaces = workspacesRes.data;

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
    const reservationsRes = await fetchAPI('/reservations?populate=*');
    const workspace = workspaceRes.data;
    const reservations = reservationsRes.data;
    const dataForCalendar = reservations.map((reservation) => {
        return {
            title: reservation.attributes.title,
            start: reservation.attributes.start_date,
            color: "green",
            textColor: "purple",
        }
    });
    // console.log(reservations);

    return {
        props: { workspace, reservations, dataForCalendar },
        revalidate: 1
    }
}
