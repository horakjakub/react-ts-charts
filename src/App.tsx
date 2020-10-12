import React from 'react';
import '@atlaskit/css-reset';
import useFetchChartData from 'hooks/useFetchChartData';
import useChartData from 'hooks/useChartData';
import Dashboard from 'components/Dashboard';
import ControlPanel from 'components/ControlPanel';
import ErrorMessage from 'components/ErrorMessage';
import Spinner from '@atlaskit/spinner';

function App() {
  const { response, isLoading, error } = useFetchChartData();
  const { chartData, campaigns, dataSources } = useChartData(response);

  if (error) return <ErrorMessage error={error} />;
  return (
    <div className="App">
      <ControlPanel
        campaigns={campaigns}
        dataSources={dataSources}
        isDisabled={isLoading || !chartData}
        currentFilters={{ selectedCampaigns: [], selectedDataSources: [] }}
        applyFilters={() => {}}
      />
      {isLoading && <Spinner size="large" />}
      {chartData && <Dashboard chardData={chartData} />}
    </div>
  );
}

export default App;
