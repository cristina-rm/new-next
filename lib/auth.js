import Router from 'next/router';
import { setCookies, checkCookies, getCookies, removeCookies  } from 'cookies-next';

export const setToken = (data) => {
    if (typeof window === 'undefined') {
        return;
    }

    setCookies('id', data.user.id);
    setCookies('username', data.user.username);
    setCookies('jwt', data.jwt);

    if (checkCookies('username')) {
        console.log('You have been successfully logged in. You will be redirected in a few seconds...');
        // setTimeout(() => history.push('/posts'), 3000); // Redirect to posts page after 3 sec
        Router.reload('/posts');
    }
};

export const unsetToken = () => {
    if (typeof window === 'undefined') {
        return;
    }

    removeCookies('id');
    removeCookies('username');
    removeCookies('jwt');

    Router.reload('/posts');
};

export const getUserFromLocalCookie = () => {
    return getCookies('username');
};

export const getIdFromLocalCookie = () => {
    return getCookies('id');
};

export const getTokenFromLocalCookie = () => {
    return getCookies('jwt');
};

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