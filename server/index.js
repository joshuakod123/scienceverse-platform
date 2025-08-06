const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
const connectDB = require('./config/db');
connectDB();

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const courses = require('./routes/courses');
const lessons = require('./routes/lessons');
const payments = require('./routes/payments');

// Import error handler
const errorHandler = require('./middleware/error');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:3000',
  credentials: true
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/courses', courses);
app.use('/api/lessons', lessons);
app.use('/api/payments', payments);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// Error handler middleware (사용 외부 파일)
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => {
    process.exit(1);
  });
});
