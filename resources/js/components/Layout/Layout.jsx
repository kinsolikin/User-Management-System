import React from "react";
import Navbar from "../Navbar";
import Side from "../Sidebar";
import { usePage } from "@inertiajs/react";
function Layout({ guest, mainmenu }) {
    const { auth } = usePage().props;

    return (
        <div>
            <Navbar />
            <div class="flex ">
                {auth.user ? (
                    <>
                        <div class="flex-auto w-full ml-10 ">
                            <Side />
                        </div>
                        <div class="flex-auto w-full  mr-20 ...">{mainmenu}</div>
                    </>
                ) : (
                    <div class="flex-auto w-full">
                    <>{guest}</>
                        </div>
                )}
            </div>
        </div>
    );
}

export default Layout;
