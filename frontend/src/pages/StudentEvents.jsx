import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, TextField, InputAdornment, Button, CircularProgress } from "@mui/material";
import Sidebar from "../components/Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function StudentEvents() {
    const [searchQuery, setSearchQuery] = useState("");
    const [registering, setRegistering] = useState(null); // Track which event is being registered
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/events", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setEvents(data.events);
            } else {
                console.error("Failed to fetch events:", data.message);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (eventId) => {
        setRegistering(eventId);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/events/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ event_id: eventId })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Successfully registered for the event!");

                // Update local state to reflect registration
                setEvents(prevEvents => prevEvents.map(event =>
                    event.id === eventId
                        ? { ...event, isRegistered: true, registrations: event.registrations + 1 }
                        : event
                ));
            } else {
                alert(data.message || "Failed to register for event");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred while registering for the event");
        } finally {
            setRegistering(null);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };


    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        Discover Events
                    </Typography>
                    <Typography sx={{ color: "#64748b", fontSize: 16, fontWeight: 500 }}>
                        Browse and register for exciting college events
                    </Typography>
                </Box>

                {/* Search Bar */}
                <TextField
                    fullWidth
                    placeholder="Search events by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "#94a3b8", fontSize: 24 }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        mb: 5,
                        maxWidth: 600,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            background: "rgba(255, 255, 255, 0.9)",
                            backdropFilter: "blur(10px)",
                            fontSize: 15,
                            "& fieldset": {
                                borderColor: "rgba(59, 130, 246, 0.2)",
                                borderWidth: 2,
                            },
                            "&:hover fieldset": {
                                borderColor: "#3b82f6",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#3b82f6",
                            },
                        },
                    }}
                />

                {/* Events Grid */}
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))", gap: 4 }}>
                    {filteredEvents.map((event) => (
                        <Card
                            key={event.id}
                            sx={{
                                borderRadius: 4,
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(59, 130, 246, 0.1)",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                position: "relative",
                                overflow: "visible",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: "0 12px 40px rgba(59, 130, 246, 0.25)",
                                    border: "1px solid rgba(59, 130, 246, 0.3)",
                                },
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: "4px",
                                    background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
                                    borderRadius: "16px 16px 0 0",
                                }
                            }}
                        >
                            <CardContent sx={{ p: 3.5 }}>
                                {/* Date Badge */}
                                <Box
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 1,
                                        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                                        px: 2.5,
                                        py: 1,
                                        borderRadius: 2.5,
                                        mb: 2.5,
                                        border: "1px solid rgba(59, 130, 246, 0.2)",
                                    }}
                                >
                                    <EventIcon sx={{ fontSize: 18, color: "#3b82f6" }} />
                                    <Typography sx={{ fontSize: 13, color: "#3b82f6", fontWeight: 700, letterSpacing: "0.02em" }}>
                                        {formatDate(event.event_date)}
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
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
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

                                    {/* Registrations */}
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
                                            <PeopleIcon sx={{ fontSize: 18, color: "#22c55e" }} />
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                                Registrations
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, color: "#22c55e", fontWeight: 700 }}>
                                                {event.registrations} students registered
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Register Button */}
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => handleRegister(event.id)}
                                    disabled={registering === event.id || event.isRegistered}
                                    sx={{
                                        background: event.isRegistered
                                            ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                                            : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                        color: "white",
                                        fontWeight: 700,
                                        textTransform: "none",
                                        py: 1.5,
                                        borderRadius: 2.5,
                                        fontSize: 15,
                                        boxShadow: event.isRegistered
                                            ? "0 4px 14px rgba(34, 197, 94, 0.4)"
                                            : "0 4px 14px rgba(59, 130, 246, 0.4)",
                                        "&:hover": {
                                            background: event.isRegistered
                                                ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                                                : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                            boxShadow: event.isRegistered
                                                ? "0 6px 20px rgba(34, 197, 94, 0.5)"
                                                : "0 6px 20px rgba(59, 130, 246, 0.5)",
                                            transform: event.isRegistered ? "none" : "translateY(-2px)",
                                        },
                                        "&:disabled": {
                                            background: event.isRegistered
                                                ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                                                : "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
                                            color: "white",
                                        },
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {event.isRegistered
                                        ? "✓ Registered"
                                        : registering === event.id
                                            ? "Registering..."
                                            : "Register Now"}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* No Results Message */}
                {filteredEvents.length === 0 && (
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
                        <SearchIcon sx={{ fontSize: 64, color: "#cbd5e1", mb: 2 }} />
                        <Typography variant="h6" sx={{ color: "#64748b", fontWeight: 600, mb: 1 }}>
                            No events found
                        </Typography>
                        <Typography sx={{ color: "#94a3b8", fontSize: 14 }}>
                            Try adjusting your search query
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}