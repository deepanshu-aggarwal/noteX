import express from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import colors from "colors";
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';

const app = express();

// configure env
dotenv.config();

// connect database config
connectDB();

// middlewares
app.use(morgan("dev")); // logs the api endpoints visited
app.use(express.json());

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to NoteX',
  })
});

// routes
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening at port ${PORT}`.cyan));