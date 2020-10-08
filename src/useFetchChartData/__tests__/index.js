import { renderHook, act } from "@testing-library/react-hooks";
import useFetchChartData from "../index";

describe("useFetchChartData()", () => {
  test("should fetch only once", () => {
    const { result } = renderHook(() => useFetchChartData());

    act(() => {});

    expect(result).toBe();
  });

  test("should fetch only given url", () => {
    const { result } = renderHook(() => useFetchChartData());

    act(() => {});

    expect(result).toBe();
  });

  test("should return response if fetch succeed", () => {
    const { result } = renderHook(() => useFetchChartData());

    act(() => {});

    expect(result).toBe();
  });

  test("should return error if fetch failed", () => {
    const { result } = renderHook(() => useFetchChartData());

    act(() => {});

    expect(result).toBe();
  });
});
