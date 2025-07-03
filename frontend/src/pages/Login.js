import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import
import '../App.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      setMessage(res.data.message);
      navigate('/welcome');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // ✅ Correct usage

      const res = await axios.post('http://localhost:5000/api/auth/google-login', {
        email: decoded.email,
        username: decoded.name,
      });
      navigate('/welcome');
    } catch (err) {
      console.error('Google login error:', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>

      <p style={{ textAlign: 'center', margin: '15px 0' }}>OR</p>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Login Failed')} />
      </div>

      <p>
        Don’t have an account?
        <button
          onClick={() => navigate('/register')}
          style={{
            background: 'none',
            color: 'blue',
            border: 'none',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginLeft: '5px'
          }}
        >
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
