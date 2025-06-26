import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./loginPage.scss"; 

import Header from '../components/header';
import Footer from '../components/footer'; 

function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {

    event.preventDefault();
    const data = { username, password };

    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login bem-sucedido:', result);

        if (result.token) {
          localStorage.setItem('authToken', result.token); 
          localStorage.setItem('userId', result.user.id); 
          localStorage.setItem('isAdm', result.user.is_adm.toString());
          localStorage.setItem('addressId', result.user.address.id);

          console.log('Dados salvos:', {
            token: result.token,
            userId: result.user.id,
            addressId: result.user.address?.id
          });
        }


        if (result.user.is_adm) {
          navigate('/admMainPage'); 
        } else {
          navigate('/'); 
        }
      } else {
        console.error('Falha no login:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
    }
  };

  return (
    <div className="App">

      <Header />

      <main>
        <div className="loginPage">
          <div className="loginContainer">
            <h1 className="tLogin">Login</h1>
            <form className="loginForm" onSubmit={handleLogin}>
              <div className="labelLogin">
                <label htmlFor="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Digite seu username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="labelLogin">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Entrar</button>
            </form>
            <p>Ainda não possui conta?</p>
            <Link to="/cadastroPage">
              <button className="bttCadastroLogin" type="button">
                Cadastrar
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      
    </div>
  );
}

export default LoginPage;
