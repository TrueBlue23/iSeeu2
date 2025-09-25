export default function handler(req, res) {
  if (req.method === 'POST') {
    // Log coordinates to server console (Vercel logs)
    console.log('Visitor location:', req.body);
    // You can extend this to save to a database or email, etc.
    res.status(200).json({ status: 'logged' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
