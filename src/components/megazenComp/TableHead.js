import React from 'react'

export default function TableHead({label}) {
  return (
   
    <th scope="col" className="border-r px-6 py-4 dark:border-neutral-500 bg-gray-200">
      {label}
      </th>
 
  )
}
