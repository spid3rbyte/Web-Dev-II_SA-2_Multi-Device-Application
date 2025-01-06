//a Node.js framework used to create web servers and handle HTTP requests/responses
import express from 'express';
// a library for working with the momgodb databases, 
// this also allows interaction with mongodb using a structured 
//schema model
import mongoose from 'mongoose';
// dotenv : a library to load environment variables from a .env file, 
//this ensures sensitive information like database URLS to not be hard coded in source code 
import dotenv from 'dotenv';
// a library that enables "cross origin resource sharing", allowing requests from diff domains
// to access the server 
import cors from 'cors';
// a module where user-specific API routes are defined
import userRoutes from './routes/userRoutes.js';

//loads environment variables (like db uri)
dotenv.config();

//creates an express app (app)
const app = express();
//the port where the server will listen for incoming requests 
const port = 4000;

//enables cross-origin access
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Ensure frontend is running on this address
    methods: ['GET', 'POST'], // Allow only necessary methods
}));


//parses json request bodies
app.use(express.json());

//any request to an end point starting with /api/user will be handled by 
//the routes defined in userroutes.js
app.use('/api/user', userRoutes)

//retrieves database connection uri from env file 
const dbURI = process.env.DB_URI;

// connects to mongodb using the URI from .env
//handles connection success and failure 
const connectDB = async () => {
    try {
        //db uri is loaded from .env for secure database configuration
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})