import csvtojson from 'csvtojson';
import { renderHook } from '@testing-library/react-hooks';
import useCSVtoJSON from '..';

jest.mock('csvtojson');

const jsonMockData = {
  someMock: 'someOtherMock',
};

const fromStringMock = jest.fn(() => Promise.resolve(jsonMockData));

describe('useCSVtoJSON()', () => {
  beforeAll(() => {
    csvtojson.mockImplementation(() => ({
      fromString: fromStringMock,
    }));
  });

  beforeEach(() => {
    fromStringMock.mockClear();
  });

  it('should pass props to "csvtojson().fromString()" module method', async () => {
    const { waitForNextUpdate } = renderHook(() =>
      useCSVtoJSON('mockedCSVtxt')
    );

    await waitForNextUpdate();

    expect(fromStringMock.mock.calls[0][0]).toBe('mockedCSVtxt');
  });

  it("shouldn't pass props if called with null", async () => {
    const { waitForNextUpdate } = renderHook(() => useCSVtoJSON(null));

    try {
      await waitForNextUpdate({ timeout: 500 });
      // eslint-disable-next-line
    } catch (e) {}

    expect(fromStringMock.mock.calls.length).toBe(0);
  });

  it('should pass new props to "csvtojson().fromString()" module method, if props changed', async () => {
    const { rerender, waitForNextUpdate } = renderHook(
      (props) => useCSVtoJSON(props),
      { initialProps: 'mockedCSVtxt' }
    );

    rerender('anotherMockedCSVtxt');

    await waitForNextUpdate();

    expect(fromStringMock.mock.calls[0][0]).toBe('mockedCSVtxt');
    expect(fromStringMock.mock.calls[1][0]).toBe('anotherMockedCSVtxt');
  });

  it('should return jsonData returned "csvtojson().fromString()" module method', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useCSVtoJSON('mockedCSVtxt')
    );

    try {
      await waitForNextUpdate({ timeout: 500 });
      // eslint-disable-next-line
    } catch (e) {}

    expect(result.current).toBe(jsonMockData);
  });

  it('should return null if called with null', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCSVtoJSON(null));

    try {
      await waitForNextUpdate({ timeout: 500 });
      // eslint-disable-next-line
    } catch (e) {}

    expect(result.current).toBe(null);
  });
});
