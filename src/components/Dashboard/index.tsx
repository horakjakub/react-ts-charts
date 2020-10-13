import React, { memo } from 'react';
import { BasicChartPoint } from 'hooks/useGroupInTimeChartData';
import { LineChart, Line, Tooltip, YAxis, XAxis, Legend } from 'recharts';

export interface Props {
  chardData: BasicChartPoint[];
}

export default memo(Dashboard);

function Dashboard({ chardData }: Props) {
  return (
    <LineChart width={600} height={300} data={chardData}>
      <XAxis dataKey="date" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#8884d8" />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="impressions"
        stroke="#82ca9d"
      />
    </LineChart>
  );
}
