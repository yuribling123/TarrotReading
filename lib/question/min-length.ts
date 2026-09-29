export const MIN_QUESTION_LENGTH = 5;

export function hasMinimumQuestionLength(value: string) {
  return Array.from(value.replace(/\s/g, "")).length >= MIN_QUESTION_LENGTH;
}
