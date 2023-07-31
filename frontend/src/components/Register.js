import React from 'react';
import * as auth from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

function Register({ handleSuccessRegister, handleFailureRegister }) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    const { password, email } = formValue;
    e.preventDefault();
    auth
      .register(password, email)
      .then((res) => {
        if (!res) {
          return;
        }
        navigate('/sign-in');
        handleSuccessRegister();
      })
      .catch((err) => {
        handleFailureRegister();
        console.log(err);
      });
  }
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="auth__form" name="login">
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Введите адрес электронной почты."
          required
          autoComplete="email"
          value={formValue.email}
          onChange={handleChange}
        ></input>
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Пароль"
          aria-label="Введите пароль."
          required
          autoComplete="new-password"
          value={formValue.password}
          onChange={handleChange}
        ></input>
        <button
          className="auth__submit-btn"
          type="submit"
          aria-label="Отправка формы."
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="auth__signin">
        <p className="auth__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
