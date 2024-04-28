import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useEffect, useRef } from "react";

export default function LoginForm({
  title,
  formData,
  setFormData,
  handleSub,
  authData,
}) {
  const emailRef = useRef(null);
  const usernameRef = useRef(null);

  useEffect(() => {
    if (title === "Login") {
      emailRef.current.focus();
    } else {
      usernameRef.current.focus();
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const { data } = await handleSub({
        variables: { ...formData },
      });
      authData === "loginUser"
        ? Auth.login(data.loginUser.token)
        : Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      alert("Email or password is incorrect");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div className="container card shadow p-5">
          <form className="mx-5" onSubmit={handleSubmit}>
            <h3 className="text-center mb-5">{title}</h3>
            {title === "Sign Up" && (
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  ref={usernameRef}
                  onChange={handleFormChange}
                  value={formData.username}
                  placeholder=" "
                  className="form-control mb-2"
                  required
                />
                <label htmlFor="username">Username</label>
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                onChange={handleFormChange}
                value={formData.email}
                placeholder=" "
                className="form-control mb-3"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                onChange={handleFormChange}
                value={formData.password}
                placeholder=" "
                className="form-control"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary my-4 text-center"
              >
                Log in
              </button>
            </div>
          </form>
          {title === "Login" ? (
            <p className="text-center">
              To create an account{" "}
              <Link className="cred-link" to="/signup">
                click here
              </Link>
            </p>
          ) : (
            <p className="text-center">
              Already a user?{" "}
              <Link className="cred-link" to="/login">
                login here
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
