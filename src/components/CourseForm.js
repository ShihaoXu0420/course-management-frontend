import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getMajors } from '../api';

const CourseForm = ({ onSubmit, initialValues = {}, onCancel }) => {
    const [course, setCourse] = useState({
        id: null,
        name: '',
        major: '',
        description: '',
        ...initialValues
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
        setCourse({
            id: initialValues.id || null,
            name: initialValues.name || '',
            major: initialValues.major || '',
            description: initialValues.description || ''
        });
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(course);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formCourseName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={course.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCourseMajor">
                <Form.Label>Major:</Form.Label>
                <Form.Control
                    as="select"
                    name="major"
                    value={course.major}
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

            <Form.Group className="mb-3" controlId="formCourseDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                    required
                />
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

export default CourseForm;
