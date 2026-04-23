import fetcher from '../../utils/swr/fetcher';

describe('fetcher utility', () => {
  it('returns json response from fetch', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ ok: true }),
    });
    global.fetch = fetchMock as any;

    await expect(fetcher('/api/test')).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith('/api/test');
  });
});