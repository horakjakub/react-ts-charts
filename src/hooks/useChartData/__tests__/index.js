import { renderHook } from '@testing-library/react-hooks';
import useCSVtoJSON from 'hooks/useCSVtoJSON';
import useChartData from '..';

jest.mock('hooks/useCSVtoJSON');

const mockedRawChartData = [
  {
    Campaign: 'some campaign',
    Clicks: '10',
    Date: '01.01.2019',
    Impressions: '200',
    Datasource: 'some data source',
  },
  {
    Campaign: 'some campaign 2',
    Clicks: '10',
    Date: '01.01.2019',
    Impressions: '200',
    Datasource: 'some data source 2',
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

  it('should pass props to json data hook', () => {
    renderHook(() => useChartData('mockedCSVtxt'));

    expect(spy.mock.calls[0][0]).toBe('mockedCSVtxt');
  });

  it('should return campaigns set from json data', () => {
    spy.mockReturnValue(mockedRawChartData);
    const { result } = renderHook(() => useChartData(null));

    expect(result.current.campaigns instanceof Set).toBe(true);
    expect(result.current.campaigns.has(mockedRawChartData[0].Campaign)).toBe(true);
    expect(result.current.campaigns.has(mockedRawChartData[1].Campaign)).toBe(true);
  });

  it('should return data sources set from json data', () => {
    spy.mockReturnValue(mockedRawChartData);
    const { result } = renderHook(() => useChartData(null));

    expect(result.current.dataSources instanceof Set).toBe(true);
    expect(result.current.dataSources.has(mockedRawChartData[0].Datasource)).toBe(
      true
    );
    expect(result.current.dataSources.has(mockedRawChartData[1].Datasource)).toBe(
      true
    );
  });

  it('should return mapped chart data with correct types from json data', () => {
    spy.mockReturnValue(mockedRawChartData);
    const { result } = renderHook(() => useChartData(null));

    expect(result.current.chartData.length).toBe(mockedRawChartData.length);
    expect(result.current.chartData[0].date instanceof Date).toBe(true);
    expect(typeof result.current.chartData[0].impressions === 'number').toBe(
      true
    );
    expect(typeof result.current.chartData[0].clicks === 'number').toBe(true);
  });

  it("should return null values if raw chart data doesn't contain any value", () => {
    spy.mockReturnValue([]);
    const { result } = renderHook(() => useChartData(null));

    expect(result.current).toEqual({
      campaigns: null,
      chartData: null,
      dataSources: null,
    });
  });

  it('should return null values if json data hook return null', () => {
    spy.mockReturnValue(null);
    const { result } = renderHook(() => useChartData(null));

    expect(result.current).toEqual({
      campaigns: null,
      chartData: null,
      dataSources: null,
    });
  });
});
