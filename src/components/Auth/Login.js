import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, googleProvider, signInWithPopup } from '../../services/firebase';
import './Login.css'; // Create this file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleEmailPasswordSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-primary">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <button onClick={handleGoogleSignIn} className="btn btn-google">
        Sign in with Google
      </button>
      <button onClick={() => setIsRegistering(!isRegistering)} className="btn btn-secondary">
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default Login;