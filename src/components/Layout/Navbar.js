import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signOut as firebaseSignOut } from '../../services/firebase';
import './Navbar.css'; // Create this file for styling

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Student Dashboard</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {user && <li><Link to="/add-student">Add Student</Link></li>}
        {user ? (
          <li><button onClick={handleLogout} className="logout-button">Logout ({user.email})</button></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;