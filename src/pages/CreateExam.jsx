import React, { useState } from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Box,
    IconButton,
    TextField,
    Stepper,
    Step,
    StepLabel,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

// Custom theme for the stepper
const theme = createTheme({
    components: {
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    '&.Mui-completed': {
                        color: '#C0582F',
                    },
                    '&.Mui-active': {
                        color: '#C0582F',
                    },
                    color: '#8E2839',
                },
            },
        },
    },
});

const CreateExam = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [testName, setTestName] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [questionCounts, setQuestionCounts] = useState({
        multipleChoice: 0,
        trueFalse: 0,
        identification: 0,
    });

    const availableFiles = [
        { id: 1, name: "Test Bank 1", mc: 50, tf: 20, id: 30 },
        { id: 2, name: "Test Bank 2", mc: 30, tf: 15, id: 25 },
        { id: 3, name: "Test Bank 3", mc: 40, tf: 25, id: 35 },
    ];

    const steps = ["Name Your Test", "Select Test Banks", "Question Selection", "Summary"];

    const handleFileSelect = (file) => {
        if (!selectedFiles.find((f) => f.id === file.id)) {
            setSelectedFiles([...selectedFiles, file]);
        }
    };

    const handleFileRemove = (fileId) => {
        setSelectedFiles(selectedFiles.filter((f) => f.id !== fileId));
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: "#15133D" }}>
                            Name Your Test
                        </Typography>
                        <TextField
                            fullWidth
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                            placeholder="Enter test name"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#8E2839',
                                        borderWidth: '1.5px',
                                    },
                                },
                            }}
                        />
                    </Box>
                );

            case 1:
                return (
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ 
                                height: "100%", 
                                border: "1.5px solid #8E2839",
                                borderRadius: 3,
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: "#15133D" }}>
                                        Available Test Banks
                                    </Typography>
                                    {availableFiles.map((file) => (
                                        <Card
                                            key={file.id}
                                            onClick={() => handleFileSelect(file)}
                                            sx={{
                                                mb: 1,
                                                cursor: "pointer",
                                                '&:hover': {
                                                    backgroundColor: "#FFF1E8",
                                                },
                                                border: "1px solid #C0582F",
                                            }}
                                        >
                                            <CardContent>
                                                <Typography>{file.name}</Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ 
                                height: "100%",
                                border: "1.5px solid #8E2839",
                                borderRadius: 3,
                            }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: "#15133D" }}>
                                        Selected Test Banks
                                    </Typography>
                                    {selectedFiles.map((file) => (
                                        <Box
                                            key={file.id}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mb: 1,
                                                p: 1,
                                                border: "1px solid #C0582F",
                                                borderRadius: 1,
                                            }}
                                        >
                                            <Typography>{file.name}</Typography>
                                            <IconButton
                                                onClick={() => handleFileRemove(file.id)}
                                                sx={{ color: "#8E2839" }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                );

            case 2:
                return (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: "#15133D" }}>
                            Question Selection
                        </Typography>
                        {selectedFiles.map((file) => (
                            <Card
                                key={file.id}
                                sx={{
                                    mb: 3,
                                    border: "1.5px solid #8E2839",
                                    borderRadius: 3,
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6">{file.name}</Typography>
                                    <Grid container spacing={3} sx={{ mt: 1 }}>
                                        <Grid item xs={12} md={4}>
                                            <Typography>Multiple Choice (Available: {file.mc})</Typography>
                                            <TextField
                                                type="number"
                                                fullWidth
                                                InputProps={{
                                                    inputProps: { min: 0, max: file.mc }
                                                }}
                                                onChange={(e) =>
                                                    setQuestionCounts({
                                                        ...questionCounts,
                                                        multipleChoice: parseInt(e.target.value) || 0,
                                                    })
                                                }
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#C0582F',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography>True/False (Available: {file.tf})</Typography>
                                            <TextField
                                                type="number"
                                                fullWidth
                                                InputProps={{
                                                    inputProps: { min: 0, max: file.tf }
                                                }}
                                                onChange={(e) =>
                                                    setQuestionCounts({
                                                        ...questionCounts,
                                                        trueFalse: parseInt(e.target.value) || 0,
                                                    })
                                                }
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#C0582F',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography>Identification (Available: {file.id})</Typography>
                                            <TextField
                                                type="number"
                                                fullWidth
                                                InputProps={{
                                                    inputProps: { min: 0, max: file.id }
                                                }}
                                                onChange={(e) =>
                                                    setQuestionCounts({
                                                        ...questionCounts,
                                                        identification: parseInt(e.target.value) || 0,
                                                    })
                                                }
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#C0582F',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                );

            case 3:
                return (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: "#15133D" }}>
                            Summary
                        </Typography>
                        <Card sx={{ 
                            border: "1.5px solid #8E2839",
                            borderRadius: 3,
                        }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>Test Name: {testName}</Typography>
                                <Typography>Selected Files: {selectedFiles.length}</Typography>
                                <Typography>Multiple Choice Questions: {questionCounts.multipleChoice}</Typography>
                                <Typography>True/False Questions: {questionCounts.trueFalse}</Typography>
                                <Typography>Identification Questions: {questionCounts.identification}</Typography>
                                <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                                    Total Questions: {questionCounts.multipleChoice + questionCounts.trueFalse + questionCounts.identification}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: "#15133D" }}>
                    Create Exam
                </Typography>

                <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {renderStepContent(currentStep)}

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                    {currentStep > 0 && (
                        <Button
                            onClick={handleBack}
                            variant="outlined"
                            sx={{
                                borderRadius: "10px",
                                padding: "5px 20px",
                                fontSize: "0.8rem",
                                border: "1.5px solid #8E2839",
                                color: "#15133D",
                            }}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={handleNext}
                        variant="contained"
                        sx={{
                            borderRadius: "10px",
                            padding: "5px 20px",
                            fontSize: "0.8rem",
                            backgroundColor: "#8E2839",
                            "&:hover": { backgroundColor: "#720E07" },
                        }}
                    >
                        {currentStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default CreateExam;