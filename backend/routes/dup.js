// // REGISTER FOR EVENT (Student only)
// router.post("/register", authMiddleware, studentOnly, (req, res) => {
//   const { event_id } = req.body;
//   const userId = req.user.userId;

//   if (!event_id) {
//     return res.status(400).json({ message: "Event ID is required" });
//   }

//   // 1. Check if event exists
//   const checkEventQuery = "SELECT id FROM events WHERE id = ?";
//   db.query(checkEventQuery, [event_id], (err, eventResult) => {
//     if (err) {
//       return res.status(500).json({ message: "Database error" });
//     }

//     if (eventResult.length === 0) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     // 2. Check if already registered
//     const checkRegistrationQuery =
//       "SELECT id FROM registrations WHERE user_id = ? AND event_id = ?";

//     db.query(
//       checkRegistrationQuery,
//       [userId, event_id],
//       (err, regResult) => {
//         if (err) {
//           return res.status(500).json({ message: "Database error" });
//         }

//         if (regResult.length > 0) {
//           return res
//             .status(409)
//             .json({ message: "Already registered for this event" });
//         }

//         // 3. Register student
//         const insertRegistrationQuery =
//           "INSERT INTO registrations (user_id, event_id) VALUES (?, ?)";

//         db.query(
//           insertRegistrationQuery,
//           [userId, event_id],
//           (err) => {
//             if (err) {
//               return res
//                 .status(500)
//                 .json({ message: "Failed to register for event" });
//             }

//             res.status(201).json({
//               message: "Successfully registered for event",
//             });
//           });
//       });
//   });
// });
