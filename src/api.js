// src/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// --- Generic Helper Functions ---
const handleGetResponse = (response) => {
    if (response.status >= 200 && response.status < 300) {
        console.log('Get:');
        console.log(response.data.data);
        return response.data.data;
    } else {
        throw new Error(`Request failed with status ${response.status}`);
    }
};

const handleCreateResponse = (response) => {
    if (response.status >= 200 && response.status < 300) {
        console.log('Create:');
        console.log(response.data);
        return response.data;
    } else {
        throw new Error(`Request failed with status ${response.status}`);
    }
};

const handleUpdateResponse = (response) => {
    if (response.status >= 200 && response.status < 300) {
        console.log('Update:');
        console.log(response.data);
        return response.data;
    } else {
        throw new Error(`Request failed with status ${response.status}`);
    }
};

const handleDeleteResponse = (response) => {
    if (response.status >= 200 && response.status < 300) {
        console.log('Delete:');
        console.log(response.data);
        return response.data;
    } else {
        throw new Error(`Request failed with status ${response.status}`);
    }
};

const handleError = (error) => {
    console.error("API Error:", error);
    throw error; // Re-throw to be caught by the component
};


// --- Majors API ---
export const getMajors = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/majors`);
        return handleGetResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const createMajor = async (majorData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/majors`, majorData);
        return handleCreateResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const updateMajor = async (majorData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/majors/edit`, majorData);
        return handleUpdateResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const deleteMajor = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/majors/${id}`);
        return handleDeleteResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// --- Students API ---
export const getStudents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/students`);
        return handleGetResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const getStudent = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/students/${id}`);
        return handleGetResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const createStudent = async (studentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/students`, studentData);
        return handleCreateResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const updateStudent = async (studentData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/students/edit`, studentData);
        return handleUpdateResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const deleteStudent = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/students/${id}`);
        return handleDeleteResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// --- Courses API ---
export const getCourses = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/courses`);
        return handleGetResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const getCourse = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/courses/${id}`);
        return handleGetResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const createCourse = async (courseData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/courses`, courseData);
        return handleCreateResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const updateCourse = async (courseData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/courses/edit`, courseData);
        return handleUpdateResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const deleteCourse = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/courses/${id}`);
        return handleDeleteResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// --- Course Registrations API ---
export const getCourseRegistrations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/course-registrations`);
        return handleGetResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const getCourseRegistration = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/course-registrations/${id}`);
        return handleGetResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const createCourseRegistration = async (registrationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/course-registrations`, registrationData);
        return handleCreateResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const updateCourseRegistration = async (registrationData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/course-registrations/edit`, registrationData);
        return handleUpdateResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const deleteCourseRegistration = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/course-registrations/${id}`);
        return handleDeleteResponse(response);
    } catch (error) {
        return handleError(error);
    }
};
