import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Card, CardContent } from "@mui/material";
import { auth, database } from "../firebase"; // Ensure correct import
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { ref, set } from "firebase/database"; 

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Firebase sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !dob || !email || !password) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data (name and DOB) in Firebase Database
      await set(ref(database, `users/${user.uid}`), {
        name: name,
        dob: dob,
        email: email,
      });

      console.log("User signed up:", user);
      navigate("/"); // ✅ Redirects to LandingPage (which is at "/")
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", overflow: "hidden" }}>
      {/* Left Section - Welcome Back */}
      <Box
        sx={{
          width: "50%",
          backgroundColor: "#8E2839",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: "40px",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: "-50px",
            width: "100px",
            height: "100%",
            backgroundColor: "#FFF",
            borderRadius: "50%",
          },
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Welcome Back!
        </Typography>
        <Typography textAlign="center" mb={4} fontSize="1.125rem">
          To keep connected with us, please login with your personal info
        </Typography>
        <Link to="/signin">
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              padding: "10px 32px",
              borderRadius: "999px",
              fontSize: "1rem",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "white",
                color: "#8E2839",
              },
            }}
          >
            SIGN IN
          </Button>
        </Link>
      </Box>

      {/* Right Section - Create Account Form */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <Card sx={{ width: "90%", maxWidth: 420, padding: 3, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" color="#8E2839" mb={1}>
              Create Account
            </Typography>
            <Typography color="gray" mb={3}>
              Sign up to enjoy the feature of EXAM
            </Typography>

            {/* Form */}
            <form onSubmit={handleSignUp}>
              <Box mb={2}>
                <Typography fontSize="0.875rem" fontWeight="600" color="#8E2839" mb={1}>
                  Full Name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  sx={{ borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                />
              </Box>

              <Box mb={2}>
                <Typography fontSize="0.875rem" fontWeight="600" color="#8E2839" mb={1}>
                  Date of Birth
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                    "& input::-webkit-calendar-picker-indicator": {
                      filter: "invert(0.5)",
                      cursor: "pointer",
                    },
                  }}
                />
              </Box>

              <Box mb={2}>
                <Typography fontSize="0.875rem" fontWeight="600" color="#8E2839" mb={1}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                />
              </Box>

              <Box mb={2}>
                <Typography fontSize="0.875rem" fontWeight="600" color="#8E2839" mb={1}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  variant="outlined"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                />
              </Box>

              {error && (
                <Typography color="red" fontSize="0.875rem" mb={2}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  backgroundColor: loading ? "#aaa" : "#8E2839",
                  color: "white",
                  padding: "12px",
                  borderRadius: "999px",
                  fontSize: "1.125rem",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: loading ? "#aaa" : "#7A2231",
                  },
                }}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SignUpPage;
