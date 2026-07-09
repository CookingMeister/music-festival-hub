import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/connection.js';
import routes from './routes/index.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Enable CORS options
const corsOptions = {
  origin: [
    'https://music-festival-hub.onrender.com',
    'http://localhost:3000',
    'http://localhost:5173'  // Vite's default port
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use(routes);

const __dirname = path.resolve();
// Serve static files from the dist folder (uncomment on build, comment out for dev)
//app.use(express.static(path.join(__dirname, '../client/dist')));

// Connect to MongoDB
connectDB();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Catch-all route to serve index.html for client-side routing
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/', 'index.html')); // (uncomment on build, comment out for dev)
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/', 'index.html'));  // (comment out on build, uncomment for dev)
});