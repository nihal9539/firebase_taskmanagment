import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import { onValue, ref, remove } from 'firebase/database';
import { BiCommentDetail } from "react-icons/bi";
import { IoMdAdd } from 'react-icons/io';
import Task from '../../components/Tasks/Task';

const Home = () => {
    const [taskData, setTaskData] = useState([])

    useEffect(() => {
        onValue(ref(db, 'task'), (snapdhot) => {
            setTaskData([])
            const data = snapdhot.val();
            if (data !== null) {
                Object.values(data).map((task) => {
                    setTaskData((prevTask) => [...prevTask, task]);
                })
            }
        })
    }, [])
    return (
        <div className='' >
            <div className='p-4 sm:ml-64 bg-gray-200 flex flex-col h-auto min-h-screen ' style={{ backgroundColor: "#f3f3f3" }}>
                <div className='  px-10 py-3'>
                    <div className='flex flex-row w-full shadow-md gap-4 items-center justify-center text-white  bg-blue-500 p-3 rounded-xl'>
                        <div className='w-3/12'>Title</div>
                        <div className='w-4/12'>Discription</div>
                        <div className='w-3/12'>Due Date</div>
                        <div className='w-3/12'>Status</div>
                    </div>
                </div>
                {taskData?.map((taskd) => {
                    return (
                        <div>
                            {Object.values(taskd).map((task) => {
                                return (
                                    <Task task={task}/>
                                )

                            })}

                        </div>

                    )
                })}
            </div>

        </div>
    )
}

export default Home
