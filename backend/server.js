import express from 'express';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploads directory statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Check required environment variables
const requiredEnvVars = [
    'CLOUDINARY_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'MONGODB_URI',
    'JWT_SECRET'
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

//api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user' , userRouter);

app.get('/', (req, res) => {
    res.send('API WORKING')
});

// Initialize database and cloudinary
const startServer = async () => {
    try {
        await connectDB();
        await connectCloudinary();
        
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
