function ImagePopup(props) {
  return (
    <section className={`popup full-picture popup_type_full-picture ${props.card ? 'popup_opened' : ''}`}>
      <figure className='full-picture__card-container popup__overlay-close'>
        <button className='popup__close-icon popup__close-icon_type_full-picture' type='button' onClick={props.onClose}></button>
        <img className='full-picture__card' src={`${props.card ?.link}`} alt={props.card ?.name} />
        <figcaption className='full-picture__subtitle'>{props.card?.name}</figcaption>
      </figure>
    </section>
  )
}
export default ImagePopup;