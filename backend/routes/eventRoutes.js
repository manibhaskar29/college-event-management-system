const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const adminOnly = (req, res, next) => {
    if(req.user.role !== "admin")
        return res.status(403).json({message: "Admin access only"});
    next();
};

const studentOnly = (req, res, next) => {
    if(req.user.role !== "student")
        return res.status(403).json({message: "Student access only"});
    next();
}

// create events route
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

// get events route
router.get('/', authMiddleware, (req, res) => {
    const getEventsQuery = `
    SELECT 
    events.id, 
    events.title, 
    events.description, 
    events.event_date, 
    users.name as created_by
    FROM events
    JOIN users ON events.created_by = users.id
    ORDER BY event_date ASC
    `;
    db.query(getEventsQuery, (err, result) => {
        if(err)
            return res.status(500).json({message: "Failed to fetch events"});
        res.status(200).json({events: result});
    });
});

// register for event (Student only)
router.post('/register', authMiddleware, studentOnly, (req, res) => {
    const { event_id } = req.body;
    const userId = req.user.userId;

    if(! event_id) 
        return res.status(400).json({message: "Event ID is required"});

    const checkEventQuery = "SELECT id FROM events WHERE id = ?";
    db.query(checkEventQuery, [event_id], (err, event_Result) => {
        if(err)
            return res.status(500).json({message: "Database error"});

        if(event_Result.length === 0)
            return res.status(404).json({message: "Event not found"});

        const checkRegistrationQuery = 
            "SELECT id FROM registrations WHERE user_id = ? AND event_id = ?";
        db.query(checkRegistrationQuery, [userId, event_id], (err, regResult) => {
            if(err)
                return res.status(500).json({message: "Database error"});
            
            if(regResult.length > 0)
                return res.status(409).json({message: "Already registered for this event"});
            
            const insertRegistrationQuery =
                "INSERT INTO registrations (user_id, event_id) VALUES (?, ?)";
            
            db.query(insertRegistrationQuery, [userId, event_id], (err) => {
                if(err)
                    return res.status(500).json({message: "Failed to register for event"});
                
                res.status(201).json({message: "Successfully registered for event"})
            });
        });
    });
});

module.exports = router;