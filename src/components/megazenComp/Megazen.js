import TableHead from './TableHead'
import TableBody from './TableBody';
import MegazenSetting from './MegazenSetting';
import { useState,useEffect } from 'react';




export default function Megazen() {
    

    const [locationAndMessage, setLocationAndMessage] = useState({
      location : "4C",
      message : "Berchu"
    })
    const [timeToLoad, setTimeToLoad] = useState(false)
    
    const locationAndMessageArray = [{location:"5C",message:"Yadesa"}, {location:"2D", message:"2D"}];
    locationAndMessageArray.push({location:locationAndMessage.location, message:locationAndMessage.message})
    
    useEffect(() => {
      const methed = setTimeout(()=>{
        setTimeToLoad(true)
      },1);
      return () => clearTimeout(methed);
    }, [])
    
    function onClickSave(){
      setLocationAndMessage({
        location : "5H",
        message : "What"
      })
    }
    const [megazenSetting, setMegazenSetting] = useState({
      column : "6",
      row : "6"
  })
    function saveSetting(e) {
      e.preventDefault()
      const element = e.target;
      setMegazenSetting(prevState =>({
          ...prevState,
          [element.name] : element.value
      })) 
  }


    const numberMegazenRow = Number(megazenSetting.row);
    const numberMegazenColumn = Number(megazenSetting.column)
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
        <MegazenSetting saveSetting={saveSetting}
         megazenSettingRow={megazenSetting.row}
         megazenSettingColumn={megazenSetting.column}
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
