"use client";

import { Board, Header } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className="h-screen w-screen max-w-screen-2xl mx-0 my-auto flex flex-col items-center justify-center font-[family-name:var(--font-manrope)]">
      <QueryClientProvider client={queryClient}>
        <Header />
        <Board />
      </QueryClientProvider>
    </div>
  );
}
