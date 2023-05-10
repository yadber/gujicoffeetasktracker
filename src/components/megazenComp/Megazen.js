import TableHead from './TableHead'
import TableBody from './TableBody';
import MegazenSetting from './MegazenSetting';
import { useState,useEffect } from 'react';




export default function Megazen({saveSetting,megazenSettingRow,megazenSettingColumn, location, message}) {
    
    const items = {...localStorage}
    const [allValue, setAllValue] = useState(items)
    useEffect(() => {
      console.log(allValue)
    }, [allValue])

    // const [locationAndMessage, setLocationAndMessage] = useState({
    //   location : "4C",
    //   message : "Berchu"
    // })
    const [timeToLoad, setTimeToLoad] = useState(false)
    
    const locationAndMessageArray = [{location:location,message:message}];
    // const locationAndMessageArray = [{location:location,message:message}, {location:"2D", message:"2D"}];
    // locationAndMessageArray.push({location:locationAndMessage.location, message:locationAndMessage.message})
    
    useEffect(() => {
      setTimeout(()=>{
        setTimeToLoad(true)
      },1);
     
    }, [])
    
    function onClickSave(){
      // setLocationAndMessage({
      //   location : "5H",
      //   message : "What"
      // })
    }
    const numberMegazenRow = Number(megazenSettingColumn);
    const numberMegazenColumn = Number(megazenSettingRow);
    const ArrayOFLettersRow=[] , ArrayOFLettersColumn = [];
    for(let i=0; i< numberMegazenRow; i++){
        ArrayOFLettersRow.push(String.fromCharCode('A'.charCodeAt()+i));
    }
    for(let i=1; i<numberMegazenColumn+1; i++){
        ArrayOFLettersColumn.push(i);
    }

    function locationPlacement(place, text){
      document.getElementById(place).innerHTML = text
    }
    
    

   

  return (
      <div className='bg-white w-[70rem] h-[50rem]'>
        Megazen
        <div className='flex items-center my-2 before:border-t  before:flex-1 border-1 before:border-gray-600 after:border-t  after:flex-1 after:border-gray-600'></div>
        <MegazenSetting 
         saveSetting={saveSetting}
         megazenSettingRow={megazenSettingRow}
         megazenSettingColumn={megazenSettingColumn}
         />


        <div className="flex flex-col px-6 py-6">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className=" min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
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
                          <TableBody key={value} location={value} itemValue={value} length={ArrayOFLettersRow.length}/>
                      ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {
        timeToLoad ? 
        locationAndMessageArray.map(val => (
          locationPlacement(val.location, val.message)
        )) : 
        ""
      }

      <p className='cursor-pointer' onClick={onClickSave}>onclick</p>
          
    </div>
  )
}
