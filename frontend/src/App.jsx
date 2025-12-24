import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Navbar from "./components/Navbar";



function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events" element={<Events />} />
    </Routes>
    </>
  )
}

export default App
