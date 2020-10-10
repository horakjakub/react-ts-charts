import { renderHook } from '@testing-library/react-hooks';
import useCSVtoJSON from 'hooks/useCSVtoJSON';
import useChartData from '..';

jest.mock('hooks/useCSVtoJSON');

const mockedRawData = [
  {
    Campaign: 'some campaign',
    Clicks: '10',
    Date: '01.01.2019',
    Impressions: '200',
    Datasource: 'some data source',
  },
];

describe('useChartData()', () => {
  const spy = jest.fn();

  beforeAll(() => {
    useCSVtoJSON.mockImplementation(spy);
  });

  beforeEach(() => {
    spy.mockClear();
  });

  it('should pass props to useCSVtoJSON() hook', () => {
    renderHook(() => useChartData('mockedCSVtxt'));

    expect(spy.mock.calls[0][0]).toBe('mockedCSVtxt');
  });

  it('should return campaigns Set taken from json data', () => {
    spy.mockReturnValue(mockedRawData);
    const { result } = renderHook(() => useChartData(null));

    expect(result.current.campaigns instanceof Set).toBe(true);
    expect(result.current.campaigns.has(mockedRawData[0].Campaign)).toBe(true);
  });

  it('should return dataSources Set taken from json data', () => {
    spy.mockReturnValue(mockedRawData);
    const { result } = renderHook(() => useChartData(null));

    expect(result.current.dataSources instanceof Set).toBe(true);
    expect(result.current.dataSources.has(mockedRawData[0].Datasource)).toBe(
      true
    );
  });

  it('should return mapped chart data with correct types from json data', () => {
    spy.mockReturnValue(mockedRawData);
    const { result } = renderHook(() => useChartData(null));

    expect(result.current.chartData.length).toBe(mockedRawData.length);
    // expect(result.current.chartData[0].date instanceof Date).toBe(true);
    expect(typeof result.current.chartData[0].impressions === 'number').toBe(
      true
    );
    expect(typeof result.current.chartData[0].clicks === 'number').toBe(true);
  });

  it("should return null values if chartData doesn't contain any point", () => {
    spy.mockReturnValue([]);
    const { result } = renderHook(() => useChartData(null));

    expect(result.current).toEqual({
      campaigns: null,
      chartData: null,
      dataSources: null,
    });
  });

  it('should return null values if jsonData hook return null', () => {
    spy.mockReturnValue(null);
    const { result } = renderHook(() => useChartData(null));

    expect(result.current).toEqual({
      campaigns: null,
      chartData: null,
      dataSources: null,
    });
  });
});
