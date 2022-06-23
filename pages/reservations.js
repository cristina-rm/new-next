// import CustomDataTable from "../components/CustomDataTable";
import { fetchAPI } from "../lib/api";
import Layout from "../components/layout";
import Modal from "../components/Modal";
import { useFetchUser, useUser } from "../lib/authContext";
import dynamic from 'next/dynamic';
import {useState} from "react";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomDataTable = dynamic(() => import('../components/CustomDataTable'), {
    ssr: false
});

export default function Reservations({reservations}) {
    const { user } = useFetchUser();
    const [showModal, setShowModal] = useState(false);
    const [reservation, setReservation] = useState(null);
    const [office, setOffice] = useState(null);
    // const { user } = useUser();
    // console.log('reservations user ', user); // ok

    const handleEditClick = (arg) => {
        // setShowEditModal(true);
        // setReservation(arg.resource._resource.extendedProps.office);
        // console.log(arg.resource._resource.extendedProps); // id, title
    };

    const loadItem = (item) => {
        console.log('loadItem', item); // id, title
        setReservation(item);
        setOffice(item.office);
        setShowModal(true);
    };

    const editItem = (id) => {
        console.log('editItem', id); // id, title
        setShowModal(false);
    };

    const columns = [
        {
            name: "Title",
            selector: row => row.title,
            sortable: true,
        },
        {
            name: "Office",
            selector: row => row.office.name,
            sortable: true,
        },
        {
            name: "Office type",
            selector: row => row.office.type,
            sortable: true,
        },
        {
            name: "From",
            selector: row => row.from_date,
            sortable: true,
        },
        {
            name: "Until",
            selector: row => row.until_date,
            sortable: true,
        },
        {
            name: "User",
            selector: row => row.user,
            sortable: true,
        },
        {
            name: "All day",
            selector: row => row.all_day,
            conditionalCellStyles: [
                {
                    when: row => row.all_day === true,
                    style: {
                        backgroundColor: "lightgreen"
                    }
                }
            ]
        },
        {
            name: "Date created",
            selector: row => row.created_at,
            sortable: true,
        },
        {
            name: "Actions",
            selector: row => <button onClick={() => loadItem(row)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-green-200 focus:ring-4 focus:ring-gray-200 rounded text-sm px-3 py-1">Edit</button>,
        },
        /*{
            name: "Image",
            selector: row => <img src={row.avatar} width={50} height={50} />,
        }*/
    ];

    return (
        <Layout user={user}>
            <ToastContainer position="top-center"/>

            <div className="p-0 w-full">
                <h3 className="text-green-700 font-medium">Logged user: {user ? user.username : 'no logged user'}</h3>
                <div className="py-10">
                    <h1 className="font-bold italic text-green-500 mb-8">Reservations page</h1>
                    <CustomDataTable reservations={reservations} columns={columns} title=""/>
                </div>
            </div>

            {reservation && <Modal onClose={() => setShowModal(false)} editReservation={editItem} showModal={showModal} reservation={reservation} office={office}>
                <div className="flex justify-between items-start py-4 px-6 rounded-t border-b dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit event for <span className="font-bold text-green-800">{office.name}</span></h3>
                    <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="myModal">
                        x
                    </button>
                </div>

                <div className="py-4 px-6 space-y-6">
                    <h3>{reservation.title}</h3>
                </div>

                <div className="flex items-center justify-end py-4 px-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button data-modal-toggle="myModal" type="button" onClick={() => editItem(reservation)} className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                    <button data-modal-toggle="myModal" type="button" onClick={() => setShowModal(false)} className="text-gray-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
                </div>
            </Modal>}
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const reservationsRes = await fetchAPI('/reservations?populate=*');
    const reservations = reservationsRes.data;
    const dataForReservations = reservations.map((reservation) => {
        return {
            id: reservation.id,
            title: reservation.attributes.title,
            created_at: moment(reservation.attributes.createdAt).format('DD-MM-YYYY hh:mm'),
            from_date: reservation.attributes.all_day ? '-' : moment(reservation.attributes.start_date).format('DD-MM-YYYY hh:mm'),
            until_date: reservation.attributes.all_day ? '-' : moment(reservation.attributes.end_date).format('DD-MM-YYYY hh:mm'),
            all_day: reservation.attributes.all_day,
            user: reservation.attributes.user.data.attributes.username,
            office: reservation.attributes.office.data.attributes,
        }
    });

    return {
        props: {
            reservations: dataForReservations,
        },
        revalidate: 1
    }
}