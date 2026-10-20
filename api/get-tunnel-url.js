export default function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = globalThis.tunnelUrl || null;
    const time = globalThis.tunnelTime || null;
    const isOn = url ? "ON" : "OFF";
    return res.status(200).json({ url: url, status: isOn, last_update: time });
  } catch (e) {
    return res.status(200).json({ url: null, status: "OFF" });
  }
}
