import * as React from "react";
import { Daily } from "../../utils/constants";
import { Bar } from "react-chartjs-2";
interface ChartProps {
  data: Daily[];
}

const Chart = ({ data }: ChartProps) => {
  return (
    <>
      <Bar 
      height={500}
      width={600}
      options={{
        maintainAspectRatio:false,
        scales:{
            yAxes:[{
              id:'large',
              position:'left',
              ticks:{
                callback:function(label:number,index:number,labels:[string]){
                  return label/1000+"k"
                },
                suggestedMin:27000,
                suggestedMax:32000,
            }
            },
            {
              id:'small',
              position:'right',
              ticks:{
                suggestedMin:0,
                suggestedMax:200
              }

            }
          ],
            xAxes:[{
              // distribution:'series',
              type:'time',
              unitStepSize:1,
              time:{
                displayFormats:{
                  'week': 'MMM DD, `YY'
                },
                unit:'week',
                // min:data[0].date,
                // max:data[data.length-1].date, 
              },
              // time:{
              //   unit:'week',
              //   stepSize:7,
              //   min:data[0].date,
              //   max:data[data.length-1].date, 
              //   displayFormats:{
              //     'week': 'MMM DD, `YY'
              //   }
              // }

            }]
          }
      }}
      data={{
        labels:data.map((daily)=>daily.date),
        datasets:[{
          label:'# of equity',
          fill:false,
          yAxisID:"large",
          data:data.map((daily)=>daily.equity),
          type:'line',
          lineTension:0,
          backgroundColor:'orange',
          borderColor:'orange',
          pointBackgroundColor:'white',
          pointBorderColor:'orange',
          pointBorderWidth:2.5,
          pointRadius:3,
        }
        ,{
          label:'# of balance',
          fill:false,
          yAxisID:"large",
          data:data.map((daily)=>daily.balance),
          type:'line',
          lineTension:0,
          backgroundColor:'red',
          borderColor:'red',
          pointBackgroundColor:'white',
          pointBorderColor:'red',
          pointBorderWidth:2.5,
          pointRadius:3,
        },
        {
          label:'# of profit',
          data:data.map((daily)=>daily.profit),
          yAxisID:"small",
          type:'bar',
          lineTension:0,
          backgroundColor:'#9BE59B',
          borderColor:'#9BE59B',
        }
      ]
      }
    }
      />
    </>
  );
};

export default Chart;
