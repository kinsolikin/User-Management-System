'use client'
import React, { useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";

import { Button } from "flowbite-react";
import { initFlowbite } from "flowbite";

function Navbar() {
    const { auth } = usePage().props;

    useEffect(() => {
        initFlowbite();
    }, [auth.user]);

    return (
        <div>
            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a
                        href="https://flowbite.com/"
                        class="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        {auth.user ? (
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                <span class="text-sm">Welcome back to <span class ="text-md">Dashboard</span></span>
                                <br />
                                <span class="text-lg">{auth.user.name}</span>
                            </span>
                        ) : (
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                Laravel Authentication with Api
                            </span>
                        )}
                    </a>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span class="sr-only">Open main menu</span>
                        <svg
                            class="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        class="hidden w-full md:block md:w-auto"
                        id="navbar-default"
                    >
                        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {auth.user ? (
                                <></>
                            ) : (
                                <>
                
                                    <li>
                                        <Link
                                            href="login"
                                            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="register"
                                            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}

                            {auth.user ? (
                                <div class="flex items-center">
                                    <div class="flex items-center ms-3">
                                        <div>
                                            <button
                                                type="button"
                                                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                                aria-expanded="false"
                                                data-dropdown-toggle="dropdown-user"
                                            >
                                              
                                                <img
                                                    class="w-8 h-8 rounded-full"
                                                    
                                                    alt="avatar"
                                                />
                                            </button>
                                        </div>
                                        <div
                                            class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                                            id="dropdown-user"
                                        >
                                            <div class="px-4 py-3" role="none">
                                                <p
                                                    class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                                    role="none"
                                                >
                                                    {auth.user.email}
                                                </p>
                                            </div>
                                            <ul class="py-1" role="none">

                                                <li>
                                                    <Link
                                                        href="/logout"
                                                        method="post"
                                                        type="button"
                                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        role="menuitem"
                                                    >
                                                        Sign out
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
