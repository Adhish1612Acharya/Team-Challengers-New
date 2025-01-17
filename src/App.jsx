import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import TeamMembers from './pages/TeamMembers';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Admin from './pages/admin/Admin';
import AddMember from './pages/admin/AddMember';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<TeamMembers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/login" element={user ? <Navigate to="/admin" /> : <Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/admin/add-member" element={
              <ProtectedRoute>
                <AddMember />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;