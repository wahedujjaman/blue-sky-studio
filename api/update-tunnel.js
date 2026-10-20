export default function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    let url = null;
    if (req.body) {
      url = req.body.url || req.body.tunnel_url || null;
    }
    if (!url && req.query && req.query.url) {
      url = req.query.url;
    }
    if (url) {
      globalThis.tunnelUrl = url;
      globalThis.tunnelTime = Date.now();
    }
    return res.status(200).json({ success: true, url: globalThis.tunnelUrl || url || null });
  } catch (e) {
    return res.status(200).json({ success: true, url: globalThis.tunnelUrl || null });
  }
}
