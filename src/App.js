import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/firebase';

import Navbar from './components/Layout/Navbar';
import ResponsiveWrapper from './components/Layout/ResponsiveWrapper';
import StudentList from './components/Students/StudentList';
import StudentForm from './components/Students/StudentForm';
import StudentDetails from './components/Students/StudentDetails';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import './App.css'; // Global styles

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="app-loading">
        <p>Loading Application...</p>
        {/* You can add a more sophisticated spinner here */}
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <ResponsiveWrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<StudentList />} // StudentList itself is public
          />
          <Route
            path="/add-student"
            element={
              <PrivateRoute>
                <StudentForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/:studentId"
            element={
              <PrivateRoute>
                <StudentDetails />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </ResponsiveWrapper>
    </Router>
  );
}

export default App;