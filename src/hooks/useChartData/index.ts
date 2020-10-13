import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useCSVtoJSON, { RawChartPointData } from 'hooks/useCSVtoJSON';

export interface ChartPoint {
  date: string;
  campaign: string;
  dataSource: string;
  clicks: number;
  impressions: number;
}

export default function useChartData(): {
  chartData: ChartPoint[] | null;
  dataSources: Set<string> | null;
  campaigns: Set<string> | null;
  doConvertToChartData: Dispatch<SetStateAction<string | null>>;
} {
  const { JSONData: jsonCharData, doJSONData } = useCSVtoJSON();
  const [dataSources, setDataSources] = useState<Set<string> | null>(null);
  const [campaigns, setCampaigns] = useState<Set<string> | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[] | null>(null);

  useEffect(() => {
    if (jsonCharData && jsonCharData.length) {
      const sourcesSet: Set<string> = new Set();
      const campaignsSet: Set<string> = new Set();
      const mappedChartData = jsonCharData.map(
        ({
          Campaign,
          Clicks,
          Datasource,
          Impressions,
          Date,
        }: RawChartPointData) => {
          sourcesSet.add(Datasource);
          campaignsSet.add(Campaign);
          return {
            campaign: Campaign,
            dataSource: Datasource,
            clicks: parseInt(Clicks, 10),
            impressions: Impressions === '' ? 0 : parseInt(Impressions, 10),
            date: Date,
          };
        }
      );

      setChartData(mappedChartData);
      setDataSources(sourcesSet);
      setCampaigns(campaignsSet);
    }
  }, [jsonCharData]);

  return {
    chartData,
    campaigns,
    dataSources,
    doConvertToChartData: doJSONData,
  };
}
