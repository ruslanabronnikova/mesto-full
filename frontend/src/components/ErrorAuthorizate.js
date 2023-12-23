import React from 'react';
import unsuccses from '../images/InfoPopup/unsuccses.svg';

function ErrorAuth({ isOpen, onClose}) {
  return (
    <div className={`popup ${isOpen ? "popup_opene" : ""}`}>
      <div className="popup__body">
        <img src={unsuccses} alt="Иконка" className='popup__check-img' />
        <p className='popup__check-text'>Пожалуйста войдите или зарегистрируйтесь</p>
        <button type="button"
          className="popup__button popup__button-close animation-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ErrorAuth