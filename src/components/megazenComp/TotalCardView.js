import React from 'react'
import CountUp from 'react-countup/'
export default function TotalCardView({text, number,comp, onClick}) {
  
  return (
    <div>
         <div className='block max-w-sm p-6 w-60 h-30 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100  dark:hover:bg-gray-200'
         onClick={onClick}
        
         >
                <div className="flex flex-col items-center justify-center">
                    <dd className="text-red-500 dark:text-red-600 text-xl font-semibold border">{text}</dd>
                    <dt className="flex gap-3 mb-2 text-4xl font-extrabold">
                      <CountUp start={0} end={number} duration={10}/>
                      <div className=' text-3xl mt-[6px]'>
                        {comp}
                      </div>
                    </dt>
                    
                </div>
         </div>
    </div>
   
  )
}
