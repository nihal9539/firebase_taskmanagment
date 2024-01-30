import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import {  db } from '../../config/firebase-config';
import { onValue, ref, remove } from 'firebase/database';

const UserTasks = () => {
    const user = localStorage.getItem('user')
    const navigate = useNavigate()
    const [taskData, setTaskData] = useState([])

    const handleDelete = (id) => {
        remove(ref(db, 'task/' + user + "/" + id))

    }


    const handleEdit = (id) => {
        navigate(`${id}`)

    }



    useEffect(() => {
        onValue(ref(db, 'task/' + user), (snapdhot) => {
            setTaskData([])
            const data = snapdhot.val();
            if (data !== null) {
                Object.values(data).map((task) => {
                    setTaskData((prevTask) => [...prevTask, task]);
                })
            }
        })
    }, [])
    console.log(taskData);
    return (
        <div className='' >
            <div className='p-4 sm:ml-64 bg-gray-200 flex flex-col h-auto min-h-screen ' style={{ backgroundColor: "#f3f3f3" }}>
                <div className='  px-10 py-3'>
                    <div className='flex flex-row w-full shadow-md gap-4 items-center justify-center text-white  bg-blue-500 p-3 rounded-xl'>
                        <div className='w-3/12'>Title</div>
                        <div className='w-4/12'>Discription</div>
                        <div className='w-3/12'>Due Date</div>
                        <div className='w-3/12'>Status</div>

                        <div className='w-2/12 peer'>Action</div>
                    </div>
                </div>
                {taskData.map((task) => (

                    <div className='  px-10 py-3 ' key={task._id}>
                        <div className='  flex flex-row w-full shadow-md gap-4 items-center justify-center  p-3 py-7 rounded-xl ' style={{ background: "rgba(255, 255, 255, 0.64)" }} >
                            {
    
                            console.log( task.date.slice(0,10))
}
                            <div className='w-3/12'>{task.title}</div>
                            <div className='w-4/12  break-words' ><span>{task.description}</span></div>
                            <div className='w-3/12'>{task.date.slice(0,10)}</div>
                            <div className='w-3/12'>{task?.status}</div>
                            <div className='w-2/12 flex flex-row gap-3 justify-center items-center' ><MdOutlineModeEdit onClick={() => handleEdit(task.uid)} size={25} color='blue' /><RiDeleteBin6Line onClick={() => handleDelete(task.uid)} size={25} color='red' /></div>

                        </div>
                    </div>
                ))}
                <div className='
             overflow-hidden
             max-h-0
             peer-checked:max-h-7
             '>
                    hiii
                </div>

            </div>

        </div>
    )
}

export default UserTasks
