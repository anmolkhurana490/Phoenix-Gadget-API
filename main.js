import express from 'express';
import { connectToDB } from './config/db.js';
import gadgetRouter from './routes/gadgetRouter.js';
import authRouter from './routes/authRouter.js';
import AuthMiddleware from './middlewares/AuthMiddleware.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

connectToDB()

app.use('/auth', authRouter);
// Protect gadget routes with authentication middleware
app.use('/gadgets', AuthMiddleware, gadgetRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});