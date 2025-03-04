import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';  // Import body-parser
import userRouter from './routes/usersRoute.js';
import galleryItemRouter from './routes/galleryItemRoute.js';
import jwt from 'jsonwebtoken';

const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());  // Use body-parser for parsing JSON

const connectionString = 'mongodb+srv://vidusha:8021@cluster0.nguzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// JWT Authentication Middleware
app.use((req, res, next) => {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    if (token != null) {
        jwt.verify(token, "secretKey", (error, decoded) => {
            if (decoded != null) {
                req.user = decoded;
                next();
            } else {
                next();
            }
        });
    } else {
        next();
    }
});

// Connect to MongoDB
mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.log('Connection failed');
        console.log(error);
    });

// Routes
app.use("/api/users", userRouter);
app.use("/api/gallery", galleryItemRouter);

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
