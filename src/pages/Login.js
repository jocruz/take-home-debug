import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { magic } from "../lib/magic";

const Login = () => {
  const navigate = useNavigate();

  const handleEmailOtpLogin = useCallback(async () => {
    try {
      const did = await magic.wallet.connectWithUI();
      if (did) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  }, [navigate]);

  const handleSocialLogin = useCallback(async () => {
    try {
      localStorage.setItem("isOauthRedirect", true);
      await magic.oauth2.loginWithRedirect({
        provider: "google",
        redirectURI: new URL("/dashboard", window.location.origin).href,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Magic</h1>
      <button onClick={() => handleEmailOtpLogin()}>
        Login with Email OTP
      </button>
      <br />
      <button onClick={() => handleSocialLogin()}>
        <FaGoogle size={"2.5rem"} />
        Log in with Google
      </button>
    </div>
  );
};

export default Login;
