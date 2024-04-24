import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken]= useState('');   
  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await fetch('http://localhost:3001/api/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
          },
          body: JSON.stringify({
            username: username,
            password: password
          } )
        });
        const data = await response.json();
        if (response.ok) {
          setToken(data.session.token);
          localStorage.setItem('token', data.session.token);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
      }
    } else {
      alert('Por favor ingresa nombre de usuario y contraseña.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form>
        <div>
          <label>Nombre de Usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleLogin}>Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
