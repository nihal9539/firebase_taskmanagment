import React, { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, useNavigate, useParams } from 'react-router-dom';



const TaskEdit = () => {
    const {id} = useParams()
    const [data, setData] = useState({
        description: "",
        task: "",
        title: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
    
    }

    useEffect(() => {

     

    }, [])
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-8 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">

                <form className='flex flex-col justify-between items-center  h-full overflow-scroll gap-2' onSubmit={handleSubmit}>
                    <div className='w-full'>
                        <div class="w-full space-y-9">
                            <div class=" flex flex-row gap-3">
                                <label for="large-input" class="block mb-2 text-sm font-medium   text-black">Title</label>
                                <input value={data.title} onChange={(e)=>setData({...data,title:e.target.value})} type="text" class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class=" flex flex-row gap-3">
                                <label for="large-input" class="block mb-2 text-sm font-medium   text-black">Task</label>
                                <input value={data.task} onChange={(e)=>setData({...data,task:e.target.value})} type="text" class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class=" flex flex-row gap-3">
                                <label for="large-input" class="block mb-2 text-sm font-medium   text-black">Description</label>
                                <textarea value={data.description} onChange={(e)=>setData({...data,description:e.target.value})} type="text" rows={5} class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                        </div>
                    </div>

                    <div>
                        <button type='submit' className='p-2 bg-blue-500 rounded-lg px-6 text-white'>Add</button></div>
                </form>




            </div>
        </div>
    )
}

export default TaskEdit
