import type { Game, GameStatus } from '../types.js';
import type { ScoreProvider } from '../ports/scoreProvider.js';

interface ESPNApiResponse {
  events: ESPNEvent[];
}

interface ESPNEvent {
  id: string;
  name: string;
  shortName: string;
  date: string;
  competitions: ESPNCompetition[];
}

interface ESPNCompetition {
  id: string;
  date: string;
  competitors: ESPNCompetitor[];
  status: ESPNStatus;
}

interface ESPNCompetitor {
  id: string;
  type: string;
  order: number;
  homeAway: 'home' | 'away';
  team: ESPNTeam;
  score: string;
}

interface ESPNTeam {
  id: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  location: string;
  name: string;
}

interface ESPNStatus {
  clock: number;
  displayClock: string;
  period: number;
  type: ESPNStatusType;
}

interface ESPNStatusType {
  id: string;
  name: string;
  state: 'pre' | 'in' | 'post';
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
}

export class EspnAdapter implements ScoreProvider {
  private readonly baseUrl = 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

  async getGames(season: number, week: number): Promise<Game[]> {
    try {
      const url = `${this.baseUrl}?week=${week}&seasontype=2&year=${season}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`ESPN API error: ${response.status} ${response.statusText}`);
      }

      const data: ESPNApiResponse = await response.json();
      return this.transformGames(data.events, season, week);
    } catch (error) {
      // Re-throw errors that are already formatted (API errors, data validation errors)
      if (
        error instanceof Error &&
        (error.message.startsWith('ESPN API error:') ||
          error.message.includes('competition data found') ||
          error.message.includes('home or away team data'))
      ) {
        throw error;
      }

      // For other errors (network errors, etc.), wrap with generic message
      console.error('Failed to fetch games from ESPN API:', error);
      throw new Error('Unable to fetch live game data');
    }
  }

  private transformGames(events: ESPNEvent[], season: number, week: number): Game[] {
    return events.map((event) => this.transformGame(event, season, week));
  }

  private transformGame(event: ESPNEvent, season: number, week: number): Game {
    const competition = event.competitions[0];
    if (!competition) {
      throw new Error(`No competition data found for event ${event.id}`);
    }

    // Find home and away teams
    const homeTeam = competition.competitors.find((c) => c.homeAway === 'home');
    const awayTeam = competition.competitors.find((c) => c.homeAway === 'away');

    if (!homeTeam || !awayTeam) {
      throw new Error(`Missing home or away team data for event ${event.id}`);
    }

    return {
      id: event.id,
      season,
      week,
      homeTeam: homeTeam.team.abbreviation,
      awayTeam: awayTeam.team.abbreviation,
      homeScore: parseInt(homeTeam.score) || 0,
      awayScore: parseInt(awayTeam.score) || 0,
      status: this.mapStatus(competition.status),
    };
  }

  private mapStatus(status: ESPNStatus): Game['status'] {
    switch (status.type.state) {
      case 'pre':
        return 'SCHEDULED';
      case 'in':
        return 'IN_PROGRESS';
      case 'post':
        return 'FINAL';
      default:
        return 'SCHEDULED';
    }
  }
}
