const express = require("express");
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

// CORS configuration - explicitly allow frontend origins
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://college-event-management-system-b6j5rxs7p.vercel.app",
            process.env.FRONTEND_URL
        ].filter(Boolean), // Remove undefined values
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("Server running + DB Connected");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// const express = require('express');
// const cors = require('cors');
// const db = require('./db');
// const authRoutes = require('./routes/authRoutes');
// const eventRoutes = require('./routes/eventRoutes');

// const app = express();

// // CORS configuration - allows both local and production frontend
// const allowedOrigins = [
//     'http://localhost:5173',
//     'https://college-event-management-system-wheat.vercel.app',
//     'https://college-event-management-system.vercel.app',
//     process.env.FRONTEND_URL // Add your Vercel URL as env variable
// ].filter(Boolean); // Remove undefined values

// app.use(cors({
//     origin: function (origin, callback) {
//         // Allow requests with no origin (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);

//         if (allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             console.log('Blocked by CORS:', origin);
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true
// }));
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);

// app.get('/', (req, res) => {
//     res.send("server is running + DB Connected");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });