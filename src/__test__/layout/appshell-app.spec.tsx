import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../../pages/_app';
import Footer from '../../components/layout/footer';

jest.mock('next/font/google', () => ({
  Roboto: () => ({ className: 'roboto-class' }),
  Poppins: () => ({ className: 'poppins-class' }),
}));

jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: any) => <>{children}</>,
}));

jest.mock('../../components/layout/Appshell', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="appshell-stub">{children}</div>,
}));

jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ children }: any) => <script>{children}</script>,
}));

describe('Layout and app wrappers', () => {
  it('renders footer component', () => {
    render(<Footer />);

    expect(screen.getByText('Footer Component')).toBeInTheDocument();
  });

  it('renders page component inside app wrapper', () => {
    render(
      <App
        Component={() => <div data-testid="page-component">Page</div>}
        pageProps={{}}
      /> as any,
    );

    expect(screen.getByTestId('appshell-stub')).toBeInTheDocument();
    expect(screen.getByTestId('page-component')).toBeInTheDocument();
  });
});