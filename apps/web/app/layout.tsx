import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body
        className="min-h-screen text-green-400 font-mono"
        style={{
          backgroundColor: '#000',
          color: '#22c55e',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}
      >
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
