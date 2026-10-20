export default function handler(req, res) {
  if (req.method === 'POST') {
    global.tunnelUrl = req.body.url;
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ url: global.tunnelUrl || null });
  }
}
