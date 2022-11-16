import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login";
import Signup from "../Signup";
import Dashboard from "../Dashboard";
import PhoneVerify from "../PhoneVerify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="phone/verify" element={<PhoneVerify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
