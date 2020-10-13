import { renderHook, act } from '@testing-library/react-hooks';
import useCSVtoJSON from 'hooks/useCSVtoJSON';
import mockedRawChartData from 'utils/mocks/raw-chart-points.mock';
import useChartData from '..';

jest.mock('hooks/useCSVtoJSON');

describe('useChartData()', () => {
  const doJSONDataSpy = jest.fn();

  beforeAll(() => {
    useCSVtoJSON.mockImplementation(() => ({
      doJSONData: doJSONDataSpy,
      JSONData: mockedRawChartData,
    }));
  });

  beforeEach(() => {
    doJSONDataSpy.mockClear();
  });

  it('should pass CSV text to JSON hook', () => {
    const { result } = renderHook(() => useChartData());

    act(() => {
      result.current.doConvertToChartData('mockedCSVtxt');
    });

    expect(doJSONDataSpy.mock.calls[0][0]).toBe('mockedCSVtxt');
  });

  it('should return campaigns set from data taken from JSON hook', () => {
    const { result } = renderHook(() => useChartData());

    act(() => {
      result.current.doConvertToChartData(null);
    });

    expect(result.current.campaigns instanceof Set).toBe(true);
    expect(result.current.campaigns.has(mockedRawChartData[0].Campaign)).toBe(
      true
    );
    expect(result.current.campaigns.has(mockedRawChartData[1].Campaign)).toBe(
      true
    );
  });

  it('should return data sources set from data taken from JSON hook', () => {
    const { result } = renderHook(() => useChartData());

    act(() => {
      result.current.doConvertToChartData(null);
    });

    expect(result.current.dataSources instanceof Set).toBe(true);
    expect(
      result.current.dataSources.has(mockedRawChartData[0].Datasource)
    ).toBe(true);
    expect(
      result.current.dataSources.has(mockedRawChartData[1].Datasource)
    ).toBe(true);
  });

  it('should return mapped chart data with correct types taken from data taken from JSON hook', () => {
    const { result } = renderHook(() => useChartData());

    act(() => {
      result.current.doConvertToChartData(null);
    });

    expect(result.current.chartData.length).toBe(mockedRawChartData.length);
    expect(typeof result.current.chartData[0].impressions === 'number').toBe(
      true
    );
    expect(typeof result.current.chartData[0].clicks === 'number').toBe(true);
  });

  it("should return null values if raw chart data doesn't contain any value", () => {
    useCSVtoJSON.mockImplementation(() => ({
      JSONData: [],
      doJSONData: doJSONDataSpy,
    }));

    const { result } = renderHook(() => useChartData());

    act(() => {
      result.current.doConvertToChartData(null);
    });

    expect(result.current).toEqual({
      campaigns: null,
      chartData: null,
      dataSources: null,
      doConvertToChartData: doJSONDataSpy 
    });
  });

  it('should return null values if JSON hook returns null', () => {
    useCSVtoJSON.mockImplementation(() => ({
      JSONData: null,
      doJSONData: doJSONDataSpy,
    }));

    const { result } = renderHook(() => useChartData());

    act(() => {
      result.current.doConvertToChartData(null);
    });

    expect(result.current).toEqual({
      campaigns: null,
      chartData: null,
      dataSources: null,
      doConvertToChartData: doJSONDataSpy 
    });
  });
});
