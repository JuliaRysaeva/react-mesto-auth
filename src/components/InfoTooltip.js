import success from '../images/success.svg';
import notSuccess from '../images/notSuccess.svg';

export default function InfoTooltip({ isSuccess, isNotSuccess, onClose }) {
  return (
    <div className={isSuccess ? 'popup popup_opened' : isNotSuccess ? 'popup popup_opened' : 'popup'}>
      <div className='popup__confirm'>
        <button onClick={onClose} className='popup__close-icon' type='button'></button>
        <img className='popup__image' src={isSuccess ? success : notSuccess} alt={isSuccess ? 'Галочка' : 'Крестик'} />
        <h3 className='popup__text'>{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'} </h3>
      </div>
    </div>
  )
}
