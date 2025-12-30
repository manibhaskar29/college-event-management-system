import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, TextField, InputAdornment, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Sidebar from "../components/Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../services/api";

export default function AdminEvents() {
    const [searchQuery, setSearchQuery] = useState("");
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editDate, setEditDate] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await api.get("/events");
            setEvents(response.data.events);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (event) => {
        setEventToDelete(event);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/events/${eventToDelete.id}`);
            alert("Event deleted successfully!");
            fetchEvents(); // Refresh the list
        } catch (error) {
            console.error("Delete error:", error);
            alert(error.response?.data?.message || "An error occurred while deleting the event");
        } finally {
            setDeleteDialogOpen(false);
            setEventToDelete(null);
        }
    };

    const handleEditClick = (event) => {
        setEventToEdit(event);
        setEditTitle(event.title);
        setEditDescription(event.description || "");
        // Convert database date format to input date format
        const date = new Date(event.event_date);
        const formattedDate = date.toISOString().split('T')[0];
        setEditDate(formattedDate);
        setEditDialogOpen(true);
    };

    const handleEditSave = async () => {
        try {
            await api.put(`/events/${eventToEdit.id}`, {
                title: editTitle,
                description: editDescription,
                event_date: editDate
            });
            alert("Event updated successfully!");
            fetchEvents(); // Refresh the list
        } catch (error) {
            console.error("Update error:", error);
            alert(error.response?.data?.message || "An error occurred while updating the event");
        } finally {
            setEditDialogOpen(false);
            setEventToEdit(null);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                        Manage Events
                    </Typography>
                    <Typography sx={{ color: "#64748b", fontSize: 16, fontWeight: 500 }}>
                        View and manage all college events
                    </Typography>
                </Box>

                {/* Search Bar */}
                <TextField
                    fullWidth
                    placeholder="Search events by name..."
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

                {/* Loading State */}
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* Events Grid */}
                {!loading && (
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
                                    {event.description && (
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
                                    )}

                                    {/* Action Buttons */}
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<EditIcon />}
                                            onClick={() => handleEditClick(event)}
                                            sx={{
                                                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                                color: "white",
                                                fontWeight: 700,
                                                textTransform: "none",
                                                py: 1.5,
                                                borderRadius: 2.5,
                                                fontSize: 15,
                                                boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
                                                "&:hover": {
                                                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                                    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.5)",
                                                    transform: "translateY(-2px)",
                                                },
                                                transition: "all 0.3s ease",
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteClick(event)}
                                            sx={{
                                                color: "#dc2626",
                                                borderColor: "#dc2626",
                                                fontWeight: 700,
                                                textTransform: "none",
                                                py: 1.5,
                                                borderRadius: 2.5,
                                                fontSize: 15,
                                                borderWidth: 2,
                                                "&:hover": {
                                                    borderColor: "#b91c1c",
                                                    background: "rgba(220, 38, 38, 0.05)",
                                                    borderWidth: 2,
                                                },
                                                transition: "all 0.3s ease",
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}

                {/* No Results Message */}
                {!loading && filteredEvents.length === 0 && (
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

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Event</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete "{eventToDelete?.title}"? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Event Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField
                            label="Event Title"
                            fullWidth
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                        />
                        <TextField
                            label="Event Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                        />
                        <TextField
                            label="Event Date"
                            type="date"
                            fullWidth
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSave} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
