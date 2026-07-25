import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import Admin from './src/models/Admin.js';

// Environment Variable Startup Validation
const validateEnvironment = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  const criticalVars = ['JWT_SECRET'];
  if (!process.env.JWT_REFRESH_SECRET && !process.env.REFRESH_TOKEN_SECRET) {
    criticalVars.push('JWT_REFRESH_SECRET');
  }
  const productionVars = [
    'MONGODB_URI',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS'
  ];

  const missingCritical = criticalVars.filter(v => !process.env[v]);
  if (missingCritical.length > 0) {
    console.error(`\n[FATAL] Startup aborted: Missing required security variables: ${missingCritical.join(', ')}`);
    console.error(`Please define these environment variables in your .env file or environment configuration.\n`);
    process.exit(1);
  }

  if (isProduction) {
    const missingProd = productionVars.filter(v => !process.env[v]);
    if (missingProd.length > 0) {
      console.warn(`\n[WARNING] Production mode enabled but missing recommended production variables: ${missingProd.join(', ')}\n`);
    }
  }
};

validateEnvironment();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

const server = http.createServer(app);

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

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? getParsedAllowedOrigins() : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  }
});

// Socket.IO Handshake Authentication & Authorization Middleware
io.use(async (socket, next) => {
  try {
    const authHeader = socket.handshake.headers?.authorization;
    let token = socket.handshake.auth?.token;

    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return next(new Error('Authentication error: Missing token'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = typeof decoded.id === 'object' ? decoded.id.id || decoded.id : decoded.id;

    const admin = await Admin.findById(adminId).select('-password');
    if (!admin || !admin.isActive) {
      return next(new Error('Authentication error: Account disabled or unauthorized'));
    }

    socket.admin = {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role
    };

    next();
  } catch (err) {
    console.error(`[Socket.IO Auth Error] ${err.message}`);
    return next(new Error(`Authentication error: ${err.message}`));
  }
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log(`[Socket.IO] Admin client connected: ${socket.id} (${socket.admin?.email || 'Authenticated'})`);

  socket.on('disconnect', () => {
    console.log(`[Socket.IO] Admin client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`  AV Group API Server running on port ${PORT}`);
  console.log(`  Socket.IO Real-time Framework Active (Authenticated)`);
  console.log(`  Health Check: http://localhost:${PORT}/`);
  console.log(`  Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`==================================================\n`);
});
