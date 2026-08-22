export const tarotReadingSchema = {
  type: "object",
  additionalProperties: false,
  required: ["spreadName", "cards", "answer", "guidance"],
  properties: {
    spreadName: { type: "string" },
    cards: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["position", "title", "orientation", "message"],
        properties: {
          position: { type: "string" },
          title: { type: "string" },
          orientation: { type: "string" },
          message: { type: "string" },
        },
      },
    },
    answer: { type: "string" },
    guidance: { type: "string" },
  },
} as const;
