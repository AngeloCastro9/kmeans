/* eslint-disable no-loop-func */
import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,  
} from "recharts";

import kMeans from "../src/kmeans/kMeans"

const App: React.FC = () => {
  let [data, setData] = useState(Array);

  const getAll = useCallback(async () => {
    const executions = await kMeans();
    let preData: Array<any> = [];    
    for (const execution of executions) {
      let convertedData: Array<any> = [];
      await execution.forEach((cluster: { points: Array<any>, centroid: Array<number>; }) => {
        // eslint-disable-next-line no-empty-pattern
        let executionData = {points: [] = [] as any, centroid: [] = [] as any}
        const convertedPoints = cluster.points.map((point: any) => {
          return { x: point[0], y: point[1], z: 100 }
        })
        const convertedCentroid = {x: cluster.centroid[0], y: cluster.centroid[1], z: 150}
        executionData.points = convertedPoints;
        executionData.centroid = convertedCentroid;
        convertedData.push(executionData);
      });
      preData.push(convertedData);   
    }
    setData(preData);
  }, []);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const COLORS = ["green", "red", "blue", "orange", "black", "yellow", "pink", "gray"];
  
  function drawGraph(data: any, colors: any) {
    return ( 
      data.map((executionData: any) => {
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
            <XAxis type="number" dataKey="x" />
            <YAxis type="number" dataKey="y"/>            
            <ZAxis type="number" dataKey="z" range={[100, 150]}/>
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            {
              executionData.map((cluster: { points: Array<any>, centroid: Array<number>; }, index: number) => {  
                return <Scatter name="Cluster" data={cluster.points} fill={colors[index]} shape="triangle" />                    
              })              
            }
            {
              executionData.map((cluster: { points: Array<any>, centroid: Array<number>; }, index: number) => {  
                return <Scatter name="Centroid" data={[cluster.centroid]} fill={colors[index]} shape="star"/> 
              })              
            }
            </ScatterChart>      
        </div>
      )})
    )
  }
  

  return (
    <>{drawGraph(data, COLORS)}</>
  );

}
export default App;