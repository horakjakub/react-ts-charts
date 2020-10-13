import React, { memo } from 'react';
import { BasicChartPoint } from 'hooks/useGroupInTimeChartData';
import { LineChart, Line, Tooltip, YAxis, XAxis, Legend } from 'recharts';
import Spinner from '@atlaskit/spinner';
import { Wrapper } from './styled';

export interface Props {
  chartData: BasicChartPoint[] | null;
  isLoading: boolean;
}

export default memo(Dashboard);

function Dashboard({ chartData, isLoading }: Props) {
  return (
    <Wrapper>
      {isLoading && <Spinner size="large" />}
      {chartData && !chartData.length && (
        <div> Sorry there are no results for selected filters. </div>
      )}
      {chartData && !!chartData.length && (
        <LineChart width={600} height={300} data={chartData}>
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="clicks"
            stroke="#8884d8"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="impressions"
            stroke="#82ca9d"
          />
        </LineChart>
      )}
    </Wrapper>
  );
}
