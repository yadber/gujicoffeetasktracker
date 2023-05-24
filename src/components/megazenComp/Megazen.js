import TableHead from "./TableHead";
import TableBody from "./TableBody";
import MegazenSetting from "./MegazenSetting";
import { useState, useEffect } from "react";

import { Timestamp } from "firebase/firestore";

export default function Megazen({
  saveSetting,
  megazenSettingRow,
  megazenSettingColumn,
  location,
  message,
  arrayOfallData,
  clickDetailStatusChanger
}) {
  const currentTimestamp = Timestamp.fromDate(new Date());

  const [timeToLoad, setTimeToLoad] = useState(false);
  const locationAndMessageArray = arrayOfallData;
  // const locationAndMessageArray = [
  //   {
  //     GINNumber: "2121",
  //     customerName: "yadesa",
  //     date: "2023-05-11",
  //     fileNumber: "24",
  //     filteredWeight: "1000",
  //     column: "C",
  //     row : "3",
  //     numberPlate: "PL-2033",
  //     productLevel: "level-1",
  //     productResident: "Bule Hora",
  //     productType: "Normal",
  //     providerName: "Yadesa Berchu",
  //     receiverName: "Burkitu Berchu",
  //     sackQuantity: "120",
  //     singleWeight: "1000",
  //     totalWeight: "2000",
  //     timestamp : "1684649289"
  //   },
  //   {
  //     GINNumber: "2122",
  //     customerName: "yadesa",
  //     date: "2023-05-11",
  //     fileNumber: "22",
  //     filteredWeight: "1000",
  //     column: "D",
  //     row : "2",
  //     numberPlate: "PL-2033",
  //     productLevel: "level-1",
  //     productResident: "Bule Hora",
  //     productType: "Normal",
  //     providerName: "Yadesa Berchu",
  //     receiverName: "Burkitu Berchu",
  //     sackQuantity: "140",
  //     singleWeight: "1000",
  //     totalWeight: "2000",
  //    timestamp : "1683958089"
  //   },
  // ];
  useEffect(() => {
    setTimeout(() => {
      setTimeToLoad(true);
    }, 10);
  }, []);

  const numberMegazenRow = Number(megazenSettingColumn);
  const numberMegazenColumn = Number(megazenSettingRow);
  const ArrayOFLettersRow = [],
    ArrayOFLettersColumn = [];
  for (let i = 0; i < numberMegazenRow; i++) {
    ArrayOFLettersRow.push(String.fromCharCode("A".charCodeAt() + i));
  }
  for (let i = 1; i < numberMegazenColumn + 1; i++) {
    ArrayOFLettersColumn.push(i);
  }

  function locationPlacement(place, text,timestamp, sackQuantity) {
   
    let elementUpper = document.getElementById(place+"upper");
    let elementBottom = document.getElementById(place+"bottom");
    
    if(sackQuantity < 140 ){
      elementUpper.innerHTML ='i'
    }

   

    let difference = currentTimestamp - timestamp;
    let daysDifference = Math.floor(difference / 60 / 60 / 24);
    document.getElementById(place).innerHTML = text ?`File:- ${text}` : "text";
  
    if (daysDifference < 5) {
      elementBottom.innerHTML = "N"
    }
  }

  return (
    <div className="bg-white w-[65rem] h-[50rem]">
      <h5 className="text-center text-2xl font-bold">መጋዘን ሀ</h5>
      <div className="flex items-center my-2 before:border-t  before:flex-1 border-1 before:border-gray-600 after:border-t  after:flex-1 after:border-gray-600"></div>
      <MegazenSetting
        saveSetting={saveSetting}
        megazenSettingRow={megazenSettingRow}
        megazenSettingColumn={megazenSettingColumn}
      />

      <div className="flex flex-col px-6 py-6">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className=" min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <TableHead label="#" />
                    {ArrayOFLettersRow.map(function (value) {
                      return <TableHead label={value} key={value} />;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {ArrayOFLettersColumn.map((value) => (
                    <TableBody
                      key={value}
                      location={value}
                      itemValue={value}
                      length={ArrayOFLettersRow.length}
                      arrayOfallData={locationAndMessageArray}
                      clickDetailStatusChanger={clickDetailStatusChanger}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {
        timeToLoad ? 
        locationAndMessageArray.map(val => (
          locationPlacement(val.row+val.column, val.fileNumber, val.timestamp, val.sackQuantity)
        
)) : 
        ""
      }
    </div>
  );
}
