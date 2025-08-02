import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import VoiceIntake from './pages/VoiceIntake';
import Matches from './pages/Matches';
import QuickConnect from './pages/QuickConnect';
import Safety from './pages/Safety';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/voice-intake" element={<VoiceIntake />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/find-roommate" element={<Matches />} />
          <Route path="/quick-connect" element={<QuickConnect />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
