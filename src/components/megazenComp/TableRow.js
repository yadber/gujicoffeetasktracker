import React from 'react'

export default function TableRow({location, name}) {
  
  function locationPlacement(place, text){
    document.getElementById(place).innerHTML = text
  }
  
  locationPlacement("4B","YADESA")
  return (
    <td
    class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
    <p id={location}></p>            
    </td>
  )
}
