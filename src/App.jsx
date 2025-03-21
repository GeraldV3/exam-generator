import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";
import { useState, useEffect } from "react";
import { auth } from "./firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import CreateExam from "./pages/CreateExam";
import CreateExamScratch from "./pages/CreateExamScratch";
import TakeExam from "./pages/TakeExam";


// Create a theme instance with Poppins font
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    button: {
      fontFamily: 'Poppins, sans-serif',
    },
    h1: {
      fontFamily: 'Poppins, sans-serif',
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
    },
    body1: {
      fontFamily: 'Poppins, sans-serif',
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); 
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        ) : (
          <>
            <Navbar />
            <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<CreateExam />} />
            <Route path="/create-scratch" element={<CreateExamScratch />} />
            <Route path="/take/:examId" element={<TakeExam />} />
          </Routes>
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
