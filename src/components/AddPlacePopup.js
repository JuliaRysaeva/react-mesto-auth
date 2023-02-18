import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("")
    setLink("")
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  };

  function handleChangeName(e) {
    setName(e.target.value)
  };

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  return (
    <PopupWithForm name='add-card' title='Новое место' submit='Создать'
      isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id='card-name' type='text' name='name' className='popup__form-field popup__form-field_card-name_name'
        placeholder='Название' minLength='2' maxLength='30' value={name} onChange={handleChangeName} required />
      <span className='popup__input-error card-name-error'></span>
      <input id='card-url' type='url' name='link' className='popup__form-field popup__form-field_card-link_link'
        placeholder='Ссылка на картинку' value={link} onChange={handleChangeLink} required />
      <span className='popup__input-error card-url-error'></span>
    </PopupWithForm>
  )
}