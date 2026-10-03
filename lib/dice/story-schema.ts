export const storySchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "story"],
  properties: {
    title: { type: "string" },
    story: {
      type: "object",
      additionalProperties: false,
      required: ["scenes"],
      properties: {
        scenes: { type: "array", minItems: 2, maxItems: 5, items: { type: "string" } },
      },
    },
  },
} as const;
