import React, { useEffect } from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody';
export default function Megazen({megazenRow=8, megzenColumn=10}) {
    const ArrayOFLettersRow=[] , ArrayOFLettersColumn = [];
    for(let i=0; i<megazenRow; i++){
        ArrayOFLettersRow.push(String.fromCharCode('A'.charCodeAt()+i));
    }
    for(let i=1; i<megzenColumn+1; i++){
        ArrayOFLettersColumn.push(i);
    }
    
   

  return (
    <div className='bg-white w-[70rem] h-[50rem]'>
      Megazen
      <div className='flex items-center my-2 before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300'></div>
      <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table
          class="min-w-full border text-center text-sm font-light dark:border-neutral-500">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
            <TableHead label="#"/>
            {ArrayOFLettersRow.map(function(value){
                return <TableHead label={value} key={value}/>
            })}
            </tr>
          </thead>
          <tbody>
            {
                ArrayOFLettersColumn.map(value=>(
                    <TableBody location={value} itemValue={value} length={ArrayOFLettersRow.length}/>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
