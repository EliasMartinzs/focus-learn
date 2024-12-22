"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="w-full h-svh flex flex-col bg-[#111111] text-white">
      <header className="w-full rounded-lg">
        <nav className="flex items-center justify-between h-full p-4 relative z-10">
          <Link href="/" className="text-2xl">
            Learn Focus
          </Link>
        </nav>
      </header>
      <div className="flex-1 flex items-center justify-center relative z-10">
        {children}
      </div>
      <BackgroundBeams />
    </div>
  );
}
