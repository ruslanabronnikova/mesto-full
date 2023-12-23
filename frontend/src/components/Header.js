import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo/logo.svg';

function Header({ email }) {
  const navigate = useNavigate();

  function handleOut() {
    localStorage.removeItem('JWT');
    navigate('/sign-in');
  }

  function handleLogin() {
    navigate('/sign-in');
  }

  function handleRegister() {
    navigate('/sign-up');
  }

  const isAuthenticated = localStorage.getItem("JWT");;

  return (
    <header className="header">
      <Link to='/'>
        <img src={logo} className="header__logo" alt="Логотип Место" />
      </Link>
      <div className='heаder__info'>
        {isAuthenticated ? (
          <>
            <p className="header__email">{email}</p>
            <Link to="/sign-in" className='header__link' onClick={handleOut}>
              Выйти
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-in" className='header__link' onClick={handleLogin}>
              Вход
            </Link>
            <Link to="/sign-up" className='header__link' onClick={handleRegister}>
              Регистрация
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

