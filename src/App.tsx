import React from 'react';
import useFetchChartData from 'hooks/useFetchChartData';
import useChartData from 'hooks/useChartData';;
import '@atlaskit/css-reset';

function App() {
  const { response } = useFetchChartData();
  const { chartData, campaigns, dataSources } = useChartData(response);

  if (chartData) { 
    debugger;
  }

  return (
    <div className="App">
      App basic 
    </div>
  );
}

export default App;
