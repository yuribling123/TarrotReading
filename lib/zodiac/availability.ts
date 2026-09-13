export function isZodiacReadingAvailable(date = new Date()) {
  const day = date.getDay();
  return day === 5 || day === 6 || day === 0;
}
