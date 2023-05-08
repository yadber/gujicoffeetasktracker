import React from 'react'
import TableRow from './TableRow';

export default function TableBody({location, itemValue,length}) {
    const itemValueArray = [];
    for(let i=0;i<length; i++){
        itemValueArray.push(`${location}${String.fromCharCode('A'.charCodeAt()+i)}`)
    }
    console.log(itemValueArray)
  return (
    
        <tr class="border-b dark:border-neutral-500">
            <td
                class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                <p id={location}>{itemValue}</p> 
     
            </td>
            {
                itemValueArray.map(value =>(
                    <TableRow location={value} name={value}/>
                ))
            }
        </tr>
  
  )
}
