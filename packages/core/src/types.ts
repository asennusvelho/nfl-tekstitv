export type GameStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'FINAL';

export interface Game {
  id: string;
  season: number;
  week: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: GameStatus;
}
