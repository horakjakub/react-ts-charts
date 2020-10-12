import React, { useState } from 'react';
import '@atlaskit/css-reset';
import useFetchChartData from 'hooks/useFetchChartData';
import useChartData from 'hooks/useChartData';
import useFilteredData from 'hooks/useFilterChartData';
import Dashboard from 'components/Dashboard';
import ControlPanel, { Filters } from 'components/ControlPanel';
import ErrorMessage from 'components/ErrorMessage';
import Spinner from '@atlaskit/spinner';
import useGroupChartData from 'hooks/useGroupChartData';

function App() {
  const { response, isLoading, error } = useFetchChartData();
  const { chartData, campaigns, dataSources } = useChartData(response);
  const [filters, setFilters] = useState<Filters | null>(null);
  const filteredData = useFilteredData({ filters, chartPointsData: chartData });
  const groupedData = useGroupChartData(
    filteredData || chartData,
    'week'
  );

  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="App">
      <ControlPanel
        campaigns={campaigns}
        dataSources={dataSources}
        isDisabled={isLoading || !chartData}
        currentFilters={{ selectedCampaigns: [], selectedDataSources: [] }}
        applyFilters={(fltrs: Filters) => {
          setFilters(fltrs);
        }}
      />
      {isLoading && <Spinner size="large" />}
      {groupedData && groupedData.length !== 0 && (
        <Dashboard chardData={groupedData} />
      )}
      {groupedData && !groupedData.length && (
        <div> sorry there are no results for this filters </div>
      )}
    </div>
  );
}

export default App;
