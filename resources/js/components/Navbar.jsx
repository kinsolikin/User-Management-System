import React, { useEffect, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { initFlowbite } from "flowbite";

function Navbar() {
    const { auth } = usePage().props;
    const [image, setImage] = useState(null);
    const [show , setShow] = useState(true)
    
    const [id, setid] = useState(null)


    useEffect(() => {

        setShow(true)
        
        if(auth.user){
            setImage(`storage/${auth.user.avatar}`)
            initFlowbite()
            setid(auth.user.id)
        }
    }, [auth,show]);

    const handleClose = () =>{
        setShow(false)
        console.log('close')

       
    }

    const handlelogout = () =>{
        router.post('logout')
    }
 
    

    const deleteacount =()=>{
        router.post('deleteacount')
    }
  

    
    return (
        <div>
            <nav class="bg-yellow-500 border-yellow-200 dark:bg-gray-900 mb-7">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
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
                           <></>
                        )}
                    </a>
                  
                   
                        <ul class="font-small flex flex-col p-4 md:p-0 mt-4 ">
                            {auth.user ? (
                                
                                 
                                    <div class="flex items-center ms-3 bg-transparent">
                                        
                                            <button
                                                type="button"
                                                id ='dropdownButton'
                                                aria-expanded="false"
                                                data-dropdown-toggle="dropdown-user"
                                            >
                                              
                                                <img
                                                class="w-10 h-10 rounded-full "
                                                    src={image}
                                                    alt="avatar"
                                                />
                                            </button>
                                        
                                        {show &&(

                                            <div
                                            
                                            class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                                            id="dropdown-user">
                                            

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
                                                        href="/editprofile"
                                                        type="button"
                                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        role="menuitem"
                                                        onClick={handleClose}
                                                        >
                                                        Edit Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                       onClick={handlelogout}
                                                        type="button"
                                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        role="menuitem"
                                                        >
                                                        Sign out
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                       onClick={deleteacount}
                                                        type="button"
                                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        role="menuitem"
                                                        >
                                                        Delete Acount
                                                    </button>
                                                </li>
                                                
                                            </ul>
                                        </div>

                                                    )}


                                    </div>
                                
                                
                            ) : (
                              <></>
                            )}

                          
                        </ul>
                    </div>
                
            </nav>
        </div>
    );
}

export default Navbar;
