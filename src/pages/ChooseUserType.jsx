// src/pages/ChooseUserType.jsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChooseUserType = () => {
    const navigate = useNavigate();

    const handleProfessor = () => {
        navigate('/professor');
    };


    const handleStudent = () => {
        navigate('/student');
    };

    return (
        <Container sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Exam Generator
            </Typography>
            <Typography variant="h6" gutterBottom>
                Please select your user type:
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleProfessor}>
                    Professor
                </Button>
                <Button variant="contained" color="secondary" onClick={handleStudent}>
                    Student
                </Button>
            </Box>
        </Container>
    );
};

export default ChooseUserType;
