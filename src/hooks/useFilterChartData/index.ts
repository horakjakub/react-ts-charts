import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ChartPoint } from 'hooks/useChartData';

export interface Filters {
  selectedCampaigns: string[];
  selectedDataSources: string[];
}

function filterChartDataBy(
  chartData: ChartPoint[],
  dataSources?: string[],
  campaigns?: string[]
): ChartPoint[] | null {
  if (dataSources && campaigns) {
    return chartData.filter(
      ({ campaign, dataSource }: ChartPoint) =>
        dataSources.includes(dataSource) && campaigns.includes(campaign)
    );
  }
  if (dataSources) {
    return chartData.filter(({ dataSource }: ChartPoint) =>
      dataSources.includes(dataSource)
    );
  }
  if (campaigns) {
    return chartData.filter(({ campaign }: ChartPoint) =>
      campaigns.includes(campaign)
    );
  }
  return chartData;
}

export default function useFilterChartData(): {
  filters: Filters;
  filteredData: ChartPoint[] | null;
  setFilters: Dispatch<SetStateAction<Filters>>;
  setChartData: Dispatch<SetStateAction<ChartPoint[] | null>>;
} {
  const [filteredData, setFilteredData] = useState<ChartPoint[] | null>(null);
  const [filters, setFilters] = useState<Filters>({
    selectedCampaigns: [],
    selectedDataSources: [],
  });
  const [chartData, setChartData] = useState<ChartPoint[] | null>(null);

  useEffect(() => {
    if (filters && chartData) {
      const { selectedCampaigns, selectedDataSources } = filters;

      const filtered = filterChartDataBy(
        chartData,
        selectedDataSources.length ? selectedDataSources : undefined,
        selectedCampaigns.length ? selectedCampaigns : undefined
      );

      setFilteredData(filtered);
    } else {
      setFilteredData(chartData);
    }
  }, [filters, chartData]);

  return { filteredData, filters, setChartData, setFilters };
}
