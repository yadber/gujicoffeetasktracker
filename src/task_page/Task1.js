import { useState, useEffect } from "react";
import TaskHeader from "../components/TaskHeader";
import IncomingMegazenForm from "../components/IncomingMegazenForm";
import Megazen from "../components/megazenComp/Megazen";
import { db } from "../Firebase";
import { AiFillCloseCircle } from "react-icons/ai";
import TextInput from "../components/TextInput";
import {collection,doc,getDocs,serverTimestamp,setDoc,Timestamp} from "firebase/firestore";
import Chart from "react-apexcharts";

export default function Task1() {
 // detailClicked and CilckedData are used when the box of the megazen is clicked and the detail popup appeared 
  const [detailClicked, setDeteailClicked] = useState(false);
  const [CilckedData, setCilckedData] = useState();

  const allObject = {
    customerName: "",
    numberPlate: "",
    productType: "",
    productLevel: "",
    productResident: "",
    GINNumber: "",
    totalWeight: "",
    singleWeight: "",
    sackQuantity: "",
    filteredWeight: "",
    providerName: "",
    receiverName: "",
    date: "",
    fileNumber: "",
    column: "",
    row: "",
  };
// incomingForm is a state which collects the incoming object form from the user
  const [incomingForm, setIncomingForm] = useState(allObject);
//arrayOfallData is a state which collects data from the database
  const [arrayOfallData, setStoredData] = useState([]);
// here we use a state to update a use effect so there is no multiple retrieval 
  const [justForTheEffect, setJustForTheEffect] = useState(false);

  useEffect(() => {
    dataFromFirebase();
    console.log("use effect line 43")
  }, [justForTheEffect]);
// brings data from the database and stores it in the arrayOfallData state
  async function dataFromFirebase() {
    const res = [];
    try {
      const doc_refs = await getDocs(collection(db, "incoming_new_data"));

      doc_refs.forEach((country) => {
        res.push({
          ...country.data(),
        });
      });

      setStoredData(res);
    } catch (error) {
      console.log(error);
    }
  }


//sends data to the database and reset the form again
  async function onIncomingSubmit(e) {
    setJustForTheEffect(prevState=>!prevState);
    e.preventDefault();
    try {
      const FormDataCopy = { ...incomingForm };
      // delete FormDataCopy.password
      FormDataCopy.timestamp = serverTimestamp();
      await setDoc(
        doc(db, "incoming_new_data", FormDataCopy.fileNumber),
        FormDataCopy
      );
      setIncomingForm(allObject);
    } catch (error) {
      console.log(error);
    }
  }

// deconstructing incomingForm for better use
  const {
    date,
    column,
    row,
    fileNumber,
    customerName,
    numberPlate,
    productType,
    productLevel,
    productResident,
    GINNumber,
    totalWeight,
    singleWeight,
    sackQuantity,
    filteredWeight,
    providerName,
    receiverName,
  } = incomingForm;
// default megazen size set here, not saved in the database
  const [megazenSetting, setMegazenSetting] = useState({
    column: "6",
    row: "6",
  });

  // controlled input apply here
  function onChange(e) {
    const element = e.target;
    setIncomingForm((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  }
  // the popup will appear when clicked and sets cilckedData to the object of that clicked area
  function clickDetailStatusChanger(someData) {
    setDeteailClicked((prevState) => !prevState);
    setCilckedData(someData);
  }
// calculates the time difference
  function ReturnTimeDifference(){
    return Math.floor((Timestamp.fromDate(new Date()) - CilckedData.timestamp) / 60 / 60 / 24)
  }


// saves the megazen setting but not on the database so it disappears when refreshed
  function saveSetting(e) {
    e.preventDefault();
    const element = e.target;
    setMegazenSetting((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  }
  return (
    <>
      <TaskHeader />
      <div className="flex justify-center flex-wrap  py-12  mx-auto gap-2 flex-grow">
        <div className="">
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
            megazenSettingRow={megazenSetting.row}
            megazenSettingColumn={megazenSetting.column}
            column={column}
            row={row}
            onChange={onChange}
          />
        </div>
        <div>
          <Megazen
            saveSetting={saveSetting}
            megazenSettingRow={megazenSetting.row}
            megazenSettingColumn={megazenSetting.column}
            arrayOfallData={arrayOfallData}
            clickDetailStatusChanger={clickDetailStatusChanger}
          />
        </div>
      </div>

      {detailClicked ? (
        <>
          <form onSubmit={saveSetting}>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    {/* <AiFillSetting className='text-2xl mt-2'/> */}
                    <h3 className="text-3xl font-semibold">
                      FILE NO. {CilckedData.fileNumber}
                    </h3>
                      <div className="h-4 w-4 p-1 ml-auto bg-transparent border-0 text-red-700 opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none cursor-pointer">
                        <AiFillCloseCircle onClick={() => setDeteailClicked(false)}/>
                      </div>
                   
                  </div>
                  {/*body*/}
                  <div className="flex">
                  <Chart
                  series= {[ReturnTimeDifference()
                  ]}
                  options={
                    {
                        chart: {
                          height: 400,
                          type: 'radialBar',
                        },
                        plotOptions: {
                          radialBar: {
                            offsetY: 0,
                            startAngle: 0,
                            endAngle: 270,
                            hollow: {
                              margin: 5,
                              size: '30%',
                              background: 'transparent',
                              image: undefined,
                            },
                            dataLabels: {
                              name: {
                                show: false,
                              },
                              value: {
                                show: false,
                              }
                            }
                          }
                        },
                        colors: [ReturnTimeDifference() <6 ?'#1ab7ea':'#1ab7ea'],
                        labels: ['የመጋዘን ቆይታ',],
                        legend: {
                          show: true,
                          floating: true,
                          fontSize: '16px',
                          position: 'left',
                          offsetX: -25,
                          offsetY: -15,
                          labels: {
                            useSeriesColors: true,
                          },
                          markers: {
                            size: 0
                          },
                          formatter: function(seriesName, opts) {
                            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                          },
                          itemMargin: {
                            vertical: 3
                          }
                        },
                        responsive: [{
                          breakpoint: 480,
                          options: {
                            legend: {
                                show: false
                            }
                          }
                        }]
                      }
                  }
                    type="radialBar"
                    width="160"
                    height="210"
                  />



                  <Chart
                    options={{
                      chart: {
                        type: "bar",
                      },
                      colors: [CilckedData.sackQuantity < 140 ?'#C7CC00':'#1ab7ea'],
                      xaxis: {
                        categories: [
                          CilckedData.date
                        ],
                      },
                    }}
                    series={ [
                      {
                        name: "የኩንታል ብዛት",
                        data: [CilckedData.sackQuantity]
                      }
                    ]}
                    type="bar" 
                    width="250"
                    height="180"
                  />
                  </div>
                 
                  <div className="relative p-6 flex-auto">
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="የደንበኛው ስም"
                        type="text"
                        name="customerName"
                        value={CilckedData.customerName}
                        height="20"
                        setting="1"
                        editIcon={true}
                        classType={1}
                      />
                      <TextInput
                        placeholder="የመኪናው ሰሌዳ ቁጥር"
                        type="text"
                        name="numberPlate"
                        height="20"
                        setting={1}
                        value={CilckedData.numberPlate}
                        editIcon={true}
                        classType={1}
                       
                      />
                    </div>
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="የምርት ኣይነት"
                        type="text"
                        name="customerName"
                        value={CilckedData.productType}
                        height="20"
                        setting="1"
                        editIcon={true}
                        classType={1}
                       
                      />
                      <TextInput
                        placeholder="የምርት ደረጃ"
                        type="text"
                        name="numberPlate"
                        height="20"
                        setting={1}
                        value={CilckedData.productLevel}
                        editIcon={true}
                        classType={1}
                       
                      />
                    </div>
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="ምርቱ የመጣበት አክባቢ"
                        type="text"
                        name="customerName"
                        value={CilckedData.productResident}
                        height="20"
                        setting="1"
                        editIcon={true}
                        classType={1}
                       
                      />
                      <TextInput
                        placeholder="የወጪ ሰነድ ቁጥር"
                        type="text"
                        name="numberPlate"
                        height="20"
                        setting={1}
                        value={CilckedData.GINNumber}
                        editIcon={true}
                        classType={1}
                       
                      />
                    </div>
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="ጠቅላላ ክብደት"
                        type="number"
                        name="customerName"
                        value={CilckedData.totalWeight}
                        height="20"
                        setting="1"
                        editIcon={true}
                        classType={1}
                       
                      />
                     
                       <TextInput
                        placeholder="ነጠላ ክብደት"
                        type="text"
                        name="numberPlate"
                        height="20"
                        setting={1}
                        value={CilckedData.singleWeight}
                        editIcon={true}
                        classType={1}
                       
                      />
                    </div>
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="የጆንያ ብዛት"
                        type="text"
                        name="customerName"
                        value={CilckedData.sackQuantity}
                        height="20"
                        setting="1"
                        editIcon={true}
                        classType={1}
                      />
                      <TextInput
                        placeholder="የተጣራ ክብደት"
                        type="text"
                        name="numberPlate"
                        height="20"
                        setting={1}
                        value={CilckedData.filteredWeight}
                        editIcon={true}
                       classType={1}
                      />
                    </div>
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="የኣስረካቢው ስም"
                        type="text"
                        name="customerName"
                        value={CilckedData.providerName}
                        height="20"
                        setting="1"
                        editIcon={true}
                       
                      />
                      <TextInput
                        placeholder="የተረካቢው ስም"
                        type="text"
                        name="numberPlate"
                        height="20"
                        setting={1}
                        value={CilckedData.receiverName}
                        editIcon={true}
                       
                      />
                    </div>
                   
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
                      Update Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </form>
        </>
      ) : (
        ""
      )}
    </>
  );
}
