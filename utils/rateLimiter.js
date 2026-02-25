const rateLimits = {}; 

const MAX_REQUESTS = 5; // max requests per time window
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function rateLimiter(req, res, next) {
  try {
    // Use user ID from req.user (set by authMiddleware)
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized: No user info' });
    }

    const now = Date.now();

    if (!rateLimits[userId]) {
      rateLimits[userId] = { count: 1, lastReset: now };
    } else {
      const elapsed = now - rateLimits[userId].lastReset;

      if (elapsed > WINDOW_MS) {
        // Reset window
        rateLimits[userId] = { count: 1, lastReset: now };
      } else {
        if (rateLimits[userId].count >= MAX_REQUESTS) {
          return res
            .status(429)
            .json({ success: false, message: 'Rate limit exceeded' });
        }
        rateLimits[userId].count += 1;
      }
    }

    next();
  } catch (err) {
    console.error('Rate limiter error:', err.message);

    next();
  }
}