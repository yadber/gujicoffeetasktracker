import React from 'react'
import Chart from "react-apexcharts";
export default function PieChart({threeValues,labels}) {
    const series = threeValues;
    const options = {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: labels,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    
    
    

  return (
    <div id="chart">
  <Chart options={options} series={series} type="pie" width={380} />
</div>
  )
}
