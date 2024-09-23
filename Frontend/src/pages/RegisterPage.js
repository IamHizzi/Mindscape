import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    
    // Simulate API delay with a timeout
    setTimeout(() => {
      try {
        // Save user details to localStorage
        const userDetails = { username, email, password };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        // Redirect to login page after successful registration
        navigate('/login');
      } catch (error) {
        setError('Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1000); // Simulating a 1 second delay
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center" style={{ color: '#00bcd4', fontWeight: "bold" }}>Register</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <form
        onSubmit={submitHandler}
        className="mx-auto shadow p-4 rounded"
        style={{
          maxWidth: '400px',
          minHeight: '500px',
          border: '2px solid #00bcd4', /* Light blue border */
          backgroundColor: '#121212', /* Dark background */
        }}
      >
        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#00bcd4' }}>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              borderColor: '#00bcd4',
              borderWidth: '2px',
              backgroundColor: '#333', /* Darker input background */
              color: 'white',
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#00bcd4' }}>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderColor: '#00bcd4',
              borderWidth: '2px',
              backgroundColor: '#333',
              color: 'white',
            }}
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
            style={{
              borderColor: '#00bcd4',
              borderWidth: '2px',
              backgroundColor: '#333',
              color: 'white',
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#00bcd4' }}>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              borderColor: '#00bcd4',
              borderWidth: '2px',
              backgroundColor: '#333',
              color: 'white',
            }}
          />
        </div>
        <div className="text-center mt-3">
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: '#00bcd4', /* Light blue background */
              color: 'black',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ff4081'; /* Change to pink on hover */
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#00bcd4'; /* Back to light blue */
              e.target.style.color = 'black';
            }}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
