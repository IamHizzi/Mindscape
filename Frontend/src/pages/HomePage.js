import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user, isAuth, logout } = useContext(AuthContext); // Destructure the logout function from AuthContext
  const navigate = useNavigate();

  const handleChatNow = () => {
    if (isAuth) {
      navigate('/chat');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function to log out the user
    navigate('/login'); // Redirect to the login page after logging out
  };

  return (
    <div
      className="card p-4"
      style={{
        maxWidth: '850px',
        margin: 'auto',
        marginTop: '3rem',
        backgroundColor: '#121212', /* Deep black background */
        color: '#fff',
        borderRadius: '15px',
        padding: '3rem',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.6)', /* Subtle shadow */
        textAlign: 'center',
        border: '2px solid #00bcd4', /* Light blue border */
      }}
    >
      {isAuth && user ? (
        <h3
          className="gradientText text-center"
          style={{
            fontWeight: 'bold',
            fontSize: '2.5rem',
            color: '#ff4081', /* Pink color for authenticated user */
            textShadow: '0px 0px 10px rgba(255, 64, 129, 0.6)', /* Pink glow */
          }}
        >
          Hey, <strong>{user.username}</strong>!
        </h3>
      ) : (
        <h2
          className="gradientText text-center"
          style={{
            fontWeight: 'bold',
            fontSize: '2.5rem',
            color: '#ff4081', /* Pink color for Welcome, User */
            textShadow: '0px 0px 10px rgba(255, 64, 129, 0.6)', /* Pink glow */
          }}
        >
          Welcome, User!
        </h2>
      )}
      <div className="infoText mt-4 text-center" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc' }}>
        <p>
          <strong>Mindscape</strong> is a <span style={{ color: '#00bcd4', fontWeight: 'bold' }}>modern mental health assistant</span>, always available for you.
        </p>
        <p>
          Anytime you need to talk, <strong style={{ color: '#00bcd4' }}>Mindscape</strong> is here.
        </p>
      </div>

      <div className="text-center mt-5">
        <button
          className="btn btn-primary"
          style={{
            padding: '15px 60px',
            fontSize: '1.3rem',
            borderRadius: '30px',
            backgroundColor: '#00bcd4',
            color: '#000',
            fontWeight: 'bold',
            boxShadow: '0 0 20px rgba(0, 188, 212, 0.5)',
            transition: 'transform 0.3s ease',
            marginRight: '10px', // Spacing between buttons
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          onClick={handleChatNow}
        >
          Start Chat
        </button>
        
      </div>

      <div className="row mt-5">
          <div className="col-md-4">
            <div className="card h-100" style={{ backgroundColor: '#2e2e2e', border: 'none' }}>
              <img
                src="data:image/png;base64,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" // Replace with actual image URL
                className="card-img-top"
                alt="24/7 Availability"
                style={{ borderRadius: '10px' }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#00bcd4' }}>24/7 Availability</h5>
                <p className="card-text" style={{ color: '#ccc' }}>
                  Mindscape is here for you at any time, ready to provide mental support whenever you need it.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100" style={{ backgroundColor: '#2e2e2e', border: 'none' }}>
              <img
                src="data:image/png;base64,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" // Replace with actual image URL
                className="card-img-top"
                alt="Personalized Sessions"
                style={{ borderRadius: '10px' }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#00bcd4' }}>Personalized Sessions</h5>
                <p className="card-text" style={{ color: '#ccc' }}>
                  Mindscape can manage therapeutic activities, 
                  including guided meditation and
                  relaxation techniques.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100" style={{ backgroundColor: '#2e2e2e', border: 'none' }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj1HhWuwwd45lQgaxLbfiOr9iNPjZNbbPJXOrIQxR3cwdqEzpS5DmBtAjqaHNn8-FD9iE&usqp=CAU.placeholder.com/300x200" // Replace with actual image URL
                className="card-img-top"
                alt="Anonymity & Security"
                style={{ borderRadius: '10px' }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#00bcd4' }}>Anonymity & Security</h5>
                <p className="card-text" style={{ color: '#ccc' }}>
                  Your privacy and security are our top priorities. Your sessions are fully confidential.
                </p>
              </div>
            </div>
          </div>
        </div>

      <footer className="text-center mt-5">
        <p style={{ color: '#00bcd4', fontSize: '1.2rem' }}></p>
      </footer>
    </div>
  );
};

export default HomePage;
