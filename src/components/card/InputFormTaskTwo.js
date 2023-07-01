import React from 'react'
import TextInput from '../TextInput'

import {RiPlayListAddLine} from 'react-icons/ri'
import {AiFillDelete} from 'react-icons/ai'
import LocationDropDown from '../LocationDropDown'


export default function InputFormTaskTwo({onIncomingSubmit, arrayOfallData, crewData,otherForm,onChange,handleAddCrew,handleDeleteCrew,onChangeDate}) {
  

  return (
    <div className='max-w-[20rem]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">የቅድመ ማጣረያ ማስጀመርያ ሰነድ</h5>

    <div className='flex items-center my-2 before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300'></div>

    <form onSubmit={onIncomingSubmit}>
       <div className='  w-[65%] gap-2 mx-20'>
           
          <TextInput placeholder="ቀን" type="date" height="10" name="date" value={otherForm.date} onChange={(e)=> onChangeDate(e)}/>
          <LocationDropDown label="የሰነድ ቁጥር"  onChange={(e)=> onChangeDate(e)} name="fileNumber" value = {otherForm.fileNumber} task2={true} arrayOfallData = {arrayOfallData}
          
          />
       </div>
    <div className='flex items-center my-2 before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300'></div>
    <div className="text-md flex-wrap text-center ">
        <div className="bg-blue-100 ">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-red-700 to-black">የአባላት ስም እና የስራ ድርሻ</span>
        </div>
    </div>
     <div className='p-5'>
       <div className='items-center'>
       {crewData.map((field, index) =>{
        return (
          <div key={index} className='flex gap-2'>      
              <TextInput placeholder="የአባላት ስም" name="name" onChange={(e) => onChange(index,e)} value={crewData.name}/>
              <TextInput placeholder="የስራ ድርሻ" name="description" onChange={(e) => onChange(index,e)} value={crewData.description}/>
              <AiFillDelete  className='text-white mt-2 ml-[-1px] cursor-pointer' onClick={()=>handleDeleteCrew(index)}/>
          </div>
        )
       } )}
       <div className='ml-[15rem] mt-2 mb-2'>
         <RiPlayListAddLine className='text-white mt-[-1rem] cursor-pointer' onClick={handleAddCrew}/>
       </div>
       </div>
         
      
       
           
      
          <button 
          className='w-full bg-blue-600 text-white px-7 py-3 text-xl font-medium uppercase rounded-3xl shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
          type='submit'>ማጣራቱን ይጀር</button>
       </div>
 </form> 

  </div>
  )
}
