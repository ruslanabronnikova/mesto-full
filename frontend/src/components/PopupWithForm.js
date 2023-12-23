import React from "react";

function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup ${isOpen ? "popup_opene" : ""}`}>
      <div className="popup__body">
        <form className="popup__container" name={name} method="post" onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          <fieldset className="popup__items">
            <div className="popup__item">
              {children}
              <button type="button" 
                className="popup__button popup__button-close animation-button" onClick={onClose}></button>
              <button type="submit"
                className="popup__button popup__button-submit">{buttonText || 'Сохранить'}</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;