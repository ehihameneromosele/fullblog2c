import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../api/auth";
import "./Auth.css";

const Login = () => {
  const [error, setError] = useState("");
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/blog";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData.entries());

    try {
      const userData = await login(credentials);
      authLogin(userData);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="main">
        <div className="row">
          {/* Left Side - Image */}
          <div className="side-image">
            <div className="text">
              <p>Welcome back <i>to our community</i></p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="right">
            <div className="input-box">
              <header>Sign in</header>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="input-field">
                  <input
                    type="text"
                    name="username"
                    className="input"
                    required
                  />
                  <label>Username</label>
                </div>

                {/* Password */}
                <div className="input-field">
                  <input
                    type="password"
                    name="password"
                    className="input"
                    required
                  />
                  <label>Password</label>
                </div>

                {/* Submit Button */}
                <div className="input-field">
                  <input
                    type="submit"
                    className="submit"
                    value="Sign in"
                  />
                </div>

                {/* Register Link */}
                <div className="signin">
                  <span>Don't have an account?{" "}
                    <a href="/register">Register</a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;