import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import userRoutes from  './routes/auth.routes.js'
// Load environment variables
dotenv.config();

const app = express();


// ✅ CORS Config: Strictly using .env variables without fallbacks
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.BACKEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Cookies aur tokens ke liye zaroori hai
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use("/api",userRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({ message: "HireGen AI Backend Running 🚀" });
});

export default app;