import React, { useState } from "react";
import { MdFiberNew } from "react-icons/md";
import { MdNewReleases } from "react-icons/md";

export default function TableRow({ location, name, arrayOfallData }) {
  const [status, setStatus] = useState(true);
  const [godolo, setGodolo] = useState(false);
  function onMouseOver(location) {
    console.log(location);
  }
  function checkForGodolo(){
    for(let i=0; i<arrayOfallData.length; i++){
      if(arrayOfallData[i].sackQuantity>100 && 
        arrayOfallData[i].megazenLocation === location){
          return (
            <div>
        <MdNewReleases/>
      </div>
          )
        }else{
          return(
            <div>
            ""
         </div>
          )
        }
      
  
     
    }
  }

  return (
    <td
      onClick={() => onMouseOver(location)}
      className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 hover:bg-slate-500 hover:font-xl hover:cursor-pointer"
    >
      <div className="flex gap-10">
        <div>
          {checkForGodolo()}
        </div>
        <div className="border">
          <p id={location}></p>
        </div>
        {status ? (
          <div className="mt-[-10px]">
            <MdFiberNew />
          </div>
        ) : (
          <div className="mt-[-10px]">
            <MdNewReleases />
          </div>
        )}
      </div>
    </td>
  );
}
