import React, { useState } from 'react'
import { TbLogout2 } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";
import TaskModel from '../TaskModel/TaskModel';
import { Navigate, useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const navigate = useNavigate()
    const [modelOpen, setModelOpen] = useState(false)

    const handlemodelopen = () => {
        setModelOpen(!modelOpen);
    }

  
    const handleLogout = () => {               
        signOut(auth).then(() => {
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log("error");
    
        });
    }
    return (
        <div>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" /> */}
                        <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Task Managment System</span>
                    </a>
                    <ul className="space-y-6 font-medium">
                        <li>
                            <span onClick={handlemodelopen} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <IoMdAdd size={30} />
                                <span className="ms-3">Add Task</span>
                            </span>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdInfoOutline size={30} />
                                <span className="flex-1 ms-3 whitespace-nowrap">About</span>
                            </a>
                        </li>
                        <li>
                            <div onClick={handleLogout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <TbLogout2 size={30} />
                                <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                            </div>
                        </li>


                    </ul>
                </div>
            </aside>
            <TaskModel setModelOpen={setModelOpen } modelOpen={modelOpen } />
        </div>
    )
}

export default Sidebar
