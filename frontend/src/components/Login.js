import React from 'react';

function Login({ handleLogin }) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ password: formValue.password, email: formValue.email });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
          autoComplete="current-password"
          value={formValue.password}
          onChange={handleChange}
        ></input>
        <button
          className="auth__submit-btn"
          type="submit"
          aria-label="Отправка формы."
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
