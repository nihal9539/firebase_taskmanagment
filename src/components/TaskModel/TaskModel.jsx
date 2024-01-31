import React, { useState } from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

import { ref, set } from "firebase/database";
import { db } from '../../config/firebase-config';
import { uid } from 'uid';
import { toast } from 'react-toastify';
import DatePicker from 'react-date-picker';


import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { IoMdArrowBack } from "react-icons/io";
export default function TaskModel({ modelOpen, setModelOpen }) {
    const uuid = uid()
    const windowWidth = window.innerWidth
    console.log(windowWidth);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        borderRadius: "1rem",
        boxShadow: 24,
        p: 4,


    };
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState({

        title: "",
        description: "",
    })
    const user = localStorage.getItem('user')



    // funtion for creating task
    
    function handleSubmit(e) {
        console.log(date);
        e.preventDefault();
        set(ref(db, 'task/' + user + "/" + uuid),
            {
                uid: uuid,
                user: user,
                title: data.title,
                description: data.description,
                status: "Pending",
                startDate: new Date().toISOString(),
                date: date.toISOString()
            }
        ).then(() => {
            toast.success("Task added")
            setDate(new Date())
        }).catch(() => {
            toast.error("Something wrong")

        })
        setData({
            title: ""
            , description: ""
        })
        setModelOpen(false)


    }
    return (
        <div>

            <Modal
                open={modelOpen}
                onClose={() => setModelOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} width={`${windowWidth > 600 ? "40%" : "100%"}`} height={`${windowWidth > 500 ? "75vh" : "100vh"}`}>
                    <form className='flex flex-col justify-between items-center  h-full overflow-scroll gap-2' onSubmit={handleSubmit}>
                        <div className=' w-full'>
                            <IoMdArrowBack className='' size={25} onClick={() => setModelOpen(false)}/>
                        </div>
                        <div className='w-full'>
                            <div className="w-full space-y-8">
                                <div className=" flex flex-row gap-3">
                                    <label for="large-input" className="block mb-2 text-sm font-medium   text-black">Title</label>
                                    <input required value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} type="text" className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div className=" flex flex-row gap-3">
                                    <label for="large-input" className="block mb-2 text-sm font-medium   text-black">Due Date</label>

                                    <DatePicker  onChange={setDate} required value={date} minDate={new Date()} />
                                </div>

                                <div className=" flex flex-row gap-3">
                                    <label for="large-input" className="block mb-2 text-sm font-medium   text-black">Description</label>
                                    <textarea required value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} type="text" rows={5} className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>

                            </div>
                        </div>

                        <div>
                            <button type='submit' className='p-2 bg-blue-500 rounded-lg px-6 text-white'>Add</button></div>

                    </form>



                </Box>
            </Modal>
        </div>
    );
}
