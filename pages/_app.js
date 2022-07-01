import '../styles/globals.css';
import '../styles/clock.css';
import '../styles/time_picker.css';
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import 'react-clock/dist/Clock.css';
import { SessionProvider, useSession } from "next-auth/react";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
export default function MyApp({
    Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}
