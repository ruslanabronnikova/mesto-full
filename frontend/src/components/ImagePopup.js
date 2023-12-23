import React from "react";

function ImagePopup({ card, onClose }) {

  return (
    <div className={`popup popup_mesto_image" ${card ? "popup_opene" : ""}`}>
      <div className="popup__imagebody">
        <img className="popup__picture" src={card?.link} alt={card?.name}/>
          <h2 className="popup__picture-title">{card?.name}</h2>
          <button type="button" id="closeimage"
            className="popup__button popup__button-close popup__button_img_close animation-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;
