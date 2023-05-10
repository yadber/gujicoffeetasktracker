import React from 'react'

export default function TableRow({location, name}) {
  function onMouseOver(location){
    console.log(location)
  }
  return (
    <td onClick={()=>onMouseOver(location)}
      className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 hover:bg-slate-500 hover:font-xl hover:cursor-pointer">
    <p id={location}></p>            
    </td>
  )
}
