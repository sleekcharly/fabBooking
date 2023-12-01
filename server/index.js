import express from 'express';

// cookie parser
import cookieParser from 'cookie-parser';

// import cors
import cors from 'cors';

// set config for env variables
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

// routes
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';

// initialize application
const app = express();

// connect to mongodb database
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to mongodb');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

// handling errors
app.use((err, req, res, next) => {
  // customizing error handler
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
  next();
});

app.listen(8000, () => {
  connect();
  console.log('connected to backend on port 8000');
});
