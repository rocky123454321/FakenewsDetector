import express from 'express';
import dotenv from 'dotenv';
import newsRoutes from './routes/newsRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
].filter(Boolean);

// 1. DAPAT NASA ITAAS ITO (Bago ang routes)
app.use(cors({
    origin: allowedOrigins, // Dapat 'origin' (walang 's')
    credentials: true
}));

app.use(express.json());

// 2. Pagkatapos lang ng CORS pwede ilagay ang routes
app.use('/api/news', newsRoutes);

app.get('/', (req, res) => {
    res.send("running");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});