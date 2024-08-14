import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Signup.css";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
    profession: "",
  });

  const navigate = useNavigate();

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
      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        formData
      );
      console.log(response);
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      const errorMessage = err.response;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h1 className="text-center mb-4">Create Account</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
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
              <div className="mb-3">
                <input
                  type="number"
                  name="phoneno"
                  className="form-control"
                  placeholder="Phone Number"
                  value={formData.phoneno}
                  onChange={(e) => {
                    if (e.target.value.length <= 10) {
                      handleChange(e); 
                    }
                  }}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="profession"
                  className="form-control"
                  placeholder="Profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Sign Up
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
            <Link to={"/"} className="login-link">
              <p className="text-center mt-3">Let s Login?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
