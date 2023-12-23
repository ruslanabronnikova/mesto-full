import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type='text' className='popup__input popup__input_name_value' name="nameuser" id="nameuser"
        placeholder="Имя" minLength="2" maxLength="40" title="Длина поля должна быть 2 и более символов и менее или равно 40" required value={name || ''} onChange={handleNameChange} />
      <span className="popup__item-error nameuser-error" />
      <input type='text' className='popup__input popup__input_career_value' name="aboutuser" id="aboutuser"
        placeholder="Описание" minLength="2" maxLength="200" title="Длина поля должна быть 2 и более символов и менее или равно 200" required value={description || ''} onChange={handleDescriptionChange} />
      <span className="popup__item-error nameuser-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;