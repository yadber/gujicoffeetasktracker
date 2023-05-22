import {useState, useEffect} from 'react'
import TaskHeader from '../components/TaskHeader'
import IncomingMegazenForm from '../components/IncomingMegazenForm'
import Megazen from '../components/megazenComp/Megazen'
import {db} from "../Firebase"
import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore'

export default function Task1() {
  const allObject = {customerName : "",
  numberPlate : "",
  productType : "",
  productLevel : "",
  productResident : "",
  GINNumber : "",
  totalWeight:"",
  singleWeight:"",
  sackQuantity : "",
  filteredWeight:"",
  providerName:"",
  receiverName:"",
  date:"",
  fileNumber:"",
  column:"",
  row:""}

  const [incomingForm, setIncomingForm] = useState(allObject)
  const [arrayOfallData, setStoredData] = useState([]);
  
  useEffect(() => {
    dataFromFirebase()
  }, [incomingForm])

  
  
  async function dataFromFirebase(){
    const res = [];
    try {
     const doc_refs =  await getDocs(collection(db,"incoming_new_data"))

      doc_refs.forEach(country => {
        res.push({
            ...country.data()
        })
    })

    setStoredData(res)

    } catch (error) {
      console.log(error)
    }
  }

  dataFromFirebase();
 
 
 async function onIncomingSubmit(e){
  e.preventDefault();
  try {
    const FormDataCopy = {...incomingForm}
    // delete FormDataCopy.password
    FormDataCopy.timestamp = serverTimestamp();
    await setDoc(doc(db,"incoming_new_data",FormDataCopy.fileNumber), FormDataCopy)
    setIncomingForm(allObject)
  } catch (error) {
    console.log(error)
    
  }
  
}
 const {date,column,row,fileNumber,customerName,numberPlate,productType,productLevel,productResident,GINNumber,totalWeight,singleWeight,sackQuantity,filteredWeight,providerName,receiverName} = incomingForm
 const [megazenSetting, setMegazenSetting] = useState({
   column : "6",
   row : "6"
})

 function onChange(e){
    const element = e.target;
    setIncomingForm(prevState =>({
       ...prevState,
       [element.name] : element.value
    }))
    
 }

 
  function saveSetting(e) {
    e.preventDefault()
    const element = e.target;
    setMegazenSetting(prevState =>({
        ...prevState,
        [element.name] : element.value
    })) 
}
  return (
    <>
      <TaskHeader />
      <div className='flex justify-center flex-wrap py-12  mx-auto gap-2'>
        <div className=''>
            <IncomingMegazenForm 
          onIncomingSubmit={onIncomingSubmit}
          incomingForm={incomingForm}
          date={date}
          fileNumber={fileNumber}
          customerName={customerName}
          numberPlate={numberPlate}
          productType={productType}
          productLevel={productLevel}
          productResident={productResident}
          GINNumber={GINNumber}
          totalWeight={totalWeight}
          singleWeight={singleWeight}
          sackQuantity={sackQuantity}
          filteredWeight={filteredWeight}
          providerName={providerName}
          receiverName={receiverName}
          megazenSettingRow ={megazenSetting.row}
          megazenSettingColumn = {megazenSetting.column}
          column ={column}
          row={row}
          onChange={onChange}
          />
        </div>
        <div>
            {/* {
              arrayOfallData.map((result)=>( */}
                <Megazen saveSetting={saveSetting}
                        megazenSettingRow={megazenSetting.row}
                        megazenSettingColumn={megazenSetting.column}
                        // location = {result.row+result.column}
                        // message={result.fileNumber}
                        arrayOfallData = {arrayOfallData}
                        // key={result.fileNumber}
                />
              {/* ))
            } */}
        </div>
      </div>
    </>
  )
}
