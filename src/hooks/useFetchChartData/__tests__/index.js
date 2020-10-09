import { renderHook } from '@testing-library/react-hooks';
import useFetchChartData, { DATA_URL } from '../index';

const getFetchTextResponseMock = (response) =>
  Promise.resolve({
    text: () => Promise.resolve(response),
  });

const mockedData = {
  data: 'somethingReallyWorthToPlaceItOnChart',
};

const mockedError = {
  message: 'somethingGoneWrong',
};

const fetchSuccessMock = () => getFetchTextResponseMock(mockedData);

const fetchErrorMock = async () => {
  return Promise.reject(mockedError);
};

describe('useFetchChartData()', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'));
  beforeEach(() => {
    window.fetch.mockImplementation(fetchSuccessMock);
    window.fetch.mockClear();
  });

  test('should fetch only with given url', async () => {
    const { waitForNextUpdate } = renderHook(() => useFetchChartData());

    await waitForNextUpdate();

    expect(window.fetch.mock.calls[0][0]).toBe(DATA_URL);
  });

  test('should fetch only once', async () => {
    const { rerender, waitForNextUpdate } = renderHook(() =>
      useFetchChartData()
    );

    rerender();
    await waitForNextUpdate();

    expect(window.fetch.mock.calls.length).toBe(1);
  });

  test('should return result with response if fetch succeed', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchChartData());

    await waitForNextUpdate();

    expect(result.current.response).toEqual(mockedData);
  });

  test('should mark isLoading when fetch is in progress', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchChartData());

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });

  test('should return result with error if fetch failed', async () => {
    window.fetch.mockImplementation(fetchErrorMock);
    const { result, waitForNextUpdate } = renderHook(() => useFetchChartData());

    await waitForNextUpdate();

    expect(result.current.error).toEqual(mockedError);
  });
});
