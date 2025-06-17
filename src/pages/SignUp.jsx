import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Modal,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { supabase } from "../supabaseClient";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    const { name, dob, email, password, role } = formData;
    if (!name || !dob || !email || !password || !role) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/verify",
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else {
      localStorage.setItem("signupData", JSON.stringify({ name, dob, email, role }));
      setModalOpen(true);
    }
  };

  // Background insert after verification
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      (async () => {
        const { data: sessionData, error } = await supabase.auth.getSession();
        if (error || !sessionData.session) return;

        const { data: userData } = await supabase.auth.getUser();
        const saved = JSON.parse(localStorage.getItem("signupData"));

        if (userData?.user && saved) {
          await supabase.from("users").insert({
            id: userData.user.id,
            email: userData.user.email,
            name: saved.name,
            dob: saved.dob,
            role: saved.role,
          });

          localStorage.removeItem("signupData");
        }
      })();
    }
  }, []);

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", overflow: "hidden" }}>
      {/* Left Section */}
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

      {/* Right Section */}
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

            <form onSubmit={handleSignUp}>
              {/* Name */}
              <Box mb={2}>
                <Typography fontSize="0.875rem" fontWeight="600" color="#8E2839" mb={1}>
                  Full Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Box>

              {/* DOB */}
              <Box mb={2}>
                <Typography fontSize="0.875rem" fontWeight="600" color="#8E2839" mb={1}>
                  Date of Birth
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Box>

              {/* Email */}
              <Box mb={2}>
                <Typography fontSize="0.875rem" fontWeight="600" color="#8E2839" mb={1}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </Box>

              {/* Password */}
              <Box mb={2}>
                <Typography fontSize="0.875rem" fontWeight="600" color="#8E2839" mb={1}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="******"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </Box>

              {/* Role */}
              <Box mb={3}>
                <Typography fontSize="0.875rem" fontWeight="600" color="#8E2839" mb={1}>
                  Role
                </Typography>
                <FormControl fullWidth required>
                  <InputLabel id="role-label">Select Role</InputLabel>
                  <Select
                    labelId="role-label"
                    value={formData.role}
                    label="Select Role"
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="professor">Professor</MenuItem>
                  </Select>
                </FormControl>
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
                }}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>

      {/* Modal - No spinner, just action */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            width: 300,
          }}
        >
          <Typography variant="h6" mb={2}>
            ✅ Check your email to verify your account.
          </Typography>
          <Typography mb={3}>You can now go to the login page.</Typography>
          <Button variant="contained" fullWidth onClick={() => navigate("/signin")}>
            Go to Sign In
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default SignUpPage;
