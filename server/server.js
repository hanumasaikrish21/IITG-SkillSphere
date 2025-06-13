// server.js
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';


const PORT = process.env.PORT || 5000;

console.log('server.js loaded'); // Helps confirm script reached

const app = express();

// connect to MongoDB
await connectDB();
await connectCloudinary();
//middlewares
app.use(cors());
app.use(clerkMiddleware())


app.get('/', (req, res) => {
  console.log('Received GET /');  // You should see this when you curl
  res.send('API is running');
});
app.post('/clerk',express.json(),clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
});
