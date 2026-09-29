export const diceStoryStorageKey = "moonlit-otherworld-story";

export function clearStoredDiceStory() {
  window.sessionStorage.removeItem(diceStoryStorageKey);
}
