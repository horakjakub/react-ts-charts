import React, { useState, useEffect } from 'react';
import '@atlaskit/css-reset';
import Spinner from '@atlaskit/spinner';
import useFetchChartData from 'hooks/useFetchChartData';
import useChartData from 'hooks/useChartData';
import useFilterData, { Filters } from 'hooks/useFilterChartData';
import useGroupInTimeData, {
  BasicChartPoint,
} from 'hooks/useGroupInTimeChartData';
import Dashboard from 'components/Dashboard';
import ControlPanel from 'components/ControlPanel';
import ErrorMessage from 'components/ErrorMessage';

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
    <div className="App">
      <ControlPanel
        campaigns={campaigns}
        dataSources={dataSources}
        isDisabled={isLoading || !chartData}
        currentFilters={filters}
        applyFilters={(fltrs: Filters) => {
          setFilters(fltrs);
        }}
      />
      {isLoading && <Spinner size="large" />}
      {groupedUnfilteredData &&
        groupedUnfilteredData.length !== 0 &&
        !(groupedData && !groupedData.length) && (
          <Dashboard chardData={groupedData || groupedUnfilteredData} />
      )}
      {groupedData && !groupedData.length && (
        <div> Sorry there are no results for those filters. </div>
      )}
    </div>
  );
}

export default App;
