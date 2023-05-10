import React from 'react'

export default function TextInput({placeholder, type, min,setting, name, onChange, value}) {
  return (
  
    <div className="relative mb-4">
        <input type={type?type:"text"} id="floating_outlined" 
        name={name}
        onChange={onChange}
        value={value}
        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm 
        text-gray-900 bg-transparent rounded-lg 
        border-1 border-gray-300 appearance-none 
        ${setting?"dark:text-black":"dark:text-white "}
        dark:border-gray-600 dark:focus:border-blue-500 
        focus:outline-none focus:ring-0 focus:border-blue-600 peer`} 
        placeholder={placeholder} 
        min={min?min:""}
        />
        <label htmlFor="floating_outlined"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            {placeholder}
        </label>
    </div>
 
  )
}
