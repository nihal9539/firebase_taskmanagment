import { onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import { toast } from 'react-toastify';
import DatePicker from 'react-date-picker';
import Drop from '../Drop/Drop';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';



const TaskEdit = () => {
    const user = localStorage.getItem('user')
    const navigate = useNavigate()
    const { id } = useParams()
    const [date, setDate] = useState(new Date());

    const [data, setData] = useState({
        description: "",
        title: "",
        status:""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        update(ref(db, 'task/' + user + "/" + id), {

            title: data.title,
            description: data.description,
            date: date.toISOString(),
            status:data.status

        }

        ).then(() => {
            toast.success("Updated")
            navigate("/")

            setData({
                description: "",
                title: ""
            })

        })
            .catch((err) => {
                console.log(err);
            })


    }

    useEffect(() => {
        onValue(ref(db, 'task/' + user + "/" + id), (snapdhot) => {
            setData({})
            const data = snapdhot.val();
            if (data !== null) {
                console.log(data);
                setData({
                    ...data,
                    description: data.description,
                    title: data.title,
                    status:data.status

                })
                setDate(new Date(data.date))

            }
        })
    }, [])
    console.log(data.status);
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setData({...data,status:event.target.value});
    };
    console.log(date);
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-8 m-auto bg-white rounded-md h-full shadow-xl lg:max-w-xl">

                <form className='flex flex-col justify-between items-center  h-full overflow-scroll gap-2' onSubmit={handleSubmit}>
                    <div className='w-full'>
                        <div class="w-full space-y-12">
                            <div class=" flex flex-row gap-3 pt-2">
                                <label for="large-input" class="block mb-2 text-sm font-medium   text-black">Title</label>
                                <input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} type="text" class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                            <div className=" flex flex-row gap-3">
                                <label for="large-input" className="block mb-2 text-sm font-medium   text-black">Due Date</label>

                                <DatePicker onChange={setDate} value={date} minDate={new Date()} />
                            </div>
                            <div className='flex flex-row gap-3'>
                                <label for="large-input" className="block mb-2 text-sm font-medium   text-black">Status</label>
                                <Box >
                                    <FormControl sx={{minWidth:220}}>
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={data.status}
                                            label="Status"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'Pending'}>Pending</MenuItem>
                                            <MenuItem value={'Completed'}>Completed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                            </div>
                            <div class=" flex flex-row gap-3">
                                <label for="large-input" class="block mb-2 text-sm font-medium   text-black">Description</label>
                                <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} type="text" rows={5} class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                        </div>
                    </div>

                    <div className='mt-8 m-2'>
                        <button type='submit' className='p-2 bg-blue-500 rounded-lg px-6 text-white'>Update</button></div>
                </form>




            </div>
        </div>
    )
}

export default TaskEdit
