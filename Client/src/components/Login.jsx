import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redireciona para a página inicial
    } catch (error) {
      alert('Login falhou: ' + error.response?.data?.error || 'Erro no servidor.');
    }
  };

  return (
    <div className={styles.cardLogin}>
      <form onSubmit={handleLogin}>
        <label>Usuário</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
