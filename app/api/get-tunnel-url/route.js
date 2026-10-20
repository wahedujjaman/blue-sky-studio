export async function GET() {
  const store = globalThis.tunnelStore || { url: null };
  return Response.json({ url: store.url, status: store.url ? "ON" : "OFF" });
}
