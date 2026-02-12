"use client";

import { useEffect, useState } from "react";

interface ApiHealth {
  status: string;
  timestamp?: string;
}

export default function Home() {
  const [health, setHealth] = useState<ApiHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }
        const data = await response.json();
        setHealth(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch API health");
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Codebase RAG Assistant
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            API Health Check
          </p>
          
          <div className="mt-6 w-full max-w-sm rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            {loading && (
              <p className="text-zinc-600 dark:text-zinc-400">Checking API health...</p>
            )}
            {error && (
              <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            )}
            {health && (
              <div className="space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong>Status:</strong>{" "}
                  <span className="inline-block rounded bg-green-100 px-2 py-1 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {health.status}
                  </span>
                </p>
                {health.timestamp && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    <strong>Timestamp:</strong> {health.timestamp}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}