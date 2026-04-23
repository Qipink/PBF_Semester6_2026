import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../pages/auth/login';
import RegisterPage from '../../pages/auth/register';

jest.mock('../../views/auth/login', () => ({
  __esModule: true,
  default: () => <div data-testid="login-view">Login View</div>,
}));

jest.mock('../../views/auth/register', () => ({
  __esModule: true,
  default: () => <div data-testid="register-view">Register View</div>,
}));

describe('Auth pages', () => {
  it('renders login wrapper page', () => {
    render(<LoginPage />);

    expect(screen.getByTestId('login-view')).toBeInTheDocument();
  });

  it('renders register wrapper page', () => {
    render(<RegisterPage />);

    expect(screen.getByTestId('register-view')).toBeInTheDocument();
  });
});