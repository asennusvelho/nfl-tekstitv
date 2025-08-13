import { describe, it, expect, afterEach } from 'vitest';
import { getScoreProvider } from '../lib/data';

describe('getScoreProvider', () => {
  const ORIGINAL_DATA_SOURCE = process.env.DATA_SOURCE;
  const ORIGINAL_NEXT_PUBLIC_DATA_SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE;

  afterEach(() => {
    if (ORIGINAL_DATA_SOURCE === undefined) {
      delete process.env.DATA_SOURCE;
    } else {
      process.env.DATA_SOURCE = ORIGINAL_DATA_SOURCE;
    }
    if (ORIGINAL_NEXT_PUBLIC_DATA_SOURCE === undefined) {
      delete process.env.NEXT_PUBLIC_DATA_SOURCE;
    } else {
      process.env.NEXT_PUBLIC_DATA_SOURCE = ORIGINAL_NEXT_PUBLIC_DATA_SOURCE;
    }
  });

  it('returns mock provider when DATA_SOURCE=mock', () => {
    process.env.DATA_SOURCE = 'mock';
    const provider = getScoreProvider();
    expect(provider).toBeDefined();
    // runtime shape check
    expect(typeof provider.getGames).toBe('function');
  });

  it('returns ESPN provider when DATA_SOURCE=espn', () => {
    process.env.DATA_SOURCE = 'espn';
    const provider = getScoreProvider();
    expect(provider).toBeDefined();
    expect(typeof provider.getGames).toBe('function');
  });

  it('returns mock provider by default when no DATA_SOURCE is set', () => {
    delete process.env.DATA_SOURCE;
    delete process.env.NEXT_PUBLIC_DATA_SOURCE;
    const provider = getScoreProvider();
    expect(provider).toBeDefined();
    expect(typeof provider.getGames).toBe('function');
  });

  it('throws when unknown DATA_SOURCE is set', () => {
    process.env.DATA_SOURCE = 'unknown';
    expect(() => getScoreProvider()).toThrow(/Unknown data source: unknown/);
  });
});
