import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoPath from '../images/logo.svg';

function Header({ email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип компании." />

      {location.pathname === '/sign-up' && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {location.pathname === '/sign-in' && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === '/' && (
        <div className="header__navbar">
          <p className="header__email">{email}</p>
          <button className="header__button" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      )}
      {/* </div> */}
    </header>
  );
}
export default Header;
