import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFetchUser } from "../lib/authContext";
// import { userService } from 'services';

export { RouteGuard };

function RouteGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const { user, loading } = useFetchUser();
    console.log('in RouteGuard ', user); // null

    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        console.log('in authCheck ', user); // null
        console.log('in authCheck url ', url); // null

        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ['/auth/login'];
        const path = url.split('?')[0];

        // if (!userService.userValue && !publicPaths.includes(path)) {
        if (!user && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/auth/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}