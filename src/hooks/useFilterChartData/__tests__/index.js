import { renderHook, act } from '@testing-library/react-hooks';
import mockedChartData from 'utils/mocks/chart-points.mock';
import useFilterChartData from '..';

describe('useFilterData()', () => {
  it('should return null if nothing passed', () => {
    const { result } = renderHook(() => useFilterChartData());

    expect(result.current.filteredData).toBe(null);
  });

  it('should return chart data if no filters passed', () => {
    const { result } = renderHook(() => useFilterChartData());

    act(() => {
      result.current.setChartData(mockedChartData);
    });

    expect(result.current.filteredData).toBe(mockedChartData);
  });

  it('should return chart data if passed filters are empty', () => {
    const { result } = renderHook(() => useFilterChartData());

    act(() => {
      result.current.setChartData(mockedChartData);
      result.current.setFilters({
        selectedCampaigns: [],
        selectedDataSources: [],
      });
    });

    expect(result.current.filteredData).toBe(mockedChartData);
  });

  it('should return chart data containing only selected campaigns if campaigns filter passed', () => {
    const { result } = renderHook(() => useFilterChartData());
    const randomResult = Math.ceil(Math.random() * 10);
    const campaignToFilter = mockedChartData[0].campaign;
    const secondCampaignToFilter = mockedChartData[randomResult].campaign;

    act(() => {
      result.current.setFilters({
        selectedCampaigns: [campaignToFilter, secondCampaignToFilter],
        selectedDataSources: [],
      });
      result.current.setChartData(mockedChartData);
    });

    result.current.filteredData.forEach(({ campaign }) => {
      expect(
        campaign === campaignToFilter || campaign === secondCampaignToFilter
      ).toBe(true);
    });
  });

  it('should return chart data containing only selected data sources if data sources filter passed', () => {
    const { result } = renderHook(() => useFilterChartData());
    const randomResult = Math.ceil(Math.random() * 10);
    const dataSourceToFilter = mockedChartData[0].dataSource;
    const dataSourceCampaignToFilter = mockedChartData[randomResult].dataSource;

    act(() => {
      result.current.setFilters({
        selectedCampaigns: [],
        selectedDataSources: [dataSourceToFilter, dataSourceCampaignToFilter],
      });
      result.current.setChartData(mockedChartData);
    });

    result.current.filteredData.forEach(({ dataSource }) => {
      expect(
        dataSource === dataSourceToFilter ||
          dataSource === dataSourceCampaignToFilter
      ).toBe(true);
    });
  });

  it('should return chart data containing only selected data sources AND campaigns if both filters passed', () => {
    const { result } = renderHook(() => useFilterChartData());
    const randomResult = Math.ceil(Math.random() * 10);
    const dataSourceToFilter = mockedChartData[0].dataSource;
    const dataSourceCampaignToFilter = mockedChartData[randomResult].dataSource;
    const campaignToFilter = mockedChartData[0].campaign;
    const secondCampaignToFilter = mockedChartData[randomResult].campaign;

    act(() => {
      result.current.setFilters({
        selectedCampaigns: [campaignToFilter, secondCampaignToFilter],
        selectedDataSources: [dataSourceToFilter, dataSourceCampaignToFilter],
      });
      result.current.setChartData(mockedChartData);
    });

    result.current.filteredData.forEach(({ dataSource, campaign }) => {
      expect(
        campaign === campaignToFilter || campaign === secondCampaignToFilter
      ).toBe(true);
      expect(
        dataSource === dataSourceToFilter ||
          dataSource === dataSourceCampaignToFilter
      ).toBe(true);
    });
  });
});
