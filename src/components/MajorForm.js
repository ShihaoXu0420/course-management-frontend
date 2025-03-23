// src/components/MajorForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'; // Import React Bootstrap components

const MajorForm = ({ onSubmit, initialValues = {}, onCancel }) => {
    const [major, setMajor] = useState({
        id: null,
        name: '',
        ...initialValues // Spread initial values for editing
    });

    useEffect(() => {
        setMajor({
            id: initialValues.id || null,
            name: initialValues.name || ''
        });
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMajor(prevMajor => ({
            ...prevMajor,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(major);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formMajorName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={major.name}
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

export default MajorForm;
