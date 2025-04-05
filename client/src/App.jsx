import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import HomePage from "./pages/home/HomePage";
import Admin_home from "./Admin/Admin_home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/admin-page" element={<Admin_home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
