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
import GeneralTableForAll from "../components/TableForCards/GeneralTableForAll";

import { db } from "../Firebase";
import TotalCardView from "../components/megazenComp/TotalCardView";
import ProgressDetailClicked from '../components/progress/ProgressDetailClicked'

import TotalPackage from '../components/task1GeneralReport/TotalPackage'
import { colors } from '@mui/material'

export default function Task2() {
  const [detailClicked, setDetailClicked] = useState(false);
  const [detailClickedFileNumber, setDetailClickedFileNumber] = useState("");
  const [arrayOfallData, setStoredData] = useState([]);
  const [reloading, setReloading] = useState(false);
  const [filteringData, setFilteringData] = useState([]);
  const [crewData, setCrewData] = useState([{name:"", description:""}]);
  const [otherForm, setOtherForm] = useState({
    date:"",
    fileNumber : ""
  })
  const [showGeneralTable, setShowGeneralTable] = useState({
    status: false,
    title : "",
    totalPackage : "",
    type : "",
    arrayData : arrayOfallData
  });
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
    // console.log(filenumber);
    setDetailClickedFileNumber(filenumber)
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

  function DurationOFFiltering(fileNumber){
  
    const val  = filteringData.filter((res)=> res.fileNumber === fileNumber)
    const dateOne = val[0].filtering.otherForm.date ;
    var date1 = new Date(dateOne);
    var date2 = new Date();
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Math.floor( Difference_In_Time / (1000 * 3600 * 24))
    return Difference_In_Days;
      
  }

  function DetailCrewData(filenumber){
    const val  = filteringData.filter((res)=> res.fileNumber === filenumber)
    return val[0].filtering.filteringCrew;
    
  }

  function sumOfAllSack() {
    return arrayOfallData.reduce((accumulator, object) => {
      return accumulator + Number(object.sackQuantity);
    }, 0);
  }

  function sumOfAllFilteringSack() {
    return filteringData.reduce((accumulator, object) => {
      return accumulator + Number(object.sackQuantity);
    }, 0);
  }

  function setShowGeneralTableMethod(){
    setShowGeneralTable({status:false})
  }
 
  function countryArray(){
   
    const arr2 = filteringData;
    const res2 = Array.from(
      arr2.reduce(
        (m, { productResident, sackQuantity }) =>
          m.set(
            productResident,
            (m.get(productResident) || 0) + Number(sackQuantity)
          ),
        new Map()
      ),
      ([productResident, sackQuantity]) => ({ productResident, sackQuantity })
    );
    const resident = res2.map((value) => value.productResident);
    return resident;

  }

  function countryArraySack(){
   
    const arr2 = filteringData;
    const res2 = Array.from(
      arr2.reduce(
        (m, { productResident, sackQuantity }) =>
          m.set(
            productResident,
            (m.get(productResident) || 0) + Number(sackQuantity)
          ),
        new Map()
      ),
      ([productResident, sackQuantity]) => ({ productResident, sackQuantity })
    );
    const sack = res2.map((value) => value.sackQuantity);
   
   
    return sack;

  }

  function filteringFileNumber(){
    return filteringData.map(res => "የሰነድ ቁጥር ፡"+res.fileNumber)
  }
  function filteringResident(){
    return filteringData.map(res => res.productResident)
  }


  function filteringDuration(){
    const ArrayOFDurations = [];
    filteringData.map(res => {
      ArrayOFDurations.push(DurationOFFiltering(res.fileNumber))
    })
    console.log(ArrayOFDurations)
    return ArrayOFDurations
  }



  return (
    <>
      {reloading ? (
        <div className=" justify-center text-center align-middle items-center flex">
          <ReactLoading
            type="spokes"
            color="#af2f3f"
            height={"50%"}
            width={"50%"}
          />{" "}
        </div>
      ) : (
        <div>
          <TaskHeader />
          <div className="flex gap-1">
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
            <div className="flex flex-col p-3  ">
              <div className="text-center mb-[-3rem] font-extrabold text-3xl">
                በመጣራት ላይ ያለ...
              </div>
              <div className="w-full p-10 flex gap-5 flex-col border border-red-300 border-t-2 mt-1">
                {filteringData.map((res) => (
                  <ProgressBar
                    onclickProgress={onclickProgress}
                    key={res.id}
                    fileNumberMessage={"የሰነድ ቁጥር ፡ " + res.fileNumber}
                    color={randomColor()}
                    fileNumber={res.fileNumber}
                  />
                ))}
              </div>
              <div className="justify-center py-1  flex mx-auto gap-2 overflow-x-auto">
                <TotalCardView
                  text={"እየተጣራ ያለ ፓኬጅ"}
                  number={filteringData.length}
                  onClick={() => {
                    setShowGeneralTable({
                     status : true,
                     title : "አጠቃላይ ፓኬጅ",
                     totalPackage : filteringData.length,
                     type : "table",
                     arrayData : filteringData
                    });
                   }}
                />
                <TotalCardView
                  text={"ያልተጣራ አጠቃላይ ፓኬጅ"}
                  number={arrayOfallData.length}
                  onClick={() => {
                    setShowGeneralTable({
                     status : true,
                     title : "ያልተጣራ አጠቃላይ ፓኬጅ",
                     totalPackage : arrayOfallData.length,
                     type : "table",
                     arrayData : arrayOfallData
                    });
                   }}
                />
                <TotalCardView
                  text={"እየተጣራ ያለ ኩንታል"}
                  number={sumOfAllFilteringSack()}
                   onClick={() => {
                    setShowGeneralTable({
                     status : true,
                     title : "እየተጣራ ያለ ኩንታል",
                     totalPackage : sumOfAllFilteringSack(),
                     type : "table",
                     arrayData : filteringData
                    });
                   }}
                />
                <TotalCardView
                  text={"ያልተጣራ አጠቃላይ ኩንታል"}
                  number={sumOfAllSack()}
                  onClick={() => {
                    setShowGeneralTable({
                     status : true,
                     title : "ያልተጣራ አጠቃላይ ኩንታል",
                     totalPackage : sumOfAllSack(),
                     type : "table",
                     arrayData : arrayOfallData
                    });
                   }}
                />
              </div>
            </div>
          </div>
          <div className="flex mx-auto gap-2 overflow-x-auto flex-wrap">
            <div>
               <h1 className='text-center'> የመጣበት አከባቢ እና ምን ያህል እየተጣራ እንዳለ</h1>    
              <DateVsSack country={countryArray()} sack={countryArraySack() } colors={["#C77700"]} title={"እየተጣራ ያለ የኩንታል ብዛት"}/>
            </div>
            <div>
            <h1 className='text-center'> በመጣራት ላይ ያለው ሰነድ እና መጣራት ከጀመረ ምን ያህል እንደሆነ </h1> 
            <DateVsSack country={filteringFileNumber()} sack={filteringDuration()} title={"መጣራት ከጀመረ ቀን"} colors={["#D22000"]}/>
            </div>
           
          </div>
          <div className='flex justify-center'>
           <TotalPackage arrayOfallData={filteringData} title={"መጣራቱ መች እንደተጀመረ እና የኩንታሉ ብዛት"}/>
            </div> 
        </div>
      )}
        {showGeneralTable.status ? <GeneralTableForAll title={showGeneralTable.title} totalPackage={showGeneralTable.totalPackage} type={showGeneralTable.type} 
      setShowGeneralTableMethod = {setShowGeneralTableMethod}  arrayData = {showGeneralTable.arrayData}/> : ""}
      {detailClicked ? (
        <div>
          <ProgressDetailClicked
            setDetailClickedfunction={setDetailClickedfunction}
            detailClickedFileNumber={detailClickedFileNumber}
            DurationOFFiltering={DurationOFFiltering(detailClickedFileNumber)}
            detailCrewData={DetailCrewData(detailClickedFileNumber)}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
