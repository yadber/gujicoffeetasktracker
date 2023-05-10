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
    megazenLocation:"",
    date:"",
    fileNumber:""
 })
 const {date,fileNumber,customerName,numberPlate,productType,productLevel,productResident,GINNumber,totalWeight,singleWeight,sackQuantity,filteredWeight,providerName,receiverName,megazenLocation} = incomingForm
 const [megazenSetting, setMegazenSetting] = useState({
   column : "6",
   row : "6"
})
console.log(incomingForm);
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
        megazenLocation={megazenLocation}
        onChange={onChange}
        
        /></div>
        <div>
          <Megazen saveSetting={saveSetting}
              location ={megazenLocation?megazenLocation:"2D"}
              message = {fileNumber?fileNumber:"fileNumber"}
               megazenSettingRow={megazenSetting.row} 
               megazenSettingColumn={megazenSetting.column}/> 
        </div>
      </div>
    </>
  )
}
