import { render, screen } from '@testing-library/react';
import TeletextGrid from '../components/TeletextGrid';
import type { Game } from '@core/types';

const sample: Game[] = [
  {
    id: '1',
    season: 2025,
    week: 1,
    homeTeam: 'NE',
    awayTeam: 'NYJ',
    homeScore: 10,
    awayScore: 7,
    status: 'FINAL',
  },
];

describe('TeletextGrid', () => {
  it('renders game lines', () => {
    render(<TeletextGrid games={sample} />);
    expect(screen.getByText(/NYJ 7 @ NE 10/)).toBeInTheDocument();
  });
});
