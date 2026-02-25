import AuditLog from '../models/auditLog.js';

export const auditLogger = async (req, res, next) => {
  try {
   
    const userId = req.user?.id || null;

    const apiKey = req.user?.apiKey || null;

    await AuditLog.create({
      userId,
      apiKey,
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Audit Logger Error:', error.message);
  }

  next();
};