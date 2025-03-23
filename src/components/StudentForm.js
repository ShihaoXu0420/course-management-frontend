import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'; // Import React Bootstrap components
import { getMajors } from '../api'; // Import API function to get majors

const StudentForm = ({ onSubmit, initialValues = {}, onCancel }) => {
    const [student, setStudent] = useState({
        id: null,
        name: '',
        major: '',
        ...initialValues // Spread initial values for editing
    });

    const [majors, setMajors] = useState([]);

    useEffect(() => {
        const loadMajors = async () => {
            const data = await getMajors();
            setMajors(data['majors']);
        };
        loadMajors();
    }, []);

    useEffect(() => {
        setStudent({
            id: initialValues.id || null,
            name: initialValues.name || '',
            major: initialValues.major || ''
        });
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevStudent => ({
            ...prevStudent,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(student);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formStudentName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStudentMajor">
                <Form.Label>Major:</Form.Label>
                <Form.Control
                    as="select"
                    name="major"
                    value={student.major}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a major</option>
                    {majors.map(major => (
                        <option key={major.id} value={major.name}>
                            {major.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Save
            </Button>
            {onCancel && (
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            )}
        </Form>
    );
};

export default StudentForm;
