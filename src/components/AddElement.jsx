import React, { useState } from 'react';

export default function AddElement({ status, addTask }) {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            addTask(status, inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <div className="add_new_data mt-5">
            <input
                type="text"
                placeholder='+ New (Press Enter)'
                className='w-full p-2 bg-transparent rounded focus:outline-none font-semibold text-sm capitalize'
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
