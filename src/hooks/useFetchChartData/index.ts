import { useState, useEffect } from 'react';

export const DATA_URL =
  'https://jakubhorak.s3-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv';

export interface ChartDataApiResponse {
  isLoading: boolean;
  response: string | null;
  error: Error | null;
}

export default function useFetchChartData(): ChartDataApiResponse {
  const [response, setResponse] = useState<string| null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(DATA_URL)
      .then((fetchRes: Response) => {
        return fetchRes.text();
      })
      .then((res: string) => {
        setResponse(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    response,
    error,
  };
}
