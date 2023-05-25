import React from 'react'
import Chart from "react-apexcharts";


export default function TotalPackage() {
    const options = {
        chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'የዚህ ዓመት ከፍተኛ አና ዝቅተኛ ቡና የገባበት ወር በኩንታል',
        align: 'center'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'ወር'
        }
      },
      yaxis: {
        title: {
          text: 'የ ኩንታል ብዛት'
        },
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    }
    const states = [
            {
              name: "ከፍተኛ - 2013",
              data: [28, 29, 33, 36, 32, 32, 33]
            },
            {
              name: "ዝቅተኛ - 2013",
              data: [12, 11, 14, 18, 17, 13, 13]
            }
          ]
    

  return (
    <div>
      <Chart 
      options={options} 
      series={states} 
      type="line" 
      width={500}
      height={400}/>
    </div>
  )
}
