import { useEffect, useState } from 'react';
import csv from 'csvtojson';

export interface RawChartPointData {
  Campaign: string;
  Clicks: string;
  Datasource: string;
  Date: string;
  Impressions: string;
}

export default function useCSVtoJSON(
  CSVtext: string | null
): RawChartPointData[] | null {
  const [JSONData, setJSONData] = useState<RawChartPointData[] | null>(null);
  useEffect(() => {
    if (CSVtext) {
      csv()
        .fromString(CSVtext)
        .then((jData) => {
          setJSONData(jData as RawChartPointData[]);
        });
    }
  }, [CSVtext]);

  return JSONData;
}
