import React, { useEffect } from "react";
import axios from "axios";

const Auth = () => {
  useEffect(() => {
    const authenticate = async () => {
      try {
        const res = await axios.get("http://localhost:8080/auth/google", {
          withCredentials: true,
        });
        window.location.href = res.data.url;
      } catch (error) {
        console.error("Error initiating authentication:", error);
      }
    };
    authenticate();
  }, []);

  return <div>Redirecting to Google for authentication...</div>;
};

export default Auth;
