import React from 'react'
import TaskHeader from '../components/TaskHeader'
import IncomingMegazenForm from '../components/IncomingMegazenForm'
import Megazen from '../components/megazenComp/Megazen'
export default function Task1() {
  return (
    <>
      <TaskHeader />
      <div className='flex justify-center flex-wrap  px-6 py-12  mx-auto gap-2'>
        <div><IncomingMegazenForm/></div>
        <div><Megazen/> </div>
      </div>
    </>
  )
}
