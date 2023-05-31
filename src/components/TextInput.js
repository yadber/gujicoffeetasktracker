import React,{useState} from 'react'
import {AiOutlineEdit,AiOutlineRead} from 'react-icons/ai'


export default function TextInput({placeholder,isEditedMethod, type, min,setting, name, onChange, value, height,editIcon,classType}) {
  const [readonlyHere, setReadonlyHere]= useState(editIcon?true:false)
  function onEditClickListnerhere(){
    setReadonlyHere(prevState=>!prevState);
    isEditedMethod(true);
  }
  const className1 = `block py-2 px-0 w-full text-sm  ${height?`h-${height}` : `h-[30px]`}text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none ${setting?"dark:text-black":"dark:text-white "} dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`

  const className2 = `block px-2.5 pb-2.5 pt-4 w-full text-sm  ${height?`h-${height}` : `h-[30px]`}
  text-gray-900 bg-transparent rounded-lg 
  border-1 border-gray-300 appearance-none 
  ${setting?"dark:text-black":"dark:text-white "}
  dark:border-gray-600 dark:focus:border-blue-500 
  focus:outline-none focus:ring-0 focus:border-blue-600 peer`
  return (
  
    <div className="relative mb-4">
        <input type={type?type:"text"} id="floating_outlined" 
        name={name}
        onChange={onChange}
        value={value}
        className={classType?className1:className2} 
        placeholder={placeholder} 
        min={min?min:""}
        required
        readOnly = {readonlyHere}
        
        />
        {editIcon ?
        <div className={`absolute ${classType?"mt-[-2.0rem] ml-[8.3rem]":"mt-[-2.1rem] ml-[9.8rem]"} cursor-pointer border rounded-full `}>
         
         {editIcon ? readonlyHere? <AiOutlineEdit onClick={onEditClickListnerhere}/>: <AiOutlineRead onClick={onEditClickListnerhere}/> : ""}
        </div>:""}
        <label htmlFor="floating_outlined"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            {placeholder}
            
        </label>
       
    </div>
 
  )
}
