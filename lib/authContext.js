import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalCookie} from "./auth";
import { getCookie } from 'cookies-next';

let userState;
// let idState;
// let jwtState;
const User = createContext({ user: null, loading: false});

export const UserProvider = ({value, children}) => {
    const { user } = value;

    useEffect(() => {
        if (!userState && user) {
            userState = user;
        }
    }, []);

    return <User.Provider value={value}>{children}</User.Provider>
};

export const useUser = () => useContext(User);

export const useFetchUser = () => {
    const [data, setUser] = useState({
        user: userState || null,
        id: userState || null,
        jwt: userState || null,
        loading: userState === undefined
    });

    useEffect(() => {
        if (userState !== undefined) {
            return;
        }

        let isMounted = true;
        const user = getCookie('username');
        const id = getCookie('id');
        const jwt = getCookie('jwt');

        /*if (isMounted) { */
        if (user) {
            setUser({user, id, jwt, loading: false});
        }

        return () => {
            isMounted = false;
        }
    }, []);

    // console.log('data ', data);
    return data;
};