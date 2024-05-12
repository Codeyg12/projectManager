import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD, VALIDATE_PIN } from "../utils/mutations";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Reset = () => {
  const { user } = useParams();
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const user = params.get("user");
  // const recoverToken = params.get("token");
  // const [token, setToken] = useState(recoverToken || ""); // Initialize state with token from params if available
  const [email, setEmail] = useState(user);
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pin, setPin] = useState("");
  const [validatedPin, setValidatedPin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [validatePIN] = useMutation(VALIDATE_PIN);

  // Update token state when token changes in params
  // useEffect(() => {
  //   setToken(recoverToken || "");
  // }, [recoverToken]);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleValidatePIN = async (e) => {
    e.preventDefault();
    try {
      const { data } = await validatePIN({
        variables: { email, pin },
      });
      setValidatedPin(true);
      // setSuccessMessage(data.resetPassword.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await resetPassword({
        variables: { email, newPassword },
      });
      // setSuccessMessage(data.resetPassword.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="container card shadow p-4"
          style={{ maxWidth: "550px" }}
        >
          <>
            <form
              className="mx-5"
              onSubmit={validatedPin ? handleSubmitPassword : handleValidatePIN}
            >
              <h3 className="text-center mb-5">Changing password for {user}</h3>
              {validatedPin ? (
                 <div className="form-group d-flex align-items-center flex-wrap">
                 <div className="flex-grow-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder=" "
                    className="form-control"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  </div>
                  <button
                    type="button"
                    className="btn pb-3"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <input
                      type="PIN"
                      id="PIN"
                      name="PIN"
                      placeholder=" "
                      className="form-control"
                      required
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                    />
                    <label htmlFor="PIN">PIN</label>
                  </div>
                </>
              )}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary text-center">
                  {validatedPin ? "Reset Password" : "Enter PIN"}
                </button>
              </div>
            </form>

            <div className="mt-2">
              <p className="text-center">
                Return to <Link to="/login">login here</Link>
              </p>
            </div>
          </>
          {/* {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Reset;
