import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Card, CardContent } from "@mui/material";
import { supabase } from "../supabaseClient";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Both email and password are required!");
      setLoading(false);
      return;
    }

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      const userId = data.user.id;

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("name, dob, email")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        throw new Error("User profile not found.");
      }

      console.log(`✅ Signed in as ${profile.name}`);
      navigate("/home"); // ✅ redirect after login

    } catch (err) {
      setError(err.message || "Invalid email or password.");
      console.error("Sign-in error:", err);
    }

    setLoading(false);
  };


  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", overflow: "hidden" }}>
      {/* Left Section - Sign In Form */}
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
              Sign in
            </Typography>
            <Typography color="gray" mb={3}>
              Please login to continue to your account.
            </Typography>

            <form onSubmit={handleSignIn}>
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
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>

      {/* Right Section */}
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
            left: "-50px",
            width: "100px",
            height: "100%",
            backgroundColor: "#FFF",
            borderRadius: "50%",
          },
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Hello, Friend!
        </Typography>
        <Typography textAlign="center" mb={4} fontSize="1.125rem">
          Enter your personal details and start your journey with us
        </Typography>
        <Link to="/signup">
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
            SIGN UP
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default SignInPage;
