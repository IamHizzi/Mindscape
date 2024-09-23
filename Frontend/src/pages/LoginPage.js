import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle login, retrieving user details from localStorage
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Retrieve user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));

    if (storedUser) {
      // Check if the entered email and password match the stored data
      if (storedUser.email === email && storedUser.password === password) {
        // If login is successful, navigate to the chat page or dashboard
        navigate('/');
      } else {
        // If login fails, display an error message
        setError('Login failed. Incorrect email or password.');
      }
    } else {
      setError('No user found. Please register first.');
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center" style={{ fontWeight: 'bold', color: '#00bcd4' }}>Login</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      
      {/* Login Form */}
      <form onSubmit={handleLogin} className="mx-auto shadow p-4 rounded" style={{ maxWidth: '500px', border: '2px solid #00bcd4', backgroundColor: '#121212' }}>
        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#00bcd4' }}>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ borderColor: '#00bcd4', borderWidth: '2px', backgroundColor: '#333', color: 'white' }}
          />
        </div>
        <br />
        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#00bcd4' }}>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ borderColor: '#00bcd4', borderWidth: '2px', backgroundColor: '#333', color: 'white' }}
          />
        </div>
        <div className="text-center mt-3">
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#00bcd4', color: 'black', fontWeight: 'bold' }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ff4081';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#00bcd4';
              e.target.style.color = 'black';
            }}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
