import { render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Header from '../Header';
import { vi } from 'vitest';

// Mock `useNavigate` and `useLocation`
vi.mock('react-router-dom', async () => {
  const actual = await import('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

describe('Header Component', () => {
  test('renders the logo and title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText(/Reddit Clone/i)).toBeInTheDocument();
  });

  test('navigates to home when clicked if not already on home', async () => {
    const navigateMock = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);
    vi.mocked(useLocation).mockReturnValue({ pathname: '/not-home' }); // Simulate not being on home

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const header = screen.getByText(/Reddit Clone/i);
    await userEvent.click(header);

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  test('reloads page when clicked on home', async () => {
    const reloadMock = vi.fn();
    vi.mocked(useLocation).mockReturnValue({ pathname: '/' }); // Simulate being on home

    // Mock `window.location.reload` safely
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadMock },
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const header = screen.getByText(/Reddit Clone/i);
    await userEvent.click(header);

    expect(reloadMock).toHaveBeenCalled();
  });
});
