import { describe, it, expect } from 'vitest';
import { mockScoreProvider } from '../src/adapters/mock';

describe('mockScoreProvider', () => {
  it('reads fixture and returns games', async () => {
    const games = await mockScoreProvider.getGames(2025, 1);
    expect(games.length).toBeGreaterThan(0);
  });

  it('returns empty array when fixture missing', async () => {
    const games = await mockScoreProvider.getGames(1900, 99);
    expect(games).toEqual([]);
  });
});
