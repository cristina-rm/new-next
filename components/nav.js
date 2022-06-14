import React from "react";
import Link from "next/link";
import { useState } from "react";
import { fetchAPI } from "../lib/api";
import { setToken } from "../lib/auth";

const Nav = ({ workspaces }) => {
  const [data, setData] = useState({
    identifier: '',
    password: ''
  });
  const loading = false;
  const user = '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetchAPI('${process.env.NEXT_PUBLIC_API_URL}/auth/local', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: data.identifier,
        password: data.password
      })
    });

    setToken(data);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
      <div className="w-60 h-screen shadow-lg bg-gray-900" id="sidenavExample">
        <ul className="relative">
          <li>
            <Link href="/">
              <a className="flex items-center text-xs uppercase font-semibold py-4 px-6 h-12 overflow-hidden text-gray-50 whitespace-nowrap transition duration-300 ease-in-out cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="pr-8 pl-2 text-green-500 hover:text-white">Dashboard</span>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/posts">
              <a className="flex items-center text-xs uppercase font-semibold py-4 px-6 h-12 overflow-hidden text-gray-50 whitespace-nowrap transition duration-300 ease-in-out cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="pr-8 pl-2 text-green-500 hover:text-white">Posts</span>
              </a>
            </Link>
          </li>

          <li className="relative" id="sidenavEx1">
            <a className="flex items-center text-xs uppercase font-semibold py-4 px-6 h-12 overflow-hidden text-gray-50 whitespace-nowrap transition duration-300 ease-in-out cursor-pointer" href="#collapseSidenavEx1" role="button" aria-expanded="false" aria-controls="collapseSidenavEx1" data-bs-toggle="collapse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="pr-8 pl-2 text-green-500 hover:text-white">Click here 1</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <ul className="collapse" id="collapseSidenavEx1">
              <li className="relative">
                <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-50 text-ellipsis whitespace-nowrap rounded hover:text-gray-400 transition duration-300 ease-in-out">Link 1</a>
              </li>
              <li className="relative">
                <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-50 text-ellipsis whitespace-nowrap rounded hover:text-gray-400 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark">Link 2</a>
              </li>
            </ul>
          </li>

          <li className="relative" id="sidenavEx2">
            <a className="flex items-center text-xs uppercase font-semibold py-4 px-6 h-12 overflow-hidden text-gray-50 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out cursor-pointer" href="#collapseSidenavEx2" role="button" aria-expanded="false" aria-controls="collapseSidenavEx2" data-bs-toggle="collapse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="pr-6 pl-1 text-green-500 hover:text-white">Click here 2</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <ul className="collapse" id="collapseSidenavEx2">
              <li className="relative">
                <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-50 text-ellipsis whitespace-nowrap rounded hover:text-gray-400 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark">Link 3</a>
              </li>
              <li className="relative">
                <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-50 text-ellipsis whitespace-nowrap rounded hover:text-gray-400 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark">Link 4</a>
              </li>
            </ul>
          </li>

          <li className="relative" id="sidenavEx4">
            <a className="flex items-center text-xs uppercase font-semibold py-4 px-6 h-12 overflow-hidden text-gray-50 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="pr-6 pl-1 text-green-500 hover:text-white">My agenda</span>
            </a>
          </li>

          {!loading &&
            (user ? <>
              <li className="relative" id="profile">
                <Link href="/profile">
                  <a className="flex items-center text-xs uppercase font-semibold py-4 px-6 h-12 overflow-hidden text-gray-50 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out cursor-pointer">
                    *
                    <span className="pr-6 pl-1 text-green-500 hover:text-white">Profile</span>
                  </a>
                </Link>
              </li>

              <li className="relative">
                <a className="flex items-center text-xs uppercase font-semibold py-4 px-6 h-12 overflow-hidden text-gray-50 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out cursor-pointer" onClick={logout}>
                  *
                  <span className="pr-6 pl-1 text-green-500 hover:text-white">Log out</span>
                </a>
              </li>
            </> :  '')
          }

          {!loading &&
            (!user ? <>
              <li className="relative">
                <Link href="/login">
                  <a className="flex items-center text-xs uppercase font-semibold py-4 px-6 h-12 overflow-hidden text-gray-50 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="pr-6 pl-1 text-gray-200 hover:text-white">Login</span>
                  </a>
                </Link>
              </li>

              <li className="relative">
                <Link href="/register">
                  <a className="flex items-center text-xs uppercase font-semibold py-4 px-6 h-12 overflow-hidden text-gray-50 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span className="pr-6 pl-1 text-gray-200 hover:text-white">Register</span>
                  </a>
                </Link>
              </li>
            </> : '')
          }
        </ul>
      </div>
  );
};

export default Nav;