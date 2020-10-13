import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { ChartPoint } from 'hooks/useChartData';
import moment, { Moment } from 'moment';

export type GroupingInterval = 'week' | 'month';

export type BasicChartPoint = Pick<
ChartPoint,
'clicks' | 'impressions' | 'date'
>;

interface ChartDataGroups {
  [key: number]: BasicChartPoint;
}

export default function useGroupChartData(
  groupingInterval: GroupingInterval
): {
    groupedData: BasicChartPoint[] | null;
    setChartData: Dispatch<SetStateAction<ChartPoint[] | null>>;
  } {
  const [groupedData, setGroupedData] = useState<BasicChartPoint[] | null>(
    null
  );
  const [chartData, setChartData] = useState<ChartPoint[] | null>(null);

  useEffect(() => {
    if (chartData) {
      const groups = chartData.reduce(
        (acc: ChartDataGroups, { date, clicks, impressions }: ChartPoint) => {
          const momentDate: Moment = moment(date, 'DD.MM.YYYY');

          const groupDate =
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
        (acc: BasicChartPoint[], group: BasicChartPoint) => [...acc, group],
        []
      );

      setGroupedData(groupedChartData);
    } else {
      setGroupedData(null);
    }
  }, [chartData, groupingInterval]);

  return {
    groupedData,
    setChartData,
  };
}
