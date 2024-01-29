import React, { useState } from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

import {  ref, set } from "firebase/database";
import { db } from '../../config/firebase-config';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    height: "70vh",
    bgcolor: 'background.paper',
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
};


export default function TaskModel({ modelOpen, setModelOpen }) {



    const [data, setData] = useState({
        date: "",
        title: "",
        task: "",
        description: ""
    })
    // const handleSubmit = () => {
    //     //   createTask(user.user._id,data)



    // }
    function handleSubmit(userId, name, email, imageUrl) {

        set(ref(db, 'users/' + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl
        });
    }
    return (
        <div>

            <Modal
                open={modelOpen}
                onClose={() => setModelOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <form className='flex flex-col justify-between items-center  h-full overflow-scroll gap-2' onSubmit={handleSubmit}>
                        <div className='w-full'>
                            <div class="w-full space-y-9">
                                <div class=" flex flex-row gap-3">
                                    <label for="large-input" class="block mb-2 text-sm font-medium   text-black">Title</label>
                                    <input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} type="text" class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class=" flex flex-row gap-3">
                                    <label for="large-input" class="block mb-2 text-sm font-medium   text-black">Task</label>
                                    <input value={data.task} onChange={(e) => setData({ ...data, task: e.target.value })} type="text" class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                {/* <div class=" flex flex-row gap-3">
                                    <label for="large-input" class="block mb-2 text-sm font-medium   text-black">Date</label>
                                    <DatePicker onChange={onChange} value={value} />

                                </div> */}
                                <div class=" flex flex-row gap-3">
                                    <label for="large-input" class="block mb-2 text-sm font-medium   text-black">Description</label>
                                    <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} type="text" rows={5} class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
