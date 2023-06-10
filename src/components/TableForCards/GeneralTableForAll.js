import React, { useState } from "react";
import CountUp from "react-countup/";
import { AiFillCloseCircle } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import {BsFillCalendarDateFill} from "react-icons/bs"
import {Timestamp} from "firebase/firestore";
import { useEffect } from "react";
export default function GeneralTableForAll({
  title,
  totalPackage,
  setShowGeneralTableMethod,
  arrayData,
  id
}) {



  const [method, setMethod] = useState({val : "bg-[blue-200]", val1:"bg-gray-200"});
useEffect(() => {
  setTimeout(() => {
    setMethod({
      val:method.val1,
      val1:method.val
    })
  }, 3000);
}, [method])
  

  const val = arrayData.map(someVal => someVal);
  
  const columns = [
    {
      field: "id1",
      headerName: "ተ. ቁጥር",
      filterable: false,
      renderCell: (index) =>
        index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
    },
    { field: "fileNumber", headerName: "የሰነድ ቁጥር", width: 150 },
    { field: "sackQuantity",  headerName: "አጠቃላይ ኩንታል", width: 150 },
    {
      field: "less",
      headerName: "የጎደለ ብዛት",
      valueGetter: ({ row }) => {
         if(Number(row.sackQuantity)-140 > 0){
          return `+${Number(row.sackQuantity)-140}`
        }else
          return Number(row.sackQuantity)-140
      },
    },
    {
      field: "duration",
      headerName: "የመጋዘን ቆይታ",
      valueGetter: ({ row }) => {
          return Math.floor(
        (Timestamp.fromDate(new Date()) - row.timestamp) / 60 / 60 / 24
      );
        },
      width:150
    },
    { field: "productType", headerName: "የምርት አይነት", width: 150 },
    { field: "productResident", headerName: "የመጣበት አከባቢ", width: 150 },
    { field: "GINNumber", headerName: "የወጪ ሰነድ ቁጥር", width: 150 },
    {
      field: "date",
      headerName: "የመጣበት ቀን",
      width: 150,
      renderHeader: (params) => (
        <strong className="flex">
          {"የመጣበት ቀን "}
          <BsFillCalendarDateFill className="mt-5 ml-1"/>
        </strong>
      ),
    },
    {
      field: "location",
      headerName: "የመጋዘን ስፍራ",
      valueGetter: ({ row }) => {
        return `${row.column}${row.row}`;
      },
    },
  ];
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-h-full">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-100 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <div className="h-10 w-fit bg-slate-100 text-center shadow-lg rounded-t-lg rotate-[-6deg]">
                <h3 className="text-3xl font-extrabold">
                  <CountUp start={0} end={totalPackage} duration={10} />
                </h3>
              </div>
              <div
                className="h-4 w-4 p-1 ml-5 bg-transparent border-0 text-red-400 opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none cursor-pointer"
                onClick={setShowGeneralTableMethod}
              >
                <AiFillCloseCircle />
              </div>
            </div>
            {/*body*/}
            <div>
              <DataGrid 
                rows={val} 
                columns={columns} 
                getCellClassName={(params) => {
                  if (params.field === 'duration') {
                    return params.value >= 14 ? 'bg-red-200' : 'bg-green-200';
                  }if(params.field === 'sackQuantity'){
                    return params.value >= 140 ? 'bg-red-200' : 'bg-green-200';
                  } if(params.field === 'less'){
                    return params.value < 0 ? 'bg-red-600' : '';
                  }    
                }}
              
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? method.val : method.val1
                }
              />
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={setShowGeneralTableMethod}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
