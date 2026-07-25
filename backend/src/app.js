import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import homepageRoutes from './routes/homepageRoutes.js';
import seoRoutes from './routes/seoRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();

// Security and Logging Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));

const getParsedAllowedOrigins = () => {
  const envOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
    : [];

  const defaultOrigins = [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174'
  ].filter(Boolean);

  return Array.from(new Set([...envOrigins, ...defaultOrigins]));
};

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = getParsedAllowedOrigins();
    if (!origin) return callback(null, true); // Allow server-to-server or non-browser requests (e.g., Postman)

    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    return callback(new Error(`CORS error: Origin '${origin}' is not allowed by CORS policy.`));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files directory for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({
    message: 'AV Group Organization API Server',
    status: 'Running',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/notifications', notificationRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found - ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Error]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export default app;
