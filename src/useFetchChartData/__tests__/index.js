import { renderHook } from "@testing-library/react-hooks";
import useFetchChartData, { DATA_URL } from "../index";

const mockedData = {
  data: "somethingReallyWorthToPlaceItOnChart",
};

const errorMock = Error("someMessage");

const fetchSuccessMock = () =>
  Promise.resolve({
    json: () => Promise.resolve(mockedData),
  });

const fetchErrorMock = () => Promise.reject(fetchErrorMock);

describe("useFetchChartData()", () => {
  let responseMock;
  let spy;

  beforeEach(() => {
    responseMock = {
      response: null,
      error: null,
      isLoading: false,
    };

    spy = jest.fn(fetchSuccessMock);
    global.fetch = spy;
  });

  test("should fetch only given url", () => {
    renderHook(() => useFetchChartData());
    expect(spy.mock.calls[0]).toBe(DATA_URL);
  });

  test("should fetch only once", () => {
    const { rerender } = renderHook(() => useFetchChartData());
    rerender();
    expect(spy.mock.calls.length).toBe(1);
  });

  test("should return result with response if fetch succeed", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchChartData());
    await waitForNextUpdate();

    expect(result.response).toEqual(mockedData);
  });

  test("should return  with response if fetch succeed", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchChartData());

    expect(result.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.isLoading).toBe(false);
  });

  test("should return result with error if fetch failed", async () => {
    global.fetch = jest.fn(fetchErrorMock);
    const { result, waitForNextUpdate } = renderHook(() => useFetchChartData());

    await waitForNextUpdate();

    expect(result.error).toEqual(errorMock);
  });
});
