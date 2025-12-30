import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Avatar, Chip } from "@mui/material";
import Sidebar from "../components/Sidebar";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import api from "../services/api";

export default function StudentDashboard() {
    const [recentEvents, setRecentEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecentEvents();
    }, []);

    const fetchRecentEvents = async () => {
        try {
            const response = await api.get("/events");
            // Sort by date descending (most recent first) and get only the 3 most recent events
            const sortedEvents = response.data.events.sort((a, b) =>
                new Date(b.event_date) - new Date(a.event_date)
            );
            const events = sortedEvents.slice(0, 3);
            setRecentEvents(events);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
            <Sidebar />

            <Box sx={{ flex: 1, ml: "240px", p: 4 }}>
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
                            Discover Events
                        </Typography>
                        <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                            Browse and register for upcoming college events
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Chip label="Student" size="small" sx={{ background: "#eff6ff", color: "#3b82f6", fontWeight: 600 }} />
                        <Avatar sx={{ width: 40, height: 40, background: "#3b82f6" }}>S</Avatar>
                    </Box>
                </Box>

                {/* Recent Events Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b", mb: 3 }}>
                        Recent Events
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {recentEvents.map((event) => (
                            <Card key={event.id} sx={{ borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", transition: "all 0.2s", "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" } }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}>
                                                {event.title}
                                            </Typography>
                                            <Typography sx={{ color: "#64748b", fontSize: 14, mb: 2, lineHeight: 1.6 }}>
                                                {event.description}
                                            </Typography>

                                            <Box sx={{ display: "flex", gap: 3 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <AccessTimeIcon sx={{ fontSize: 18, color: "#94a3b8" }} />
                                                    <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                                                        {formatDate(event.event_date)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <PeopleIcon sx={{ fontSize: 18, color: "#94a3b8" }} />
                                                    <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                                                        {event.registrations} registered
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
