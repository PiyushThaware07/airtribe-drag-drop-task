import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RemoveElement from './RemoveElement';

export default function Editable() {
    const location = useLocation();
    const navigate = useNavigate();
    const { task, status } = location.state;

    const [form, setForm] = useState({
        title: task.title,
        description: task.description,
        status: status
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const savedData = JSON.parse(localStorage.getItem("airtribe"));
        if (!savedData) return;

        // Update the task in the corresponding status
        const updatedData = {
            ...savedData,
            [form.status]: [
                ...savedData[form.status].filter(item => item.title !== task.title),
                form
            ]
        };

        // Remove task from old category if the status has changed
        if (form.status !== status) {
            updatedData[status] = savedData[status].filter(item => item.title !== task.title);
        }
        localStorage.setItem("airtribe", JSON.stringify(updatedData));
        navigate(-1);
    };


    const savedData = JSON.parse(localStorage.getItem("airtribe"));

    return (
        <div className='mx-auto max-w-md'>
            <form className='w-full flex flex-nowrap flex-col gap-4' onSubmit={handleSubmit}>
                <input type="text" className='p-3 text-sm font-medium capitalize border-[1.3px] rounded w-full focus:outline-none' placeholder='title' name='title' value={form.title} onChange={handleChange} />
                <textarea type="text" className='p-3 text-sm font-medium capitalize border-[1.3px] rounded w-full focus:outline-none h-[100px]' placeholder='description' name='description' value={form.description} onChange={handleChange}></textarea>
                <select
                    name='status'
                    className='p-3 text-sm font-medium capitalize border-[1.3px] rounded w-full focus:outline-none'
                    value={form.status}
                    onChange={handleChange}>
                    {Object.keys(savedData).map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
                <button type='submit' className='text-sm font-medium rounded bg-slate-900 text-white h-10 capitalize'>submit</button>
                <RemoveElement  />
            </form>
        </div>
    )
}
