import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

// ✅ CORS Config: Frontend URL Nagpur production/local ke hisab se set karein
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.BACKEND_URL,

 
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
  credentials: true, // 👈 Ye sabse important hai cookies/token ke liye
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.get('/health', (req, res) => {
  res.status(200).json({ message: "HireGen AI Backend Running 🚀" });
});

export default app;