import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Register(props) {

  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });

  function handleSubmit(evt) {
    evt.preventDefault()
    let {password, email} = formValue;
    props.onReg({password, email})
  }

  return (
    <section className='log'>
      <div className="log__container">
        <h1 className="log__title">
          Регистрация
        </h1>
        <form className='log__form' id="loginform" method="post" onSubmit={handleSubmit}>
          <input type='email'
            className='log__input from__input_email_value'
            name='email'
            id='emailUser'
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
            value={formValue.email} 
            onChange={(e) => setFormValue({ ...formValue, email: e.target.value })}  
            />
          <input type='password'
            className='log__input from__input_password_value'
            name='password'
            id='passwordUser'
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            required
            value={formValue.password}  
            onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
            />

          <button type="submit" id="log"
            className="log__button-form">Зарегистрироваться</button>

          <Link className='log__link' to='/sign-in'>Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </section>
  )
}

export default Register