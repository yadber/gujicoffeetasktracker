import React from 'react'

export default function TableHead({label}) {
  return (
   
    <th
    scope="col"
    class="border-r px-6 py-4 dark:border-neutral-500">
    {label}
    </th>
 
  )
}
