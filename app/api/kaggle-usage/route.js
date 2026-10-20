export async function GET() {
  return Response.json({ used: globalThis.kaggleUsage || 0, quota: 30 });
}
