import React from 'react'
import TableRow from './TableRow';

export default function TableBody({location, itemValue,length,arrayOfallData,clickDetailStatusChanger}) {
    const itemValueArray = [];
    for(let i=0;i<length; i++){
        itemValueArray.push(`${location}${String.fromCharCode('A'.charCodeAt()+i)}`)
    }

  return (
    
        <tr className="border-b dark:border-neutral-500  ">
            <td
                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                    <div className='border border-black '>
                        <p id={location}>{itemValue}</p> 
                    </div>
                    
     
            </td>
            {
                itemValueArray.map(value =>(
                    <TableRow location={value} name={value} key={value} arrayOfallData={arrayOfallData} clickDetailStatusChanger={clickDetailStatusChanger} />
                ))
            }
        </tr>
  
  )
}
