import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase-config';
import { onValue, ref } from 'firebase/database';
import Task from '../../components/Tasks/Task';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Home = () => {
    const [taskData, setTaskData] = useState([])
    const [filter, setFilter] = useState('all')

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
    const handleChange = (e) => {
        setFilter(e.target.value);
    };
    // console.log(taskData);
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
                <div className='  px-10 py-3 self-end '>
                    <Box >
                        <FormControl sx={{ minWidth: 220 }}>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filter}
                                label="Status"
                                onChange={handleChange}
                            >
                                <MenuItem value={'all'}>All</MenuItem>
                                <MenuItem value={'Completed'}>Completed</MenuItem>
                                <MenuItem value={'Pending'}>Pending</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                {
                    filter == "all" ? (
                        taskData?.map((taskd) => {
                            return (
                                <div >
                                    {Object.values(taskd).map((task) => {
                                        return (
                                            <Task task={task} />
                                        )

                                    })}

                                </div>

                            )
                        })
                    ) :
                      
                        (
                            taskData.map((taskd) => {     
                                return (
                                    <div>
                                       {Object.values(taskd).filter(task =>task.status ==filter).map((task) => {
                                            return (
                                                <Task task={task} />
                                            )

                                        })}

                                    </div>

                                )
                            })
                        )
                }
            </div>

        </div>
    )
}

export default Home
