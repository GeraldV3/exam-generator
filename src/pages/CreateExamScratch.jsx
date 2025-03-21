import React, { useState } from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Box,
    Slide,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";
import testBank from "../data/TestBank";
import { jsPDF } from "jspdf";

const CreateExamScratch = () => {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [examTitle, setExamTitle] = useState("");
    const [page, setPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState("left");
    const [openModal, setOpenModal] = useState(false);
    const [questionType, setQuestionType] = useState("");

    const batchSize = 6;
    const totalPages = Math.ceil(testBank.length / batchSize);

    const startIndex = page * batchSize;
    const endIndex = startIndex + batchSize;
    const currentBatch = testBank.slice(startIndex, endIndex);

    const animationKey = page;

    const handleSelectQuestion = (question) => {
        if (!selectedQuestions.some((q) => q.id === question.id)) {
            setSelectedQuestions([...selectedQuestions, question]);
        }
    };

    const handleClearSelection = () => {
        setSelectedQuestions([]);
    };

    const handleDeleteQuestion = (questionId) => {
        setSelectedQuestions(selectedQuestions.filter(q => q.id !== questionId));
    };

    const generatePDF = (includeAnswers) => {
        const doc = new jsPDF();
        let y = 10;
        const pageHeight = doc.internal.pageSize.height;
        const lineHeight = 7;

        doc.setFontSize(16);
        doc.text(examTitle || "Generated Exam", 10, y);
        y += 10;
        doc.setFontSize(12);

        selectedQuestions.forEach((q, index) => {
            const questionText = `${index + 1}. ${q.question}`;
            const splitQuestion = doc.splitTextToSize(questionText, 180);

            if (y + splitQuestion.length * lineHeight > pageHeight - 10) {
                doc.addPage();
                y = 10;
            }

            doc.text(splitQuestion, 10, y);
            y += splitQuestion.length * lineHeight;

            if (includeAnswers) {
                const answerText = `Answer: ${q.answer}`;
                const splitAnswer = doc.splitTextToSize(answerText, 170);

                if (y + splitAnswer.length * lineHeight > pageHeight - 10) {
                    doc.addPage();
                    y = 10;
                }

                doc.text(splitAnswer, 15, y);
                y += splitAnswer.length * lineHeight;
            }

            y += 3;
        });

        doc.save(`${examTitle || "exam"}.pdf`);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setSlideDirection("left");
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setSlideDirection("right");
            setPage(page - 1);
        }
    };

    // Modal open/close handlers
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleQuestionTypeChange = (event) => {
        setQuestionType(event.target.value);
    };

    return (
        <Container sx={{ mt: 4, position: "relative" }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: "#15133D" }}>
                Create Exam
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Exam Title:</Typography>
                <input
                    type="text"
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "1.5px solid #8E2839",
                    }}
                    placeholder="Enter exam title..."
                />
            </Box>

            <Typography variant="h6" gutterBottom sx={{ color: "#15133D" }}>
                Questions:
            </Typography>
            <Box sx={{ position: "relative", overflow: "hidden", minHeight: "170px" }}>
                <Slide
                    direction={slideDirection}
                    in={true}
                    mountOnEnter
                    unmountOnExit
                    key={animationKey}
                    timeout={500}
                >
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        {currentBatch.map((q) => (
                            <Grid item xs={12} sm={6} md={4} key={q.id}>
                                <Card
                                    sx={{
                                        boxShadow: 3,
                                        borderRadius: 3,
                                        height: "150px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        backgroundColor: "#FFF",
                                        border: "1.5px solid #8E2839",
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            minHeight: "70px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography variant="body1">{q.question}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleSelectQuestion(q)}
                                            sx={{
                                                fontSize: "0.8rem",
                                                padding: "5px 10px",
                                                borderRadius: "10px",
                                                backgroundColor: "#8E2839",
                                                color: "#FFF1E8",
                                            }}
                                        >
                                            Add Question
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Slide>

                {page > 0 && (
                    <IconButton
                        onClick={handlePrevPage}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "10px",
                            transform: "translateY(-50%)",
                            backgroundColor: "#45050C",
                            "&:hover": { backgroundColor: "#720E07" },
                            zIndex: 1,
                            color: "#fff",
                        }}
                    >
                        <ArrowBackIosIcon fontSize="small" />
                    </IconButton>
                )}

                {page < totalPages - 1 && (
                    <IconButton
                        onClick={handleNextPage}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            backgroundColor: "#45050C",
                            "&:hover": { backgroundColor: "#720E07" },
                            zIndex: 1,
                            color: "#fff",
                        }}
                    >
                        <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>

            {/* Add Button to Open Modal */}
            <Button
                variant="contained"
                color="secondary"
                onClick={handleOpenModal}
                sx={{
                    position: "absolute",
                    top: "5%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    backgroundColor: "#45050C",
                    "&:hover": { backgroundColor: "#720E07" },
                    zIndex: 1,
                    color: "#fff",
                }}
            >
                Add New Question
            </Button>

            {/* Modal for Choosing Question Type */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold', backgroundColor: '#EECF6D' }}>Select Question Type</DialogTitle>
                <DialogContent sx={{ padding: 3 }}>
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel
                            component="legend"
                            sx={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#720E07',
                                '&.Mui-focused': {
                                    color: '#720E07', // Prevent color change when focused
                                },
                                '&.MuiFormLabel-asterisk': {
                                    color: '#720E07', // Ensure color stays the same even if an asterisk is present
                                },
                            }}
                        >
                            Choose Type
                        </FormLabel>
                        <RadioGroup
                            value={questionType}
                            onChange={handleQuestionTypeChange}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        >
                            <FormControlLabel
                                value="Multiple Choice"
                                control={<Radio sx={{ color: '#45050C', '&.Mui-checked': { color: '#8E2839' } }} />}
                                label="Multiple Choice"
                                sx={{ fontSize: 14, color: '#8B6220' }}
                            />
                            <FormControlLabel
                                value="Identification"
                                control={<Radio sx={{ color: '#45050C', '&.Mui-checked': { color: '#8E2839' } }} />}
                                label="Identification"
                                sx={{ fontSize: 14, color: '#8B6220' }}
                            />
                            <FormControlLabel
                                value="True/False"
                                control={<Radio sx={{ color: '#45050C', '&.Mui-checked': { color: '#8E2839' } }} />}
                                label="True/False"
                                sx={{ fontSize: 14, color: '#8B6220' }}
                            />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ padding: '16px 24px' }}>
                    <Button
                        onClick={handleCloseModal}
                        color="secondary"
                        sx={{
                            backgroundColor: '#45050C',
                            "&:hover": { backgroundColor: '#720E07' },
                            color: '#FFF',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            console.log(`Selected Question Type: ${questionType}`);
                            handleCloseModal();
                        }}
                        color="primary"
                        sx={{
                            backgroundColor: '#45050C',
                            "&:hover": { backgroundColor: '#720E07' },
                            color: '#FFF',
                        }}
                    >
                        Next
                    </Button>
                </DialogActions>
            </Dialog>


            {/* Rest of the content */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ color: "#15133D" }}>
                    Selected Questions:
                </Typography>
                {selectedQuestions.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        No questions selected.
                    </Typography>
                ) : (
                    <ol>
                        {selectedQuestions.map((q, index) => (
                            <li key={index}>
                                {q.question}
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteQuestion(q.id)}
                                    sx={{ ml: 2 }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </li>
                        ))}
                    </ol>
                )}
                <Box sx={{ mt: 2, mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClearSelection}
                        sx={{
                            borderRadius: "10px",
                            padding: "5px 20px",
                            fontSize: "0.8rem",
                            border: "1.5px solid #8E2839",
                            color: "#15133D",
                        }}
                    >
                        Clear Selection
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => generatePDF(false)}
                        sx={{
                            borderRadius: "10px",
                            padding: "5px 20px",
                            fontSize: "0.8rem",
                            backgroundColor: "#C0582F",
                            "&:hover": { backgroundColor: "#D48A5B" },
                        }}
                    >
                        Save as PDF (Questions Only)
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => generatePDF(true)}
                        sx={{
                            borderRadius: "10px",
                            padding: "5px 20px",
                            fontSize: "0.8rem",
                            backgroundColor: "#45050C",
                            "&:hover": { backgroundColor: "#720E07" },
                        }}
                    >
                        Save as PDF (With Answers)
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateExamScratch;
