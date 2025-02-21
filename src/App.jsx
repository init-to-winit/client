import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignupForm from "./pages/Signup";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element = {<SignupForm />} />
      </Routes>
    </Router>
  );
};

export default App;