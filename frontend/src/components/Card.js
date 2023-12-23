import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete, onOpenModal }) {

  const isAuthenticated = localStorage.getItem("JWT");;

  function handleClick() {
    if (!isAuthenticated) {
      onOpenModal(); // Если не залогинен, открываем модальное окно
      return;
    }
    onCardClick(card);
  }

  function hadleLike() {
    if (!isAuthenticated) {
      onOpenModal(); // Если не залогинен, открываем модальное окно
      return;
    }
    onCardLike(card)
  }

  function hadleDelete() {
    onCardDelete(card)
  }

  const currentUser = useContext(CurrentUserContext)

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (
    `element__buttonlike ${isLiked && 'element__buttonlike_active'}`
  );

  return (
    <div className="element">
      <img className="element__image" src={card.link} onClick={handleClick} alt={card.name} />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__likes">
        <button aria-label="Нравится" className={cardLikeButtonClassName} type="button" onClick={hadleLike}></button>
        <p className="element__counterlike">{card.likes.length}</p>
      </div>
      {isOwn || currentUser._id === "6585d3a20546ffe525943b60" ? (
      <button aria-label="Нравится" className="element__buttondel" type="button" onClick={hadleDelete} />
    ) : null}
    </div>
  )
}

export default Card;