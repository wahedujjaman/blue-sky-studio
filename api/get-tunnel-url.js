export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    let url = globalThis.tunnelUrl || null;
    if (!url) {
      try {
        const r = await fetch('https://kvdb.io/blue-sky-wahed-2024/tunnel');
        const t = await r.text();
        if (t && t.startsWith('http')) url = t;
      } catch (e) {}
    }
    return res.status(200).json({ url: url, status: url ? "ON" : "OFF" });
  } catch (e) {
    return res.status(200).json({ url: null, status: "OFF" });
  }
}
