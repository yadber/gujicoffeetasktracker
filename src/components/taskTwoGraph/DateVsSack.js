import React from 'react'
import Chart from "react-apexcharts";
export default function DateVsSack() {
  return (
    <div>
       <Chart
                      options={{
                        chart: {
                          type: "bar",
                        },
                        colors: [
                         
                            "#C7CC00"
                           
                        ],
                        xaxis: {
                          categories: [1990, 2000,2001, 2002],
                        },
                      }}
                      series={[
                        {
                          name: "የኩንታል ብዛት",
                          data: [222,333,444,555],
                        },
                      ]}
                      type="bar"
                      width="700"
                      height="250"
                    />
    </div>
  )
}
