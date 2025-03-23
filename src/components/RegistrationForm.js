import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getStudents, createCourseRegistration } from '../api';

const RegistrationForm = ({ courseName, onSuccess }) => {
    const [students, setStudents] = useState([]);
    const [selectedStudentName, setSelectedStudentName] = useState('');

    useEffect(() => {
        const loadStudents = async () => {
            try {
                const data = await getStudents();
                setStudents(data['students']);
            } catch (error) {
                console.error('Failed to load students:', error);
            }
        };

        loadStudents();
    }, []);

    const handleChange = (e) => {
        setSelectedStudentName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCourseRegistration({ courseName, studentName: selectedStudentName });
            onSuccess();
            setSelectedStudentName('');
        } catch (error) {
            console.error('Failed to create registration:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formStudentSelect">
                <Form.Label>Select Student:</Form.Label>
                <Form.Control as="select" value={selectedStudentName} onChange={handleChange} required>
                    <option value="">Select a student</option>
                    {students.map(student => (
                        <option key={student.id} value={student.name}>
                            {student.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    );
};

export default RegistrationForm;
