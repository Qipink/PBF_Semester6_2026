import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../pages';
import AdminPage from '../../pages/admin';
import BlogPage from '../../pages/blog/[slug]';
import Custom404 from '../../pages/404';
import ProfilePage from '../../pages/profile';
import ShopPage from '../../pages/shop/[[...slug]]';
import CategoryPage from '../../pages/shop/kategori/[...slug]';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { alt, ...rest } = props;
    return <img alt={alt} {...rest} />;
  },
}));

jest.mock('next/font/google', () => ({
  Inter: () => ({ className: 'inter-class' }),
}));

const mockedUseRouter = useRouter as jest.Mock;
const mockedUseSession = useSession as jest.Mock;

describe('Basic pages', () => {
  beforeEach(() => {
    mockedUseRouter.mockReset();
    mockedUseSession.mockReset();
  });

  it('renders home page content', () => {
    render(<Home />);

    expect(screen.getByText('Praktikum Next.js Pages Router')).toBeInTheDocument();
    expect(screen.getByText('Mahasiswa D4 Pengembangan Web')).toBeInTheDocument();
  });

  it('renders admin page content', () => {
    render(<AdminPage />);

    expect(screen.getByText('Halaman Admin')).toBeInTheDocument();
  });

  it('renders profile page with session user', () => {
    mockedUseSession.mockReturnValue({
      data: {
        user: {
          fullname: 'Rifqi',
        },
      },
    });

    render(<ProfilePage />);

    expect(screen.getByText('Halaman Profile')).toBeInTheDocument();
    expect(screen.getByText('Selamat Datang Rifqi')).toBeInTheDocument();
  });

  it('renders blog page slug from router', () => {
    mockedUseRouter.mockReturnValue({ query: { slug: 'nextjs-routing' } });

    render(<BlogPage />);

    expect(screen.getByText('Ini adalah halaman blog dengan slug: nextjs-routing')).toBeInTheDocument();
  });

  it('renders shop page slug data', () => {
    mockedUseRouter.mockReturnValue({ query: { slug: ['baju', 'pria'] } });

    render(<ShopPage />);

    expect(screen.getByText('Halaman Toko')).toBeInTheDocument();
    expect(screen.getByText('Toko: baju-pria')).toBeInTheDocument();
    expect(screen.getByText('Kategori: baju')).toBeInTheDocument();
  });

  it('renders category page slug list', () => {
    mockedUseRouter.mockReturnValue({ query: { slug: ['sepatu', 'olahraga'] } });

    render(<CategoryPage />);

    expect(screen.getByText('Halaman Kategori')).toBeInTheDocument();
    expect(screen.getByText('sepatu')).toBeInTheDocument();
    expect(screen.getByText('olahraga')).toBeInTheDocument();
  });

  it('renders custom 404 page', () => {
    render(<Custom404 />);

    expect(screen.getByText('404 - Halaman Tidak Ditemukan')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /kembali ke home/i })).toHaveAttribute('href', '/');
  });
});