export default function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'
        }`}
    >
      <div className='popup__container popup__overlay-close'>
        <button
          className='popup__close-icon popup__close-icon_type_update-avatar'
          type='button'
          onClick={props.onClose}
        />
        <form
          name={`${props.name}`}
          className='popup__form'
          onSubmit={props.onSubmit}
        >
          <h2 className='popup__title'>{props.title}</h2>
          {props.children}
          <button
            className='popup__button popup__button_type_create'
            type='submit'
          >
            {props.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
