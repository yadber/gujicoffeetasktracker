import React from 'react'
import TextInput from './TextInput'
import LocationDropDown from './LocationDropDown'
export default function IncomingMegazenForm({onIncomingSubmit, date,fileNumber,customerName,numberPlate,productType,productLevel,productResident,GINNumber,totalWeight,singleWeight,sackQuantity,filteredWeight,providerName,receiverName,megazenLocation,onChange,megazenSettingRow,column, row,megazenSettingColumn}) {
  
  
  return (
    <div className='max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">የገቢ ምርት መረከቢያ ሰነድ</h5>

      <div className='flex items-center my-2 before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300'></div>
  
      <form onSubmit={onIncomingSubmit}>
         <div className=' flex w-[80%] gap-2 mx-16'>
            <TextInput placeholder="ቀን" type="date" height="10" name="date" value={date} onChange={onChange}/>
            <TextInput placeholder="የሰነድ ቁጥር" type="number" min="0" height="10" onChange={onChange} name="fileNumber" value={fileNumber}/>
         </div>
      <div className='flex items-center my-2 before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300'></div>
       <div className='p-5'>
         <div className='flex gap-2'>
           <TextInput placeholder="የደንበኛው ስም" name="customerName"onChange={onChange} value={customerName}/>
           <TextInput placeholder="የመኪናው ሰሌዳ ቁጥር" name="numberPlate"onChange={onChange} value={numberPlate}/>
         </div>
           <div className='flex gap-2' >
              <TextInput placeholder="የምርቱ ዓይነት" name="productType" onChange={onChange}value={productType}/>
              <TextInput placeholder="ደረጃ" name="productLevel" onChange={onChange}value={productLevel}/>
           </div>
           <div className='flex gap-2'>
           <TextInput placeholder="ምርቱ የመጣበት አከባቢ" name="productResident"onChange={onChange} value={productResident}/>
           <TextInput placeholder="የወጪ ሰነድ ቁጥር" name="GINNumber" onChange={onChange}value={GINNumber}/>
           </div>
           <div className='flex gap-2' >
              <TextInput placeholder="ጠቅላላ ክብደት" name="totalWeight" onChange={onChange}value={totalWeight}/>
              <TextInput placeholder="ነጠላ ክብደት" name="singleWeight" onChange={onChange}value={singleWeight}/>
           </div>
           <div className='flex gap-2'>
           <TextInput placeholder="የጆንያ ብዛት" name="sackQuantity" onChange={onChange}value={sackQuantity}/>
           <TextInput placeholder="የተጣራ ክብደት" name="filteredWeight" onChange={onChange}value={filteredWeight}/>
           </div>
           <div className='flex gap-2' >
              <TextInput placeholder="የአስረካቢ ስም" name="providerName" onChange={onChange}value={providerName}/>
              <TextInput placeholder="የተረካቢው ሰም" name="receiverName"onChange={onChange} value={receiverName}/>
           </div>
           <div className='mb-1'>
            <label className='text-white bg-slate-900 text-xl'>የመጋዘን መቀመጫ ምረጥ</label>
            </div>

           <div className='flex gap-4'>
               <LocationDropDown label="Column" options={megazenSettingColumn} letter="true" onChange={onChange} name="column"/>
               <LocationDropDown label="Row" options={megazenSettingRow} letter={""} onChange={onChange} name="row"/>
           </div>
            <button 
            className='w-full bg-blue-600 text-white px-7 py-3 text-xl font-medium uppercase rounded-3xl shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
            type='submit'>አስቀምጥ</button>
         </div>
   </form> 

    </div>
  )
}
