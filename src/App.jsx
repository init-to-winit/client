import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Landing from './pages/Landing';
import SignupForm from './pages/Signup';
import VismohLoginPage from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Dietary from './pages/Dietary';
import Healthcare from './pages/Healthcare';
import Coaches from './pages/Coaches';
import RunnerStatsTable from './components/LeaderBoard';
import Players from './pages/Players';
import AthleteProfile from './pages/AthleteProfile';
import Requests from './pages/Requests';
import Chatbot from './pages/Chatbot';
import VideoAnalyzer from './components/video/VideoUpload';
import Communication from './pages/Communication';
import 'leaflet/dist/leaflet.css';
import CoachProfile from './pages/CoachProfile';
import SponsorProfile from './pages/SponsorProfile';
import SportsList from './pages/SportsRules';
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
              <Route
                path="/athleteProfile/:athleteId"
                element={<AthleteProfile />}
              />
              <Route path="communication" element={<Communication />} />

              <Route path="video-analysis" element={<VideoAnalyzer />} />
              <Route path="requests" element={<Requests />} />
              <Route path="help" element={<Chatbot />} />
              <Route path="coachProfile/:id" element={<CoachProfile />} />
              <Route path="sponsorProfile/:id" element={<SponsorProfile />} />
              <Route path="sportsRules" element={<SportsList />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
