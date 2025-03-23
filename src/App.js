// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MajorsPage from './pages/MajorsPage';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';
// import RegistrationsPage from './pages/RegistrationsPage';
import HomePage from './pages/HomePage'; // Import the HomePage component
import { Container, Navbar, Nav } from 'react-bootstrap'; // Import Bootstrap components
import './App.css'; // Optional global styles

function App() {
    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>Registration App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/majors">Majors</Nav.Link>
                            <Nav.Link as={Link} to="/students">Students</Nav.Link>
                            <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                            {/*<Nav.Link as={Link} to="/registrations">Registrations</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-3">
                <Routes>
                    <Route path="/majors" element={<MajorsPage />} />
                    <Route path="/students" element={<StudentsPage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    {/*<Route path="/registrations" element={<RegistrationsPage />} /> */}
                    <Route path="/" element={<HomePage />} /> {/* Home page route */}
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
