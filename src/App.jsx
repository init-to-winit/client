import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Landing from "./pages/Landing";
import SignupForm from "./pages/Signup";
import VismohLoginPage from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Dietary from "./pages/Dietary";
import Healthcare from "./pages/Healthcare";
import Coaches from "./pages/Coaches";
import RunnerStatsTable from "./components/LeaderBoard";
import Players from "./pages/Players";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<VismohLoginPage />} />

          {/* Protected Routes for Logged-in Users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dietary" element={<Dietary />} />
              <Route path="healthcare" element={<Healthcare />} />
              <Route path="sponsors" element={<Coaches person="sponsors" />} />
              <Route path="coaches" element={<Coaches person="coaches" />} />
              <Route path="leaderboard" element={<RunnerStatsTable />} />
              <Route path="players" element={<Players />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
