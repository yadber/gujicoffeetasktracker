import {useState} from 'react'
import TaskHeader from '../components/TaskHeader'
import IncomingMegazenForm from '../components/IncomingMegazenForm'
import Megazen from '../components/megazenComp/Megazen'

export default function Task1() {
 

  const [incomingForm, setIncomingForm] = useState({
    customerName : "",
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
    row:""
 })
  
  
  const [storedData, setStoredData] = useState(() => {
    const saved = localStorage.getItem("6");
    const initialValue = JSON.parse(saved);
    return initialValue || ""
  });

  const arrayOfallData = [];
  arrayOfallData.push(storedData)
  
  
 
 function onIncomingSubmit(e){
  e.preventDefault();
  // arrayOfallData.push(incomingForm)
  setStoredData(incomingForm)
  // localStorage.setItem('መዝገብ ቁጥር' +fileNumber, JSON.stringify(incomingForm));
  // setShowOnMegazen(true)
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
      <div className='flex justify-center flex-wrap  px-6 py-12  mx-auto gap-2'>
        <div><IncomingMegazenForm 
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
        
        /></div>
    {
      arrayOfallData.map((result)=>(
        <Megazen saveSetting={saveSetting}
                megazenSettingRow={megazenSetting.row}
                megazenSettingColumn={megazenSetting.column}
                location = {result.row+result.column}
                message={result.fileNumber}
                key={result.fileNumber}
        />
      ))
    }
      
       {/* { showOnMegazen
       ? 
       
       <div>
          <Megazen saveSetting={saveSetting}
              location ={column?row+column:""}
              message = {fileNumber?fileNumber:"fileNumber"}
               megazenSettingRow={megazenSetting.row} 
               megazenSettingColumn={megazenSetting.column}/> 
        </div> 
        : <div>
        <Megazen saveSetting={saveSetting}
             location ={storedData.row + storedData.column}
             message = {storedData.fileNumber}
             megazenSettingRow={megazenSetting.row} 
             megazenSettingColumn={megazenSetting.column}
             /> 
      </div>
      } */}
      </div>
    </>
  )
}