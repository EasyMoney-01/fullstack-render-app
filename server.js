const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/render-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Continuing without MongoDB for local development...');
    // Don't exit, continue without database for local testing
  }
};

// API Routes
app.use('/api/health', require('./routes/health'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  
  // Serve static files
  app.use(express.static(clientBuildPath));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Client URL: ${process.env.CLIENT_URL}`);
  });
};

startServer().catch(console.error);

module.exports = app;