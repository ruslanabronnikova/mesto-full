import React, { useState, useEffect } from 'react';
import Card from './Card';
import apiCards from '../utils/ApiCard';
import ErrorAuth from './ErrorAuthorizate';

function Lenta({ onCardClick, onCardLike, onCardDelete, onOpenModal }) {
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Вызываем API для получения всех карточек
    apiCards.getAllCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке карточек:', error);
      });
  }, []); // Запрос выполнится только при монтировании компонента

  // Функция для открытия модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <main className="main">
      <section className="elements">
        {cards.map((item) => (
          <Card
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            card={item}
            key={item._id}
            onOpenModal={openModal}
          />
        ))}
      </section>

      {isModalOpen && (
        <ErrorAuth isOpen={isModalOpen} onClose={closeModal} />
      )}
    </main>
  );
}

export default Lenta;
