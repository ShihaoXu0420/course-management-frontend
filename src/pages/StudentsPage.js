import React, { useState, useEffect } from 'react';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import ConfirmationModal from '../components/ConfirmationModal';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../api';
import { Container, Button, Alert } from 'react-bootstrap';

const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [studentToDeleteId, setStudentToDeleteId] = useState(null);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data['students']);
        } catch (err) {
            setError(err.message || 'Failed to load students.');
        }
    };

    const handleCreateStudent = async (studentData) => {
        try {
            await createStudent(studentData);
            loadStudents();
            setShowForm(false);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to create student.');
        }
    };

    const handleUpdateStudent = async (studentData) => {
        try {
            await updateStudent(studentData);
            loadStudents();
            setShowForm(false);
            setEditingStudent(null);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to update student.');
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setShowForm(true);
    };

    const handleCancelEdit = () => {
        setEditingStudent(null);
        setShowForm(false);
    };

    const handleDeleteStudent = async (id) => {
        try {
            await deleteStudent(id);
            loadStudents();
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to delete student.');
        } finally {
            setStudentToDeleteId(null);
            setShowConfirmationModal(false);
        }
    }

    const handleOpenConfirmationModal = (id) => {
      setStudentToDeleteId(id);
      setShowConfirmationModal(true);
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
        setStudentToDeleteId(null);
    };

    return (
        <Container>
            <h2 className="mb-5">Students</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button className="mb-3" variant="primary" onClick={() => setShowForm(true)}>
                Create New Student
            </Button>

            {showForm && (
                <StudentForm
                    onSubmit={editingStudent ? handleUpdateStudent : handleCreateStudent}
                    initialValues={editingStudent || {}}
                    onCancel={handleCancelEdit}
                />
            )}

            <StudentList
                students={students}
                onEdit={handleEdit}
                onDelete={handleOpenConfirmationModal}
            />

            <ConfirmationModal
                isOpen={showConfirmationModal}
                onConfirm={() => handleDeleteStudent(studentToDeleteId)}
                onCancel={handleCloseConfirmationModal}
                message="Are you sure you want to delete this student?"
            />
        </Container>
    );
};

export default StudentsPage;
