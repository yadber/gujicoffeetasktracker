import React from 'react'
import TextInput from '../TextInput';
import { AiFillCloseCircle } from "react-icons/ai";
import Chart from "react-apexcharts";
export default function ProgressDetailClicked({setDetailClickedfunction}) {
  return (
    <div>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    {/* <AiFillSetting className='text-2xl mt-2'/> */}
                    <h3 className="text-3xl font-semibold">
                      FILE NO. {20}
                    </h3>
                    <div className="h-4 w-4 p-1 ml-auto bg-transparent border-0 text-red-700 opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none cursor-pointer"
                    onClick={setDetailClickedfunction}
                    >
                      <AiFillCloseCircle
                        // onClick={setDetailClickedfunction}
                      />
                    </div>
                  </div>
                  {/*body*/}
                  <div className="flex">
                    <Chart
                      series={[23]}
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
                          20 < 6 ? "#1ab7ea" : "#1ab7ea",
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
                         120 < 140
                            ? "#C7CC00"
                            : "#1ab7ea",
                        ],
                        xaxis: {
                          categories: [1220,1230],
                        },
                      }}
                      series={[
                        {
                          name: "የኩንታል ብዛት",
                          data: [10,20],
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
                        editIcon={true}
                        classType={1}
                       
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
                      
                      />
                      
                    </div>
                    
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                     
                    >
                      Close
                    </button>
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          
    </div>
  )
}
