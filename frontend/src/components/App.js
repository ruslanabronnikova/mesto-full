import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

//Испорты основной части приложения
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Lenta from './Lenta';

// Импорты всех попапов приложения
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ErrorAuth from './ErrorAuthorizate';

// Импорты Апи запросов 
import api from "../utils/Api";
import * as auth from '../utils/Auth';

import CurrentUserContext from '../contexts/CurrentUserContext';
import CurrentCardsContext from '../contexts/CurrentCardsContext';
import CurrentAdminContext from '../contexts/CurrentAdminContext';


// Импорты относящиеся к регистрации и входу в приложения
import ProtectedRoute from './ProtectedRoute';
import Login from './Login'
import Register from './Register';

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [currentCards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState('');

  const [infoPopupCheckOpen, setInfoPopupCheckOpen] = useState(false)

  const [infoPopupCheck, setInfoPopupCheck] = useState(false)

  const [errorAuthPopup, setErrorAuthPopup] = useState(false)

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getInfoUsers()])
      .then(([initialCards, userData]) => {
        setCurrentUser(userData.user);
        setCards(initialCards);
        setEmail(userData.user.email)

        console.log(initialCards)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }, [])

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoPopupCheckOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(user => user === currentUser._id);
    api.changeLikeCard(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleCardDeleteCard(card) {
    const userId = currentUser._id;
    const specialUserId = "658867a4d67af0d242400e32"; // ID пользователя с особыми правами
  
    console.log("userId:", userId);
    console.log("specialUserId:", specialUserId);
  
    // Проверка, является ли текущий пользователь тем, у кого есть особые права
    if (userId === specialUserId) {
      console.log("User has special rights. Deleting any card...");
      // Если да, удаляем карточку независимо от владельца
      api.deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      // Если пользователь не тот, у кого есть особые права
      console.log("User does not have special rights. Deleting own card...");
      // Проверка, что удаляемая карточка принадлежит текущему пользователю
      if (card.owner === userId) {
        api.deleteCard(card._id)
          .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        console.log("У вас нет прав для удаления этой карточки");
      }
    }
  }
  
  

  function handleUpdateUser({ name, about }) {
    api.editProfileUsers(name, about)
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api.editAvatarProfile(avatar)
      .then((res) => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleAddNewCard({ name, link }) {
    api.addNewCards(name, link)
      .then((newCard) => {
        setCards([newCard, ...currentCards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleReg({ email, password }) {
    auth.register(email, password)
      .then(() => {
        setInfoPopupCheck(true)
        setInfoPopupCheckOpen(true)
        navigate('/sign-in');
      })
      .catch(() => {
        setInfoPopupCheck(false)
        setInfoPopupCheckOpen(true)
      });
  }

  function handleLog({ email, password }) {
    auth.login(email, password)
      .then((data) => {
        if (data.JWT) {
          localStorage.setItem('JWT', data.JWT);
          setEmail(email);
          setIsLoggedIn(true);
          navigate("/main");
        }
        console.log(data);
      })
      .catch(() => {
        setInfoPopupCheck(false)
        setInfoPopupCheckOpen(true)
      });
  }

  function checkToken() {
    const token = localStorage.getItem('JWT');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate("/main");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    checkToken()
  }, []);


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
          <CurrentCardsContext.Provider value={currentCards}>
            <Header email={email} />
            <Routes>
              <Route path="/" element={isLoggedIn ? <Navigate to="/main" /> : <Lenta />} />
              <Route path="/sign-in" element={<Login isLoggedIn={isLoggedIn} onLog={handleLog} />} />
              <Route path='/sign-up' element={<Register isLoggedIn={isLoggedIn} onReg={handleReg} />} />
              <Route
                path="/main"
                element={
                  <ProtectedRoute element={Main}
                    isLoggedIn={isLoggedIn}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDeleteCard}
                  />
                }
              />
            </Routes>

            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onNewCard={handleAddNewCard} />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <InfoTooltip isOpen={infoPopupCheckOpen} onClose={closeAllPopups} onStatus={infoPopupCheck} />

            <ErrorAuth isOpen={errorAuthPopup} onClose={closeAllPopups} />
          </CurrentCardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
