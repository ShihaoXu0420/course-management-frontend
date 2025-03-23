import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCourseRegistrations, deleteCourseRegistration } from '../api';
import RegistrationForm from '../components/RegistrationForm';
import { Container, Alert, ListGroup, Button } from 'react-bootstrap';

const RegistrationDetailPage = () => {
    const { id } = useParams();
    const pageLocation = useLocation();
    const registrationData = pageLocation.state.registrationData;
    const [registrations, setRegistrations] = useState(registrationData.registrations);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const loadRegistrations = async () => {
      try {
        const registrations = await getCourseRegistrations(id);
        setRegistrations(registrations['courseRegistrations']);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load registrations.');
      }
    }
    
    useEffect(() => {
      loadRegistrations();
    });

    const handleDeleteRegistration = async (registrationId) => {
        try {
            await deleteCourseRegistration(registrationId);
            setRefresh(!refresh);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to delete registration.');
        }
    };

    const [showForm, setShowForm] = useState(false);

    const handleFormSuccess = () => {
      setRefresh(!refresh);
      setShowForm(false);
    };

    return (
      <Container>
        <h2 className="mb-5">Registration Details</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <ListGroup>
          {registrations.map(registration => (
            <ListGroup.Item key={registration.id}>
              {registration.studentName}
              <Button
                variant="danger"
                className="float-end"
                onClick={() => handleDeleteRegistration(registration.id)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Button
          variant="primary"
          className="mt-3"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close Form' : 'Add Registration'}
        </Button>

        {showForm && (
          <RegistrationForm
            courseName={registrationData.name}
            onSuccess={handleFormSuccess}
          />
        )}
      </Container>
    );
};

export default RegistrationDetailPage;
