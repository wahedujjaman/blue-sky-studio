export async function GET() {
  return Response.json({ status: globalThis.tunnelStore?.url ? "ON" : "OFF" });
}
