import { renderHook, act } from '@testing-library/react-hooks';
import mockedChartData from 'utils/mocks/chart-points.mock';
import useGroupInTimeChartData from '..';

function getAllImpressionsOrClicks(chartData, impressionsOrClicks) {
  return chartData.reduce(
    (acc, { impressions, clicks }) =>
      impressionsOrClicks === 'clicks' ? clicks + acc : impressions + acc,
    0
  );
}

function generateRandomMockedChartDataWithChangedData(chardDatal, newDate) {
  return mockedChartData
    .slice(0, 20 + Math.ceil(Math.random() * 10))
    .map((chartData) => ({
      ...chartData,
      date: newDate,
    }));
}

describe('useGroupInTimeChartData()', () => {
  it('should return null if called with null', () => {
    const { result } = renderHook(() => useGroupInTimeChartData('week'));

    act(() => {
      result.current.setChartData(null);
    });

    expect(result.current.groupedData).toBe(null);
  });

  it('should return sums of clicks and impressions grouped in one object if called with chart data only from one week', () => {
    const { result } = renderHook(() => useGroupInTimeChartData('week'));

    act(() => {
      result.current.setChartData(mockedChartData);
    });

    const allImpressions = getAllImpressionsOrClicks(
      mockedChartData,
      'impressions'
    );
    const allClicks = getAllImpressionsOrClicks(mockedChartData, 'clicks');

    expect(result.current.groupedData[0].impressions).toBe(allImpressions);
    expect(result.current.groupedData[0].clicks).toBe(allClicks);
    expect(result.current.groupedData[1]).toBe(undefined);
  });

  it('should return sums of clicks and impressions grouped in one object by week if called with chart data from different weeks', () => {
    const mockedChartDataFromSecondWeek = generateRandomMockedChartDataWithChangedData(
      mockedChartData,
      '08.01.2019'
    );

    const { result } = renderHook(() => useGroupInTimeChartData('week'));

    act(() => {
      result.current.setChartData([
        ...mockedChartData,
        ...mockedChartDataFromSecondWeek,
      ]);
    });
    const allImpressions = getAllImpressionsOrClicks(
      mockedChartData,
      'impressions'
    );
    const allClicks = getAllImpressionsOrClicks(mockedChartData, 'clicks');

    const allImpressionsFromSecondWeek = getAllImpressionsOrClicks(
      mockedChartDataFromSecondWeek,
      'impressions'
    );

    const allClicksFromSecondWeek = getAllImpressionsOrClicks(
      mockedChartDataFromSecondWeek,
      'clicks'
    );

    expect(result.current.groupedData[0].impressions).toBe(allImpressions);
    expect(result.current.groupedData[0].clicks).toBe(allClicks);
    expect(result.current.groupedData[1].impressions).toBe(
      allImpressionsFromSecondWeek
    );
    expect(result.current.groupedData[1].clicks).toBe(allClicksFromSecondWeek);
  });
});
