// Simple admin password middleware using an env var ADMIN_PASSWORD
export default function adminAuth(req, res, next) {
  try {
    const headerKey = req.header('x-admin-key');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.warn('ADMIN_PASSWORD is not set. Admin routes will be inaccessible.');
      return res.status(500).json({ error: 'Server not configured for admin access' });
    }

    if (!headerKey || headerKey !== adminPassword) {
      return res.status(401).json({ error: 'Unauthorized: Invalid admin key' });
    }

    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
