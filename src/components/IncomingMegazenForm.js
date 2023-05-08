import React from 'react'
import TextInput from './TextInput'
export default function IncomingMegazenForm() {
    
  return (
    <div className='max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">የገቢ ምርት መረከቢያ ሰነድ</h5>
      <div className='flex items-center my-2 before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300'></div>
       <form>
       <div className='p-5'>
           <TextInput placeholder="የደንበኛው ስም"/>
           <TextInput placeholder="የመኪናው ሰሌዳ ቁጥር"/>
           <div className='flex gap-2' >
              <TextInput placeholder="የምርቱ ዓይነት"/>
              <TextInput placeholder="ደረጃ"/>
           </div>
           
           <TextInput placeholder="ምርቱ የመጣበት አከባቢ"/>
           <TextInput placeholder="የወጪ ሰነድ ቁጥር (GIN No.)"/>
           <div className='flex gap-2' >
              <TextInput placeholder="ጠቅላላ ክብደት"/>
              <TextInput placeholder="ነጠላ ክብደት"/>
           </div>
           <TextInput placeholder="የጆንያ ብዛት"/>
           <TextInput placeholder="የተጣራ ክብደት"/>
           <div className='flex gap-2' >
              <TextInput placeholder="የአስረካቢ ስም"/>
              <TextInput placeholder="የተረካቢው ሰም"/>
           </div>
       </div>
      <div className="p-5">
            <button 
            className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
            type='submit'>Save</button>
      </div>
         
            </form> 

    </div>
  )
}
