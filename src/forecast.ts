export async function getWeather(
  latitude: number,
  longitude: number
): Promise<number | null> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json() as {
      current?: { temperature_2m?: number };
    };
    return data.current?.temperature_2m ?? null;
  } catch {
    return null;
  }
}
