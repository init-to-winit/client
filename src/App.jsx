import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignupForm from "./pages/Signup";
import VismohLoginPage from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Dietary from "./pages/Dietary";
import Healthcare from "./pages/Healthcare";
import Performance from "./pages/Performance";
import Sponsors from "./pages/Sponsors";
import Coaches from "./pages/Coaches";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<VismohLoginPage />} />

        {/* Routes wrapped with Layout to include Sidebar */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dietary" element={<Dietary />} />
          <Route path="healthcare" element={<Healthcare />} />
          <Route path="performance" element={<Performance />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="coaches" element={<Coaches />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
