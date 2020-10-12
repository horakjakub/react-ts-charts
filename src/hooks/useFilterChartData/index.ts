import { useState, useEffect } from 'react';
import { Filters } from 'components/ControlPanel';
import { ChartPointData } from 'hooks/useChartData';

interface Props {
  filters: Filters | null;
  chartPointsData: ChartPointData[] | null;
}

export default function useFilterChartData({
  filters,
  chartPointsData,
}: Props): ChartPointData[] | null {
  const [filteredData, setFilteredData] = useState<ChartPointData[] | null>(
    null
  );

  useEffect(() => {
    if (filters && chartPointsData) {
      const { selectedCampaigns, selectedDataSources } = filters;

      if (selectedCampaigns.length && selectedDataSources.length) {
        setFilteredData(
          chartPointsData.filter(
            ({ campaign, dataSource }: ChartPointData) =>
              selectedDataSources.includes(dataSource) &&
              selectedCampaigns.includes(campaign)
          )
        );
      } else if (selectedCampaigns.length) {
        setFilteredData(
          chartPointsData.filter(({ campaign }: ChartPointData) =>
            selectedCampaigns.includes(campaign)
          )
        );
      } else if (selectedDataSources.length) {
        setFilteredData(
          chartPointsData.filter(({ dataSource }: ChartPointData) =>
            selectedDataSources.includes(dataSource)
          )
        );
      } else {
        setFilteredData(null);
      }
    }
  }, [filters, chartPointsData]);

  return filteredData;
}
