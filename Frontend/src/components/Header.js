import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../context/AuthContext";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  body {
    font-family: 'Poppins', sans-serif;
  }
`;

const StyledNavbar = styled(Navbar)`
  transition: background-color 0.3s, box-shadow 0.3s;
  background: #121212; /* Sleek dark background */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.6); /* Darker shadow for depth */
  padding: 0.7rem 1.5rem;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const StyledCollapse = styled(Navbar.Collapse)`
  background-color: ${(props) => (props.expand ? "rgba(18, 18, 18, 0.9)" : "transparent")}; /* Darker background when expanded */
  transition: background-color 0.3s ease-in-out;
`;

const StyledNavLink = styled(Nav.Link)`
  color: #ffffff !important; /* White text */
  margin: 0 20px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  text-decoration: none !important;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #00bcd4 !important; /* Light blue on hover */
    text-shadow: 0 0 10px #00bcd4;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    text-align: center;
  }
`;

const StyledButton = styled.button`
  color: #000000 !important; /* Black text on button */
  border: 2px solid #00bcd4 !important; /* Light blue border */
  padding: 5px 15px;
  background-color: #00bcd4 !important; /* Light blue background */
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #ffffff !important; /* White text on hover */
    background-color: #ff4081 !important; /* Pink background on hover */
    border-color: #ff4081 !important; /* Pink border on hover */
  }

  @media (max-width: 768px) {
    display: block;
    margin: 10px auto;
    width: auto;
    text-align: center;
  }
`;

const StyledNavbarBrandText = styled.span`
  color: #00bcd4; /* Light blue text */
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(0, 188, 212, 0.7);
  font-family: 'Poppins', sans-serif;

  &:hover {
    color: #ff4081 !important; /* Pink on hover */
    text-shadow: 0 0 10px #ff4081;
  }

  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
  }
`;

const CenteredUsername = styled.div`
  color: #ff4081; /* Pink text for username */
  font-size: 1.2rem;
  font-weight: 700; /* Bold text */
  text-shadow: 0 0 5px rgba(255, 64, 129, 0.8); /* Pink glow */
  font-family: 'Poppins', sans-serif;
  margin-right: 30px;
`;

function Header() {
  const { user, isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = async () => {
    await logout();
    setExpanded(false);
    navigate("/login");
  };

  const handleSelect = () => {
    setExpanded(false);
  };

  return (
    <>
      <GlobalStyle />
      <StyledNavbar expand="md" fixed="top" navColour={true} expanded={expanded}>
        <Container>
          <Navbar.Brand href="/" className="d-flex">
            <StyledNavbarBrandText>Mindscape</StyledNavbarBrandText>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <StyledCollapse id="responsive-navbar-nav">
            <Nav className="ms-auto" defaultActiveKey="#home" onSelect={handleSelect}>
              <Nav.Item>
                <StyledNavLink as={Link} to="/" onClick={handleSelect}>
                  Home
                </StyledNavLink>
              </Nav.Item>

              {!isAuth && (
                <>
                  <Nav.Item>
                    <StyledNavLink as={Link} to="/login" onClick={handleSelect}>
                      Login
                    </StyledNavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <StyledNavLink as={Link} to="/register" onClick={handleSelect}>
                      Register
                    </StyledNavLink>
                  </Nav.Item>
                </>
              )}
              
              {isAuth &&  (
                <>
                  <Nav.Item>
                    <StyledNavLink as={Link} to="/chat" onClick={handleSelect}>
                      AI Therapist
                    </StyledNavLink>
                  </Nav.Item>

                  <Nav.Item>
                    <StyledNavLink as={Link} to="/quiz" onClick={handleSelect}>
                      Mental Health Quiz
                    </StyledNavLink>
                  </Nav.Item>
                  
                  <Nav.Item>
                    <StyledNavLink as={Link} to="/speech" onClick={handleSelect}>
                      Speech Recognition
                    </StyledNavLink>
                  </Nav.Item>

                  <Nav.Item>
                    <StyledNavLink as={Link} to="/dashboard" onClick={handleSelect}>
                      Dashboard
                    </StyledNavLink>
                  </Nav.Item>

                  <Nav.Item>
                    <StyledButton onClick={handleLogout}>
                      Logout
                    </StyledButton>
                  </Nav.Item>


                </>
              )}
            </Nav>
          </StyledCollapse>
        </Container>
      </StyledNavbar>
    </>
  );
}

export default Header;
