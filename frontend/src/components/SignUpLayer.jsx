/* import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link } from "react-router-dom";

const SignUpLayer = () => {
  return (
    <section className='auth bg-base d-flex flex-wrap'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='assets/images/auth/auth-img.png' alt='' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <Link to='/' className='mb-40 max-w-290-px'>
              <img src='assets/images/logo.png' alt='' />
            </Link>
            <h4 className='mb-12'>Sign Up to your Account</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Just a few details to sign you up.
            </p>
          </div>
          <form action='#'>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='f7:person' />
              </span>
              <input
                type='text'
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Username'
              />
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Email'
              />
            </div>
            <div className='mb-20'>
              <div className='position-relative '>
                <div className='icon-field'>
                  <span className='icon top-50 translate-middle-y'>
                    <Icon icon='solar:lock-password-outline' />
                  </span>
                  <input
                    type='password'
                    className='form-control h-56-px bg-neutral-50 radius-12'
                    id='your-password'
                    placeholder='Password'
                  />
                </div>
                <span
                  className='toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light'
                  data-toggle='#your-password'
                />
              </div>
              {<span className='mt-12 text-sm text-secondary-light'>
                Your password must have at least 8 characters
              </span>}
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                {<Icon icon='mage:user' />}
              </span>
              <input
                type='FirstName'
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='FirstName'
              />
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                {<Icon icon='mage:user' />}
              </span>
              <input
                type='LastName'
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='LastName'
              />
            </div>
            <div className=''>
              <div className='d-flex justify-content-between gap-2'>
                <div className='form-check style-check d-flex align-items-start'>
                  <input
                    className='form-check-input border border-neutral-300 mt-4'
                    type='checkbox'
                    defaultValue=''
                    id='condition'
                  />
                  <label
                    className='form-check-label text-sm'
                    htmlFor='condition'
                  >
                    By creating an account means you agree to the
                    <Link to='#' className='text-primary-600 fw-semibold'>
                      Terms &amp; Conditions
                    </Link>{" "}
                    and our
                    <Link to='#' className='text-primary-600 fw-semibold'>
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
            >
              {" "}
              Sign Up
            </button>
            <div className='mt-32 text-center text-sm'>
              <p className='mb-0'>
                Already have an account?{" "}
                <Link to='/sign-in' className='text-primary-600 fw-semibold'>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpLayer;
 */
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

const SignUpLayer = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    FirstName: '',
    LastName: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: check if all fields are filled
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) newErrors[key] = `${key} is required`;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Email and password validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      return;
    }

    if (formData.password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
      return;
    }

    // Clear any previous errors
    setErrors({});

     // Send the request to the backend
     const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const responseData = await response.json();
    console.log("responseData"  , responseData)
    if (response.ok) {
      // Check for success response and handle it
      if (responseData.message === "User registered successfully" && responseData.token && responseData.username) {
        // Save the token and username (or userId if returned)
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.username);  // You can also store the userId if you prefer
        console.log(responseData)

        // Redirect the user to the profile page
        navigate("/index-11");  // Redirect to the profile page
      }
    } else {
      // Handle error response based on the status code
      if (responseData.message === "User already exists") {
        console.error("User already exists");
      } else if (responseData.message.includes("Registration error")) {
        console.error("Registration failed: ", responseData.message);
      } else {
        console.error("Unexpected error:", responseData.message);
      }
    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/auth-img.png" alt="" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <Link to="/" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="" />
            </Link>
            <h4 className="mb-12">Sign Up to your Account</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Just a few details to sign you up.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="f7:person" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span className="text-danger">{errors.username}</span>}
            </div>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                type="email"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
            <div className="mb-20">
              <div className="position-relative">
                <div className="icon-field">
                  <span className="icon top-50 translate-middle-y">
                    <Icon icon="solar:lock-password-outline" />
                  </span>
                  <input
                    type="password"
                    className="form-control h-56-px bg-neutral-50 radius-12"
                    id="your-password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <span className="text-danger">{errors.password}</span>}
              </div>
              <span className="mt-12 text-sm text-secondary-light">
                Your password must have at least 8 characters
              </span>
            </div>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:user" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="First Name"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
              />
              {errors.FirstName && <span className="text-danger">{errors.FirstName}</span>}
            </div>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:user" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Last Name"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
              />
              {errors.LastName && <span className="text-danger">{errors.LastName}</span>}
            </div>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:phone" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Phone Number"
                name="phoneNumber"  
                value={formData.phoneNumber}  
                onChange={handleChange}
              />
              {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}  {/* Corrected error message */}
            </div>
            <div className="">
              <div className="d-flex justify-content-between gap-2">
                <div className="form-check style-check d-flex align-items-start">
                  <input
                    className="form-check-input border border-neutral-300 mt-4"
                    type="checkbox"
                    defaultValue=""
                    id="condition"
                  />
                  <label className="form-check-label text-sm" htmlFor="condition">
                    By creating an account means you agree to the
                    <Link to="#" className="text-primary-600 fw-semibold">
                      Terms & Conditions
                    </Link>{" "}
                    and our
                    <Link to="#" className="text-primary-600 fw-semibold">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              Sign Up
            </button>
            <div className="mt-32 text-center text-sm">
              <p className="mb-0">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-primary-600 fw-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpLayer;
