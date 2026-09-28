export const storySchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "story"],
  properties: {
    title: { type: "string" },
    story: {
      type: "object",
      additionalProperties: false,
      required: ["scenes", "closing"],
      properties: {
        scenes: { type: "array", minItems: 3, maxItems: 5, items: { type: "string" } },
        closing: { type: "string" },
      },
    },
  },
} as const;
