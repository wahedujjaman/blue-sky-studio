// api/queue.js - Blue Sky Queue - No Token Needed in Code!
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return res.status(500).json({ error: "Upstash ENV not set in Vercel!" });
  }

  const headers = { "Authorization": `Bearer ${UPSTASH_TOKEN}`, "Content-Type": "application/json" };

  if (req.method === 'POST') {
    const { prompt, imageUrl } = req.body;
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2,7)}`;
    const job = { id: jobId, prompt: prompt || "Make Blue Sky", imageUrl: imageUrl || "", status: "queued", createdAt: new Date().toISOString() };
    
    // Push to queue
    await fetch(`${UPSTASH_URL}/lpush/blue-sky-queue/${encodeURIComponent(JSON.stringify(job))}`, { headers, method: 'POST' });
    // Save job status
    await fetch(`${UPSTASH_URL}`, { headers, method: 'POST', body: JSON.stringify(["SET", `job:${jobId}`, JSON.stringify(job)]) });
    
    return res.status(200).json({ success: true, jobId });
  }

  if (req.method === 'GET') {
    const { jobId } = req.query;
    const resp = await fetch(`${UPSTASH_URL}/get/job:${jobId}`, { headers });
    const data = await resp.json();
    const jobData = data.result ? JSON.parse(data.result) : { status: "not_found" };
    return res.status(200).json(jobData);
  }
}
