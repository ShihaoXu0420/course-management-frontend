// src/pages/MajorsPage.js
import React, { useState, useEffect } from 'react';
import MajorList from '../components/MajorList';
import MajorForm from '../components/MajorForm';
import ConfirmationModal from '../components/ConfirmationModal';
import { getMajors, createMajor, updateMajor, deleteMajor } from '../api';
import { Container, Button, Alert } from 'react-bootstrap';

const MajorsPage = () => {
    const [majors, setMajors] = useState([]);
    const [editingMajor, setEditingMajor] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [majorToDeleteId, setMajorToDeleteId] = useState(null);

    useEffect(() => {
        loadMajors();
    }, []);

    const loadMajors = async () => {
        try {
            const data = await getMajors();
            console.log("loadMajors");
            console.log(data['majors']);
            setMajors(data['majors']);
        } catch (err) {
            setError(err.message || 'Failed to load majors.');
        }
    };

    const handleCreateMajor = async (majorData) => {
        try {
            await createMajor(majorData);
            loadMajors();
            setShowForm(false);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to create major.');
        }
    };

    const handleUpdateMajor = async (majorData) => {
        try {
            console.log("handleUpdateMajor");
            console.log(majorData);
            await updateMajor(majorData);
            loadMajors();
            setShowForm(false);
            setEditingMajor(null);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to update major.');
        }
    };

    const handleDeleteMajor = async (id) => {
        try {
            await deleteMajor(id);
            loadMajors();
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to delete major.');
        } finally {
            setShowConfirmationModal(false);
            setMajorToDeleteId(null);
        }
    };

    const handleEdit = async (major) => {
        setEditingMajor(major);
        setShowForm(true);
    };

    const handleCancelEdit = () => {
        setEditingMajor(null);
        setShowForm(false);
    };

    const handleOpenConfirmationModal = (id) => {
        setMajorToDeleteId(id);
        setShowConfirmationModal(true);
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
        setMajorToDeleteId(null);
    };

    const getMajorForEdit = () => {
        if (!editingMajor) return {};

        const major = majors.find(m => m.id === editingMajor.id);
        return major || {};
    };

    return (
        <Container>
            <h2 className="mb-5">Majors</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button className="mb-3" variant="primary" onClick={() => setShowForm(true)}>
                Create New Major
            </Button>

            {showForm && (
                <MajorForm
                    onSubmit={editingMajor ? handleUpdateMajor : handleCreateMajor}
                    initialValues={getMajorForEdit()}
                    onCancel={handleCancelEdit}
                />
            )}

            <MajorList
                majors={majors}
                onEdit={handleEdit}
                onDelete={handleOpenConfirmationModal}
            />

            <ConfirmationModal
                isOpen={showConfirmationModal}
                onConfirm={() => handleDeleteMajor(majorToDeleteId)}
                onCancel={handleCloseConfirmationModal}
                message="Are you sure you want to delete this major?"
            />
        </Container>
    );
};

export default MajorsPage;
