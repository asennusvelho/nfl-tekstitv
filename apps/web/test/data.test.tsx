import { describe, it, expect, afterEach } from 'vitest';
import { getScoreProvider } from '../lib/data';

describe('getScoreProvider', () => {
  const ORIGINAL = process.env.DATA_SOURCE;
  afterEach(() => {
    if (ORIGINAL === undefined) {
      delete process.env.DATA_SOURCE;
    } else {
      process.env.DATA_SOURCE = ORIGINAL;
    }
  });

  it('returns mock provider when DATA_SOURCE=mock', () => {
    process.env.DATA_SOURCE = 'mock';
    const provider = getScoreProvider();
    expect(provider).toBeDefined();
    // runtime shape check
    expect(typeof provider.getGames).toBe('function');
  });

  it('throws when DATA_SOURCE not set', () => {
    delete process.env.DATA_SOURCE;
    expect(() => getScoreProvider()).toThrow(/DATA_SOURCE=mock/);
  });
});
