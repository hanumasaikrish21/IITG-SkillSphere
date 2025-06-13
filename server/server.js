// server.js
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import { clerkMiddleware } from '@clerk/express';
import educatorRouter from './routes/educatorRoutes.js';
import courseRouter from './routes/courseRoutes.js';
import userRouter from './routes/userRoutes.js';

const PORT = process.env.PORT || 8080;
const app = express();

console.log('🔁 server.js loaded');

await connectDB();
await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.post('/clerk', clerkWebhooks);
app.use('/api/educator', educatorRouter);
app.use('/api/course', courseRouter);
app.use('/api/user', userRouter);
app.post('/stripe',express.raw({ type: 'application/json' }),stripeWebhooks)

app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Server is running at http://127.0.0.1:${PORT}`);
});
