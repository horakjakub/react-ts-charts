import { useState, useEffect } from "react";

export const DATA_URL =
  "http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv";

export interface ApiResponse<T> {
  isLoading: boolean;
  response: unknown | null;
  error: Error | null;
}

export default function useFetchChartData(): ApiResponse<{}> {
  return {
    isLoading: false,
    response: null,
    error: null,
  };
}
