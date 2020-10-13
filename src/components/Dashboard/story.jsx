import React from 'react';
import GlobalStyle from 'global-styles/storybook-decorator';
import chartPointsData from 'utils/mocks/chart-points.mock';
import Dashboard from '.';

export default {
  title: 'Dashboard',
  decorators: [GlobalStyle],
};

export const DashboardDefault = () => {
  return (
    <Dashboard
      chartData={chartPointsData.map((point, idx) => {
        // eslint-disable-next-line 
        point.date = `0${Math.floor(idx / 10) + 1}.01.2019`;
        return point;
      })}
    />
  );
};
