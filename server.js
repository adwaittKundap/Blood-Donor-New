const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // NEW
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Configure CORS to support multiple development and production origins
const allowedOrigins = [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'https://blood-donor-frontend-nine.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Set up API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// REMOVED: Static file serving (express.static)
// REMOVED: Fallback to index.html logic

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});