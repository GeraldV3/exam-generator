import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import pupImg from "../img/pup.jpg";

const HomePage = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${pupImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Center content */}
      <Box
        sx={{
          zIndex: 2,
          maxWidth: "500px",
          width: "90%",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "48px 32px",
          textAlign: "center",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <Typography variant="h3" fontWeight="bold" mb={2} sx={{ color: "#FFD700" }}>
          PUP-OUS Exam Portal
        </Typography>

        <Typography variant="body1" mb={4} sx={{ fontSize: "1.1rem", color: "#e0e0e0" }}>
          A smarter way to manage and take exams — for students and professors.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Link to="/signin">
            <Button
              sx={{
                backgroundColor: "#8E2839",
                color: "white",
                padding: "10px 28px",
                fontSize: "1rem",
                borderRadius: "999px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#6b1f2b",
                },
              }}
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              sx={{
                border: "2px solid white",
                color: "white",
                padding: "10px 28px",
                fontSize: "1rem",
                borderRadius: "999px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#8E2839",
                },
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
