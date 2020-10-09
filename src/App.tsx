import React from 'react';
import useFetchChartData from 'hooks/useFetchChartData';

function App() {
  const { response } = useFetchChartData();
  return <div className="App">Kotek</div>;
}

export default App;
