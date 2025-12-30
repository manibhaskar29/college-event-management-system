const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin")
        return res.status(403).json({ message: "Admin access only" });
    next();
};

const studentOnly = (req, res, next) => {
    if (req.user.role !== "student")
        return res.status(403).json({ message: "Student access only" });
    next();
}

// create events route
router.post('/', authMiddleware, adminOnly, (req, res) => {
    const { title, description, event_date } = req.body;

    if (!title || !event_date)
        return res.status(400).json({ message: "Title and date are required" });

    const createdBy = req.user.userId;

    const insertQuery = `INSERT INTO events (title, description, event_date, created_by) VALUES(?, ?, ?, ?)`;

    db.query(insertQuery,
        [title, description, event_date, createdBy],
        (err, result) => {
            if (err)
                return res.status(500).json({ message: "Failed to create event" });
            res.status(201).json({
                message: "Event created successfully",
                eventId: result.insertId
            });
        }
    );
});

// get events route
router.get('/', authMiddleware, (req, res) => {
    const userId = req.user.userId;
    const userRole = req.user.role;

    const getEventsQuery = `
    SELECT 
        events.id, 
        events.title, 
        events.description, 
        events.event_date, 
        users.name as created_by,
        COUNT(DISTINCT registrations.id) as registrations
    FROM events
    JOIN users ON events.created_by = users.id
    LEFT JOIN registrations ON events.id = registrations.event_id
    GROUP BY events.id, events.title, events.description, events.event_date, users.name
    ORDER BY event_date DESC
    `;

    db.query(getEventsQuery, (err, events) => {
        if (err)
            return res.status(500).json({ message: "Failed to fetch events" });

        // If user is a student, check which events they're registered for
        if (userRole === 'student') {
            const checkRegistrationsQuery = `
                SELECT event_id FROM registrations WHERE user_id = ?
            `;
            db.query(checkRegistrationsQuery, [userId], (err, userRegistrations) => {
                if (err)
                    return res.status(500).json({ message: "Failed to fetch user registrations" });

                const registeredEventIds = new Set(userRegistrations.map(r => r.event_id));

                const eventsWithStatus = events.map(event => ({
                    ...event,
                    isRegistered: registeredEventIds.has(event.id)
                }));

                res.status(200).json({ events: eventsWithStatus });
            });
        } else {
            res.status(200).json({ events });
        }
    });
});

// Get stats for admin dashboard
router.get('/stats', authMiddleware, adminOnly, (req, res) => {
    const statsQuery = `
        SELECT 
            (SELECT COUNT(*) FROM events) as totalEvents,
            (SELECT COUNT(*) FROM registrations) as totalRegistrations
    `;

    db.query(statsQuery, (err, result) => {
        if (err) {
            console.error("Stats query error:", err);
            return res.status(500).json({ message: "Failed to fetch stats" });
        }
        res.status(200).json({
            totalEvents: result[0].totalEvents,
            totalRegistrations: result[0].totalRegistrations
        });
    });
});


// register for event (Student only)
router.post('/register', authMiddleware, studentOnly, (req, res) => {
    const { event_id } = req.body;
    const userId = req.user.userId;

    if (!event_id)
        return res.status(400).json({ message: "Event ID is required" });

    const checkEventQuery = "SELECT id FROM events WHERE id = ?";
    db.query(checkEventQuery, [event_id], (err, event_Result) => {
        if (err)
            return res.status(500).json({ message: "Database error" });

        if (event_Result.length === 0)
            return res.status(404).json({ message: "Event not found" });

        const checkRegistrationQuery =
            "SELECT id FROM registrations WHERE user_id = ? AND event_id = ?";
        db.query(checkRegistrationQuery, [userId, event_id], (err, regResult) => {
            if (err)
                return res.status(500).json({ message: "Database error" });

            if (regResult.length > 0)
                return res.status(409).json({ message: "Already registered for this event" });

            const insertRegistrationQuery =
                "INSERT INTO registrations (user_id, event_id) VALUES (?, ?)";

            db.query(insertRegistrationQuery, [userId, event_id], (err) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY")
                        return res.status(409).json({ message: "Already registered for this event" });
                    return res.status(500).json({ message: "Failed to register for event" });
                }
                res.status(201).json({ message: "Successfully registered for event" })
            });
        });
    });
});

// Get registered events for student
router.get('/my-registrations', authMiddleware, studentOnly, (req, res) => {
    const userId = req.user.userId;

    const getRegistrationsQuery = `
        SELECT 
            events.id,
            events.title,
            events.description,
            events.event_date,
            users.name as created_by,
            registrations.registered_at
        FROM registrations
        JOIN events ON registrations.event_id = events.id
        JOIN users ON events.created_by = users.id
        WHERE registrations.user_id = ?
        ORDER BY registrations.registered_at DESC
    `;

    db.query(getRegistrationsQuery, [userId], (err, result) => {
        if (err)
            return res.status(500).json({ message: "Failed to fetch registrations" });
        res.status(200).json({ registrations: result });
    });
});

// Delete event (Admin only)
router.delete('/:id', authMiddleware, adminOnly, (req, res) => {
    const eventId = req.params.id;

    // First delete all registrations for this event
    const deleteRegistrationsQuery = "DELETE FROM registrations WHERE event_id = ?";
    db.query(deleteRegistrationsQuery, [eventId], (err) => {
        if (err)
            return res.status(500).json({ message: "Failed to delete event registrations" });

        // Then delete the event
        const deleteEventQuery = "DELETE FROM events WHERE id = ?";
        db.query(deleteEventQuery, [eventId], (err, result) => {
            if (err)
                return res.status(500).json({ message: "Failed to delete event" });

            if (result.affectedRows === 0)
                return res.status(404).json({ message: "Event not found" });

            res.status(200).json({ message: "Event deleted successfully" });
        });
    });
});

// Update event (Admin only)
router.put('/:id', authMiddleware, adminOnly, (req, res) => {
    const eventId = req.params.id;
    const { title, description, event_date } = req.body;

    if (!title || !event_date)
        return res.status(400).json({ message: "Title and date are required" });

    const updateQuery = "UPDATE events SET title = ?, description = ?, event_date = ? WHERE id = ?";
    db.query(updateQuery, [title, description, event_date, eventId], (err, result) => {
        if (err)
            return res.status(500).json({ message: "Failed to update event" });

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Event not found" });

        res.status(200).json({ message: "Event updated successfully" });
    });
});

module.exports = router;