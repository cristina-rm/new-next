import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import dynamic from 'next/dynamic';
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';

const FullCalendar = dynamic(() => import('../../components/FullCalendar'), {
    ssr: false
});

const TimePickerComponent = dynamic(() => import('../../components/TimePickerComponent'), {
    ssr: false
});

export default function Workspace({ workspace, dataForCalendar, offices }) {
    const { data: session, status } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [office, setOffice] = useState(null);
    const user = session ? session.user : null;
    const [data, setData] = useState({
        user: user ? user.id : 1,
        office: office ? office : '',
        title: 'Please choose a title',
        // start_date: '2022-06-30T09:00:00.000Z',
        start_date: '2022-07-01T09:13:00.000Z',
        end_date: '2022-07-01 11:13',
        start_time: '09:00',
        end_time: '10:00',
        all_day: false
    });

    const handleChange = (e) => {
        setData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const handleDateClick = (arg) => {
        // for type1: arg.resource._resource.extendedProps.type1 // filter
        setOffice(arg.resource._resource.extendedProps.office);
        data.user = user.id;
        data.office = arg.resource._resource.id;
        data.start_date = arg.dateStr;
        // data.start_time = arg.dateStr;
        // data.end_time = arg.dateStr;
        data.all_day = arg.allDay;
        setData(data);
        console.log('extended arg ', arg);
        console.log('extended props ', arg.resource._resource.extendedProps);
        console.log('data after click ', data);

        setShowModal(true); // ex start date: '2022-06-28T08:00:00.000Z'
    };

    const addItem = async () => {
        console.log('sent data ', JSON.stringify(data));

        const response = await fetchAPI('/reservations', {
            method: 'POST',
            // Authorization: `Bearer ${jwt}`,
            body: JSON.stringify({ data: data })
        });

        console.log(response); // data newly added
        setShowModal(false);
        toast.success("The event has been successfully added to your agenda.");
    };

    return (
        <Layout user={user}>
            <ToastContainer position="top-center"/>

            <div className="p-0 w-full">
                <div className="flex justify-between">
                    <Link href='/'><a className="text-green-700 underline italic mb-6">Return</a></Link>
                    <h3 className="text-gray-700 font-medium">Hello {user ? user.username : 'you'}!</h3>
                </div>

                <div className="text-green-600 font-bold text-2xl">{workspace.attributes.name} workspace</div>

                <h3 className="mb-4">Reservations</h3>

                <FullCalendar
                    dateClick={handleDateClick}
                    events={dataForCalendar}
                    resources={offices}
                    editable selectable
                />
            </div>

            {office && <Modal onClose={() => setShowModal(false)} addReservation={addItem} showModal={showModal} office={office}>
                <div className="flex justify-between items-start py-4 px-6 rounded-t border-b dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add event for <span className="font-bold text-green-800">{office.name}</span></h3>

                    <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="myModal">
                        x
                    </button>
                </div>

                <div className="py-4 px-6 space-y-6">
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

                    <hr/>

                    <form className="form-inline">
                        <div className="flex items-center space-x-4 mt-2">
                            <label htmlFor="title" className="w-1/5 block text-gray-900 cursor-pointer font-bold text-md">
                                Title
                            </label>
                            <input type="text" className="w-1/2 rounded-md shadow-sm border-gray-400 focus:border-gray-500 focus:ring focus:ring-gray-300 focus:ring-opacity-50 h-10" name="title" value={data.title} onChange={handleChange} />
                        </div>

                        <div className="flex items-center space-x-4 mt-2">
                            <label htmlFor="start_date" className="w-1/5 block text-gray-900 cursor-pointer font-bold text-md">
                                Start time
                            </label>
                            <input type="text" className="w-1/2 border-gray-400 focus:border-gray-400 focus:ring focus:ring-gray-500 focus:ring-opacity-50 rounded-md shadow-sm mt-4 block w-full" value={data.start_date} onChange={handleChange} placeholder="Select date" name="start_date" />
    {/**************************************************************/}
                            <TimePickerComponent onChange={handleChange} name="start_time" value={data.start_time} />
    {/**************************************************************/}
                        </div>

                        <div className="flex items-center space-x-4 mt-2">
                            <label htmlFor="end_time" className="w-1/5 block text-gray-900 cursor-pointer font-bold text-md">
                                End time
                            </label>
                            <input type="text" className="w-1/2 border-gray-300 focus:border-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50 rounded-md shadow-sm mt-4 block w-full opacity-75" value={data.end_date} onChange={handleChange} placeholder="Select time" name="end_date" />
                            <TimePickerComponent onChange={handleChange} name="end_time" value={data.end_time} />
                        </div>

                        <div className="flex items-center space-x-6 mt-2">
                            <label htmlFor="all_day" className="block text-gray-900 cursor-pointer font-bold text-md">
                                All day
                            </label>
                            <input type="checkbox" name="all_day" value={data.all_day} onChange={handleChange} className="rounded shadow-sm border-gray-300 text-green-500 focus:border-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50 mr-3 mt-1" />
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-end py-4 px-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button data-modal-toggle="myModal" type="button" onClick={() => addItem()} className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                    <button data-modal-toggle="myModal" type="button" onClick={() => setShowModal(false)} className="text-gray-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
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
