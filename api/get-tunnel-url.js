export default function handler(req, res) {
  res.status(200).json({ url: global.tunnelUrl || null });
}
