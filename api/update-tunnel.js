export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url) return Response.json({ success: false }, { status: 400 });

    // KVDB তে Save - এটাই আসল জায়গা
    await fetch('https://kvdb.io/blue-sky-wahed-2024/tunnel', {
      method: 'POST',
      body: url,
    });

    console.log("Tunnel Saved:", url);
    return Response.json({ success: true, url });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}

// GET দিয়েও যাতে ব্রাউজার থেকে সেট করা যায়
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url) return Response.json({ success: false });

  await fetch('https://kvdb.io/blue-sky-wahed-2024/tunnel', {
    method: 'POST',
    body: url,
  });
  return Response.json({ success: true, url });
}
