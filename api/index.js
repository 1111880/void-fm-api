// Vercel Serverless wrapper for NeteaseCloudMusicApi
const { startService } = require('../server');

let appPromise = null;

module.exports = async (req, res) => {
  // Lazy init — Vercel reuses the instance
  if (!appPromise) {
    appPromise = startService();
    await appPromise;
  }

  // Forward to the Express app
  const app = require('../server').app;
  if (!app) {
    res.status(500).json({ error: 'Server not initialized' });
    return;
  }

  // Use Express app to handle the request
  return new Promise((resolve) => {
    app(req, res, () => resolve());
  });
};
