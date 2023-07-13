import React from 'react'
import TextInput from '../TextInput'
import {RiPlayListAddLine} from "react-icons/ri"
import {AiFillDelete} from "react-icons/ai"
import LocationDropDown from '../LocationDropDown'
export default function RejectSectionForm({rejectionTypes, onChange,handleRejectionTypes,handleDeleteRejctionTypes,filteringData,onChangeDate, otherForm,onCleanCoffeeChange,cleanCoffee,submitFilteringComplete }) {
  return (
    <div className='max-w-[20rem]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">የማጣሪያ ማጠናቀቅያ ሰነድ</h5>

    <div className='flex items-center my-2 before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300'></div>

    <form onSubmit={(e) =>submitFilteringComplete(e)}>
       <div className='  w-[65%] gap-2 mx-20'>
           
          <TextInput placeholder="ቀን" type="date" height="10" name="date" onChange={(e)=>onChangeDate(e)} value={otherForm.date}/>
        
          <LocationDropDown label="የሰነድ ቁጥር"   name="fileNumber" task2={true} arrayOfallData = {filteringData} onChange={(e)=>onChangeDate(e)} value={otherForm.fileNumber}
          /> 
       </div>
    <div className='flex items-center my-2 before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300'></div>
    <div className="text-md flex-wrap text-center ">
        <div className="bg-blue-100 ">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-red-700 to-black">የውግድ ዓይነት እና የክብደት መጠን(KG)</span>
        </div>
    </div>
     <div className='p-5'>
       <div className='items-center'>
       {rejectionTypes.map((field, index) =>{
        return (
          <div key={index} className='flex gap-1 mb-[-8px]'>      
              <TextInput placeholder="የውግድ ዓይነት" name="type" 
              onChange={(e) => onChange(index,e)} value={rejectionTypes.type}/>
              <TextInput placeholder="የክብደት መጠን" name="weight" type="number"
              onChange={(e) => onChange(index,e)} value={rejectionTypes.weight} min="0"/>
              <AiFillDelete  className=' text-red-500 mt-2 ml-[1px] cursor-pointer' onClick={()=>handleDeleteRejctionTypes(index)}/>
          </div>
        )
       } )}
       <div className='ml-[15rem] mt-2 mb-2'>
         <RiPlayListAddLine className='text-white mt-[-1rem] cursor-pointer' onClick={handleRejectionTypes}/>
       </div>
       </div>
       </div>



       <div className="text-md flex-wrap text-center mt-[-1rem] mb-3">
        <div className="bg-gray-50 ">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-green-700 to-black">የተጣራ ቡና እና የክብደት መጠን(KG)</span>
        </div>
       <div className='p-5'>
            <TextInput placeholder={"የንጹህ ቡና አጠቃላይ ክብደት"} name="totalWeight" value={cleanCoffee.totalWeight} onChange={(e) => onCleanCoffeeChange(e)} type="number" min="0"/>

            <TextInput placeholder={"የተቀመጠበት ጎተራ"} name="location" value={cleanCoffee.location} onChange={(e) => onCleanCoffeeChange(e)} />
            <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-left ml-2 ">አጠቃላይ ገለጻ እዝህ ያስፍሩ</label>
            <textarea id='message' className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='description' placeholder='ገለጻ' value={cleanCoffee.description} onChange={(e)=> onCleanCoffeeChange(e)}/>
           

            
       </div>


        </div>
       
           
        <div className='p-5 mt-[-3rem]'>
          <button 
          className='w-full bg-blue-600 text-white px-7 py-3 text-xl font-medium uppercase rounded-3xl shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
          type='submit'>ማጣራቱ አጠናቅ</button>
        </div>
     
 </form> 
 </div>
  )
}
