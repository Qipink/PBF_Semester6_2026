import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from '../../../components/layout/navbar';
import { signIn, signOut, useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { alt, ...rest } = props;
    return <img alt={alt} {...rest} />;
  },
}));

const mockedUseSession = useSession as jest.Mock;
const mockedSignIn = signIn as jest.Mock;
const mockedSignOut = signOut as jest.Mock;

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders navbar correctly when user is not logged in', () => {
    mockedUseSession.mockReturnValue({ data: null });

    const view = render(<Navbar />);

    expect(screen.getByTestId('navbar-brand').textContent).toBe('MyApp');
    expect(view.asFragment()).toMatchSnapshot();
  });

  it('calls signIn when sign in button is clicked', () => {
    mockedUseSession.mockReturnValue({ data: null });

    render(<Navbar />);

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockedSignIn).toHaveBeenCalledTimes(1);
  });

  it('renders user info and calls signOut when user is logged in', () => {
    mockedUseSession.mockReturnValue({
      data: {
        user: {
          fullname: 'Rifqi',
          image: 'https://example.com/avatar.jpg',
        },
      },
    });

    render(<Navbar />);

    expect(screen.getByText(/welcome, rifqi/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));

    expect(mockedSignOut).toHaveBeenCalledTimes(1);
  });
});
