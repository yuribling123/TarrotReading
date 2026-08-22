"use client";

import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">
        Something went wrong
      </h1>

      <p className="mt-2 text-gray-400">
        We couldn't generate your tarot reading.
      </p>

      <button
        onClick={() => router.push("/")}
        className="mt-6"
      >
        Try Again
      </button>
    </main>
  );
}