import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserCheck } from "lucide-react";
import { register } from "../../api/auth";
import "./Auth.css";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError("Please agree to the Terms of service");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      await register(userData);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response) {
        if (err.response.data && typeof err.response.data === "object") {
          const errorMessages = [];
          for (const [field, errors] of Object.entries(err.response.data)) {
            errorMessages.push(
              `${field}: ${Array.isArray(errors) ? errors.join(", ") : errors}`
            );
          }
          setError(errorMessages.join("\n"));
        } else {
          setError(
            err.response.data.detail || "Registration failed. Please try again."
          );
        }
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row">
          {/* Left Side - Image */}
          <div className="side-image">
            <div className="text">
              <p>
                Join our community <i>and start your journey</i>
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="right">
            <div className="input-box">
              <header>Sign up</header>

              {error && <div className="error-message">{error}</div>}

              {success ? (
                <div className="success-message">
                  Registration successful! Redirecting...
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="input-field">
                    <input
                      type="text"
                      name="first_name"
                      className="input"
                      required
                    />
                    <label>First Name</label>
                  </div>

                  {/* Last Name */}
                  <div className="input-field">
                    <input
                      type="text"
                      name="last_name"
                      className="input"
                      required
                    />
                    <label>Last Name</label>
                  </div>

                  {/* Email */}
                  <div className="input-field">
                    <input
                      type="email"
                      name="email"
                      className="input"
                      required
                    />
                    <label>Email</label>
                  </div>

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

                  {/* Role Selection */}
                  <div className="input-field">
                    <select name="role" className="input" required>
                      <option value=""></option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <label>Role</label>
                  </div>

                  {/* Terms Checkbox */}
                  <div
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      style={{ marginRight: "10px" }}
                    />
                    <label
                      htmlFor="terms"
                      style={{ fontSize: "0.9rem", color: "#666" }}
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        style={{ color: "#743ae1", textDecoration: "none" }}
                      >
                        Terms of service
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="input-field">
                    <input
                      type="submit"
                      className="submit"
                      value={isSubmitting ? "Registering..." : "Register"}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Login Link */}
                  <div className="signin">
                    <span>
                      Already a member? <a href="/login">Sign in</a>
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
