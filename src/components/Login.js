import React from 'react';

export default function Login({handleLogin}) {
  const [userData, setUserData] = React.useState({ email: '', password: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({...userData,[name]: value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    handleLogin(userData);
    setUserData({ email:'', password:''});
  }

  return (
    <section className='auth'>
      <h2 className='auth__title'>Вход</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input
          className='auth__field'
          type='email'
          name='email'
          placeholder='Email:'
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          className='auth__field'
          type='password'
          name='password'
          placeholder='Пароль:'
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button className='auth__button' type='submit'>
          Войти
        </button>
      </form>
    </section>
  );
}
