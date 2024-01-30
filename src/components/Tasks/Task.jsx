import { ref, set, update } from 'firebase/database';
import React, { useState } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { FaRegUserCircle } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { db } from '../../config/firebase-config';

const Task = ({ task }) => {
    const [comment, setComment] = useState('')
    const windowWidth = window.innerWidth

    if (task.comment) {
        Object.values(task?.comment).map((task) => {
            return (
                console.log(task)
            )
    
        })
    }

    const [commentDrop, setCommentDrop] = useState(false)
    const user = localStorage.getItem('user')

    const uniqueId = Date.now()
    const handlesendComment = (userId, id) => {
        update(ref(db, 'task/' + userId + "/" + id + '/comment'), {
            [uniqueId]:
            {
                user: user,
                comment: comment
            }
        }).then(()=>{
            setComment('')
        })
    }
    return (
        <div className='  px-10 py-3 ' key={task?.uid}>
            <div className='   shadow-md gap-4 items-center justify-center  rounded-xl ' style={{ background: "rgba(255, 255, 255, 0.64)" }} >

                <div className='flex flex-row w-full  p-3 py-7'>
                    <div className='w-3/12'>{task?.title}</div>
                    <div className='w-4/12  break-words' ><span>{task?.description}</span></div>
                    <div className='w-3/12'>{task?.date.slice(0,10)}</div>
                    <div className={`w-3/12 ${task?.status === 'Pending' ? 'text-red-500':"text-green-500"}`}>{task?.status}</div>
                </div>

                <div className='bg-red-200 flex flex-row p-2 px-6 items-center gap-4 rounded-xl' style={{ background: "rgba(255, 255, 255, 0.64)" }}>
                    <div><BiCommentDetail size={25} onClick={() => { setCommentDrop(!commentDrop) }} /></div>
                    <div className='flex flex-row w-full items-center pr-5 rounded-lg' style={{ background: " rgba(40, 52, 62, 0.07)" }}  >

                        <input className='w-full p-2 outline-none border-0 rounded-lg bg-transparent' value={comment} onChange={(e) => setComment(e.target.value)} color='red' type="text" placeholder='Add a comment' />
                        <div className='' onClick={() => handlesendComment(task.user, task.uid)}>
                            <VscSend size={25} color='black' className='' />
                        </div>
                    </div>
                </div>
                <div className='bg-red-200 flex flex-row p-2 px-6 items-center gap-4 rounded-xl' style={{ background: "rgba(255, 255, 255, 0.64)" }}>

                    <div className={`grid  overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${commentDrop ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`} >

                        <div className='overflow-scroll max-h-40  w-full'>
                            <div className='flex flex-col gap-4 px-8 items-center  w-full'>
                                { task.comment ? Object.values(task?.comment).map((task) => {
                                    return (
                                        <div key={task.comment} className=' w-full gap-2 justify-start items-center  flex flex-row'>
                                            <div className=''><FaRegUserCircle size={20} /></div>
                                            <div className='flex break-all' >{task.comment}</div>
                                        </div>
                                    )

                                }) : (<div >

                                    <span className='font-semibold'>No comments</span>
                                </div>)}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task
