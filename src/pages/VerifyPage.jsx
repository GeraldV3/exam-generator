import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const VerifyPage = () => {
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();

      if (error || !sessionData.session) {
        console.error("❌ Verification failed:", error?.message);
        setStatus("failed");
        return;
      }

      setStatus("success");
      console.log("✅ Email verified and signed in!");

      const { data: userData } = await supabase.auth.getUser();
      const saved = JSON.parse(localStorage.getItem("signupData"));

      if (userData?.user && saved) {
        const { id, email } = userData.user;

        const { error: insertError } = await supabase.from("users").insert({
          id,
          email,
          name: saved.name,
          dob: saved.dob,
          role: saved.role,
        });

        if (insertError) {
          console.error("❌ Failed to save user data:", insertError.message);
        } else {
          console.log("✅ User data saved to 'users' table");
          localStorage.removeItem("signupData");
        }
      }

      // ✅ Redirect immediately (or after short delay)
      setTimeout(() => navigate("/signin"), 1500);
    };

    verify();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {status === "verifying" && <p>🔄 Verifying your email...</p>}
      {status === "success" && <p>✅ Email verified! Redirecting to login...</p>}
      {status === "failed" && <p>❌ Verification failed. Please retry or contact support.</p>}
    </div>
  );
};

export default VerifyPage;
