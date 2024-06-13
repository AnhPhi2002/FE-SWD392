import React, { useState } from 'react';
import axios from 'axios';

const LOGIN_API_URL = 'https://666833fdf53957909ff70469.mockapi.io/api/product-detail/login';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(LOGIN_API_URL, { username, password });
      const { user_id } = response.data;
      localStorage.setItem('user_id', user_id);
      // Navigate to the main page or update state to indicate user is logged in
      window.location.reload(); // Reload to reflect login state
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
