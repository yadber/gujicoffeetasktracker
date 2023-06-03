import { useState, useEffect } from "react";
import TaskHeader from "../components/TaskHeader";
import IncomingMegazenForm from "../components/IncomingMegazenForm";
import Megazen from "../components/megazenComp/Megazen";
import { db } from "../Firebase";
import { AiFillCloseCircle } from "react-icons/ai";
import TextInput from "../components/TextInput";
import {
  collection,
  query,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import Chart from "react-apexcharts";
import TotalPackage from "../components/task1GeneralReport/TotalPackage";
import ResidentPackage from "../components/task1GeneralReport/ResidentPackage";
import TotalCardView from "../components/megazenComp/TotalCardView";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SampleData from "../components/resorce/SampleData.json";
import ReactLoading from "react-loading";
import GeneralTableForAll from "../components/TableForCards/GeneralTableForAll";

import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

export default function Task1() {
  // detailClicked and CilckedData are used when the box of the megazen is clicked and the detail popup appeared
  const [detailClicked, setDeteailClicked] = useState(false);
  const [CilckedData, setCilckedData] = useState();
  const [reloadin, setReloading] = useState(false);
  const [showGeneralTable, setShowGeneralTable] = useState({
    status: false,
    title : "",
    id : "",
    type : ""
  });

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
  const [updatingForm, setUpdatingForm] = useState(allObject);
  //arrayOfallData is a state which collects data from the database
  const [arrayOfallData, setStoredData] = useState([]);
  // here we use a state to update a use effect so there is no multiple retrieval
  // const arrayOfallData = SampleData;

  const [justForTheEffect, setJustForTheEffect] = useState(true);

  useEffect(() => {
    dataFromFirebase();
    console.log("use effect line 43");
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
    e.preventDefault();
    if (locationExist(incomingForm.column + incomingForm.row)) {
      toast.warning("ይቅርታ! የመረጡት የመጋዘን መቀመጫ ለጊዜው ተይዟል፡፡ ሌላ ቦታ ይምረጡ", {
        position: toast.POSITION.TOP_LEFT,
      });
    } else if (FileNumberExist(incomingForm.fileNumber)) {
      toast.error("ይቅርታ! ያስገቡት የፋይል ቁጥር የተሳሳተ ነው፡፡ በዝህ ፍይል ቁጥር ሌላ ፋይል አለ፡፡", {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      setJustForTheEffect((prevState) => !prevState);
      setReloading(true);
      try {
        const FormDataCopy = { ...incomingForm };
        // delete FormDataCopy.password
        FormDataCopy.timestamp = serverTimestamp();
        await setDoc(
          doc(db, "incoming_new_data", FormDataCopy.fileNumber),
          FormDataCopy
        );
        setIncomingForm(allObject);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function updateDataToFirebase(e) {
    e.preventDefault();
    setDeteailClicked(false);
    toast.success("የቀየሩት ፋይል በተሳካ ሁኔታ ተቀይሯል፡፡", {
      position: toast.POSITION.TOP_LEFT,
    });
    setTimeout(() => {
      setReloading(true);
    }, 1000);
    const docRef = doc(db, "incoming_new_data", updatingForm.fileNumber);
    updateDoc(docRef, updatingForm)
      .then((docRef) => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
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
    column: "7",
    row: "7",
  });
  const [isEdited, setIsEdited] = useState(false);
  // checking if the location exist

  function locationExist(columnPlusRow) {
    let locationArray = [];

    arrayOfallData.map(function (res) {
      let someValue = res.column + res.row;
      locationArray.push(someValue);
    });

    return locationArray.includes(columnPlusRow);
  }

  function FileNumberExist(filenumber) {
    let locationArray = [];

    arrayOfallData.map(function (res) {
      locationArray.push(res.fileNumber);
    });

    return locationArray.includes(filenumber);
  }

  // controlled input apply here
  function onChange(e) {
    const element = e.target;
    setIncomingForm((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  }

  function onUpdate(e) {
    const element = e.target;
    setUpdatingForm((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  }

  // the popup will appear when clicked and sets cilckedData to the object of that clicked area
  function clickDetailStatusChanger(someData) {
    setDeteailClicked((prevState) => !prevState);
    setCilckedData(someData);
    setUpdatingForm(someData);
  }
  // calculates the time difference
  function ReturnTimeDifference() {
    return Math.floor(
      (Timestamp.fromDate(new Date()) - CilckedData.timestamp) / 60 / 60 / 24
    );
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

  // save all sack value in an array and sum them all

  function sumOfAllSack() {
    return arrayOfallData.reduce((accumulator, object) => {
      return accumulator + Number(object.sackQuantity);
    }, 0);
  }

  function sumOfAllGodoloSack() {
    const arrayGodolo = [];
    arrayOfallData.map((val) => {
      if (val.sackQuantity < 140) {
        arrayGodolo.push(140 - Number(val.sackQuantity));
      }
    });
    return arrayGodolo.reduce((accumulator, object) => {
      return accumulator + object;
    }, 0);
  }

  function sumOfAllGodoloPackage() {
    const arrayGodolo = [];
    arrayOfallData.map((val) => {
      if (val.sackQuantity < 140) {
        arrayGodolo.push(140 - Number(val.sackQuantity));
      }
    });
    return arrayGodolo.length;
  }
  //sum of all new sack
  function sumOfAllNewSack() {
    let newsackArray = [];
    arrayOfallData.map(function (val) {
      if (
        Math.floor(
          (Timestamp.fromDate(new Date()) - val.timestamp) / 60 / 60 / 24
        ) < 7
      ) {
        newsackArray.push(val.sackQuantity);
      }
    });
    let sumValue;
    if (newsackArray.length > 0) {
      sumValue = newsackArray.reduce((accumulator, object) => {
        return Number(accumulator) + Number(object);
      });
    }
    return sumValue;
  }

  function sumOfAllNewPackage() {
    let newsackArray = [];
    arrayOfallData.map(function (val) {
      if (
        Math.floor(
          (Timestamp.fromDate(new Date()) - val.timestamp) / 60 / 60 / 24
        ) < 7
      ) {
        newsackArray.push(val.sackQuantity);
      }
    });

    return newsackArray.length;
  }
  function isEditedMethod() {
    setIsEdited(true);
  }
  function setShowGeneralTableMethod(){
    setShowGeneralTable({status:false})
  }
  return (
    <>
      {/* this is the task header */}
      {reloadin ? (
        <div className=" justify-center text-center align-middle items-center flex">
          <ReactLoading
            type="spokes"
            color="#af2f3f"
            height={"50%"}
            width={"50%"}
          />{" "}
        </div>
      ) : (
        <>
          <TaskHeader />
          {/* this contains the megazen and the New incoming data form */}
          <div className="justify-center py-1  flex mx-auto gap-2 overflow-x-auto">
            <TotalCardView
              text={"አጠቃላይ ፓኬጅ"}
              number={arrayOfallData.length}
              comp={<BsFillArrowUpCircleFill />}
              onClick={() => {
                setShowGeneralTable({
                 status : true,
                 title : "አጠቃላይ ፓኬጅ",
                 id : "1",
                 type : "table"
                });
               }}
            />
            <TotalCardView
              text={"አጠቃላይ ኩንታል"}
              number={sumOfAllSack()}
              comp={<BsFillArrowUpCircleFill />}
              onClick={() => {
               setShowGeneralTable({
                status : true,
                title : "አጠቃላይ ኩንታል",
                id : "2",
                type : "table"
               });
              }}
            />
            <TotalCardView
              text={"አዲስ ገቢ ኩንታል"}
              number={sumOfAllNewSack()}
              comp={<BsFillArrowUpCircleFill />}
              onClick={() => {
                setShowGeneralTable({
                 status : true,
                 title : "አዲስ ገቢ ኩንታል",
                 id : "3",
                 type : "table"
                });
               }}
            />
            <TotalCardView
              text={"የጎደለ ኩንታል"}
              number={sumOfAllGodoloSack()}
              comp={<BsFillArrowDownCircleFill />}
              onClick={() => {
                setShowGeneralTable({
                 status : true,
                 title : "የጎደለ ኩንታል",
                 id : "4",
                 type : "table"
                });
               }}
            />
            <TotalCardView
              text={"የጎደለ ፓኬጅ"}
              number={sumOfAllGodoloPackage()}
              comp={<BsFillArrowDownCircleFill />}
              onClick={() => {
                setShowGeneralTable({
                 status : true,
                 title : "የጎደለ ፓኬጅ",
                 id : "5",
                 type : "table"
                });
               }}
            />
            <TotalCardView
              text={"አዲስ ገቢ ፓኬጅ"}
              number={sumOfAllNewPackage()}
              comp={<BsFillArrowUpCircleFill />}
              onClick={() => {
                setShowGeneralTable({
                 status : true,
                 title : "አዲስ ገቢ ፓኬጅ",
                 id : "6",
                 type : "table"
                });
               }}
            />
          </div>
          <ToastContainer />
          <div className="flex justify-center flex-wrap  py-3   gap-2 flex-grow">
            <div>
              <TotalPackage arrayOfallData={arrayOfallData} />
            </div>

            <div>
              <ResidentPackage arrayOfallData={arrayOfallData} />
            </div>

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
            {/* <div>
          <ThreePointVis />
        </div> */}
          </div>{" "}
        </>
      )}
      {showGeneralTable.status ? <GeneralTableForAll title={showGeneralTable.title} id={showGeneralTable.id} type={showGeneralTable.type} 
      setShowGeneralTableMethod = {setShowGeneralTableMethod}/> : ""}

      {detailClicked ? (
        <>
          <form onSubmit={updateDataToFirebase}>
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
                      <AiFillCloseCircle
                        onClick={() => {
                          setDeteailClicked(false);
                          setIsEdited(false);
                        }}
                      />
                    </div>
                  </div>
                  {/*body*/}
                  <div className="flex">
                    <Chart
                      series={[ReturnTimeDifference()]}
                      options={{
                        chart: {
                          height: 400,
                          type: "radialBar",
                        },
                        plotOptions: {
                          radialBar: {
                            offsetY: 0,
                            startAngle: 0,
                            endAngle: 270,
                            hollow: {
                              margin: 5,
                              size: "30%",
                              background: "transparent",
                              image: undefined,
                            },
                            dataLabels: {
                              name: {
                                show: false,
                              },
                              value: {
                                show: false,
                              },
                            },
                          },
                        },
                        colors: [
                          ReturnTimeDifference() < 6 ? "#1ab7ea" : "#1ab7ea",
                        ],
                        labels: ["የመጋዘን ቆይታ"],
                        legend: {
                          show: true,
                          floating: true,
                          fontSize: "16px",
                          position: "left",
                          offsetX: -25,
                          offsetY: -15,
                          labels: {
                            useSeriesColors: true,
                          },
                          markers: {
                            size: 0,
                          },
                          formatter: function (seriesName, opts) {
                            return (
                              seriesName +
                              ":  " +
                              opts.w.globals.series[opts.seriesIndex]
                            );
                          },
                          itemMargin: {
                            vertical: 3,
                          },
                        },
                        responsive: [
                          {
                            breakpoint: 480,
                            options: {
                              legend: {
                                show: false,
                              },
                            },
                          },
                        ],
                      }}
                      type="radialBar"
                      width="160"
                      height="210"
                    />

                    <Chart
                      options={{
                        chart: {
                          type: "bar",
                        },
                        colors: [
                          CilckedData.sackQuantity < 140
                            ? "#C7CC00"
                            : "#1ab7ea",
                        ],
                        xaxis: {
                          categories: [CilckedData.date],
                        },
                      }}
                      series={[
                        {
                          name: "የኩንታል ብዛት",
                          data: [CilckedData.sackQuantity],
                        },
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
                        value={
                          isEdited
                            ? updatingForm.customerName
                            : CilckedData.customerName
                        }
                        height="20"
                        setting="1"
                        editIcon={true}
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                        classType={1}
                      />
                      <TextInput
                        placeholder="የመኪናው ሰሌዳ ቁጥር"
                        type="text"
                        name="numberPlate"
                        height="20"
                        setting={1}
                        editIcon={true}
                        classType={1}
                        value={
                          isEdited
                            ? updatingForm.numberPlate
                            : CilckedData.numberPlate
                        }
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                      />
                    </div>
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="የምርት ኣይነት"
                        type="text"
                        name="productType"
                        height="20"
                        setting="1"
                        editIcon={true}
                        classType={1}
                        value={
                          isEdited
                            ? updatingForm.productType
                            : CilckedData.productType
                        }
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                      />
                      <TextInput
                        placeholder="የምርት ደረጃ"
                        type="text"
                        name="productLevel"
                        height="20"
                        setting={1}
                        editIcon={true}
                        classType={1}
                        value={
                          isEdited
                            ? updatingForm.productLevel
                            : CilckedData.productLevel
                        }
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                      />
                    </div>
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="ምርቱ የመጣበት አክባቢ"
                        type="text"
                        name="productResident"
                        height="20"
                        setting="1"
                        editIcon={true}
                        classType={1}
                        value={
                          isEdited
                            ? updatingForm.productResident
                            : CilckedData.productResident
                        }
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                      />
                      <TextInput
                        placeholder="የወጪ ሰነድ ቁጥር"
                        type="text"
                        name="GINNumber"
                        height="20"
                        setting={1}
                        editIcon={true}
                        classType={1}
                        value={
                          isEdited
                            ? updatingForm.GINNumber
                            : CilckedData.GINNumber
                        }
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                      />
                    </div>
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="ጠቅላላ ክብደት"
                        type="number"
                        name="totalWeight"
                        height="20"
                        setting="1"
                        editIcon={true}
                        classType={1}
                        value={
                          isEdited
                            ? updatingForm.totalWeight
                            : CilckedData.totalWeight
                        }
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                      />

                      <TextInput
                        placeholder="ነጠላ ክብደት"
                        type="text"
                        name="singleWeight"
                        height="20"
                        setting={1}
                        editIcon={true}
                        classType={1}
                        value={
                          isEdited
                            ? updatingForm.singleWeight
                            : CilckedData.singleWeight
                        }
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                      />
                    </div>
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="የጆንያ ብዛት"
                        type="text"
                        name="sackQuantity"
                        height="20"
                        setting="1"
                        editIcon={true}
                        classType={1}
                        value={
                          isEdited
                            ? updatingForm.sackQuantity
                            : CilckedData.sackQuantity
                        }
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                      />
                      <TextInput
                        placeholder="የተጣራ ክብደት"
                        type="text"
                        name="filteredWeight"
                        height="20"
                        setting={1}
                        editIcon={true}
                        classType={1}
                        value={
                          isEdited
                            ? updatingForm.filteredWeight
                            : CilckedData.filteredWeight
                        }
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                      />
                    </div>
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="የኣስረካቢው ስም"
                        type="text"
                        name="providerName"
                        height="20"
                        setting="1"
                        editIcon={true}
                        value={
                          isEdited
                            ? updatingForm.providerName
                            : CilckedData.providerName
                        }
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                      />
                      <TextInput
                        placeholder="የተረካቢው ስም"
                        type="text"
                        name="receiverName"
                        height="20"
                        setting={1}
                        editIcon={true}
                        value={
                          isEdited
                            ? updatingForm.receiverName
                            : CilckedData.receiverName
                        }
                        isEditedMethod={isEditedMethod}
                        onChange={onUpdate}
                      />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setDeteailClicked(false);
                        setIsEdited(false);
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      // onClick={() => {setDeteailClicked(false)}}
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
