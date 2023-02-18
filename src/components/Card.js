import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__vector ${isLiked && 'element__vector_active'}`);
  function handleCardClick() {
   onCardClick(card)
  }
  function handleLikeClick() {
   onCardLike(card)
  }
  function handleDeleteClick() {
    onCardDelete(card)
  }
  return (
    <article className='element'>
      {isOwn && <button className='element__bin' onClick={handleDeleteClick} type='button' />}
      <img className='element__mask-group' alt={card.name} src={card.link} onClick={handleCardClick} />
      <div className='element__text'>
        <p className='element__title'>{card.name}</p>
        <button className={cardLikeButtonClassName} type='button' onClick={handleLikeClick}>
          <p className='element__likes'>{card.likes.length}</p>
        </button>
      </div>
    </article>
  )
}