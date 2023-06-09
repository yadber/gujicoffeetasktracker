import React from 'react'
import Chart from "react-apexcharts";

export default function TotalPackage(arrayOfallData) {
   
  const sackValues = arrayOfallData.arrayOfallData.map(val => val.sackQuantity);
  
 
  const dateValues = arrayOfallData.arrayOfallData.map(function(val){
    let value = new Date(val.timestamp.seconds * 1000)
    let tobesplittedValue = value.toDateString().split(" ");

    return tobesplittedValue[1]+" "+tobesplittedValue[2]
  } )
 
  const minValue = Math.min.apply(Math, sackValues);
  const maxValue = Math.max.apply(Math, sackValues)
  const DiferentColors = ["1","2","3","4","5","6","7","8","9","0","A","B","C","D","E","F"]
   
  let colorArray = [];
  for(let i=0; i<sackValues.length; i++){
    let singleColor='#';
    for(let j=0; j<6; j++){
      singleColor += DiferentColors[Math.floor(Math.random() * DiferentColors.length)]
    }
    colorArray.push(singleColor)

  }



    
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
      colors: colorArray,
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
          colors: colorArray, // takes an array which will be repeated on columns
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
        min: minValue-10,
        max: maxValue+10
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
      width={1300}
      height={570}/>
    </div>
  )
}
