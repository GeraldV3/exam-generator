import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                minHeight: "100vh",
                backgroundColor: "#FFF11E8",
                padding: "20px",
                paddingTop: "40px",
            }}
        >
            {/* Page Title */}
            <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "#8E2839", fontWeight: "bold", textTransform: "uppercase", marginBottom: "20px", textAlign: "center" }} // Center text
            >
                Exam Generator Options
            </Typography>

            {/* Grid Layout */}
            <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: "100%" }}>
                {[ 
                    { title: "Create Exam with Wizard", desc: "Use our guided wizard to quickly generate a custom exam.", btnText: "Launch Wizard", link: "/create" },
                    { title: "Create Exam from Scratch", desc: "Build your exam manually with full control.", btnText: "Start From Scratch", link: "/create-scratch" },
                    { title: "View Existing Exams", desc: "Browse all previously generated exams.", btnText: "View Exams", link: "/exams" }
                ].map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                backgroundColor: "#FFF1E8",
                                minHeight: 220,
                                boxShadow: 4,
                                borderRadius: 3,
                                border: "1.5px solid #8E2839",
                                transition: "0.3s",
                                "&:hover": { transform: "scale(1.05)" },
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#15133D" }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="#15133D">
                                    {item.desc}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={item.link}
                                    sx={{
                                        backgroundColor: "#8E2839",
                                        color: "#FFF1E8",
                                        borderRadius: "20px",
                                        padding: "6px 20px",
                                        "&:hover": { backgroundColor: "#6D1F2C" }
                                    }}
                                >
                                    {item.btnText}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default LandingPage;
