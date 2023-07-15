import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


export default function TaskHeader(theme) {
const classNameForLiComponent = `cursor-pointer py-2 text-sm  md:text-lg lg:text-xl font-semibold ${!theme? "text-gray-300":"text-gray-500"} border-b-[3px] border-b-transparent hover:border-b-red-400 hover:font-bold `
const navigate = useNavigate();
const location = useLocation(); 

function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
}
return (
    <div className='text-center bg-green-50 border-b shadow-lg sticky top-[3rem] z-50 w-[24rem] lg:w-full md:w-full sm:w-full'>
        <header>
            <ul className='flex justify-between items-centers px-3 max-w-4xl mx-auto'>
                <li className= {classNameForLiComponent + `${pathMathRoute("/task/task1") ? " border-b-red-500 font-bold ": ""}`} 
                    onClick={()=>navigate("/task/task1")}
                >
                    የገቢ ምርት መረከቢያ ሰነድ
                </li>
                <li className={classNameForLiComponent + `${pathMathRoute("/task/task2") ? " border-b-red-500 font-bold ": ""}`}
                    onClick={()=>navigate("/task/task2")}
                >
                    የቅድመ ማጣርያ ተግባር
                </li>
                <li className={classNameForLiComponent +  `${pathMathRoute("/task/task3") ? " border-b-red-400 ": " "}`}
                onClick={()=>navigate("/task/task3")}
                >
                    የማጣራት ማጠናነቅያ ሰነድ
                </li>
                <li className={classNameForLiComponent +  `${pathMathRoute("/task/task4") ? " border-b-red-400 font-bold": ""}`}
                onClick={()=>navigate("/task/task4")}
                >
                    የተጣራ ቡና መጋዘን
                </li>
            </ul>
        </header>
      
    </div>
  )
}
