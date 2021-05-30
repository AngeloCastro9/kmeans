/* eslint-disable no-loop-func */
import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from "recharts";

import kMeans from "../src/kmeans/kMeans"

const App: React.FC = () => {

  const [points, setPoints] = useState([]);
  const [points2, setPoints2] = useState([]);
  const [points3, setPoints3] = useState([]);
  const [points4, setPoints4] = useState([]);
  let data = points;
  let data2 = points2;
  let data3 = points3;
  let data4 = points4;
  let i = 1

  const getAll = useCallback(async () => {
    let pointsList: any[''] = [] as any;
    const executions = await kMeans()

    for (const execution of executions) {
      
      await execution.forEach(async (cluster: { points: any; }) => {
        i = i;
        const convertedPoints = await cluster.points.map((points: any) => {
          return { x: points[0], y: points[1] }
        })
        
        if(i === 1) {
          setPoints(pointsList.concat(convertedPoints));
        }
        else if(i === 2){
          setPoints2(pointsList.concat(convertedPoints));  
        }
        else if(i === 3){
          setPoints3(pointsList.concat(convertedPoints));  
        }
        else if(i === 4){
          setPoints4(pointsList.concat(convertedPoints));  
        }
        i++;
      });
      
    }
  }, [i]);

  useEffect(() => {
    getAll();
  }, [getAll]);



  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  return (
    <div>
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" />
        <YAxis type="number" dataKey="y" name="weight" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Scatter>
      </ScatterChart>

      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" />
        <YAxis type="number" dataKey="y" name="weight" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data2} fill="#8884d8">
          {data2.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Scatter>
      </ScatterChart>
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" />
        <YAxis type="number" dataKey="y" name="weight" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data3} fill="#8884d8">
          {data2.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Scatter>
      </ScatterChart>
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" />
        <YAxis type="number" dataKey="y" name="weight" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data4} fill="#8884d8">
          {data2.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Scatter>
      </ScatterChart>
    </div>
    
  );
}


export default App;