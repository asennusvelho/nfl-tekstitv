import TeletextGrid from '../../../../components/TeletextGrid';
import WeekNavigation from '../../../../components/WeekNavigation';
import { getScoreProvider } from '../../../../lib/data';

export default async function WeekPage({ params }: { params: { season: string; week: string } }) {
  const season = Number(params.season);
  const week = Number(params.week);
  const scoreProvider = getScoreProvider();
  const games = await scoreProvider.getGames(season, week);

  return (
    <div>
      <WeekNavigation season={season} week={week} />
      <TeletextGrid games={games} season={season} week={week} />
    </div>
  );
}
