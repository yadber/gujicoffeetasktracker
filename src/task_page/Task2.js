import { useEffect, useState} from 'react'
import React from 'react'
import TaskHeader from '../components/TaskHeader'
import InputFormTaskTwo from '../components/card/InputFormTaskTwo'
import ProgressBar from '../components/progress/ProgressBar'
import DateVsSack from '../components/taskTwoGraph/DateVsSack'
import ReactLoading from "react-loading";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../Firebase";
import TotalCardView from "../components/megazenComp/TotalCardView";
import ProgressDetailClicked from '../components/progress/ProgressDetailClicked'



export default function Task2() {
  const [detailClicked, setDetailClicked] = useState(false);
  const [arrayOfallData, setStoredData] = useState([]);
  const [reloading, setReloading] = useState(false);
  const [filteringData, setFilteringData] = useState([]);
  const [crewData, setCrewData] = useState([{name:"", description:""}]);
  const [otherForm, setOtherForm] = useState({
    date:"",
    fileNumber : ""
  })
  useEffect(() => {
    dataFromFirebase();
    console.log("use effect line 43");
  }, []);


  function randomColor() {
    const DiferentColors = [
      "secondary",
      "success",
      "inherit",
      "primary",
     
    ];
    
    return DiferentColors[Math.floor(Math.random() * DiferentColors.length)];
  }


  function onChange(i,e){
    let newformValues = [...crewData];
    newformValues[i][e.target.name] = e.target.value;
    setCrewData(newformValues);
  }
  
 function handleAddCrew(){
  
   const values = [...crewData];
   values.push({
    name:"",
    description:""
   });
   setCrewData(values);
  }

  function handleDeleteCrew(i){
    let newFormValues = [...crewData];
    newFormValues.splice(i,1);
    setCrewData(newFormValues);
  }
  function onChangeDate(e){
    const element = e.target;
    setOtherForm({
      ...otherForm,
      [element.name] : element.value
    })
  }
 
  // brings data from the database and stores it in the arrayOfallData state
  async function dataFromFirebase() {
    const res = [];
    const filteringRes = [];
    try {
     
      const doc_refs = await getDocs(collection(db, "incoming_new_data"));

      doc_refs.forEach((country) => {
        if(!country.data().filtering){
          res.push({
            ...country.data(),
          });
        }else{
          filteringRes.push({
            ...country.data(),
          })
        }
      });

      setStoredData(res);
      setFilteringData(filteringRes);
      
    } catch (error) {
      console.log(error);
    }
  }

  function onclickProgress(filenumber){
    console.log(filenumber);
    setDetailClicked(true);
  }
  function setDetailClickedfunction(){
    setDetailClicked(false);
  }

  async function onIncomingSubmit(e){
    e.preventDefault();
    const filteringForm = {
      filtering : {
        otherForm,
        filteringCrew : crewData
      }
    }
    try {
      setTimeout(() => {
        setReloading(true);
      }, 1000);
      const docRef = doc(db, "incoming_new_data", otherForm.fileNumber);
      updateDoc(docRef, filteringForm)
        .then((docRef) =>{
          setTimeout(()=>{
            window.location.reload()
          },3000);
        })
      
    } catch (error) {
      console.log(error);
    }
   
  }
  return (
    <>
    
    { reloading ? (
      <div className=" justify-center text-center align-middle items-center flex">
        <ReactLoading
          type="spokes"
          color="#af2f3f"
          height={"50%"}
          width={"50%"}
        />{" "}
      </div>)
     : (
     
    <div>
       <TaskHeader />
      <div className='flex gap-1'>
        <div>
        <InputFormTaskTwo 
          arrayOfallData={arrayOfallData}
          onIncomingSubmit={onIncomingSubmit} 
          crewData={crewData}
          otherForm={otherForm}
          onChange={onChange}
          handleAddCrew={handleAddCrew}
          handleDeleteCrew={handleDeleteCrew}
          onChangeDate={onChangeDate}
         
          />
        </div>
        <div className='flex flex-col p-3'>
          <div className='text-center mb-[-3rem] font-extrabold text-3xl'>
            በመጣራት ላይ ያለ...
          </div>
          <div className='w-full p-10 flex gap-5 flex-col border border-red-300 border-t-2 mt-1'>

            {
              filteringData.map((res) => <ProgressBar onclickProgress={onclickProgress} key={res.id} fileNumberMessage = {"የሰነድ ቁጥር ፡ " + res.fileNumber} color={randomColor()} fileNumber={res.fileNumber}/>
              )
            }
          </div>
          <div className='justify-center py-1  flex mx-auto gap-2 overflow-x-auto'>
            <TotalCardView text={"የተጣራ አጠቃላይ ፓኬጅ"}/>
            <TotalCardView text={"ያልተጣራ አጠቃላይ ፓኬጅ"}/>
            <TotalCardView text={"ለድጋሚ ማጣራት የተዘጋጀ"}/>
            <TotalCardView text={"የተጣራ አጠቃላይ ኩንታል"}/>
           
          </div>
        </div>
      </div>
      <div className='flex mx-auto gap-2 overflow-x-auto flex-wrap'>
        
        <DateVsSack />
        <DateVsSack />
        <DateVsSack />
        <DateVsSack />
      </div>
    </div>
    
    )
          }
    {
      detailClicked ? (
        <div>
          <ProgressDetailClicked setDetailClickedfunction ={setDetailClickedfunction}/>
        </div>
      )
       : ("")
    }
  </>
  )
}
