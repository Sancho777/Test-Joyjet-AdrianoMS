'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white shadow">
      {/* Left: App Name */}
      <Link href="/" className="text-2xl font-bold hover:underline">
        Joyjet Quiz
      </Link>

      {/* Right: Navigation Links */}
      <div className="space-x-6">
        <Link
          href="/create"
          className="relative z-50 hover:underline hover:text-gray-300 transition"
        >
          Create
        </Link>
        <Link
          href="/"
          className="hover:underline hover:text-gray-300 transition"
        >
          Play
        </Link>
      </div>
    </nav>
  );
}
