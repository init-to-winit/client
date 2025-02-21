import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignupForm from "./pages/Signup";
import VismohLoginPage from "./pages/Login";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element = {<SignupForm />} />
        <Route path="/login" element = {<VismohLoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;