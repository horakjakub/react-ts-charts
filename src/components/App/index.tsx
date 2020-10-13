import React, { useState, useEffect } from 'react';
import '@atlaskit/css-reset';
import useFetchChartData from 'hooks/useFetchChartData';
import useChartData from 'hooks/useChartData';
import useFilterData, { Filters } from 'hooks/useFilterChartData';
import useGroupInTimeData, {
  BasicChartPoint,
} from 'hooks/useGroupInTimeChartData';
import Dashboard from 'components/Dashboard';
import ControlPanel from 'components/ControlPanel';
import ErrorMessage from 'components/ErrorMessage';
import { Wrapper, Header, Main, H3 } from './styled';

function App() {
  const { response, isLoading, error } = useFetchChartData();
  const {
    chartData,
    campaigns,
    dataSources,
    doConvertToChartData,
  } = useChartData();
  const { filteredData, filters, setFilters, setChartData } = useFilterData();
  const { groupedData, setChartData: doGroup } = useGroupInTimeData('week');
  const [groupedUnfilteredData, setGroupedUnfilteredData] = useState<
  BasicChartPoint[] | null
  >(null);

  useEffect(() => {
    doConvertToChartData(response);
  }, [response, doConvertToChartData]);

  useEffect(() => {
    if (groupedUnfilteredData) {
      doGroup(chartData);
    }
  }, [filteredData, chartData, groupedUnfilteredData, doGroup]);

  useEffect(() => {
    doGroup(filteredData);
  }, [filteredData, doGroup]);

  useEffect(() => {
    if (!groupedUnfilteredData) {
      setGroupedUnfilteredData(groupedData);
    }
  }, [groupedData, groupedUnfilteredData]);

  useEffect(() => {
    setChartData(chartData);
  }, [chartData, setChartData]);

  if (error) return <ErrorMessage error={error} />;

  return (
    <Wrapper>
      <H3>Adverity Advertising Data ELT-V Challenge</H3>
      <Header>
        Hitting "Apply", filters the chart to show a timeseries for both Clicks
        and Impressions for given Datasouces and Campaigns - logical AND
      </Header>
      <Main>
        <ControlPanel
          campaigns={campaigns}
          dataSources={dataSources}
          isDisabled={isLoading || !chartData}
          currentFilters={filters}
          applyFilters={(fltrs: Filters) => {
            setFilters(fltrs);
          }}
        />
        <Dashboard
          chartData={groupedData || groupedUnfilteredData}
          isLoading={isLoading}
        />
      </Main>
    </Wrapper>
  );
}

export default App;
