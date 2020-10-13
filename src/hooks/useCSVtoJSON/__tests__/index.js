import csvtojson from 'csvtojson';
import { renderHook, act } from '@testing-library/react-hooks';
import useCSVtoJSON from '..';

jest.mock('csvtojson');

const mockedJsonData = {
  someMock: 'someOtherMock',
};

const mockedCSVtxt = 'some;csv;table;';

const fromStringMock = jest.fn(() => Promise.resolve(mockedJsonData));

describe('useCSVtoJSON()', () => {
  beforeAll(() => {
    csvtojson.mockImplementation(() => ({
      fromString: fromStringMock,
    }));
  });

  beforeEach(() => {
    fromStringMock.mockClear();
  });

  it('should pass CSV text to "csv to json" library module conversion method', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCSVtoJSON());

    act(() => {
      result.current.doJSONData(mockedCSVtxt);
    });

    await waitForNextUpdate();

    expect(fromStringMock.mock.calls[0][0]).toBe(mockedCSVtxt);
  });

  it("shouldn't pass anything if called with null", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCSVtoJSON());

    act(() => {
      result.current.doJSONData(null);
    });

    try {
      await waitForNextUpdate({ timeout: 100 });
      // eslint-disable-next-line
    } catch (e) {}

    expect(fromStringMock.mock.calls.length).toBe(0);
  });

  it('should pass new CSV text to "csv to json" library module conversion method, if props changed', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCSVtoJSON());

    act(() => {
      result.current.doJSONData(mockedCSVtxt);
    });

    act(() => {
      result.current.doJSONData('anotherMockedCSVtxt');
    });

    await waitForNextUpdate();

    expect(fromStringMock.mock.calls[0][0]).toBe(mockedCSVtxt);
    expect(fromStringMock.mock.calls[1][0]).toBe('anotherMockedCSVtxt');
  });

  it('should return json data returned from "csv to json" library', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCSVtoJSON());

    act(() => {
      result.current.doJSONData(mockedCSVtxt);
    });

    try {
      await waitForNextUpdate({ timeout: 100 });
      // eslint-disable-next-line
    } catch (e) {}

    expect(result.current.JSONData).toBe(mockedJsonData);
  });

  it('should return null if called with null', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCSVtoJSON());

    act(() => {
      result.current.doJSONData(null);
    });

    try {
      await waitForNextUpdate({ timeout: 100 });
      // eslint-disable-next-line
    } catch (e) {}

    expect(result.current.JSONData).toBe(null);
  });
});
