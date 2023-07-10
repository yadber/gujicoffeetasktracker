import React, { useState } from 'react'
import Chart from "react-apexcharts";
export default function DateVsSack({country, title, sack, colors}) {
 
  return (
    <div>
       <Chart
                      options={{
                        chart: {
                          type: "bar",
                        },
                        colors: colors,
                        xaxis: {
                          categories: country,
                        },
                      }}
                      series={[
                        {
                          name: title,
                          data: sack,
                        },
                      ]}
                      type="bar"
                      width="700"
                      height="250"
                    />
    </div>
  )
}
