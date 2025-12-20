const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const adminOnly = (req, res, next) => {
    if(req.user.role !== "admin")
        return res.status(403).json({message: "Admin access only"});
    next();
};

router.post('/', authMiddleware, adminOnly, (req, res) => {
    const {title, description, event_date} = req.body;

    if(!title || !event_date)
        return res.status(400).json({message: "Title and date are required"});

    const createdBy = req.user.userId;

    const insertQuery = `INSERT INTO events (title, description, event_date, created_by) VALUES(?, ?, ?, ?)`;

    db.query(insertQuery, 
        [title, description, event_date, createdBy],
        (err, result) => {
            if(err)
                return res.status(500).json({message: "Failed to create event" });
            res.status(201).json({
                message: "Event created successfully",
                eventId: result.insertId
            });
        }
    );
});

module.exports = router;