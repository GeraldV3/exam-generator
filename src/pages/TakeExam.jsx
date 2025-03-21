import React, { useState } from "react";
import { Container, Typography, Card, CardContent, TextField, Button, Box } from "@mui/material";
import testBank from "../data/TestBank";

const TakeExam = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [examFinished, setExamFinished] = useState(false);

    // Get the current question from the TestBank
    const currentQuestion = testBank[currentQuestionIndex];

    // Function to handle answer submission
    const handleAnswerSubmit = () => {
        // Check if the user's answer (case insensitive) matches the correct answer
        if (userAnswer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase()) {
            setFeedback("Correct!");
            setScore(score + 1);
        } else {
            setFeedback(`Incorrect! Correct Answer: ${currentQuestion.answer}`);
        }
    };

    // Function to move to the next question or finish the exam
    const handleNextQuestion = () => {
        setFeedback("");
        setUserAnswer("");
        if (currentQuestionIndex < testBank.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setExamFinished(true);
        }
    };

    // Function to restart the exam
    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setUserAnswer("");
        setFeedback("");
        setScore(0);
        setExamFinished(false);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: "#15133D" }}>
                Take Exam
            </Typography>
            {examFinished ? (
                <Box textAlign="center" sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ color: "#8E2839" }}>
                        Exam Finished!
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#8B6220" }}>
                        Your Score: {score} / {testBank.length}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRestart}
                        sx={{
                            mt: 3,
                            backgroundColor: "#8E2839",
                            "&:hover": {
                                backgroundColor: "#D5AC4E",
                            },
                        }}
                    >
                        Restart Exam
                    </Button>
                </Box>
            ) : (
                <Card sx={{ boxShadow: 3, borderRadius: 3, p: 3, backgroundColor: "#FFF1E8", border: "2px solid #8E2839",}}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ color: "#15133D" }}>
                            Question {currentQuestionIndex + 1} of {testBank.length}
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ color: "#8B6220" }}>
                            {currentQuestion.question}
                        </Typography>
                        <TextField
                            fullWidth
                            label="Your Answer"
                            variant="outlined"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            sx={{
                                mt: 2,
                                backgroundColor: "#FFF",
                                borderRadius: 2,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 3,
                                },
                            }}
                        />
                        {feedback && (
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    mt: 2,
                                    color: feedback === "Correct!" ? "green" : "red",
                                }}
                            >
                                {feedback}
                            </Typography>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 3,
                                flexWrap: "wrap",
                                gap: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAnswerSubmit}
                                disabled={feedback !== ""}
                                sx={{
                                    backgroundColor: "#8E2839",
                                    "&:hover": {
                                        backgroundColor: "#D5AC4E",
                                    },
                                }}
                            >
                                Submit Answer
                            </Button>
                            {feedback && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleNextQuestion}
                                    sx={{
                                        backgroundColor: "#45050C",
                                        "&:hover": {
                                            backgroundColor: "#720E07",
                                        },
                                    }}
                                >
                                    Next Question
                                </Button>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default TakeExam;
