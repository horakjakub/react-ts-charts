import { SetStateAction, useEffect, useState, Dispatch } from 'react';
import csv from 'csvtojson';

export interface RawChartPointData {
  Campaign: string;
  Clicks: string;
  Datasource: string;
  Date: string;
  Impressions: string;
}

export default function useCSVtoJSON(): {
  JSONData: RawChartPointData[] | null;
  doJSONData: Dispatch<SetStateAction<string | null>>;
} {
  const [CSVtext, setCSVtext] = useState<string | null>(null);
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

  return {
    JSONData,
    doJSONData: setCSVtext
  };
}
