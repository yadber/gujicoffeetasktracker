import React from 'react'
import CountUp from 'react-countup/'
export default function TotalCardView({text, number}) {
  return (
    <div>
         <div className='block max-w-sm p-6 w-60 h-30 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100  dark:hover:bg-gray-200'>
                <div className="flex flex-col items-center justify-center">
                    <dd className="text-red-500 dark:text-red-600 text-xl font-semibold border">{text}</dd>
                    <dt className="mb-2 text-4xl font-extrabold"><CountUp start={0} end={number} duration={4}/>+</dt>
                    
                </div>
         </div>
    </div>
   
  )
}
