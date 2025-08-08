import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 text-sm leading-tight">
      <div className="max-w-5xl mx-auto">
        {/* Teletext Header */}
        <div className="text-center mb-6">
          <div className="bg-green-400 text-black px-4 py-1">
            ═══════════════════════════════════════
          </div>
          <div className="bg-green-400 text-black px-4 py-1">█ NFL TEKSTI-TV PAGE 100 █</div>
          <div className="bg-green-400 text-black px-4 py-1">
            ═══════════════════════════════════════
          </div>
        </div>

        {/* Main Menu */}
        <div className="mb-8">
          <div>
            <h1 className="text-xl font-semibold mb-4">NFL TekstiTV</h1>
            <ul className="list-disc ml-5">
              <li>
                <Link href="/2025/week/1" className="underline">
                  Season 2025 - Week 1
                </Link>
              </li>
              <li>
                <Link href="/2025/week/2" className="underline">
                  Season 2025 - Week 2
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-sm text-gray-500">
              Go directly to /{`{season}`}/week/{`{week}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
