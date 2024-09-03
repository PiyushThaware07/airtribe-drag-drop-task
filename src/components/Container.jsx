import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import initialData from "../json/data.json";
import AddElement from './AddElement';

export default function Container() {
    const navigate = useNavigate();

    const savedData = localStorage.getItem("airtribe");
    const [data, setData] = useState(savedData ? JSON.parse(savedData) : initialData);

    const handleDragStart = (e, item, fromCategory) => {
        e.dataTransfer.setData('item', JSON.stringify(item));
        e.dataTransfer.setData('fromCategory', fromCategory);
    };

    const handleDropElement = (e, toCategory) => {
        const item = JSON.parse(e.dataTransfer.getData("item"));
        const fromCategory = e.dataTransfer.getData("fromCategory");
        if (fromCategory === toCategory) return;
        const updatedData = {
            ...data,
            [fromCategory]: data[fromCategory].filter((element) => element.title !== item.title),
            [toCategory]: [...data[toCategory], item]
        }
        setData(updatedData);
    }

    // store data to local storage
    useEffect(() => {
        localStorage.setItem("airtribe", JSON.stringify(data));
    }, [data])


    const addTask = (status, newTask) => {
        setData({
            ...data,
            [status]: [...data[status], { title: newTask, description: "" }]
        });
    };


    // ADD new column
    /*
    const inputRef = useRef(null);
    function handleAddColumn(event) {
        if (event.key === "Enter" && inputRef.current.value.trim() !== "") {
            const key = inputRef.current.value
            setData({
                ...data,
                [key]: []
            })
        }
    }
        */


    return (

        <>
            {/* <div className="max-w-sm mx-auto mb-20">
                <input type="text" placeholder='Column Name' ref={inputRef} onKeyDown={handleAddColumn} className='text-sm font-medium p-2 focus:outline-none border rounded w-full' />
            </div> */}
            <div className='app_container grid grid-cols-1 md:grid-cols-3 gap-10'>
                {
                    Object.keys(data).map((status) => {
                        return (
                            <section key={status}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDropElement(e, status)}>
                                <div className="flex flex-nowrap items-center justify-between gap-5 mb-5">
                                    <div className="text-xs font-semibold flex flex-nowrap items-center gap-4">
                                        <h1 className={`
                                        ${status === "not started" && "bg-red-200 text-red-600 border-red-600 "}
                                        ${status === "in progress" && "bg-yellow-200 text-yellow-600 border-yellow-600"}
                                        ${status === "completed" && "bg-green-200 text-green-600 border-green-600"} 
                                        inline capitalize px-3 py-1 rounded border`}>{status}</h1>
                                        <h1 className='text-gray-400 text-[16px] font-medium'>{data[status].length}</h1>
                                    </div>
                                    <HiPlus className='text-xl text-gray-400' />
                                </div>
                                <ul className='flex flex-nowrap flex-col gap-4 mt-10'>
                                    {data[status].map((task) => (
                                        <li
                                            key={task.title}
                                            className='text-xs tracking-[1px] font-medium text-gray-500 bg-white rounded border p-3 select-none cursor-pointer'
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, task, status)}
                                            onClick={() => {
                                                navigate("/editable", { state: { task: task, status: status } })
                                            }}>
                                            <span>
                                                {task.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <AddElement status={status} addTask={addTask} />
                            </section>
                        )
                    })
                }
            </div>
        </>

    )
}
