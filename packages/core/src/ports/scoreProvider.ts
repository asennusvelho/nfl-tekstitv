import type { Game } from '../types';

export interface ScoreProvider {
  getGames(season: number, week: number): Promise<Game[]>;
}
