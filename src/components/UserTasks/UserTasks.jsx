import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import { onValue, ref, remove } from 'firebase/database';
import { toast } from 'react-toastify';

const UserTasks = () => {
    const user = localStorage.getItem('user')
    const navigate = useNavigate()
    const windowWidth = window.innerWidth
    const [taskData, setTaskData] = useState([])

    const handleDelete = (id) => {
        remove(ref(db, 'task/' + user + "/" + id)).then(()=>{
            toast.info("Deleted")
        })

    }

    const handleEdit = (id) => {
        navigate(`/${id}`)

    }



    // fetching user tasks

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

                            }
                            <div className='w-3/12 break-all'>{task.title}</div>
                            <div className='w-4/12  break-all' ><span>{task.description}</span></div>
                            <div className='w-3/12 break-all'>{task?.date.slice(0, 10)}</div>
                            <div className={`w-3/12 ${task?.status === 'Pending' ? 'text-red-500' : "text-green-500"}`}>{task?.status}</div>
                            <div className={`w-2/12 action flex sm:flex-row flex-col gap-3 justify-center items-center`} ><MdOutlineModeEdit onClick={() => handleEdit(task.uid)} size={25} color='blue' /><RiDeleteBin6Line onClick={() => handleDelete(task.uid)} size={25} color='red' /></div>

                        </div>
                    </div>
                ))}
         

            </div>

        </div>
    )
}

export default UserTasks

