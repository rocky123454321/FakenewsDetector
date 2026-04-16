import express from 'express';
import dotenv from 'dotenv';
import newsRoutes from './routes/newsRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.VITE_URL
].filter(Boolean);

// ✅ No app.options() needed — cors() handles preflight automatically
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());

app.use('/api/news', newsRoutes);

app.get('/', (req, res) => {
    res.send("running");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});