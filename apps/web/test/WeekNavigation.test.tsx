import { render, screen } from '@testing-library/react';
import { expect, test, vi, describe, beforeEach } from 'vitest';
import WeekNavigation from '../components/WeekNavigation';

// Mock Next.js modules
vi.mock('next/link', () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('WeekNavigation', () => {
  beforeEach(() => {
    // Mock addEventListener and removeEventListener
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    addEventListenerSpy.mockImplementation(() => {});
    removeEventListenerSpy.mockImplementation(() => {});
  });

  test('renders season and week information', () => {
    render(<WeekNavigation season={2025} week={5} />);

    expect(screen.getByText(/SEASON 2025 • WEEK 05/)).toBeInTheDocument();
  });

  test('shows previous week link when not at minimum week', () => {
    render(<WeekNavigation season={2025} week={5} />);

    const prevLink = screen.getByText('◄ WEEK 04');
    expect(prevLink.closest('a')).toHaveAttribute('href', '/2025/week/4');
  });

  test('shows next week link when not at maximum week', () => {
    render(<WeekNavigation season={2025} week={5} />);

    const nextLink = screen.getByText('WEEK 06 ►');
    expect(nextLink.closest('a')).toHaveAttribute('href', '/2025/week/6');
  });

  test('disables previous week link at minimum week', () => {
    render(<WeekNavigation season={2025} week={1} />);

    expect(screen.getByText('◄ WEEK --')).toBeInTheDocument();
    expect(screen.queryByText('◄ WEEK 00')).not.toBeInTheDocument();
  });

  test('disables next week link at maximum week', () => {
    render(<WeekNavigation season={2025} week={18} />);

    expect(screen.getByText('WEEK -- ►')).toBeInTheDocument();
    expect(screen.queryByText('WEEK 19 ►')).not.toBeInTheDocument();
  });

  test('shows navigation instructions', () => {
    render(<WeekNavigation season={2025} week={5} />);

    expect(screen.getByText('← → or H L to navigate')).toBeInTheDocument();
  });
});
