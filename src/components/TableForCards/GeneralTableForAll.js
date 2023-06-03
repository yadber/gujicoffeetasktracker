import React from 'react'
import TextInput from "../TextInput";
import { AiFillCloseCircle } from "react-icons/ai";

export default function GeneralTableForAll({title, id, type,setShowGeneralTableMethod}) {
  return (
    <>
    {" "}
    <form >
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <div className="h-4 w-4 p-1 ml-5 bg-transparent border-0 text-red-400 opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none cursor-pointer"
              onClick={setShowGeneralTableMethod}
              >
                <AiFillCloseCircle />
              </div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <TextInput
                placeholder="Column"
                type="number"
                min="0"
                setting="1"
                name="column"
                value={id}
                height="10"
              />
              <TextInput
                placeholder="Row"
                type="text"
                min="0"
                setting="1"
                name="row"
                value={type}
                height="10"
              />
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={setShowGeneralTableMethod}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </form>
  </>
  )
}
