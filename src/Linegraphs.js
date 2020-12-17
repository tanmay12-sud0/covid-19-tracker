import React, { useState, useEffect } from 'react'
import {Line} from 'react-chartjs-2'
import numeral from 'numeral';

const options = {
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 0,
        }
    },
    maintainAspectRatio: false,
    tooltips:
    {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data){
               return numeral(tooltipItem.value).format('+0.0') 
            },
        }
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'li',
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function(value, index, values) {
                        return numeral(value).format('0a')
                    }
                }
            }
        ]
    }
}
function Linegraphs() {
    const [data , setdata] = useState({})

    const buildChartData = (data, caseType='cases') => {
        const chartData = [];
        let lastdataPoint;
        for(let date in data.caseType) {
            if(lastdataPoint) {
                const newdataPoint = {
                    x: date,
                    y: data[caseType][date] - lastdataPoint
                }
                chartData.push(newdataPoint);
            }
            lastdataPoint = data[caseType][date]
        }
        return chartData
    }



    useEffect(() => {
        const fetchData = async() => {
            await  fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30").then(
                response => response.json()
            ).then(
                data => {
                    let chartData = buildChartData(data, 'cases')
                    setdata(chartData)
                })
        }
       
        fetchData()
    }, [])



    return (
       

      
        <div>
           {data?.length > 0 && (
            <Line options={options}
           data={{
               datasets:[{
                 data: data ,
                 borderColor: '#CC1034',
                 backgroundColor:"rgba(204,16,56,0.5)" 
               }]
           }}  />
           )} 
            
        </div>
    )
}

export default Linegraphs
