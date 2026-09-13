import { NextResponse } from "next/server";

export function readingGenerationErrorResponse() {
  return NextResponse.json(
    {
      success: false,
      error: "Failed to generate tarot reading",
    },
    { status: 500 },
  );
}
