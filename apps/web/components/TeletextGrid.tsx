import type { Game } from '@nfl-tekstitv/core/types';

export default function TeletextGrid({ games }: { games: Game[] }) {
  return (
    <div className="font-mono text-sm">
      {/* Teletext Header */}
      <div className="text-center mb-6">
        <div className="bg-green-400 text-black px-4 py-1">
          ═══════════════════════════════════════
        </div>
        <div className="bg-green-400 text-black px-4 py-1">█ NFL SCORES & RESULTS █</div>
        <div className="bg-green-400 text-black px-4 py-1">
          ═══════════════════════════════════════
        </div>
      </div>

      {/* Games Grid */}
      <div className="space-y-2">
        {games.map((g, index) => (
          <div key={g.id} className="bg-black border-l-4 border-green-400 pl-4">
            <div className="text-cyan-400 text-xs mb-1">
              GAME {(index + 1).toString().padStart(2, '0')} • {g.status}
            </div>
            <div className="text-white text-lg tracking-wider">
              {g.awayTeam.padEnd(8)} {g.awayScore.toString().padStart(2)} @ {g.homeTeam.padEnd(8)}{' '}
              {g.homeScore.toString().padStart(2)}
            </div>
            <div className="text-green-400 text-xs">═══════════════════════════════════════</div>
          </div>
        ))}
        {games.length === 0 && (
          <div className="text-center">
            <div className="text-yellow-400 mb-2">═══════ NO GAMES ═══════</div>
            <div className="text-white opacity-60">Check back later for scores</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="text-magenta-400">
          ═══ Page updated: {new Date().toLocaleTimeString('en-GB')} ═══
        </div>
      </div>
    </div>
  );
}
