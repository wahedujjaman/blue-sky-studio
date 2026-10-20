export async function POST(req) {
  const { url } = await req.json();
  globalThis.tunnelStore = { url, time: new Date().toISOString() };
  return Response.json({ success: true, url });
}
