require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Configure CORS with sanitized origin handling
const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
];

const allowedOrigins = [...defaultOrigins];
if (process.env.CLIENT_URL) {
  process.env.CLIENT_URL.split(',').forEach((url) => {
    const cleanUrl = url.trim().replace(/\/+$/, '');
    if (cleanUrl && !allowedOrigins.includes(cleanUrl)) {
      allowedOrigins.push(cleanUrl);
    }
  });
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. server-to-server, curl, Postman, health checks)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/+$/, '');
      const isAllowed =
        allowedOrigins.includes(cleanOrigin) ||
        (cleanOrigin.endsWith('.vercel.app') && allowedOrigins.some((o) => o.includes('.vercel.app')));

      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
    },
    credentials: true,
  })
);

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Parse JSON with rawBody captured for Stripe webhook verification
app.use(
  express.json({
    limit: '10mb',
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root route (for Render / uptime health check pings)
app.all('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 AI Career SaaS Backend API is operational',
    healthCheck: '/api/health',
    timestamp: new Date().toISOString(),
  });
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'AI Career SaaS Platform API',
    version: '1.0.0',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('your_stripe')),
  });
});

// API Routes (supports both /api/* and direct /* prefixes)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/resumes', resumeRoutes);
app.use('/resumes', resumeRoutes);

app.use('/api/analysis', analysisRoutes);
app.use('/analysis', analysisRoutes);

app.use('/api/subscription', subscriptionRoutes);
app.use('/subscription', subscriptionRoutes);

app.use('/api/user', userRoutes);
app.use('/user', userRoutes);

// 404 Route Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found.`,
    code: 'ROUTE_NOT_FOUND',
  });
});

// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(` 🚀 AI Career SaaS Server running on port ${PORT}`);
    console.log(` 🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(` 🤖 Gemini AI Model: ${process.env.GEMINI_MODEL || 'gemini-3.7-flash'}`);
    console.log(`=================================================`);
  });
}

module.exports = app;
