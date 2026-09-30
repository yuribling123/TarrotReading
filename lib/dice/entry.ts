export async function isDiceEntryAllowed(visitorId: string): Promise<boolean> {
  const response = await fetch(`/api/dice-limit/${visitorId}`);
  if (!response.ok) throw new Error(`Dice limit check failed: ${response.status}`);

  const status: unknown = await response.json();
  if (!status || typeof status !== "object" || !("allowed" in status) || typeof status.allowed !== "boolean") {
    throw new Error("Invalid dice limit response");
  }
  return status.allowed;
}
