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
}) {
  const currentTimestamp = Timestamp.fromDate(new Date());

  const [timeToLoad, setTimeToLoad] = useState(false);
  // const locationAndMessageArray = arrayOfallData;

  const locationAndMessageArray = [
    {
      GINNumber: "2121",
      customerName: "yadesa",
      date: "2023-05-11",
      fileNumber: "file:24",
      filteredWeight: "1000",
      megazenLocation: "3C",
      numberPlate: "PL-2033",
      productLevel: "level-1",
      productResident: "Bule Hora",
      productType: "Normal",
      providerName: "Yadesa Berchu",
      receiverName: "Burkitu Berchu",
      sackQuantity: "140",
      singleWeight: "1000",
      totalWeight: "2000",
    },
    {
      GINNumber: "2121",
      customerName: "yadesa",
      date: "2023-05-11",
      fileNumber: "file:22",
      filteredWeight: "1000",
      megazenLocation: "2B",
      numberPlate: "PL-2033",
      productLevel: "level-1",
      productResident: "Bule Hora",
      productType: "Normal",
      providerName: "Yadesa Berchu",
      receiverName: "Burkitu Berchu",
      sackQuantity: "140",
      singleWeight: "1000",
      totalWeight: "2000",
    },
  ];
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

  function locationPlacement(place, text, ) {
    // console.log(place);
    // let element = document.getElementById(place+place);
    // element.innerHTML = "hi there"

    // let difference = currentTimestamp - timestamp;
    // let daysDifference = Math.floor(difference / 60 / 60 / 24);
    document.getElementById(place).innerHTML = text ? text : "text";
    // if (daysDifference > 2) {
    //   document.getElementById(place).style.background = "green";
    // }
  }

  return (
    <div className="bg-white w-[65rem] h-[50rem]">
      <h5 className="text-center">መጋዘን ሀ</h5>
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
          locationPlacement(val.megazenLocation, val.fileNumber)
        
)) : 
        ""
      }
    </div>
  );
}
