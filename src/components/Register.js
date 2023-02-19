import React from 'react';
import {Link} from 'react-router-dom'

export default function Register({handleRegister}) {
  const [userData, setUserData] = React.useState({email:'', password:''});

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = userData;
      handleRegister(email, password)
  }

  return (
    <section className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form className='auth__form' onSubmit={handleSubmit}>        
        <input
          className='auth__field'
          type='email'
          name='email'
          id='email'
          placeholder='Email:'
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          className='auth__field'
          type='password'
          name='password'
          id='password'
          placeholder='Пароль:'
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button className='auth__button' type='submit'>Зарегистрироваться</button>
          <p className='auth__text'>Уже зарегистрированы?
          <Link to='/sign-in' className='auth__link'> Войти</Link></p>
      </form>
    </section>
  )
}