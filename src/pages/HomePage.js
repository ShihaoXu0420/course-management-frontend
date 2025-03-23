// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = () => {
    return (
        <Container>
            <h1>Welcome to the Registration Management App</h1>
            <p>Manage your majors, students, courses, and registrations with ease.</p>

            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Majors</Card.Title>
                            <Card.Text>
                                Manage academic majors. Create, edit, and delete major programs.
                            </Card.Text>
                            <Link to="/majors">
                                <Button variant="primary">Go to Majors</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Students</Card.Title>
                            <Card.Text>
                                Manage student records. Add, update, and remove student information.
                            </Card.Text>
                            <Link to="/students">
                                <Button variant="primary">Go to Students</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Courses</Card.Title>
                            <Card.Text>
                                Manage course offerings. Define course details and schedules.
                            </Card.Text>
                            <Link to="/courses">
                                <Button variant="primary">Go to Courses</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Registrations</Card.Title>
                            <Card.Text>
                                Manage course registrations. Enroll students in courses and track their progress.
                            </Card.Text>
                            <Link to="/registrations">
                                <Button variant="primary">Go to Registrations</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
