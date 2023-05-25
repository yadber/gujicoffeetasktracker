import React from 'react'
import gujiCoffee from "../img/guji coffee.webp"
import { useLocation, useNavigate } from 'react-router-dom'
import {MdDarkMode,MdOutlineDarkMode } from 'react-icons/md'

export default function Header({theme, onThemeClick}) {
    const navigate = useNavigate()
    const location = useLocation();
    const classNameForLiComponent = `cursor-pointer py-3 text-sm  md:text-lg lg:text-2xl font-semibold ${theme? "text-gray-800" : "text-white"} border-b-[3px] border-b-transparent hover:border-b-red-400 hover:font-bold`
  
    function pathMathRoute(route) {
        if (route === location.pathname) {
          return true;
        }
    }


  
    return (
    <div className={`${theme ? "bg-white" : "bg-gray-600"} border-b shadow-lg sticky top-0 z-40 w-[24rem] lg:w-full md:w-full sm:w-full`}>
        <header className='flex justify-between items-center px-3 max-w-7xl mx-auto'>
            <div>
                <img src={gujiCoffee} 
                alt='Guji Highland Coffee'
                className='cursor-pointer min-w-[20px]'
                onClick={()=>navigate("/")}
                />
            </div>
            <div>
                <ul className='flex space-x-3 lg:space-x-14 md:space-x-8'>
                    <li 
                        className={classNameForLiComponent + `${pathMathRoute("/") ? " border-b-slate-900 font-bold": ""}`}
                        onClick={()=>navigate("/")}>
                        Home
                    </li>
                    <li
                        className={classNameForLiComponent + `${pathMathRoute("/dashboard") ? " border-b-slate-900 font-bold": ""}`}
                        onClick={()=>navigate("/dashboard")}>
                        Dashboard
                    </li>
                    <li
                        className={classNameForLiComponent + `${pathMathRoute("/task") ? " border-b-slate-900 font-bold": ""}`}
                        onClick={()=>navigate("/task")}>
                        Task
                    </li>
                    <li
                        className={classNameForLiComponent + `${pathMathRoute("/report") ?" border-b-slate-900 font-bold": ""}`}
                        onClick={()=>navigate("/report")}>
                        Report
                    </li>
                    <li className="mt-4 cursor-pointer">
                        {theme? <MdDarkMode onClick={onThemeClick} className='hover:text-lg'/> : <MdOutlineDarkMode onClick={onThemeClick} className='hover:text-lg'/>}
                    </li>
                </ul>
            </div>
        </header>
      
    </div>
  )
}
