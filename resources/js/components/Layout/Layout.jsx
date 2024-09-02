'use Client'
import React from "react";
import Navbar from "../Navbar";
import Side from "../Sidebar";
import { usePage } from "@inertiajs/react";
function Layout({ guest, mainmenu }) {
    const { auth } = usePage().props;

    return (
        <div>
                {auth.user ? (
           <>
           <Navbar />

            <div class="flex ">
                    <>
                        <div class="flex-auto   ">
                            <Side />
                        </div>
                        <div class="flex-auto w-full   ...">{mainmenu}</div>
                    </>
            </div>
                    </>
                ) : (
                    <div class="flex-auto w-full">
                    <>{guest}</>
                        </div>
                )}
        </div>
    );
}

export default Layout;
