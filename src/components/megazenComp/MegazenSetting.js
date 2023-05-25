import React, { useState } from 'react'
import {AiFillSetting} from "react-icons/ai"
import TextInput from '../TextInput'
import {AiFillCloseCircle} from 'react-icons/ai'
export default function MegazenSetting({saveSetting,megazenSettingRow,megazenSettingColumn}) {
    const [showModal, setShowModal] = useState(false)
  return (
    <>
    
    <div className='relative'>
        <div className='absolute top-[-1px] right-5'>
            <button
                className="block h-8 w-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                type="button"
                onClick={() => setShowModal(true)}
            >
               <AiFillSetting className='text-xl'/>
            </button>
        </div>
    </div>
    {showModal ? (
        <>
        <form onSubmit={saveSetting}>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <AiFillSetting className='text-2xl mt-2'/>
                  <h3 className="text-3xl font-semibold">
                    የመጋዘን ሀ መቀያየሪያ
                  </h3>
                     <div className="h-4 w-4 p-1 ml-5 bg-transparent border-0 text-red-400 opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none cursor-pointer">
                        <AiFillCloseCircle onClick={() => setShowModal(false)}/>
                      </div>
                  
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  
                    <TextInput placeholder="Column" type="number" min="0" setting="1" name="column" 
                    onChange = {saveSetting} value ={megazenSettingColumn} height="40"/>
                    <TextInput placeholder="Row" type="number" min="0" setting="1" name="row"
                    onChange={saveSetting} value={megazenSettingRow} height="40"
                    />
                  <div className='flex border-yellow-600 border px-10 py-2'>

                   <div className="border h-5 w-5 text-center justify-center align-middle  border-yellow-600 mt-2 rounded-full font-bold text-red-900">
                      <p className='mt-[-2px] cursor-pointer'>i</p>
                    </div>
                    <div className='ml-5 mt-[5px]'>
                      ኩንታሉ ጉድለት ኣሳይቷል
                    </div>
                  </div>
                  <div className='flex border-red-400 border px-10 py-2 mt-2'>

                  <div className="border h-5 w-5 text-center justify-center align-middle  border-red-400 mt-2 rounded-full font-bold text-red-900">
                    <p className='mt-[-2px] cursor-pointer'>N</p>
                  </div>
                  <div className='ml-5 mt-[5px]'>
                    አዲስ ገቢ (ክገባ 10 ቀን ያላለፈው)
                  </div>
                  </div>

                </div>
               
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </form>
        </>
      ) : null}

    </>
  )
}
