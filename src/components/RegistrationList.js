import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegistrationList = ({ registrationMap }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Number of Students</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {registrationMap.map(course => (
                    <tr key={course.id}>
                        <td>{course.name}</td>
                        <td>{course.registrations.length}</td>
                        <td>
                            <Link to={`/registrations/${course.id}`} state={{ registrationData: course }}>
                              <Button variant="primary">Go to Registrations</Button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default RegistrationList;
