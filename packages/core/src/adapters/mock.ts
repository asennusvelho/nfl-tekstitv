import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import type { Game } from '../types';
import type { ScoreProvider } from '../ports/scoreProvider';

async function readFixture(season: number, week: number): Promise<Game[]> {
  const fileName = `${season}-week-${String(week).padStart(2, '0')}.json`;
  const candidates = [
    // When running dev server from apps/web
    path.resolve(process.cwd(), '..', '..', 'packages', 'core', 'fixtures', fileName),
    // When running from repo root or app workspace
    path.resolve(process.cwd(), 'packages/core/fixtures', fileName),
    // When running tests inside packages/core
    path.resolve(process.cwd(), 'fixtures', fileName),
  ];

  for (const file of candidates) {
    if (existsSync(file)) {
      const json = await readFile(file, 'utf8');
      return JSON.parse(json) as Game[];
    }
  }
  throw new Error('Fixture not found');
}

export const mockScoreProvider: ScoreProvider = {
  async getGames(season, week) {
    try {
      return await readFixture(season, week);
    } catch (e) {
      // Return empty on missing fixture
      return [];
    }
  },
};
