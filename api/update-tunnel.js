export default function handler(req, res) {
  globalThis.tunnelUrl = req.body?.url || globalThis.tunnelUrl;
  res.status(200).json({ success: true, url: globalThis.tunnelUrl || null });
}
