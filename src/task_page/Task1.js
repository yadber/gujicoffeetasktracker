import {useState, useEffect} from 'react'
import TaskHeader from '../components/TaskHeader'
import IncomingMegazenForm from '../components/IncomingMegazenForm'
import Megazen from '../components/megazenComp/Megazen'
import {db} from "../Firebase"
import {AiFillCloseCircle} from 'react-icons/ai'
import TextInput from '../components/TextInput'
import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore'

export default function Task1() {
  const [detailClicked, setDeteailClicked] = useState(false);
  const [CilckedData, setCilckedData] = useState();
  const allObject = 
  {
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
  }

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
 function clickDetailStatusChanger(someData){
  setDeteailClicked(prevState=>!prevState);
  setCilckedData(someData)
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
                        clickDetailStatusChanger ={clickDetailStatusChanger}
                        // key={result.fileNumber}
                />
              {/* ))
            } */}
        </div>
      </div>


      {detailClicked?
        <>
        <form onSubmit={saveSetting}>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    {/* <AiFillSetting className='text-2xl mt-2'/> */}
                  <h3 className="text-3xl font-semibold">
                    Megazen Setting
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setDeteailClicked(false)}
                  >
                    <span className="h-6 w-6">
                      <AiFillCloseCircle />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  
                    <TextInput placeholder="Column" type="text" min="0" setting="1" name="column"  value={CilckedData.fileNumber}
                   height="40"/>
                    <TextInput placeholder="Row" type="number" min="0" setting="1" name="row"
                     height="40"
                    />
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setDeteailClicked(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => setDeteailClicked(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </form>
        </>:
        "nothing clicked"
    }
    </>
  )
}
