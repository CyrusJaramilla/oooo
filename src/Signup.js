import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
      axios.post('http://localhost:3001/signup', values)
        .then(res => {
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='wrapper'>
      <div className='hero'>
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='void'>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder='Enter Name'
              name="name"
              onChange={handleInput}
            />
            {errors.name && <span className='a'>{errors.name}</span>}
          </div>
          <div className='void'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder='Enter Email'
              name="email"
              onChange={handleInput}
            />
            {errors.email && <span className='a'>{errors.email}</span>}
          </div>
          <div className='void'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder='Enter Password'
              name='password'
              onChange={handleInput}
            />
            {errors.password && <span className='a'>{errors.password}</span>}
          </div>
          <button type='submit' className='log'>Sign up</button>
          <Link to='/'>Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
