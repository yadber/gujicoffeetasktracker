import React from "react";
import Chart from "react-apexcharts";

export default function ResidentPackage(arrayOfallData) {
  const arr2 = arrayOfallData.arrayOfallData;
  const res2 = Array.from(
    arr2.reduce(
      (m, { productResident, sackQuantity }) =>
        m.set(
          productResident,
          (m.get(productResident) || 0) + Number(sackQuantity)
        ),
      new Map()
    ),
    ([productResident, sackQuantity]) => ({ productResident, sackQuantity })
  );
  const resident = res2.map((value) => value.productResident);
  const sack = res2.map((value) => value.sackQuantity);
  const minValue = Math.min.apply(Math, sack);
  const MaxValue = Math.max.apply(Math, sack);

  const DiferentColors = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  let colorArray = [];
  for (let i = 0; i < res2.length; i++) {
    let singleColor = "#";
    for (let j = 0; j < 6; j++) {
      singleColor +=
        DiferentColors[Math.floor(Math.random() * DiferentColors.length)];
    }
    colorArray.push(singleColor);
  }

  const options = {
    chart: {
      height: 350,
      type: "bar",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: colorArray,
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "በዚህ ዓመት ከፍተኛ ቡና የገባበት አክባቢ በኩንታል",
      align: "center",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: colorArray, // takes an array which will be repeated on columns
        opacity: 0.4,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: resident,
      title: {
        text: "ምርቱ የመጣበት አክባቢ",
      },
    },
    yaxis: {
      title: {
        text: "የ ኩንታል ብዛት",
      },
      min: minValue - 50,
      max: MaxValue + 50,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };
  const states = [
    {
      name: "የኩንታል ብዛት",
      data: sack,
    },
  ];

  return (
    <div>
      <Chart
        options={options}
        series={states}
        type="bar"
        width={900}
        height={500}
      />
    </div>
  );
}
