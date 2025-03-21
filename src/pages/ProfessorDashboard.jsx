// src/pages/ProfessorDashboard.jsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfessorDashboard = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Professor Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
                Choose an option:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => navigate('/professor/create?mode=wizard')}
                >
                    Create Exam with Wizard
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate('/professor/create?mode=scratch')}
                >
                    Create Exam from Scratch
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate('/professor/exams')}
                >
                    View Existing Exams
                </Button>
            </Box>
        </Container>
    );
};

export default ProfessorDashboard;
