import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";

export default function TableRow({ location, name, arrayOfallData,clickDetailStatusChanger}) {
 
  function onMouseOver(location) {
    const searchIndex = arrayOfallData.findIndex((car) => car.row + car.column ===location);
    if(arrayOfallData[searchIndex]){
      clickDetailStatusChanger(arrayOfallData[searchIndex])
    }
    
    
  }
  function onMouseOver2(location) {
    const searchIndex = arrayOfallData.findIndex((car) => car.row + car.column ===location);
    return searchIndex;
  }

  function calculateTime(index){
    const difference = Math.floor((Timestamp.fromDate(new Date()) - arrayOfallData[index].timestamp) / 60 / 60 / 24)
    return difference;
  }
 

  return (
    <td
      onClick={() => onMouseOver(location)}
      className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 hover:bg-slate-500 hover:font-xl hover:cursor-pointer"
    >
      <div className="flex gap-1">
       
       
        <div  className={`${(onMouseOver2(location) >= 0) && (arrayOfallData[onMouseOver2(location)].sackQuantity < 140)  ?"border h-5 w-5 text-center justify-center align-middle mt-[-0.9rem] border-yellow-600  rounded-full font-bold":null}`} id={location+"upper"}>
        </div>

        <div className={`${onMouseOver2(location) >= 0?"border-2 px-2 py-2 border-blue-200":""}`}>
          <p id={location}></p>
        </div>

        <div className={`${onMouseOver2(location) >=0 && calculateTime(onMouseOver2(location)) <7?"border h-5 w-5 text-center justify-center align-middle mt-[-0.9rem] border-red-400  rounded-full font-bold text-red-900":null}`} id={location+"bottom"}>
        </div>
        
      </div>
    </td>
  );
}
