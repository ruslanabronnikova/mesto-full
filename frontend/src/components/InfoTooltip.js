import React from 'react';

import succes from '../images/InfoPopup/succes.svg';
import unsuccses from '../images/InfoPopup/unsuccses.svg';

function InfoTooltip({ isOpen, onClose, onStatus }) {
  return (
    <div className={`popup ${isOpen ? "popup_opene" : ""}`}>
      <div className="popup__body">
        <img src={onStatus ? succes : unsuccses} alt="Иконка" className='popup__check-img' />
        <p className='popup__check-text'>{onStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
        <button type="button"
          className="popup__button popup__button-close animation-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip