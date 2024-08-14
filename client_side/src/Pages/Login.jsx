import { useState } from "react";
import axios from "axios";
import "../Style/Signup.css";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/login", formData);
      console.log(response);
      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/home"); 
      }, 2000);
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h1 className="text-center mb-4">Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </div>
            </form>
            <div className="social-container mt-4 text-center">
              <a href="#" className="btn btn-outline-secondary mx-2">
                <i>
                  <FaGoogle />
                </i>
              </a>
              <a href="#" className="btn btn-outline-secondary mx-2">
                <i>
                  <FaLinkedin />
                </i>
              </a>
              <a href="#" className="btn btn-outline-secondary mx-2">
                <i>
                  <IoLogoFacebook />
                </i>
              </a>
            </div>
            <Link to={"/signup"} className="login-link">
              <p className="text-center mt-3">Let s Signup here?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
