import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { ChartPoint } from 'hooks/useChartData';
import moment, { Moment } from 'moment';

export type GroupingInterval = 'week' | 'month';

export type BasicChartPoint = Pick<
ChartPoint,
'clicks' | 'impressions' | 'date'
> & { order: number };

export default function useGroupInTimeData(
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
        (acc: BasicChartPoint[], { date, clicks, impressions }: ChartPoint) => {
          const momentDate: Moment = moment(date, 'DD.MM.YYYY');

          const groupDate =
            groupingInterval === 'week'
              ? momentDate.isoWeek()
              : momentDate.month();

          let entryForThisDate: BasicChartPoint | undefined;
          const restOfEntries = acc.filter((point) => {
            const { order } = point;

            if (order === groupDate) {
              entryForThisDate = point;
              return false;
            }
            return true;
          });

          if (entryForThisDate) {
            return [
              ...restOfEntries,
              {
                ...entryForThisDate,
                clicks: entryForThisDate.clicks + clicks,
                impressions: entryForThisDate.impressions + impressions,
              },
            ];
          }
          return [
            ...acc,
            {
              clicks,
              impressions,
              date:
                groupingInterval === 'week'
                  ? momentDate.weekday(7).format('D MMM YYYY')
                  : momentDate.format('MMM YYYY'),
              order: groupDate,
            },
          ];
        },
        []
      );
      setGroupedData(groups);
    } else {
      setGroupedData(null);
    }
  }, [chartData, groupingInterval]);

  return {
    groupedData,
    setChartData,
  };
}
