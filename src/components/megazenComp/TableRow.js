import React, { useState } from "react";


export default function TableRow({ location, name, }) {
 
  function onMouseOver(location) {
    console.log(location);
  }


  return (
    <td
      onClick={() => onMouseOver(location)}
      className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 hover:bg-slate-500 hover:font-xl hover:cursor-pointer"
    >
      <div className="flex gap-10">
       
       
        <div  className="border h-5 w-5 text-center justify-center align-middle mt-[-0.9rem] border-yellow-300  rounded-full" id={location+"upper"}>
        </div>

        <div className="border">
          <p id={location}></p>
        </div>

        <div className="border h-5 w-5 text-center justify-center align-middle mt-[-0.9rem] border-green-300  rounded-full" id={location+"bottom"}>
        </div>
        
      </div>
    </td>
  );
}
