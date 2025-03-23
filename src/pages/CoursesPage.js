import React, { useState, useEffect } from 'react';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';
import ConfirmationModal from '../components/ConfirmationModal';
import { getCourses, createCourse, updateCourse, deleteCourse, getMajors } from '../api';
import { Container, Button, Alert } from 'react-bootstrap';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [courseToDeleteId, setCourseToDeleteId] = useState(null);
    const [majors, setMajors] = useState([]);

    useEffect(() => {
        loadCourses();
        loadMajors();
    }, []);

    const loadCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data['courses']);
        } catch (err) {
            setError(err.message || 'Failed to load courses.');
        }
    };

    const loadMajors = async () => {
        try {
            const data = await getMajors();
            setMajors(data['majors']);
        } catch (err) {
            setError(err.message || 'Failed to load majors.');
        }
    };

    const handleCreateCourse = async (courseData) => {
        try {
            await createCourse(courseData);
            loadCourses();
            setShowForm(false);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to create course.');
        }
    };

    const handleUpdateCourse = async (courseData) => {
        try {
            await updateCourse(courseData);
            loadCourses();
            setShowForm(false);
            setEditingCourse(null);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to update course.');
        }
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setShowForm(true);
    };

    const handleCancelEdit = () => {
        setEditingCourse(null);
        setShowForm(false);
    };

    const handleDeleteCourse = async (id) => {
        try {
            await deleteCourse(id);
            loadCourses();
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to delete course.');
        } finally {
            setCourseToDeleteId(null);
            setShowConfirmationModal(false);
        }
    };

    const handleOpenConfirmationModal = (id) => {
        setCourseToDeleteId(id);
        setShowConfirmationModal(true);
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
        setCourseToDeleteId(null);
    };

    return (
        <Container>
            <h2 className="mb-5">Courses</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button className="mb-3" variant="primary" onClick={() => setShowForm(true)}>
                Create New Course
            </Button>

            {showForm && (
                <CourseForm
                    onSubmit={editingCourse ? handleUpdateCourse : handleCreateCourse}
                    initialValues={editingCourse || {}}
                    onCancel={handleCancelEdit}
                    majors={majors}
                />
            )}

            <CourseList
                courses={courses}
                onEdit={handleEdit}
                onDelete={handleOpenConfirmationModal}
            />

            <ConfirmationModal
                isOpen={showConfirmationModal}
                onConfirm={() => handleDeleteCourse(courseToDeleteId)}
                onCancel={handleCloseConfirmationModal}
                message="Are you sure you want to delete this course?"
            />
        </Container>
    );
};

export default CoursesPage;
