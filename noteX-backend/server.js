import express from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import colors from "colors";
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import connectDB from './config/db.js';
import { requireSignIn } from './middleware/authMiddleware.js';
import cors from 'cors';

const app = express();
const BASE_PATH = '/api/v1';

// configure env
dotenv.config();

// connect database config
connectDB();

// middlewares
app.use(morgan("dev")); // logs the api endpoints visited
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to NoteX',
  })
});

// routes
app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(requireSignIn);

app.use(`${BASE_PATH}/notes`, noteRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening at port ${PORT}`.cyan));