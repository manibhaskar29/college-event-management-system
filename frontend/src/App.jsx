import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CreateEvent from "./pages/CreateEvent";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminEvents from "./pages/AdminEvents";
import StudentEvents from "./pages/StudentEvents";
import MyRegistrations from "./pages/MyRegistrations";

function App() {
  const location = useLocation();

  // Don't show Navbar on dashboard pages (they have their own sidebar)
  const showNavbar = !["/admin-dashboard", "/admin/events", "/student/events", "/create-event", "/student-dashboard", "/student/my-registrations"].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminEvents />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/events"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/my-registrations"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MyRegistrations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
