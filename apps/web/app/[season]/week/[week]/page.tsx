import TeletextGrid from '../../../../components/TeletextGrid';
import { getScoreProvider } from '../../../../lib/data';

export default async function WeekPage({ params }: { params: { season: string; week: string } }) {
  const season = Number(params.season);
  const week = Number(params.week);
  const scoreProvider = getScoreProvider();
  const games = await scoreProvider.getGames(season, week);

  return (
    <div>
      <h1 className="mb-4">
        Season {season} — Week {week}
      </h1>
      <TeletextGrid games={games} />
    </div>
  );
}
