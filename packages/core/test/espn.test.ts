import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EspnAdapter } from '../src/adapters/espn';

// Mock ESPN API response
const mockEspnResponse = {
  events: [
    {
      id: '401772510',
      name: 'Dallas Cowboys at Philadelphia Eagles',
      shortName: 'DAL @ PHI',
      date: '2025-09-05T00:20Z',
      competitions: [
        {
          id: '401772510',
          date: '2025-09-05T00:20Z',
          competitors: [
            {
              id: '21',
              type: 'team',
              order: 0,
              homeAway: 'home',
              team: {
                id: '21',
                abbreviation: 'PHI',
                displayName: 'Philadelphia Eagles',
                shortDisplayName: 'Eagles',
                location: 'Philadelphia',
                name: 'Eagles'
              },
              score: '14'
            },
            {
              id: '6',
              type: 'team',
              order: 1,
              homeAway: 'away',
              team: {
                id: '6',
                abbreviation: 'DAL',
                displayName: 'Dallas Cowboys',
                shortDisplayName: 'Cowboys',
                location: 'Dallas',
                name: 'Cowboys'
              },
              score: '7'
            }
          ],
          status: {
            clock: 0.0,
            displayClock: '0:00',
            period: 0,
            type: {
              id: '1',
              name: 'STATUS_SCHEDULED',
              state: 'pre',
              completed: false,
              description: 'Scheduled',
              detail: 'Thu, September 4th at 8:20 PM EDT',
              shortDetail: '9/4 - 8:20 PM EDT'
            }
          }
        }
      ]
    },
    {
      id: '401772714',
      name: 'Kansas City Chiefs at Los Angeles Chargers',
      shortName: 'KC VS LAC',
      date: '2025-09-06T00:00Z',
      competitions: [
        {
          id: '401772714',
          date: '2025-09-06T00:00Z',
          competitors: [
            {
              id: '24',
              type: 'team',
              order: 0,
              homeAway: 'home',
              team: {
                id: '24',
                abbreviation: 'LAC',
                displayName: 'Los Angeles Chargers',
                shortDisplayName: 'Chargers',
                location: 'Los Angeles',
                name: 'Chargers'
              },
              score: '21'
            },
            {
              id: '12',
              type: 'team',
              order: 1,
              homeAway: 'away',
              team: {
                id: '12',
                abbreviation: 'KC',
                displayName: 'Kansas City Chiefs',
                shortDisplayName: 'Chiefs',
                location: 'Kansas City',
                name: 'Chiefs'
              },
              score: '28'
            }
          ],
          status: {
            clock: 0.0,
            displayClock: '0:00',
            period: 4,
            type: {
              id: '3',
              name: 'STATUS_FINAL',
              state: 'post',
              completed: true,
              description: 'Final',
              detail: 'Final',
              shortDetail: 'Final'
            }
          }
        }
      ]
    },
    {
      id: '401772830',
      name: 'Tampa Bay Buccaneers at Atlanta Falcons',
      shortName: 'TB @ ATL',
      date: '2025-09-07T17:00Z',
      competitions: [
        {
          id: '401772830',
          date: '2025-09-07T17:00Z',
          competitors: [
            {
              id: '1',
              type: 'team',
              order: 0,
              homeAway: 'home',
              team: {
                id: '1',
                abbreviation: 'ATL',
                displayName: 'Atlanta Falcons',
                shortDisplayName: 'Falcons',
                location: 'Atlanta',
                name: 'Falcons'
              },
              score: '17'
            },
            {
              id: '27',
              type: 'team',
              order: 1,
              homeAway: 'away',
              team: {
                id: '27',
                abbreviation: 'TB',
                displayName: 'Tampa Bay Buccaneers',
                shortDisplayName: 'Buccaneers',
                location: 'Tampa Bay',
                name: 'Buccaneers'
              },
              score: '20'
            }
          ],
          status: {
            clock: 847.0,
            displayClock: '14:07',
            period: 2,
            type: {
              id: '2',
              name: 'STATUS_IN_PROGRESS',
              state: 'in',
              completed: false,
              description: 'In Progress',
              detail: '2nd Quarter',
              shortDetail: '2nd Qtr'
            }
          }
        }
      ]
    }
  ]
};

describe('EspnAdapter', () => {
  let adapter: EspnAdapter;
  const originalFetch = global.fetch;

  beforeEach(() => {
    adapter = new EspnAdapter();
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe('getGames', () => {
    it('should fetch and transform games successfully', async () => {
      // Mock fetch
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEspnResponse)
      });

      const games = await adapter.getGames(2025, 1);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=1&seasontype=2&year=2025'
      );
      expect(games).toHaveLength(3);
    });

    it('should handle scheduled games correctly', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEspnResponse)
      });

      const games = await adapter.getGames(2025, 1);
      const scheduledGame = games[0];

      expect(scheduledGame).toEqual({
        id: '401772510',
        season: 2025,
        week: 1,
        homeTeam: 'PHI',
        awayTeam: 'DAL',
        homeScore: 14,
        awayScore: 7,
        status: 'SCHEDULED'
      });
    });

    it('should handle final games correctly', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEspnResponse)
      });

      const games = await adapter.getGames(2025, 1);
      const finalGame = games[1];

      expect(finalGame).toEqual({
        id: '401772714',
        season: 2025,
        week: 1,
        homeTeam: 'LAC',
        awayTeam: 'KC',
        homeScore: 21,
        awayScore: 28,
        status: 'FINAL'
      });
    });

    it('should handle in-progress games correctly', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEspnResponse)
      });

      const games = await adapter.getGames(2025, 1);
      const inProgressGame = games[2];

      expect(inProgressGame).toEqual({
        id: '401772830',
        season: 2025,
        week: 1,
        homeTeam: 'ATL',
        awayTeam: 'TB',
        homeScore: 17,
        awayScore: 20,
        status: 'IN_PROGRESS'
      });
    });

    it('should handle missing scores', async () => {
      const responseWithMissingScores = {
        events: [
          {
            ...mockEspnResponse.events[0],
            competitions: [
              {
                ...mockEspnResponse.events[0].competitions[0],
                competitors: [
                  {
                    ...mockEspnResponse.events[0].competitions[0].competitors[0],
                    score: ''
                  },
                  {
                    ...mockEspnResponse.events[0].competitions[0].competitors[1],
                    score: ''
                  }
                ]
              }
            ]
          }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(responseWithMissingScores)
      });

      const games = await adapter.getGames(2025, 1);
      const game = games[0];

      expect(game.homeScore).toBe(0);
      expect(game.awayScore).toBe(0);
    });

    it('should throw error on API failure', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(adapter.getGames(2025, 1)).rejects.toThrow(
        'ESPN API error: 500 Internal Server Error'
      );
    });

    it('should throw error on network failure', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(adapter.getGames(2025, 1)).rejects.toThrow(
        'Unable to fetch live game data'
      );
    });

    it('should handle missing competition data', async () => {
      const responseWithMissingCompetition = {
        events: [
          {
            ...mockEspnResponse.events[0],
            competitions: []
          }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(responseWithMissingCompetition)
      });

      await expect(adapter.getGames(2025, 1)).rejects.toThrow(
        'No competition data found for event 401772510'
      );
    });

    it('should handle missing team data', async () => {
      const responseWithMissingTeam = {
        events: [
          {
            ...mockEspnResponse.events[0],
            competitions: [
              {
                ...mockEspnResponse.events[0].competitions[0],
                competitors: [
                  {
                    ...mockEspnResponse.events[0].competitions[0].competitors[0]
                    // Missing away team
                  }
                ]
              }
            ]
          }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(responseWithMissingTeam)
      });

      await expect(adapter.getGames(2025, 1)).rejects.toThrow(
        'Missing home or away team data for event 401772510'
      );
    });
  });
});
