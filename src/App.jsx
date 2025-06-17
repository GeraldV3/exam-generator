import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient"; // ✅ Supabase client

import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";
import CreateExam from "./pages/CreateExam";
import CreateExamScratch from "./pages/CreateExamScratch";
import TakeExam from "./pages/TakeExam";
import VerifyPage from "./pages/VerifyPage";
import HomePage from "./pages/HomePage";

// 💅 Theme setup (Poppins font)
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    button: { fontFamily: "Poppins, sans-serif" },
    h1: { fontFamily: "Poppins, sans-serif" },
    h2: { fontFamily: "Poppins, sans-serif" },
    h3: { fontFamily: "Poppins, sans-serif" },
    h4: { fontFamily: "Poppins, sans-serif" },
    h5: { fontFamily: "Poppins, sans-serif" },
    h6: { fontFamily: "Poppins, sans-serif" },
    body1: { fontFamily: "Poppins, sans-serif" },
    body2: { fontFamily: "Poppins, sans-serif" },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ✅ Check current session on mount
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkSession();

    // ✅ Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    // ✅ Clean up listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<HomePage />} />         {/* ✅ Handles '/' root */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/verify" element={<VerifyPage />} />

          {/* ✅ Protected Routes */}
          {isAuthenticated ? (
            <>
              <Route path="/home" element={<><Navbar /><LandingPage /></>} />
              <Route path="/create" element={<><Navbar /><CreateExam /></>} />
              <Route path="/create-scratch" element={<><Navbar /><CreateExamScratch /></>} />
              <Route path="/take/:examId" element={<><Navbar /><TakeExam /></>} />
            </>
          ) : (
            <Route path="*" element={<SignInPage />} />
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
