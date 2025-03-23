// src/components/ConfirmationModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
    return (
        <Modal show={isOpen} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
