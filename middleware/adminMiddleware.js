import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Admin authentication middleware
export const adminAuth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided or invalid format.',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid. User not found.',
      });
    }

    // Check if user is admin or super-admin
    if (!['admin', 'super-admin'].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.',
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Admin auth middleware error:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid.',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
    });
  }
};

// Super admin only middleware
export const superAdminAuth = async (req, res, next) => {
  try {
    // First run admin auth
    await adminAuth(req, res, () => {});

    // Check if user is super-admin
    if (req.user.role !== 'super-admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Super admin privileges required.',
      });
    }

    next();
  } catch (error) {
    console.error('Super admin auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during super admin authentication.',
    });
  }
};

// Role checker middleware factory
export const requireRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Ensure user is authenticated first
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required.',
        });
      }

      // Check if user role is in allowed roles
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required roles: ${allowedRoles.join(', ')}`,
        });
      }

      next();
    } catch (error) {
      console.error('Role check middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during role verification.',
      });
    }
  };
};

// Rate limiting for admin actions
export const adminRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    const key = req.user?.id || req.ip;
    const now = Date.now();

    // Clean old entries
    for (const [userId, data] of requests.entries()) {
      if (now - data.firstRequest > windowMs) {
        requests.delete(userId);
      }
    }

    // Check current user requests
    if (!requests.has(key)) {
      requests.set(key, {
        count: 1,
        firstRequest: now,
      });
    } else {
      const userData = requests.get(key);
      userData.count += 1;

      if (userData.count > maxRequests) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((windowMs - (now - userData.firstRequest)) / 1000),
        });
      }
    }

    next();
  };
};

// Audit log middleware for admin actions
export const auditLog = (action) => {
  return async (req, res, next) => {
    // Store original res.json
    const originalJson = res.json;

    // Override res.json to capture response
    res.json = function (data) {
      // Log the admin action
      const logData = {
        action,
        adminId: req.user?.id,
        adminEmail: req.user?.email,
        method: req.method,
        path: req.path,
        body: req.method !== 'GET' ? req.body : undefined,
        params: req.params,
        query: req.query,
        success: data.success !== false,
        timestamp: new Date(),
        ip: req.ip,
        userAgent: req.get('User-Agent'),
      };

      // Log to console (in production, send to logging service)
      console.log('🔒 Admin Action:', JSON.stringify(logData, null, 2));

      // TODO: In production, save to database or send to logging service
      // await AdminLog.create(logData);

      // Call original res.json
      return originalJson.call(this, data);
    };

    next();
  };
};

export default {
  adminAuth,
  superAdminAuth,
  requireRole,
  adminRateLimit,
  auditLog,
};
