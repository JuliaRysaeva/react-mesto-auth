import React from "react";
import PopupWithForm from "./PopupWithForm.js";
export default function EditAvatarPopup(props) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: ref.current.value
    });
  }
  return (
    <PopupWithForm name='update-avatar' title='Обновить аватар' submit='Сохранить'
      isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id='avatar-url' type='url' name='link' className='popup__form-field popup__form-field_card-link_link'
        placeholder='Ссылка на фото' ref={ref} required />
      <span className='popup__input-error avatar-url-error'></span>
    </PopupWithForm>
  )
}