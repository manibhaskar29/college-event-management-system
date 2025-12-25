import { useEffect, useState } from "react"
import api from "../services/api"
import { getUserFromToken } from "../utils/auth";

export default function Events(){
    const [events, setEvents] = useState([]); // Initially events holds an empty array | Backend → data → setEvents → UI updates automatically
    const [error, setError] = useState("");
    const user = getUserFromToken();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get("/events"); // Axios automatically attaches JWT because of interceptor
                setEvents(res.data.events);
            } catch(err) {
                setError(err.response?.data?.message || "Failed to load events");
            }
        };
        fetchEvents();
    }, []); // [] Empty array means: Run this effect only once on page load

    const handleRegister = async (eventId) => {
        try {
            await api.post("/events/register", {
                event_id: eventId
            });
            alert("Successfully registered for event");
        }catch(err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };


    return (
        <div>
            <h2>Events</h2>

            {error && <p style={{color: "red"}}>{error}</p>}

            {events.map((event) => (
                <div key={event.id}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>Date: {event.event_date}</p>
                    <p>Created by: {event.created_by}</p>

                    {user?.role === "student" && (
                        <button onClick={() => handleRegister(event.id)}>
                            Register
                        </button>
                    )}
                    
                    <hr />
                </div>
            ))} 
        </div>
    );
}