const calc = require('./calc');

jest.mock('body-parser');

test('calc', async () => {
  const req = {
    body: {
      ipAddress: '127.0.0.1',
      subnetmask: '255.255.255.0',
    },
  };

  const setHeader = jest.fn();
  const end = jest.fn();
  const res = {
    setHeader,
    end
  }

  await calc(req, res);

  expect(setHeader.mock.calls).toHaveLength(1);
  expect(setHeader.mock.calls[0][0]).toBe('Content-type');
  expect(setHeader.mock.calls[0][1]).toBe('application/json; charset=utf-8');

  expect(end.mock.calls).toHaveLength(1);
  const expected = {
    ok: expect.any(Boolean),
    payload: {
      networkAddress: Array.from(Array(4)).map(() => expect.any(Number)),
      broadcastAddress: Array.from(Array(4)).map(() => expect.any(Number)),
      hostAddressRange: [
        Array.from(Array(4)).map(() => expect.any(Number)),
        Array.from(Array(4)).map(() => expect.any(Number))
      ]
    }
  };
  const resData = JSON.parse(end.mock.calls[0][0]);
  expect(resData).toMatchObject(expected);
});