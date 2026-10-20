export async function POST(req) {
  const data = await req.json();
  globalThis.kaggleUsage = data.used;
  return Response.json({ success: true });
}
