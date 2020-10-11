import React from "react";
import { LineChart, Line, YAxis, XAxis, Legend, Tooltip } from 'recharts'
import { ChartPointData } from 'hooks/useChartData';

export interface Props {
    pointsData: ChartPointData[]
}

export default function Dashboard({pointsData }: Props) {
  return (
    <LineChart width={600} height={300} data={pointsData}>
      <XAxis dataKey="date" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
}
