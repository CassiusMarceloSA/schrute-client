"use client";

import { Board } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-row items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <QueryClientProvider client={queryClient}>
        <Board />
      </QueryClientProvider>
    </div>
  );
}
