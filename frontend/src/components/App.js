import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopUpWithSubmit from './PopupWithSubmit';
import ProfilePopup from './ProfilePopup';
import PlacePopup from './PlacePopup';
import AvatarPopup from './AvatarPopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isProfileLoading, setIsProfileLoading] = React.useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = React.useState(false);
  const [isPlaceLoading, setIsPlaceLoading] = React.useState(false);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const [isRegistered, setIsRegistered] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardId));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    ;
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false);
  }

  function handleUpdateUser(newUser) {
    setIsProfileLoading(true);
    api
      .editUserInfo(newUser)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsProfileLoading(false);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsAvatarLoading(true);
    api
      .changeAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsAvatarLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsPlaceLoading(true);
    api
      .addNewCard(newCard)
      .then((cardData) => {
        setCards([cardData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPlaceLoading(false);
      });
  }
  function handleSuccessRegister() {
    setIsRegistered(true);
    setIsInfoTooltipPopupOpen(true);
  }
  function handleFailureRegister() {
    setIsRegistered(false);
    setIsInfoTooltipPopupOpen(true);
  }

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth
        .checkToken(jwt)
        .then((data) => {
          if (!data) {
            return;
          }
          setEmail(data.data.email);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          setEmail('');
          setIsLoggedIn(false);
        });
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleSignOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    setIsLoggedIn(false);
  }

function handleLogin({password, email}) {
    if (!password || !email) {
      return;
    }
    auth
      .authorize(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header email={email} onSignOut={handleSignOut} />
          <Routes>
          <Route path="/*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onCardClick={handleCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  handleSuccessRegister={handleSuccessRegister}
                  handleFailureRegister={handleFailureRegister}
                />
              }
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
          </Routes>

          <Footer />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <ProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isProfileLoading}
          />
          <PlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isPlaceLoading}
          />
          <PopUpWithSubmit onClose={closeAllPopups} />
          <AvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isAvatarLoading}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isRegistered={isRegistered}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
