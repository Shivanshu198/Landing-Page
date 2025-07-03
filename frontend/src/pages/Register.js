import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  const goToLogin = () => {
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>
        Do you have an account?
        <button onClick={goToLogin} style={{ background: 'none', color: 'blue', border: 'none', textDecoration: 'underline', cursor: 'pointer', marginLeft: '5px' }}>
          Login here
        </button>
      </p>
    </div>
  );
};

export default Register;
