'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface WeekNavigationProps {
  season: number;
  week: number;
}

const MIN_WEEK = 1;
const MAX_WEEK = 18; // Regular season weeks

export default function WeekNavigation({ season, week }: WeekNavigationProps) {
  const router = useRouter();

  const prevWeek = week > MIN_WEEK ? week - 1 : null;
  const nextWeek = week < MAX_WEEK ? week + 1 : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      switch (event.key) {
        case 'ArrowLeft':
        case 'h':
          if (prevWeek) {
            event.preventDefault();
            router.push(`/${season}/week/${prevWeek}`);
          }
          break;
        case 'ArrowRight':
        case 'l':
          if (nextWeek) {
            event.preventDefault();
            router.push(`/${season}/week/${nextWeek}`);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [season, week, prevWeek, nextWeek, router]);

  return (
    <div className="font-mono text-sm mb-6">
      {/* Navigation Header */}
      <div className="text-center mb-4">
        <div className="bg-cyan-400 text-black px-4 py-1">
          ═══════════════════════════════════════
        </div>
        <div className="bg-cyan-400 text-black px-4 py-1">
          █ SEASON {season} • WEEK {week.toString().padStart(2, '0')} █
        </div>
        <div className="bg-cyan-400 text-black px-4 py-1">
          ═══════════════════════════════════════
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          {prevWeek ? (
            <Link
              href={`/${season}/week/${prevWeek}`}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 border-2 border-cyan-400 transition-colors"
            >
              ◄ WEEK {prevWeek.toString().padStart(2, '0')}
            </Link>
          ) : (
            <div className="bg-gray-800 text-gray-500 px-4 py-2 border-2 border-gray-600">
              ◄ WEEK --
            </div>
          )}
        </div>

        <div className="flex-1 text-center">
          <div className="text-yellow-400 text-xs">← → or H L to navigate</div>
        </div>

        <div className="flex-1 text-right">
          {nextWeek ? (
            <Link
              href={`/${season}/week/${nextWeek}`}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 border-2 border-cyan-400 transition-colors"
            >
              WEEK {nextWeek.toString().padStart(2, '0')} ►
            </Link>
          ) : (
            <div className="bg-gray-800 text-gray-500 px-4 py-2 border-2 border-gray-600">
              WEEK -- ►
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
