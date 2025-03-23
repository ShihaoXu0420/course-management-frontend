import React from 'react';
import { Table, Button } from 'react-bootstrap';

const StudentList = ({ students, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Major</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.major}</td>
                        <td>
                            <Button variant="primary" size="sm" onClick={() => onEdit(student)}>
                                Edit
                            </Button>{' '}
                            <Button variant="danger" size="sm" onClick={() => onDelete(student.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default StudentList;
