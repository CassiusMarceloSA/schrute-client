"use client";

import { Board } from "@/components";


export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <Board />
    </div>
  );
}
