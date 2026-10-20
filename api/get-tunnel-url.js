export async function GET() {
  try {
    const res = await fetch('https://kvdb.io/blue-sky-wahed-2024/tunnel', {
      cache: 'no-store',
    });
    const url = await res.text();
    
    // যদি খালি থাকে
    if (!url || url.length < 10) {
      return Response.json({ url: null });
    }
    
    return Response.json({ url });
  } catch (e) {
    return Response.json({ url: null });
  }
}
