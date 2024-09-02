import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useForm, usePage } from "@inertiajs/react";

function Formeditprofile() {
    const { auth } = usePage().props;
    const { flash } = usePage().props;
    const oldimage = `storage/${auth.user.avatar}`;
    const [preview, setPreview] = useState(oldimage);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] =
        useState(false);
    const [showToast, setShowToast] = useState(true);
    const [loading, setLoading] = useState(false);


    const { data, setData, post, processing, errors, progress } = useForm({
        name: auth.user.name,
        file: null,
        password: "",
        password_confirmation: "",
    });

    function submit(e) {
        e.preventDefault();

        setLoading(true);

        post("/editprofile",{
            onSuccess: ()=>{
                setLoading(false)
            }
        });
    }

    const handleFileChange = (e) => {
        // Menggunakan event handler untuk mengatur berkas yang dipilih
        const avatar = e.target.files[0];

        if (avatar) {
            setData("file", avatar);
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result);
            };

            reader.readAsDataURL(avatar);
        } else {
            setData("file", oldimage);
        }
    };

    const handleClose = () => {
        setShowToast(false);
    };

    return (

        <div>
              {flash.success && showToast? (
                <div
                    id="toast-success"
                    class="flex mx-auto items-center justify-center  w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                    role="alert"
                >
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg
                            class="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="sr-only">Check icon</span>
                    </div>
                    <div class="ms-3 text-sm font-normal">{flash.success}</div>
                    <button
                        type="submit"
                        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        data-dismiss-target="#toast-success"
                        aria-label="Close"
                        onClick={handleClose}
                    >
                        <span class="sr-only">Close</span>
                        <svg
                            class="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            ) : (
                ""
            )}
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="bg-gray-50 p-8  shadow-md w-full max-w-md">
                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="text-lg font-semibold text-gray-800">
                            Your Profile
                        </div>
                    </div>

                    {/* Profile Picture */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 bg-gray-200  flex items-center justify-center overflow-hidden rounded-full mb-6">
                            {preview && (
                                <div>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "200px",
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            value={data.avatar}
                            onChange={handleFileChange}
                            
                        />
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Firstname
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Enter your firstname..."
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <div>{errors.email}</div>}
                        </div>
                        <div className="mb-4">
                            <label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Change new Password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    class={` pl-0 bg-gray-50 border text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                                                ${
                                                    errors.password
                                                        ? "pl-10 border-red-500 dark:border-red-500"
                                                        : "border-gray-300 dark:border-gray-600"
                                                }
                                                dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {showPassword ? (
                                        <svg
                                            class="w-6 h-6 text-gray-500 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            class="w-6 h-6 text-gray-500 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-width="2"
                                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                            />
                                            <path
                                                stroke="currentColor"
                                                stroke-width="2"
                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {" "}
                                {errors.password}
                            </p>
                        )}
                        <div>
                            <label
                                for="confirm-password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Confirm New password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
                                <input
                                    
                                    type={
                                        showConfirmationPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    class={`bg-gray-50 border text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                                        ${
                                            errors.password
                                                ? "border-red-500 dark:border-red-500"
                                                : "border-gray-300 dark:border-gray-600"
                                        }
                                        dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmationPassword(
                                            !showConfirmationPassword
                                        )
                                    }
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {showConfirmationPassword ? (
                                        <svg
                                            class="w-6 h-6 text-gray-500 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            class="w-6 h-6 text-gray-500 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-width="2"
                                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                            />
                                            <path
                                                stroke="currentColor"
                                                stroke-width="2"
                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {errors.password_confirmation && (
                                <p className="text-red-500 text-xs mt-1">
                                    {" "}
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <button
                                    onClick={submit}
                                    type="submit"
                                    class=" mt-4 w-full text-black bg-yellow-400  font-medium  text-sm px-5 py-2.5 me-2 mb-2  "

                                >
                                    {loading ? (
                                        <>
                                            <div className="spinner" />
                                        </>
                                    ) : (
                                        "Change"
                                    )}
                                </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
Formeditprofile.layout = (page) => <Layout mainmenu={page} title="Welcome" />;

export default Formeditprofile;
