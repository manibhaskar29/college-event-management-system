import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import Sidebar from "../components/Sidebar";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import api from "../services/api";

export default function MyRegistrations() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await api.get("/events/my-registrations");
            setRegistrations(response.data.registrations);
        } catch (error) {
            console.error("Error fetching registrations:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)" }}>
            <Sidebar />

            <Box sx={{ flex: 1, ml: "240px", p: 4 }}>
                {/* Header Section */}
                <Box sx={{ mb: 5 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            background: "linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 1
                        }}
                    >
                        My Registered Events
                    </Typography>
                    <Typography sx={{ color: "#64748b", fontSize: 16, fontWeight: 500 }}>
                        View all events you've registered for
                    </Typography>
                </Box>

                {/* Loading State */}
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* Empty State */}
                {!loading && registrations.length === 0 && (
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 8,
                            px: 4,
                            background: "rgba(255, 255, 255, 0.7)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 4,
                            border: "2px dashed rgba(148, 163, 184, 0.3)"
                        }}
                    >
                        <CheckCircleIcon sx={{ fontSize: 64, color: "#cbd5e1", mb: 2 }} />
                        <Typography variant="h6" sx={{ color: "#64748b", fontWeight: 600, mb: 1 }}>
                            No registrations yet
                        </Typography>
                        <Typography sx={{ color: "#94a3b8", fontSize: 14 }}>
                            You haven't registered for any events yet
                        </Typography>
                    </Box>
                )}

                {/* Events Grid */}
                {!loading && registrations.length > 0 && (
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))", gap: 4 }}>
                        {registrations.map((event) => (
                            <Card
                                key={event.id}
                                sx={{
                                    borderRadius: 4,
                                    background: "rgba(255, 255, 255, 0.95)",
                                    backdropFilter: "blur(20px)",
                                    border: "1px solid rgba(34, 197, 94, 0.2)",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    position: "relative",
                                    overflow: "visible",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: "0 12px 40px rgba(34, 197, 94, 0.25)",
                                        border: "1px solid rgba(34, 197, 94, 0.4)",
                                    },
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "4px",
                                        background: "linear-gradient(90deg, #22c55e 0%, #16a34a 100%)",
                                        borderRadius: "16px 16px 0 0",
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 3.5 }}>
                                    {/* Registered Badge */}
                                    <Box
                                        sx={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 1,
                                            background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                                            px: 2.5,
                                            py: 1,
                                            borderRadius: 2.5,
                                            mb: 2.5,
                                            border: "1px solid rgba(34, 197, 94, 0.2)",
                                        }}
                                    >
                                        <CheckCircleIcon sx={{ fontSize: 18, color: "#22c55e" }} />
                                        <Typography sx={{ fontSize: 13, color: "#22c55e", fontWeight: 700, letterSpacing: "0.02em" }}>
                                            Registered
                                        </Typography>
                                    </Box>

                                    {/* Event Title */}
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 800,
                                            color: "#1e293b",
                                            mb: 2,
                                            lineHeight: 1.3,
                                            letterSpacing: "-0.02em"
                                        }}
                                    >
                                        {event.title}
                                    </Typography>

                                    {/* Description */}
                                    <Typography
                                        sx={{
                                            color: "#64748b",
                                            fontSize: 14.5,
                                            mb: 3,
                                            lineHeight: 1.7,
                                            fontWeight: 500
                                        }}
                                    >
                                        {event.description}
                                    </Typography>

                                    {/* Event Details */}
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                        {/* Event Date */}
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                            <Box
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: 2,
                                                    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <EventIcon sx={{ fontSize: 18, color: "#3b82f6" }} />
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                                    Event Date
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, color: "#334155", fontWeight: 600 }}>
                                                    {formatDate(event.event_date)}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Organizer */}
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                            <Box
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: 2,
                                                    background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <PersonIcon sx={{ fontSize: 18, color: "#64748b" }} />
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                                    Organized by
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, color: "#334155", fontWeight: 600 }}>
                                                    {event.created_by}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Registration Date */}
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                            <Box
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: 2,
                                                    background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <CheckCircleIcon sx={{ fontSize: 18, color: "#22c55e" }} />
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                                    Registered on
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, color: "#22c55e", fontWeight: 600 }}>
                                                    {formatDate(event.registered_at)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
