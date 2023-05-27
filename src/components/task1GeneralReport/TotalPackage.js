import React, {useState} from 'react'
import Chart from "react-apexcharts";

export default function TotalPackage(arrayOfallData) {
   
  const sackValues = arrayOfallData.arrayOfallData.map(val => val.sackQuantity);
  
 
  const dateValues = arrayOfallData.arrayOfallData.map(function(val){
    let value = new Date(val.timestamp.seconds * 1000)
    return value.toDateString();
  } )

 

    
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
        categories: dateValues,
        title: {
          text: 'ቀን'
        }
      },
      yaxis: {
        title: {
          text: 'የ ኩንታል ብዛት'
        },
        min: 20,
        max: 300
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
              name: "የኩንታል ብዛት",
              data: sackValues
            }
          ]
    

  return (
    <div>
      <Chart 
      options={options} 
      series={states} 
      type="line" 
      width={350}
      height={400}/>
    </div>
  )
}
