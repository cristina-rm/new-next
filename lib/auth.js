// import { useRouter } from 'next/router';
import { setCookies, checkCookies, getCookie, removeCookies  } from 'cookies-next';

export const setToken = (data) => {
    if (typeof window === 'undefined') {
        return;
    }

    setCookies('id', data.user.id);
    setCookies('username', data.user.username);
    setCookies('jwt', data.jwt);

    window.localStorage.setItem('jwt', data.jwt);
    window.localStorage.setItem('username', data.user.username);
};

export const unsetToken = () => {
    if (typeof window === 'undefined') {
        return;
    }

    removeCookies('id');
    removeCookies('username');
    removeCookies('jwt');

    window.localStorage.setItem('jwt', null);
    window.localStorage.setItem('username', null);
};

export const getFromStorage = (key) => {
    if (typeof window !== 'undefined') {
         window.localStorage.getItem(key);
    }
}

export const setToStorage = (key, value) => {
    if (typeof window !== 'undefined') {
         return window.localStorage.setItem(key, value);
    }
}

export const getUserFromServerCookie = (req) => {
    if (!req.headers.cookie || '') {
        return undefined;
    }

    const userCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('username='));

    if (!userCookie) {
        return undefined;
    }

    const user = userCookie.split('=')[1];
    return user;
};

export const getIdFromServerCookie = (req) => {
    if (!req.headers.cookie || '') {
        return undefined;
    }

    const idCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('id='));

    if (!idCookie) {
        return undefined;
    }

    const id = idCookie.split('=')[1];
    return id;
};

export const getTokenFromServerCookie = (req) => {
    if (!req.headers.cookie || '') {
        return undefined;
    }

    const jwtCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('jwt='));

    if (!jwtCookie) {
        return undefined;
    }

    const jwt = jwtCookie.split('=')[1];
    return jwt;
};