import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductPage from '../../pages/product';
import ProductServerPage, { getServerSideProps } from '../../pages/product/server';
import ProductStaticPage, { getStaticProps as getProductStaticProps } from '../../pages/product/static';
import ProductDetailPage, { getStaticPaths, getStaticProps as getProductDetailStaticProps } from '../../pages/product/[id]';
import { useRouter } from 'next/router';
import useSWR from 'swr';

jest.mock('../../views/produk', () => ({
  __esModule: true,
  default: ({ products }: any) => <div data-testid="produk-view">{JSON.stringify(products)}</div>,
}));

jest.mock('../../views/DetailProduct', () => ({
  __esModule: true,
  default: ({ products }: any) => <div data-testid="detail-produk-view">{JSON.stringify(products)}</div>,
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.Mock;
const mockedUseSWR = useSWR as jest.Mock;

describe('Product pages', () => {
  beforeEach(() => {
    mockedUseRouter.mockReturnValue({ push: jest.fn() });
    mockedUseSWR.mockReturnValue({
      data: { data: [{ id: '1', name: 'Produk A' }] },
      isLoading: false,
      error: undefined,
    });
  });

  it('renders product index page', () => {
    render(<ProductPage />);

    expect(screen.getByTestId('produk-view')).toHaveTextContent('Produk A');
  });

  it('renders product server page', () => {
    render(<ProductServerPage products={[{ id: '1', name: 'Produk A' } as any]} />);

    expect(screen.getByText('Halaman Produk Server')).toBeInTheDocument();
    expect(screen.getByTestId('produk-view')).toBeInTheDocument();
  });

  it('returns static props for product static page', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: [{ id: '2', name: 'Produk B' }] }),
    });
    global.fetch = fetchMock as any;

    const result = await getProductStaticProps();

    expect(fetchMock).toHaveBeenCalledWith('http://127.0.0.1:3000/api/produk');
    expect(result).toEqual({
      props: { products: [{ id: '2', name: 'Produk B' }] },
      revalidate: 10,
    });
  });

  it('returns server side props for product server page', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: [{ id: '3', name: 'Produk C' }] }),
    });
    global.fetch = fetchMock as any;

    const result = await getServerSideProps();

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/produk');
    expect(result).toEqual({
      props: { products: [{ id: '3', name: 'Produk C' }] },
    });
  });

  it('renders product detail page', () => {
    render(<ProductDetailPage product={{ id: '10', name: 'Produk Detail' } as any} />);

    expect(screen.getByTestId('detail-produk-view')).toBeInTheDocument();
  });

  it('returns static paths for product detail page', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: [{ id: '10' }, { id: '11' }] }),
    });
    global.fetch = fetchMock as any;

    const result = await getStaticPaths();

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/produk');
    expect(result).toEqual({
      paths: [{ params: { id: '10' } }, { params: { id: '11' } }],
      fallback: false,
    });
  });

  it('returns static props for product detail page', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: [{ id: '20', name: 'Produk Static' }] }),
    });
    global.fetch = fetchMock as any;

    const result = await getProductDetailStaticProps({ params: { id: '20' } } as any);

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/produk/20');
    expect(result).toEqual({
      props: { product: [{ id: '20', name: 'Produk Static' }] },
    });
  });
});