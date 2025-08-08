import type { ScoreProvider } from '@nfl-tekstitv/core/ports/scoreProvider';
import { mockScoreProvider } from '@nfl-tekstitv/core/adapters/mock';

export function getScoreProvider(): ScoreProvider {
  if (process.env.DATA_SOURCE === 'mock') {
    return mockScoreProvider;
  }
  throw new Error('No data source configured. Set DATA_SOURCE=mock');
}
