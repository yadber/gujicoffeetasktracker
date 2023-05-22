import React, { useState } from "react";
import { MdFiberNew } from "react-icons/md";
import { MdNewReleases } from "react-icons/md";

export default function TableRow({ location, name, arrayOfallData }) {
 
  function onMouseOver(location) {
    console.log(location);
  }


  return (
    <td
      onClick={() => onMouseOver(location)}
      className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 hover:bg-slate-500 hover:font-xl hover:cursor-pointer"
    >
      <div className="flex gap-10">
       
       
        <div className="border" id={location+"upper"}>
          
        </div>

        <div className="border">
          <p id={location}></p>
        </div>

        <div className="border" id={location+"bottom"}>

        </div>
        
      </div>
    </td>
  );
}
