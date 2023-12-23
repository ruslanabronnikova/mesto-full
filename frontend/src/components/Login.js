import React, { useState } from 'react';

function Login(props) {

  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let { password, email } = formValue;
    if (!formValue.password || !formValue.email ) {
      return;
    }
    props.onLog({ password, email })
  }


  return (
    <section className='log'>
      <h1 className="log__title">
        Вход
      </h1>
      <form className='log__form' id="loginform" method="post" onSubmit={handleSubmit}>
        <input type='email'
          className='log__input log__input_email_value'
          name='email'
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          value={formValue.email}
          onChange={(e) => setFormValue({ ...formValue, email: e.target.value })}
        />
        <input type='password'
          className='log__input log__input_password_value'
          name='password'
          placeholder="Пароль"
          minLength="2"
          maxLength="40"
          required
          value={formValue.password}
          onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
        />

        <button type="submit" id="log"
          className="log__button-form">Войти</button>

      </form>
    </section>
  )
}

export default Login