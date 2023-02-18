import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main({ cards, onCardClick, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar'>
          <img className='profile__photo' src={currentUser.avatar} alt='Ваш аватар' />
          <div className='profile__overlay' onClick={onEditAvatar}></div>
        </div>
        <div className='profile__info'>
          <h1 className='profile__title'>{currentUser.name}</h1>
          <button className='profile__icon' type='button' onClick={onEditProfile}></button>
          <p className='profile__job'>{currentUser.about}</p>
        </div>
        <button className='profile__add-button' type='button' onClick={onAddPlace}></button>
      </section>

      <section className='elements'>
        {cards.map((card) => {          
          return (
            <Card key={card._id} card={card} onCardClick={onCardClick}
               onCardLike={onCardLike} onCardDelete={onCardDelete} />
          )
        })}
      </section>
    </main>
  );
}
