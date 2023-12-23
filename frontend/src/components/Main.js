import Card from "./Card"
import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentCardsContext from '../contexts/CurrentCardsContext';
import React, { useContext } from 'react';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const currentCards = useContext(CurrentCardsContext);

  return (
    <main className="main">
      <section className="profile">
        <button aria-label="Редактировать аватар" type="button" className="profile__avatar-edtbtn" onClick={onEditAvatar}>
          <img src={currentUser.avatar} className="profile__avatar"
            name="avataruser" />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button aria-label="Редактировать" id="Open" className="profile__button profile__button_act_edit animation-button"
            type="button" onClick={onEditProfile} ></button>
        </div>
        <button aria-label="Добавить" className="profile__button profile__button_act_add animation-button"
          type="button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {currentCards.map((item) => (
          <Card
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            card={item}
            key={item._id}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;