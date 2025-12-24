import { useEffect, useState } from "react"
import api from "../services/api"


export default function Events(){
    // const [events, setEvents] = useState([]);
    // const [error, setError] = useState("");

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         try {
    //             const res = await api.get("/events");
    //             setEvents(res.data.events);
    //         } catch(err) {
    //             setError(err.respone?.data?.message || "Failed to load events");
    //         }
    //     };
    //     fetchEvents();
    // }, []);

    return (
        <div>
            <h2>Events</h2>

            {/* {error && <p style={{color: "red"}}>{error}</p>}

            {events.map(event) => (
                <div key={event.id}>
                    <h3>{event.tile}</h3>
                    <p>{event.description}</p>
                    <p>Date: {event.event_date}</p>
                    <p>Created by: {event.created_by}</p>

                    <hr />
                </div>
            )} */}
        </div>
    );
}