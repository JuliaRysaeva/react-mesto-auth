import success from '../images/success.svg';
import notSuccess from '../images/notSuccess.svg';

export default function InfoTooltip({ isSuccess, isNotSuccess, onClose }) {
  return (
    <div className= { isSuccess ? "popup popup_opened" : isNotSuccess ? "popup popup_opened" : "popup" }>
      <div className="popup__container">
        <button onClick={onClose} className="popup__close-button" type="button"></button>
        <img className="popup__image" src={isSuccess ? success : notSuccess} />
        <h3 className="popup__message">{isSuccess? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."} </h3>
      </div>
    </div>
  )
}
