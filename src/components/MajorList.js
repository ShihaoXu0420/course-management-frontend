// src/components/MajorList.js
import React from 'react';
import { Table, Button } from 'react-bootstrap'; // Import React Bootstrap components

const MajorList = ({ majors, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {majors.map(major => (
                    <tr key={major.id}>
                        <td>{major.name}</td>
                        <td>
                            <Button variant="primary" size="sm" onClick={() => onEdit(major)}>
                                Edit
                            </Button>{' '}
                            <Button variant="danger" size="sm" onClick={() => onDelete(major.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default MajorList;
