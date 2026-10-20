export default function handler(req, res) {
  try {
    if (req.body && req.body.url) {
      globalThis.tunnelUrl = req.body.url;
    }
    return res.status(200).json({ success: true, url: globalThis.tunnelUrl || null });
  } catch (e) {
    return res.status(200).json({ success: true, url: null });
  }
}
