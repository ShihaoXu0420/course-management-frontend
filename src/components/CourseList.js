import React from 'react';
import { Table, Button } from 'react-bootstrap';

const CourseList = ({ courses, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Major</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {courses.map(course => (
                    <tr key={course.id}>
                        <td>{course.name}</td>
                        <td>{course.major}</td>
                        <td>{course.description}</td>
                        <td>
                            <Button variant="primary" size="sm" onClick={() => onEdit(course)}>
                                Edit
                            </Button>{' '}
                            <Button variant="danger" size="sm" onClick={() => onDelete(course.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default CourseList;
