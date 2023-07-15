import React,{useState,useEffect} from 'react'
import TaskHeader from '../components/TaskHeader'
import RejectSectionForm from '../components/taskThreeForm/RejectSectionForm'
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
import ReactLoading from "react-loading";
import TotalCardView from '../components/megazenComp/TotalCardView';
import PieChart from '../components/taskThreeGraph/PieChart';
import LocationDropDown from '../components/LocationDropDown';
export default function Task3() {
  const [arrayOfallData, setStoredData] = useState([]);
  const [completedFiltering, setCompletedFiltering] = useState([]);
  const [filteringData, setFilteringData] = useState([]);
  const [rejectionTypes, setRejectionTypes] = useState([{type:"", weight:""}]);
  const [selectedFileNumber, setSelectedFileNumber]= useState({fileNumber:""})
  const [cleanCoffee, setCleanCoffee] = useState({
    totalWeight: "",
    location : "",
    description : ""
  })
  const [otherForm, setOtherForm] = useState({
    date:"",
    fileNumber : ""
  })
  const [reloading, setReloading] = useState(false);
  useEffect(() => {
    dataFromFirebase();
    console.log("use effect task 3");
  }, []);
  function onChange(i,e){
    let newformValues = [...rejectionTypes];
    newformValues[i][e.target.name] = e.target.value;
    setRejectionTypes(newformValues);
  }
  function handleRejectionTypes(){
    const values = [...rejectionTypes];
    values.push({
      type:"",
      weight:""
    });
    setRejectionTypes(values);
   }
   
   function onCleanCoffeeChange(e){
    const element = e.target;
    setCleanCoffee(prevState => ({
      ...prevState,
      [element.name] : element.value
    }))
   }
   function handleDeleteRejctionTypes(i){
    let newFormValues = [...rejectionTypes];
    newFormValues.splice(i,1);
    setRejectionTypes(newFormValues);
  }
  function onChangeDate(e){
    const element = e.target;
    setOtherForm({
      ...otherForm,
      [element.name] : element.value
    })
  }

  async function dataFromFirebase() {
    const notStarted = [];
    const filteringRes = [];
    const completeRes = [];
    try {
     
      const doc_refs = await getDocs(collection(db, "incoming_new_data"));

      doc_refs.forEach((country) => {
        if(country.data().completeFiltering){
          completeRes.push({
            ...country.data(),
          });
        }else if(country.data().filtering){
          filteringRes.push({
            ...country.data(),
          })
        }
        else{
          notStarted.push({
            ...country.data(),
          })
        }
      });

      setStoredData(notStarted);
      setFilteringData(filteringRes);
      setCompletedFiltering(completeRes);

      
    } catch (error) {
      console.log(error);
    }
  }
async function submitFilteringComplete(e){
  e.preventDefault();
  const completeFiltering = {
    completeFiltering : {
      otherForm,
      rejectionVsWeight : rejectionTypes,
      cleanCoffee : cleanCoffee
    }
  }
  try {
    setTimeout(() => {
      setReloading(true);
    }, 1000);
    const docRef = doc(db, "incoming_new_data", otherForm.fileNumber);
    updateDoc(docRef, completeFiltering)
      .then((docRef) =>{
        setTimeout(()=>{
          window.location.reload()
        },3000);
      })
  } catch (error) {
    console.log(error)
  }
}
function totalCleanCoffeeWeight(selectedSomeData){
  if(!selectedSomeData){
    return completedFiltering.reduce((accumulator, object) =>{
      return accumulator + Number(object.completeFiltering.cleanCoffee.totalWeight)
    }, 0);
    
  }else{
    const OnlySelectedDataFromCompletedFiltering = completedFiltering.filter(res => res.fileNumber === selectedSomeData)
    return OnlySelectedDataFromCompletedFiltering.reduce((accumulator, object) =>{
      return accumulator + Number(object.completeFiltering.cleanCoffee.totalWeight)
    }, 0);
  }
}
function totalNotCleanCoffeeWeight(selectedSomeData){
  
  const rejectionvsWeightArray = [];
  const arrayOfWeightOnly = []
  if(!selectedSomeData){
    completedFiltering.map(res => rejectionvsWeightArray.push(res.completeFiltering.rejectionVsWeight))
    for(let j=0 ; j<rejectionvsWeightArray.length; j++){
        rejectionvsWeightArray[j].map(res => arrayOfWeightOnly.push(res.weight));
    }
    return arrayOfWeightOnly.reduce((accumulator,object)=>{
      return accumulator + Number(object)
    },0)
  }else{
    const OnlySelectedDataFromCompletedFiltering = completedFiltering.filter(res => res.fileNumber === selectedSomeData);
    OnlySelectedDataFromCompletedFiltering.map(res => rejectionvsWeightArray.push(res.completeFiltering.rejectionVsWeight))
    for(let j=0 ; j<rejectionvsWeightArray.length; j++){
        rejectionvsWeightArray[j].map(res => arrayOfWeightOnly.push(res.weight));
    }
    return arrayOfWeightOnly.reduce((accumulator,object)=>{
      return accumulator + Number(object)
    },0)
  }
}
function totalCoffee(selectedSomeData){
  const rejectionvsWeightArray = [];
  if(!selectedSomeData){
    completedFiltering.map(res => rejectionvsWeightArray.push(res.filteredWeight))
    return rejectionvsWeightArray.reduce((accumulator,object)=>{
        return accumulator + Number(object)
    },0)
  }else{
    const OnlySelectedDataFromCompletedFiltering = completedFiltering.filter(res => res.fileNumber === selectedSomeData);
    OnlySelectedDataFromCompletedFiltering.map(res => rejectionvsWeightArray.push(res.filteredWeight))
    return rejectionvsWeightArray.reduce((accumulator,object)=>{
        return accumulator + Number(object)
    },0)
  }

}
function notCoffeeAtAll(selectedSomeData){
  const TotalWeightArrival = []
  if(!selectedSomeData){
    completedFiltering.map((res) => TotalWeightArrival.push( res.filteredWeight));
    const totalSum = TotalWeightArrival.reduce((a,b) => {
      return a + Number(b)
    },0)
    return totalSum - (totalCleanCoffeeWeight() + totalNotCleanCoffeeWeight())
  }else{
    const OnlySelectedDataFromCompletedFiltering = completedFiltering.filter(res => res.fileNumber === selectedSomeData);
    OnlySelectedDataFromCompletedFiltering.map((res) => TotalWeightArrival.push( res.filteredWeight));
    const totalSum = TotalWeightArrival.reduce((a,b) => {
      return a + Number(b)
    },0)
    const firstNumber = Number(totalSum);
    const someNumberOne = Number(totalCleanCoffeeWeight(selectedSomeData))
    const OnotherNumberTwo =Number(totalNotCleanCoffeeWeight(selectedSomeData))
    return firstNumber - (someNumberOne+OnotherNumberTwo)
  }
   
}
function OnSelectDifferentFileNumber(e){
  let someValue = e.target.value;
  if(someValue === "የሰነድ ቁጥር"){
    someValue = "";
  }
  setSelectedFileNumber({fileNumber:someValue})
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
      <TaskHeader/>
      <div className="flex gap-2 justify-center p-3">
        <div className='flex  gap-2 flex-col'>
              <div className='flex justify-center text-3xl font-extrabold border-red-300 border-2'>
                መጣራት ከጀመረበት ጊዜ አንስቶ እስከ አሁን ድረስ
              </div>
            <div className='flex gap-1'>
            <TotalCardView
                  text={"እየተጣራ ያለ ፓኬጅ"}
                  number={filteringData.length}
                  // onClick={() => {
                  //   setShowGeneralTable({
                  //    status : true,
                  //    title : "አጠቃላይ ፓኬጅ",
                  //    totalPackage : filteringData.length,
                  //    type : "table",
                  //    arrayData : filteringData
                  //   });
                  //  }}
                /> 
              <TotalCardView
                  text={"ተጣርቶ ያለቀ ፓኬጅ"}
                  number={completedFiltering.length}
                  // onClick={() => {
                  //   setShowGeneralTable({
                  //    status : true,
                  //    title : "አጠቃላይ ፓኬጅ",
                  //    totalPackage : filteringData.length,
                  //    type : "table",
                  //    arrayData : filteringData
                  //   });
                  //  }}
                /> 
                 <TotalCardView
                  text={"መጣራት ያልጀመረ ፓኬጅ"}
                  number={arrayOfallData.length}
                  // onClick={() => {
                  //   setShowGeneralTable({
                  //    status : true,
                  //    title : "አጠቃላይ ፓኬጅ",
                  //    totalPackage : filteringData.length,
                  //    type : "table",
                  //    arrayData : filteringData
                  //   });
                  //  }}
                /> 
            </div>
            <div className='flex gap-1 justify-center'>
            <TotalCardView
                  text={"አጠቃላይ የተጣራው ቡና"}
                  number={totalCoffee()}
                  kg={"KG"}
                  // onClick={() => {
                  //   setShowGeneralTable({
                  //    status : true,
                  //    title : "አጠቃላይ ፓኬጅ",
                  //    totalPackage : filteringData.length,
                  //    type : "table",
                  //    arrayData : filteringData
                  //   });
                  //  }}
                /> 
              
              </div>
            <div className='flex gap-1'>
            <TotalCardView
                  text={"አጠቃላይ ንጹ ቡና"}
                  number={totalCleanCoffeeWeight()}
                  kg={"KG"}
                  // onClick={() => {
                  //   setShowGeneralTable({
                  //    status : true,
                  //    title : "አጠቃላይ ፓኬጅ",
                  //    totalPackage : filteringData.length,
                  //    type : "table",
                  //    arrayData : filteringData
                  //   });
                  //  }}
                /> 
               <TotalCardView
                  text={"ንጹ ያልሆነ ቡና"}
                  number={totalNotCleanCoffeeWeight()}
                  kg={"KG"}
                  // onClick={() => {
                  //   setShowGeneralTable({
                  //    status : true,
                  //    title : "አጠቃላይ ፓኬጅ",
                  //    totalPackage : filteringData.length,
                  //    type : "table",
                  //    arrayData : filteringData
                  //   });
                  //  }}
                /> 
                 <TotalCardView
                  text={"ቡና ያልሆነ"}
                  number={notCoffeeAtAll()}
                  kg={"KG"}
                  // onClick={() => {
                  //   setShowGeneralTable({
                  //    status : true,
                  //    title : "አጠቃላይ ፓኬጅ",
                  //    totalPackage : filteringData.length,
                  //    type : "table",
                  //    arrayData : filteringData
                  //   });
                  //  }}
                /> 
              </div>
              
              <div className=' flex-col border-2 border-red-400'>
                <div className='flex justify-center mt-2'>

                  <LocationDropDown label="የሰነድ ቁጥር"   name="fileNumber" task2={true} arrayOfallData = {completedFiltering} onChange={(e)=>OnSelectDifferentFileNumber(e)} value={selectedFileNumber.fileNumber}
                    /> 
                </div>
               { selectedFileNumber.fileNumber==="" || selectedFileNumber.fileNumber===" የሰነድ ቁጥር" ? 
               <div className='flex '>
                  <PieChart threeValues ={[totalCleanCoffeeWeight(),totalNotCleanCoffeeWeight(),notCoffeeAtAll()]} labels = {['ንጹ ቡና', 'ንጹ ያልሆነ ቡና', 'ቡና ያልሆነ']}/>

                  <PieChart threeValues ={[totalCoffee(),totalCleanCoffeeWeight(),totalNotCleanCoffeeWeight(),notCoffeeAtAll()]} labels = {['የተጣራው ቡና', 'ንጹ ቡና', 'ንጹ ያልሆነ ቡና', 'ቡና ያልሆነ']}/>
                </div> 
                :
                <div className='flex '>
                  <PieChart threeValues ={[totalCleanCoffeeWeight(selectedFileNumber.fileNumber),totalNotCleanCoffeeWeight(selectedFileNumber.fileNumber),notCoffeeAtAll(selectedFileNumber.fileNumber)]}  labels = {['ንጹ ቡና', 'ንጹ ያልሆነ ቡና', 'ቡና ያልሆነ']}/>

                  <PieChart threeValues ={[totalCoffee(selectedFileNumber.fileNumber),totalCleanCoffeeWeight(selectedFileNumber.fileNumber),totalNotCleanCoffeeWeight(selectedFileNumber.fileNumber),notCoffeeAtAll(selectedFileNumber.fileNumber)]} labels = {['የተጣራው ቡና', 'ንጹ ቡና', 'ንጹ ያልሆነ ቡና', 'ቡና ያልሆነ']}/>
                </div> 
                }
              </div>
             
            </div>
            <div>
              <RejectSectionForm rejectionTypes={rejectionTypes} handleDeleteRejctionTypes={handleDeleteRejctionTypes}
              handleRejectionTypes={handleRejectionTypes} onChange={onChange} filteringData={filteringData}
              onChangeDate={onChangeDate} otherForm={otherForm}
              cleanCoffee={cleanCoffee} onCleanCoffeeChange = {onCleanCoffeeChange} submitFilteringComplete = {submitFilteringComplete}
              />
            </div>
          
    </div>
    </div>
    )
    
  }
  </>
  )
}
