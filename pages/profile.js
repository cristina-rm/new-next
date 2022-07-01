import Layout from '../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSession, useSession } from "next-auth/react";
import { fetchAPI } from "../lib/api";
import moment from 'moment';

export default function Profile({userData, reservations}) {
  const { data: session } = useSession();
  let text = 'hey';
  console.log('userData in profile ', userData);
  console.log('reservations in profile ', reservations);

  if (session.user) {
    // text = `Welcome ${localStorage.getItem('username')}, you are connected!`;
    text = `Welcome ${session.user.username}, you are connected!`;
  } else {
    text = 'You are not connected. Please log in.';
  }

  return (
      <Layout user={session.user}>
        <ToastContainer position="top-center"/>

        <div className="p-0 w-full">
            <h1 className="font-bold italic text-green-500 mb-8">Profile page</h1>

            <div className="py-10">
              <h3 className="text-gray-700 font-medium">{text}</h3>
              <h3 className="text-gray-700 font-medium">Name: {userData.username}</h3>
              <h3 className="text-gray-700 font-medium">Email: {userData.email}</h3>
              <h3 className="text-gray-700 font-medium">reservations: {reservations.length}</h3>
            </div>
        </div>
      </Layout>
  )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const authUserRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,{
      method:`GET`,
      headers: {
        Authorization: `Bearer ${session.jwt}`
      }
    });
    const authUser = await authUserRes.json();

    const reservationsRes = await fetchAPI(`/reservations?populate=*&filters[user][id][$eq]=${authUser.id}`);
    const dataForReservations = reservationsRes.data.map((reservation) => {
        return {
            id: reservation.id,
            title: reservation.attributes.title,
            all_day: reservation.attributes.all_day,
            start_date: reservation.attributes.start_date,
            end_date: reservation.attributes.end_date,
            office_id: reservation.attributes.office.data.id,
            office_name: reservation.attributes.office.data.attributes.name,
            created_at: moment(reservation.attributes.createdAt).format('DD-MM-YYYY hh:mm'),
        }
    });

    return {
        props: {
            userData: authUser,
            reservations: dataForReservations,
            authMessage: session ? 'Session found. Get user information' : 'No session found! You must connect.',
        }
    };
}

Profile.auth = true;