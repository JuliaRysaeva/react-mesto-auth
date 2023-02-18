import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
export default function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name='profile-edit'
      title='Редактировать профиль'
      submit='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        name='name'
        id='name'
        className='popup__form-field popup__form-field_user-name_name'
        placeholder='Имя'
        minLength='2'
        maxLength='40'
        value={name || ''}
        onChange={handleChangeName}
        required
      />
      <span className='popup__input-error name-error'></span>
      <input
        type='text'
        name='about'
        id='job'
        className='popup__form-field popup__form-field_user-job_job'
        placeholder='О себе'
        minLength='2'
        maxLength='200'
        value={description || ''}
        onChange={handleChangeDescription}
        required
      />
      <span className='popup__input-error job-error'></span>
    </PopupWithForm>
  );
}
