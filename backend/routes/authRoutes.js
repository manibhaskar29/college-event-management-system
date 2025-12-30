const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// REGISTER API
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user already exists
    const checkQuery = "SELECT * FROM users WHERE email = ?";  //(?) is a placeholder to prevent SQL injection
    db.query(checkQuery, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });  // 500 = Internal Server Error.
        }
        if (result.length > 0) {
            return res.status(409).json({ message: "User already exists" }); // 409 means conflict.
        }

        try {
            // Hash Password
            const hashedPassword = await bcrypt.hash(password, 10);

            const insertQuery = "INSERT INTO users(name, email, password, role) VALUES(?, ?, ?, ?)";

            db.query(
                insertQuery,
                [name, email, hashedPassword, role || "student"],
                (err) => {
                    if (err) {
                        return res.status(500).json({ message: "Failed to register user" });
                    }
                    res.status(201).json({ message: "User registered successfully" }); // Status 201 means resource created.
                }
            )
        } catch (error) {
            return res.status(500).json({ message: "Password hashing failed" });
        }
    });
});

const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "All fields are required" });

    const findUserQuery = "SELECT * FROM users WHERE email = ?";

    db.query(findUserQuery, [email], async (err, result) => {
        if (err)
            return res.status(500).json({ message: "Database error" });

        if (result.length === 0)
            return res.status(401).json({ message: "Email and password does not match" });

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(401).json({ message: "Email and password does not match" });

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token: token
        });
    });
});

router.get('/protected', authMiddleware, (req, res) => {
    res.json({
        message: "You accessed a protected route",
        user: req.user
    });
});

// DELETE user by ID

// const adminOnly = (req, res, next) => {
//     if (req.user.role !== "admin")
//         return res.status(403).json({ message: "Admin access only" });
//     next();
// };

// router.delete("/users/:id", authMiddleware, adminOnly, async (req, res) => {
//     const { id } = req.params;

//     await db.query("DELETE FROM users WHERE id = ?", [id]);

//     res.json({ message: "User deleted successfully" });
// });


module.exports = router;