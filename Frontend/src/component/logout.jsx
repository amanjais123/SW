// src/component/logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // ✅ Call backend logout (cookies will be cleared server-side)
        await axios.post(
          "http://localhost:4000/api/v1/auth/logout",
          {},
          { withCredentials: true } // send cookies
        );

        toast.success("✅ Logged out successfully!");
        navigate("/login");
      } catch (err) {
        console.error("Logout error:", err);
        toast.error("❌ Failed to logout");
        navigate("/login");
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-black/80 text-yellow-400 text-xl">
      Logging out...
    </div>
  );
};

export default Logout;
