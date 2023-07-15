import React,{useState,useEffect} from 'react'
import TaskHeader from '../components/TaskHeader'
import {
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import ReactLoading from "react-loading";
import { db } from "../Firebase";
import IncomingMegazenForm from '../components/IncomingMegazenForm';


export default function Task4() {
  const [completedFiltering, setCompletedFiltering] = useState([]);
  const [otherFormTaskFour, setOtherFormTaskFour] = useState({
    date:"",
    fileNumber : "",
    column:"",
    row : ""
  })
  const [otherFormTaskFourExport, setOtherFormTaskFourExport] = useState({
    date:"",
    warehouse : "",
    column:"",
    row : ""
  })
  useEffect(() => {
    dataFromFirebase();
    console.log("use effect task 3");
  }, []);

  async function dataFromFirebase() {
   
    const completeRes = [];
    try {
     
      const doc_refs = await getDocs(collection(db, "incoming_new_data"));

      doc_refs.forEach((country) => {
        if(country.data().completeFiltering){
          completeRes.push({
            ...country.data(),
          });
        }
      });
      setCompletedFiltering(completeRes);
    } catch (error) {
      console.log(error);
    }
  }

function onChangeTaskFour(e){
  const element = e.target;

  setOtherFormTaskFour(prevState => ({
    ...prevState,
    [element.name] : element.value
  }))
}
function onChangeTaskFourExport(e){
  const element = e.target;
  setOtherFormTaskFourExport(prevState => ({
    ...prevState,
    [element.name] : element.value
  }))
}
console.log(otherFormTaskFourExport);
console.log(otherFormTaskFour);
  return (
    <div>
      <TaskHeader/>
      <div>

              <div className='flex flex-col gap-3 p-2'>
                        <IncomingMegazenForm task4={"task4"} title = {"ከሃገር ውጭ ገበያ"} compltedDataAll= {completedFiltering} onChangeTaskFour ={onChangeTaskFourExport}
                        otherFormTaskFour={otherFormTaskFourExport}
                        dropDownTitle={"ጎተራ ምረጥ"}
                        />
                        <IncomingMegazenForm task4={"task4"} title = {"ለሃገር ዉስጥ ገበያ"} compltedDataAll= {completedFiltering} onChangeTaskFour ={onChangeTaskFour}
                        otherFormTaskFour={otherFormTaskFour}
                        
                        />
              </div>
      </div>

    </div>
  )
}
