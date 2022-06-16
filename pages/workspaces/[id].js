import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Modal from "../../components/Modal";
import {useFetchUser} from "../../lib/authContext"; // needed for dayClick
import dynamic from 'next/dynamic';
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FullCalendar = dynamic(() => import('../../components/FullCalendar'), {
    ssr: false
});

export default function Workspace({ workspace, workspaces, dataForCalendar, offices }) {
    const { user, loading } = useFetchUser();
    const [showModal, setShowModal] = useState(false);
    const [office, setOffice] = useState(null);
    // console.log(user.id);

    const [data, setData] = useState({
        user: user ? user.id : 1,
        office: office ? 2 : 2,
        // office: office ? office.id : '',
        title: 'reservation test title',
        start_date: '',
        end_date: '',
        all_day: false
    });

    /*const handleChange = (e) => {
        setData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };*/

    /*useEffect(async () => {
        const result = await axios.get("http://localhost:1337/todos");
        setTodos(result?.data);
    }, []);*/

    const handleDateClick = (arg) => {
        setShowModal(true);
        // for type1: arg.resource._resource.extendedProps.type1
        setOffice(arg.resource._resource.extendedProps.office);
        console.log(arg.resource._resource.extendedProps); // id, title
    };
    console.log(office);
    // toast.success("Heu, I'm here!");

    const addItem = async (e) => {
        // user, office, title, start_date, end_date, all_day
        console.log('add item', JSON.stringify(data)); // id, title

        const response = await fetchAPI('/reservations', {}, {
            method: 'POST',
            body: {"data": JSON.stringify(data)}
        }); // error forbidden for authenticated user

        /*await fetchAPI('/reservations', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((json) => console.log(json));*/
        console.log('response after fetch ', response);

        setShowModal(false);
        toast.success("The event has been successfully added to your agenda.");
    };

    return (
        <Layout workspaces={workspaces} user={user}>
            <ToastContainer position="top-center"/>

            <div className="p-0 w-full">
                <Link href='/'><a className="text-green-700 underline italic mb-6">Return</a></Link>
                <div className="text-green-600 font-bold text-2xl">{workspace.attributes.name} workspace</div>

                <h3 className="mb-8">Offices</h3>

                <h3 className="mb-4">Reservations</h3>

                <FullCalendar
                    dateClick={handleDateClick}
                    events={dataForCalendar}
                    resources={offices}
                    editable selectable
                />
            </div>

            {office && <Modal onClose={() => setShowModal(false)} addReservation={addItem} showModal={showModal} office={office}>
                <div className="w-full flex space-x-4">
                    <div className="flex-column space-y-6 text-gray-500">
                        <h3>Description</h3>
                        <h3>Type</h3>
                        <h3>Localisation</h3>
                        <h3>Capacity</h3>
                        <h3>Nb chairs</h3>
                        <h3>Specifications</h3>
                    </div>

                    <div className="flex-column space-y-6">
                        <h3>{office.description ?? '-'}</h3>
                        <h3>{office.type}</h3>
                        <h3>{workspace.attributes.name}</h3>
                        <h3>{office.capacity}</h3>
                        <h3>{office.nb_chairs}</h3>

                        <div className="flex space-x-6">
                            <p className="italic"><span className={`text-xs inline-block p-1 leading-none text-center whitespace-nowrap align-middle font-semibold text-white rounded-full ${office.wi_fi ? "bg-green-400" : "bg-red-400"}`}></span> wifi</p>
                            <p><span className={`text-xs inline-block p-1 leading-none text-center whitespace-nowrap align-middle font-semibold text-white rounded-full ${office.projector ? "bg-green-400" : "bg-red-400"}`}></span> projector</p>
                            <p><span className={`text-xs inline-block p-1 leading-none text-center whitespace-nowrap align-middle font-semibold text-white rounded-full ${office.whiteboard ? "bg-green-400" : "bg-red-400"}`}></span> whiteboard</p>
                            <p><span className={`text-xs inline-block p-1 leading-none text-center whitespace-nowrap align-middle font-semibold text-white rounded-full ${office.printing_service ? "bg-green-400" : "bg-red-400"}`}></span> printing service</p>
                            <p><span className={`text-xs inline-block p-1 leading-none text-center whitespace-nowrap align-middle font-semibold text-white rounded-full ${office.coffee_and_tea ? "bg-green-400" : "bg-red-400"}`}></span> coffee & tea</p>
                        </div>
                    </div>
                </div>
            </Modal>}
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
    const officesRes = await fetchAPI('/offices?populate=*');
    const reservationsRes = await fetchAPI('/reservations?populate=*');

    const offices = officesRes.data;
    const dataForResources = offices.map((office) => {
        return {
            id: office.id,
            title: office.attributes.name,
            type1: office.attributes.type,
            office: office.attributes,
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
            workspace: workspaceRes.data,
            offices: dataForResources,
            reservations: reservations,
            dataForCalendar: dataForCalendar,
        },
        revalidate: 1
    }
}
