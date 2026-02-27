import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.get('/health', (req, res) => {
  res.status(200).json({ message: "HireGen AI Backend Running 🚀" });
});

export default app;