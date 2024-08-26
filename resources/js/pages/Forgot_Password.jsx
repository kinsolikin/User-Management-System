import React from "react";
import { useForm } from "@inertiajs/react";
import Layout from "../components/Layout/Layout";
import { useState } from "react";
function Forgot_Password() {
    const [loading, setLoading] = useState(false);

    
    const handlesubmit = async () => {

        if(data.email){

            setLoading(true);
    
            await new Promise((resolve) => setTimeout(resolve, 9000));
        }

        setLoading(false);
    };

    const { data, setData, post, errors } = useForm({
        email: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/forgot-password",{
            onSuccess :()=>{
                setLoading(false)
            },
            onError :()=>{
                setLoading(false)
            }
        });
    }

    return (
        <div>
            <div>
                <div>
                    <div>
                        <section class="bg-gray-50 dark:bg-gray-900">
                            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                                <a
                                    href="#"
                                    class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                                >
                                  
                                    Forgot Password
                                </a>
                                <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                                    <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Change Password
                                    </h2>
                                    <form
                                        class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                                        onSubmit={submit}
                                    >
                                        <form class="max-w-sm mx-auto">
                                            <label
                                                for="email-address-icon"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Your Email
                                            </label>
                                            <div class="relative">
                                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                                    <svg
                                                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 16"
                                                    >
                                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                                    </svg>
                                                </div>
                                                <div class="relative">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg
                                                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 16"
                                            >
                                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            class={`pl-10 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                        ${
                            errors.email
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                        }
                        `}
                                            placeholder="name@company.com
                      
                      "
                                            required
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {" "}
                                                {errors.email}
                                            </p>
                                        )}
                                        <div></div>
                                    </div>
                                            </div>
                                        </form>

                                        <button
                                    onClick={handlesubmit}
                                    type="submit"
                                    class="w-full text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    {loading ? (
                                        <>
                                            <div className="spinner" />
                                        </>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

Forgot_Password.layout = (page) => <Layout guest={page} title="Welcome" />;
export default Forgot_Password;
