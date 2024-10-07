import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import { useAuth } from './AuthFiles/AuthContext'; 
import hh1 from '../src/Components/hh1.jpg'; 

function Login() {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);

    if (!values.email.endsWith('@nvsu.edu.ph')) {
      validationErrors.email = "Email must end with @nvsu.edu.ph";
    }

    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      axios.post('http://localhost:3001/login', values)
        .then(res => {
          if (res.data === "Success") {
            login(); 
            navigate('/base'); 
          } else {
            alert("Account not registered or invalid credentials");
          }
        })
        .catch(err => console.log("Error during login:", err));
    }
  };

  return (
    <div className='wrapper'>
      <div className="logo-container">
        <img src={hh1} alt="Logo" className="logo" />
      </div>
      <div className='hero'>
        <h2>Log-in</h2>
        <form onSubmit={handleSubmit}>
          <div className='void'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder='Enter Email'
              name="email"
              value={values.email} 
              onChange={handleInput}
            />
            {errors.email && <span className='error'>{errors.email}</span>}
          </div>
          <div className='void'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder='Enter Password'
              name="password"
              value={values.password} 
              onChange={handleInput}
            />
            {errors.password && <span className='error'>{errors.password}</span>}
          </div>
          <button type='submit' className='log'>Log In</button>
          <Link to="/signup" className='signup-link'>Create Account</Link>
        </form>
      </div>  
    </div>
  );
}

export default Login;
