import React, { useState, useEffect } from 'react';
import { getCourses, getCourseRegistrations } from '../api';
import { Container, Alert } from 'react-bootstrap';
import RegistrationList from '../components/RegistrationList';

const RegistrationsPage = () => {
    const [registrationMap, setRegistrationMap] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const allCourses = (await getCourses())['courses'];
            const registrations = await Promise.all(
                allCourses.map(course => getCourseRegistrations(course.id))
            );

            const courseRegistrationMap = allCourses.map((course, index) => ({
              'id': course.id,
              'name': course.name,
              'registrations': registrations[index]['courseRegistrations']
            }));

            setRegistrationMap(courseRegistrationMap);

        } catch (err) {
            setError(err.message || 'Failed to load courses.');
        }
    };

    return (
        <Container>
            <h2 className="mb-5">Course Registrations</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <RegistrationList registrationMap={registrationMap} />
        </Container>
    );
};

export default RegistrationsPage;
