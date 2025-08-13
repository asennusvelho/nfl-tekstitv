import type { ScoreProvider } from '@nfl-tekstitv/core/ports/scoreProvider';
import { mockScoreProvider } from '@nfl-tekstitv/core/adapters/mock';
import { EspnAdapter } from '@nfl-tekstitv/core/adapters/espn';

export function getScoreProvider(): ScoreProvider {
  const dataSource = process.env.DATA_SOURCE || process.env.NEXT_PUBLIC_DATA_SOURCE || 'mock';

  switch (dataSource) {
    case 'mock':
      return mockScoreProvider;
    case 'espn':
      return new EspnAdapter();
    default:
      throw new Error(`Unknown data source: ${dataSource}. Use 'mock' or 'espn'`);
  }
}
