import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RemoveElement() {
    const location = useLocation();
    const navigate = useNavigate();
    const { task, status } = location.state;

    const handleClick = () => {
        const savedData = JSON.parse(localStorage.getItem("airtribe"));
        if (!savedData) return;
        // Remove the task from the current status
        const updatedData = {
            ...savedData,
            [status]: savedData[status].filter(item => item.title !== task.title)
        };
        localStorage.setItem("airtribe", JSON.stringify(updatedData));
        navigate(-1);
    };

    return (
        <button
            type='button'
            className='text-sm font-medium rounded bg-red-600 text-white h-10 capitalize'
            onClick={handleClick}>
            Delete
        </button>
    );
}
