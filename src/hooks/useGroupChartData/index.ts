import { useEffect, useState } from 'react';
import { ChartPointData } from 'hooks/useChartData';
import moment, { Moment } from 'moment';

export type GroupingInterval = 'week' | 'month';

export interface ChartPoint {
  clicks: number;
  impressions: number;
  date: string;
}

interface ChartDataGroups {
  [key: number]: ChartPoint;
}

export default function useGroupChartData(
  chartData: ChartPointData[] | null,
  groupingInterval: GroupingInterval
): ChartPoint[] | null {
  const [groupedData, setGroupedData] = useState<ChartPoint[] | null>(null);

  useEffect(() => {
    if (chartData) {
      const groups = chartData.reduce(
        (
          acc: ChartDataGroups,
          { date, clicks, impressions }: ChartPointData
        ) => {
          const momentDate: Moment = moment(date, 'DD.MM.YYYY');

          const groupDate: number =
            groupingInterval === 'week'
              ? momentDate.isoWeek()
              : momentDate.month();

          if (groupDate in acc)
            return {
              ...acc,
              [groupDate]: {
                date: acc[groupDate].date,
                clicks: acc[groupDate].clicks + clicks,
                impressions: acc[groupDate].impressions + impressions,
              },
            };

          return {
            ...acc,
            [groupDate]: {
              clicks,
              impressions,
              date:
                groupingInterval === 'week'
                  ? momentDate.weekday(7).format('D MMM YYYY')
                  : momentDate.format('MMM YYYY'),
            },
          };
        },
        {}
      );

      const groupedChartData = Object.values(groups).reduce(
        (acc: ChartPoint[], group: ChartPoint) => [...acc, group],
        []
      );

      setGroupedData(groupedChartData);
    }
  }, [chartData, groupingInterval]);

  return groupedData;
}
