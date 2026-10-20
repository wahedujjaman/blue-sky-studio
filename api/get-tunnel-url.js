export async function GET() {
  try {
    const res = await fetch('https://kvdb.io/blue-sky-wahed-2024/tunnel', {
      cache: 'no-store',
    });
    const url = await res.text();
    return Response.json({ url: url || null });
  } catch (e) {
    return Response.json({ url: null });
  }
}
